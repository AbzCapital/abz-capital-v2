import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      investor_type,
      full_name,
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

    // Create investor record
    const investor = await prisma.investors.create({
      data: {
        investor_type,
        full_name,
        country_code,
        phone_number,
        email,
        investment_amount: parseFloat(investment_amount),
        investment_preferences: investment_preferences,
        investor_note: investor_note || null,
        status: "pending",
      },
    });

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
