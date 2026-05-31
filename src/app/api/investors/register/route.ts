import prisma from "@/lib/db";
import { getResend, fromAddress } from "@/lib/email/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

      await resend.emails.send({
        from: fromAddress(),
        to: email,
        subject: "Welcome to Our Investment Platform 🎉",
        text: emailBody,
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      { success: true, investor_id: investor.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Investor registration error:", error);
    return NextResponse.json(
      { error: "Failed to register investor" },
      { status: 500 }
    );
  }
}
