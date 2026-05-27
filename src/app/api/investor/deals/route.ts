import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const investor = await prisma.investor.findUnique({
      where: { userId: session.user.id },
    });

    if (!investor) {
      return NextResponse.json({ ok: true, data: [] });
    }

    const deals = await prisma.investorDeal.findMany({
      where: { investorId: investor.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ ok: true, data: deals });
  } catch {
    return NextResponse.json({ ok: false, error: "Error fetching deals" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { dealId, status } = body;

    const deal = await prisma.investorDeal.update({
      where: { id: dealId },
      data: { status },
    });

    return NextResponse.json({ ok: true, data: deal });
  } catch {
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }
}
