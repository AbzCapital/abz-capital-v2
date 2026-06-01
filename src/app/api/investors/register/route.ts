import prisma from "@/lib/db";
import { getResend, fromAddress } from "@/lib/email/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("[API] Investor registration request received");
  console.log("[API] Prisma client available?", !!prisma);
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

    const body = await request.json();
    console.log("[API] Request body:", body);

    const {
      investor_type,
      first_name,
      last_name,
      country_code,
      phone_number,
      email,
      investment_amount,
      investment_preferences,
      investor_note,
    } = body;

    // Validate investor type
    if (!["lending_pool", "investor_network"].includes(investor_type)) {
      return NextResponse.json(
        { error: "Invalid investor type" },
        { status: 400 }
      );
    }

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
      const validSectors = [
        "FinTech",
        "Government Contracts",
        "Agritech",
        "Logistics",
        "Solar Energy",
        "Supply Chain",
        "Manufacturing",
        "Healthcare",
        "Education",
        "Real Estate",
        "Retail & E-commerce",
        "Technology & Software",
        "Infrastructure",
        "Renewable Energy",
      ];
      if (
        !Array.isArray(investment_preferences) ||
        !investment_preferences.every((pref) => validSectors.includes(pref))
      ) {
        return NextResponse.json(
          { error: "Invalid sector preferences for investor network" },
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

    // Send email notification with HTML content and WhatsApp link
    try {
      const resend = getResend();

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; border-radius: 5px; }
    .content { padding: 20px; }
    .cta-button { display: inline-block; background-color: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .investor-id { background-color: #f0f0f0; padding: 15px; border-left: 4px solid #4f46e5; margin: 20px 0; font-family: monospace; }
    .footer { color: #666; font-size: 12px; text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 20px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to ABZ Capital Investor Network! 🎉</h1>
    </div>

    <div class="content">
      <p>Hi ${first_name},</p>

      <p>Congratulations and thank you for successfully submitting your details and joining our investment platform.</p>

      <p>We are pleased to welcome you into our growing network of investors.</p>

      <div class="investor-id">
        <strong>Your Investor ID:</strong><br/>
        ${investor.id}
      </div>

      <p><strong>Investment Amount:</strong> KES ${investment_amount.toLocaleString()}</p>

      <p>Your application is currently under review, and our team is carefully assessing investment opportunities to ensure they align with your stated preferences and risk profile.</p>

      <p><strong>Join our WhatsApp group for instant deal alerts and investment opportunities:</strong></p>

      <a href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1" class="cta-button">👉 Join WhatsApp Group</a>

      <p>In the WhatsApp group, you'll receive:</p>
      <ul>
        <li>Instant notifications for new investment opportunities</li>
        <li>Deal summaries and loan performance updates</li>
        <li>Direct support from our investment team</li>
      </ul>

      <p>At this stage, there is nothing further you need to do. We will keep you updated and notify you as soon as a suitable opportunity that matches your preferences has been approved and made available.</p>

      <p>If you have any questions, feel free to reach out to us at <strong>support@abzcapital.com</strong></p>

      <p>We appreciate your interest and trust in us, and we look forward to keeping you informed about upcoming opportunities.</p>

      <p>Happy investing!<br/>
      <strong>The ABZ Capital Team</strong></p>
    </div>

    <div class="footer">
      <p>ABZ Capital Ltd | investment@abzcapital.com<br/>
      This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

      // Handle Resend testing mode limitation
      const resendTestingMode = process.env.RESEND_TESTING_MODE === "true";
      const sendToEmail = resendTestingMode ? (process.env.RESEND_TEST_EMAIL || email) : email;

      console.log("[EMAIL] Attempting to send email to:", sendToEmail);
      if (resendTestingMode) {
        console.log("[EMAIL] Using test mode - original recipient was:", email);
      }

      const { data, error } = await resend.emails.send({
        from: fromAddress(),
        to: sendToEmail,
        subject: `Welcome to ABZ Capital! Your Investor ID: ${investor.id}`,
        html: emailHtml,
      });

      // CRITICAL: Check for Resend error response (not thrown exception)
      if (error) {
        console.error("[EMAIL ERROR] Resend API error:", error);
        // Still return success since investor was saved to DB
      } else {
        console.log("[EMAIL SUCCESS] Email sent. Message ID:", data?.id);
      }
    } catch (emailError) {
      console.error("[EMAIL CATCH ERROR]:", emailError);
      // Don't fail the registration if email fails
    }

    console.log("[API] Returning success response");
    return NextResponse.json(
      { success: true, investor_id: investor.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API ERROR] Full error object:", error);
    if (error instanceof Error) {
      console.error("[API ERROR] Error message:", error.message);
      console.error("[API ERROR] Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to register investor. Please try again." },
      { status: 500 }
    );
  }
}
