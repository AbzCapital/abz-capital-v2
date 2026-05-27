import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/db";

const kycSchema = z.object({
  companyName: z.string().min(1),
  country: z.string().min(1),
  ticketSize: z.string().min(1),
  investmentTrack: z.string().min(1),
  investmentHistory: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = kycSchema.parse(body);

    const investor = await prisma.investor.update({
      where: { userId: session.user.id },
      data: {
        companyName: data.companyName,
        country: data.country,
        ticketSize: data.ticketSize,
        investmentTrack: data.investmentTrack,
        investmentHistory: data.investmentHistory,
        kycStatus: "submitted",
      },
    });

    return NextResponse.json({ ok: true, data: investor });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
