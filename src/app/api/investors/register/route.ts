import prisma from "@/lib/db";
import { getResend, fromAddress } from "@/lib/email/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("[API] Investor registration request received");
  console.log("[API] Prisma client available?", !!prisma);
  try {
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
      },
    });
    console.log("[API] Investor record created:", investor.id);

    // Send email notification
    try {
      const resend = getResend();
      const emailBody =
        investor_type === "lending_pool"
          ? `Dear ${first_name},

Congratulations and thank you for successfully submitting your details and joining our investment platform.

We are pleased to welcome you into our growing network of investors.

Your application is currently under review, and our team is carefully assessing investment opportunities to ensure they align with your stated preferences and risk profile.

At this stage, there is nothing further you need to do. We will keep you updated and notify you as soon as a suitable loan opportunity that matches your preferences has been approved and made available.

We appreciate your interest and trust in us, and we look forward to keeping you informed about upcoming opportunities.

Warm regards,
The Investment Team`
          : `Dear ${first_name},

Congratulations and thank you for successfully submitting your details and joining our investment platform.

We are pleased to welcome you into our growing network of investors.

Your application is currently under review, and our team is carefully assessing investment opportunities to ensure they align with your stated preferences and risk profile.

At this stage, there is nothing further you need to do. We will keep you updated and notify you as soon as a suitable deal or investment opportunity that matches your preferences has been approved and made available.

We appreciate your interest and trust in us, and we look forward to keeping you informed about upcoming opportunities.

Warm regards,
The Investment Team`;

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
        subject: "Welcome to Our Investment Platform 🎉",
        text: emailBody,
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
