import { NextResponse, NextRequest } from "next/server";
import { getResend } from "@/lib/email/resend";

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  category: string;
  opportunityType: string;
  description: string;
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: FormData;

    // Handle form-urlencoded from native HTML form
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      data = {
        name: (formData.get("name") as string) || "",
        email: (formData.get("email") as string) || "",
        countryCode: (formData.get("countryCode") as string) || "+254",
        phoneNumber: (formData.get("phoneNumber") as string) || "",
        category: (formData.get("category") as string) || "",
        opportunityType: (formData.get("opportunityType") as string) || "",
        description: (formData.get("description") as string) || "",
      };
    } else {
      // Handle JSON from React fetch
      const body = await req.json();
      data = {
        name: body.name || "",
        email: body.email || "",
        countryCode: body.countryCode || "+254",
        phoneNumber: body.phoneNumber || "",
        category: body.category || "",
        opportunityType: body.opportunityType || "",
        description: body.description || "",
      };
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phoneNumber || !data.description) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = getResend();

    const emailContent = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color: #4F46E5;">New Funding Opportunity Submission</h2>

  <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.countryCode}${data.phoneNumber}</p>
    <p><strong>Category:</strong> ${data.category}</p>
    <p><strong>Opportunity Type:</strong> ${data.opportunityType}</p>
  </div>

  <div style="margin: 20px 0;">
    <h3 style="color: #4F46E5;">Description:</h3>
    <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4F46E5;">
      ${data.description}
    </p>
  </div>

  <p style="font-size: 14px; color: #666; margin-top: 30px;">
    <em>Submitted from: Fundraise Page</em>
  </p>
</div>
    `;

    // Send email to admin
    console.log("[API] Sending email to admin...");
    const { error: emailError } = await resend.emails.send({
      from: "ABZ Capital <onboarding@resend.dev>",
      to: "abz1capital@gmail.com",
      replyTo: data.email,
      subject: `[Funding Opportunity] ${data.name} - ${data.category}`,
      html: emailContent,
    });

    if (emailError) {
      console.error("[EMAIL ERROR] Admin email failed:", emailError);
    } else {
      console.log("[EMAIL SUCCESS] Admin email sent");
    }

    // Send confirmation email to submitter
    console.log("[API] Sending confirmation email to submitter...");
    const confirmationEmail = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color: #4F46E5;">Thank You for Your Submission 🎉</h2>

  <p>Dear ${data.name},</p>

  <p>Thank you for submitting your funding opportunity to ABZ Capital. We have received your submission and will review it carefully.</p>

  <p><strong>Submission Details:</strong></p>
  <ul>
    <li>Category: ${data.category}</li>
    <li>Opportunity Type: ${data.opportunityType}</li>
    <li>Phone: ${data.countryCode}${data.phoneNumber}</li>
  </ul>

  <p>Our investment team will analyze your opportunity and contact you within 1-2 business days if we would like to move forward.</p>

  <p>Best regards,<br/>
  <strong>ABZ Capital Team</strong></p>

  <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
    This is an automated message. Please do not reply to this email.
  </p>
</div>
    `;

    const { error: confirmError } = await resend.emails.send({
      from: "ABZ Capital <onboarding@resend.dev>",
      to: data.email,
      subject: "We've Received Your Funding Opportunity Submission",
      html: confirmationEmail,
    });

    if (confirmError) {
      console.error("[EMAIL ERROR] Confirmation email failed:", confirmError);
    } else {
      console.log("[EMAIL SUCCESS] Confirmation email sent");
    }

    // Redirect for native form, return JSON for React fetch
    if (contentType.includes("application/x-www-form-urlencoded")) {
      // Native form submission - redirect to success page
      const baseUrl = req.headers.get("origin") || "http://localhost:3000";
      const redirectUrl = new URL("/fundraise?submitted=true", baseUrl);
      return NextResponse.redirect(redirectUrl, { status: 303 });
    }

    // React fetch - return JSON
    return NextResponse.json({ ok: true, message: "Opportunity submitted" }, { status: 200 });
  } catch (error) {
    console.error("Funding opportunity submission error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
