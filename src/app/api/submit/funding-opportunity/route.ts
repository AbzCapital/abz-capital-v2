import { NextResponse } from "next/server";
import { getResend } from "@/lib/email/resend";

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  opportunityType: string;
  description: string;
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: FormData;
    let attachments: Array<{ filename: string; content: Buffer }> = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        category: formData.get("category") as string,
        opportunityType: formData.get("opportunityType") as string,
        description: formData.get("description") as string,
      };

      // Handle file uploads
      const files = formData.getAll("files") as File[];
      for (const file of files) {
        if (file && file.size > 0) {
          const buf = Buffer.from(await file.arrayBuffer());
          attachments.push({ filename: file.name, content: buf });
        }
      }
    } else {
      data = await req.json();
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.description) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = getResend();

    const attachmentInfo = attachments.length > 0
      ? `<p style="margin-top: 20px;"><strong style="color: #4F46E5;">📎 Attachments:</strong> ${attachments.length} file(s) attached</p>`
      : "";

    const emailContent = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color: #4F46E5;">New Funding Opportunity Submission</h2>

  <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Category:</strong> ${data.category}</p>
    <p><strong>Opportunity Type:</strong> ${data.opportunityType}</p>
  </div>

  <div style="margin: 20px 0;">
    <h3 style="color: #4F46E5;">Description:</h3>
    <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4F46E5;">
      ${data.description}
    </p>
  </div>

  ${attachmentInfo}

  <p style="font-size: 14px; color: #666; margin-top: 30px;">
    <em>Submitted from: Fundraise Page</em>
  </p>
</div>
    `;

    await resend.emails.send({
      from: "ABZ Capital <onboarding@resend.dev>",
      to: "abz1capital@gmail.com",
      replyTo: data.email,
      subject: `[Funding Opportunity] ${data.name} - ${data.category}`,
      html: emailContent,
      attachments: attachments,
    });

    return NextResponse.json({ ok: true, message: "Submission received" }, { status: 200 });
  } catch (error) {
    console.error("Funding opportunity submission error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
