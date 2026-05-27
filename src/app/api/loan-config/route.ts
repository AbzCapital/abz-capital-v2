import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    let config = await prisma.loanConfig.findFirst();
    if (!config) {
      config = await prisma.loanConfig.create({ data: {} });
    }
    return NextResponse.json(config);
  } catch (error) {
    console.error("Failed to fetch loan config:", error);
    return NextResponse.json(
      {
        valuationFee: 1500,
        legalFee: 1500,
        processingFeePercentage: 0.05,
        logbookTransferFee: 2500,
        trackerFee: 15000,
        monthlyRate: 0.06,
        minMonths: 1,
        maxMonths: 12,
      },
      { status: 200 }
    );
  }
}
