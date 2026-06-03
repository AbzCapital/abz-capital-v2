import prisma from "@/lib/db";
import { getResend, fromAddress } from "@/lib/email/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("[API] Investor registration request received");
  console.log("[API] Prisma client available?", !!prisma);
  console.log("[API] DATABASE_URL configured?", !!process.env.DATABASE_URL);
  console.log("[API] RESEND_API_KEY configured?", !!process.env.RESEND_API_KEY);
  console.log("[API] NODE_ENV:", process.env.NODE_ENV);
  try {
    // Detect device type from User-Agent header
    const userAgent = request.headers.get('user-agent') || '';
    let source = 'unknown';
    if (/mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(userAgent)) {
      source = 'mobile';
    } else if (/mac|windows|linux|crOS|X11/i.test(userAgent)) {
      source = 'desktop';
    }
    console.log("[API] Device source:", source, "| User-Agent:", userAgent);

    // Handle both JSON and form-urlencoded requests
    let body: any;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData);

      // Handle multiple investment_preferences as array
      const prefs = formData.getAll('investment_preferences');
      if (prefs.length > 0) {
        body.investment_preferences = prefs;
      }
    } else {
      body = await request.json();
    }

    console.log("[API] Request body:", body);

    let {
      investor_type,
      first_name,
      last_name,
      country_code,
      phone_number,
      email,
      investment_amount,
      investment_preferences,
      investor_note,
      loan_category,
    } = body;

    // Convert loan_category to investment_preferences for lending_pool
    if (investor_type === "lending_pool" && loan_category) {
      investment_preferences = [loan_category];
    }

    // Validate investor type
    if (!["lending_pool", "investor_network"].includes(investor_type)) {
      return NextResponse.json(
        { error: "Invalid investor type" },
        { status: 400 }
      );
    }

    // Filter out empty strings from investment_preferences
    if (Array.isArray(investment_preferences)) {
      investment_preferences = investment_preferences.filter((pref: string) => pref && pref.trim().length > 0);
    }

    console.log("[API] investment_preferences value:", investment_preferences, "| type:", typeof investment_preferences, "| isArray:", Array.isArray(investment_preferences));

    // Validate preferences based on investor type
    if (investor_type === "lending_pool") {
      const validLoans = ["logbook_loans", "title_deed_loans"];
      if (
        !Array.isArray(investment_preferences) ||
        !investment_preferences.every((pref) => validLoans.includes(pref))
      ) {
        return NextResponse.json(
          { error: "Invalid loan preferences for lending pool" },
          { status: 400 }
        );
      }
    }

    if (investor_type === "investor_network") {
      // Allow both predefined sectors and custom sectors entered by users
      if (
        !Array.isArray(investment_preferences) ||
        investment_preferences.length === 0
      ) {
        return NextResponse.json(
          { error: "Please select at least one investment sector" },
          { status: 400 }
        );
      }
    }

    const fullName = `${first_name} ${last_name}`;

    // Create investor registration record
    console.log("[API] Creating investor record in database");
    const investor = await prisma.investorRegistration.create({
      data: {
        investor_type,
        full_name: fullName,
        country_code,
        phone_number,
        email,
        investment_amount: parseFloat(investment_amount),
        investment_preferences: investment_preferences,
        investor_note: investor_note || null,
        status: "pending",
        source: source,
      },
    });
    console.log("[API] Investor record created:", investor.id);

    // Send email notifications
    try {
      const resend = getResend();

      // Admin notification email
      const adminEmailContent = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color: #4F46E5;">New Investor Registration</h2>

  <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Investor Type:</strong> ${investor_type === "lending_pool" ? "Lending Pool" : "Investor Network"}</p>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${country_code}${phone_number}</p>
    <p><strong>Investment Amount:</strong> KES ${parseFloat(investment_amount).toLocaleString()}</p>
    <p><strong>Preferences:</strong> ${investment_preferences.join(", ")}</p>
    ${investor_note ? `<p><strong>Note:</strong> ${investor_note}</p>` : ""}
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Status:</strong> Pending Review</p>
  </div>

  <p style="font-size: 14px; color: #666; margin-top: 30px;">
    <em>Submitted from: Invest Page</em>
  </p>
</div>
      `;

      console.log("[EMAIL] Sending admin notification...");
      const { error: adminError } = await resend.emails.send({
        from: "ABZ Capital <onboarding@resend.dev>",
        to: "abz1capital@gmail.com",
        replyTo: email,
        subject: `[New Investor] ${fullName} - ${investor_type === "lending_pool" ? "Lending Pool" : "Investor Network"}`,
        html: adminEmailContent,
      });

      if (adminError) {
        console.error("[EMAIL ERROR] Admin email failed:", adminError);
      } else {
        console.log("[EMAIL SUCCESS] Admin email sent");
      }

      // Confirmation email to investor
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; border-radius: 5px; }
    .content { padding: 20px; }
    .footer { color: #666; font-size: 12px; text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Investment Platform 🎉</h1>
    </div>

    <div class="content">
      <p>Dear ${first_name},</p>

      <p>Congratulations and thank you for successfully submitting your details and joining our investment platform.</p>

      <p>We are pleased to welcome you into our growing network of investors.</p>

      <p>Your application is currently under review, and our team is carefully assessing investment opportunities to ensure they align with your stated preferences and risk profile.</p>

      <p>At this stage, there is nothing further you need to do. We will keep you updated and notify you as soon as a suitable deal or investment opportunity that matches your preferences has been approved and made available.</p>

      <p>We appreciate your interest and trust in us, and we look forward to keeping you informed about upcoming opportunities.</p>

      <p>Warm regards,<br/>
      <strong>The Investment Team</strong></p>
    </div>

    <div class="footer">
      <p>ABZ Capital Ltd | investment@abzcapital.com<br/>
      This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

      console.log("[EMAIL] Sending confirmation email to investor...");
      const { data, error } = await resend.emails.send({
        from: "ABZ Capital <onboarding@resend.dev>",
        to: email,
        subject: `Welcome to Our Investment Platform 🎉`,
        html: emailHtml,
      });

      if (error) {
        console.error("[EMAIL ERROR] Confirmation email failed:", error);
      } else {
        console.log("[EMAIL SUCCESS] Confirmation email sent. Message ID:", data?.id);
      }
    } catch (emailError) {
      console.error("[EMAIL CATCH ERROR]:", emailError);
      // Don't fail the registration if email fails
    }

    console.log("[API] Investor registration successful:", investor.id);

    // Redirect to appropriate success page based on investor type
    // Use the request host to construct the proper redirect URL
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';

    const successPath = investor_type === 'lending_pool'
      ? '/registration-success'
      : '/investor-network-success';

    const redirectUrl = new URL(successPath, `${protocol}://${host}`);

    return NextResponse.redirect(redirectUrl, {
      status: 303
    });
  } catch (error) {
    console.error("[API ERROR] Full error object:", error);
    console.error("[API ERROR] Error type:", error instanceof Error ? error.constructor.name : typeof error);

    let errorDetails = "Unknown error";
    if (error instanceof Error) {
      console.error("[API ERROR] Error message:", error.message);
      console.error("[API ERROR] Error stack:", error.stack);
      errorDetails = error.message;
    } else if (typeof error === 'object' && error !== null) {
      console.error("[API ERROR] Error as JSON:", JSON.stringify(error, null, 2));
      errorDetails = JSON.stringify(error);
    }

    // Check for common issues
    if (errorDetails.includes('DATABASE_URL') || errorDetails.includes('database') || errorDetails.includes('ECONNREFUSED')) {
      console.error("[API ERROR] DATABASE CONNECTION ISSUE - Check DATABASE_URL in Vercel environment variables");
    }

    return NextResponse.json(
      {
        error: "Failed to register investor. Please try again.",
        debug: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}
