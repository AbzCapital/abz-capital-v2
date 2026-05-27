import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { requireAdminAuth } from "@/lib/admin-auth";
import { loanConfigSchema } from "@/lib/validation/adminSchemas";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth();
    let config = await prisma.loanConfig.findFirst();
    if (!config) {
      config = await prisma.loanConfig.create({ data: {} });
    }
    return NextResponse.json({ ok: true, data: config });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await req.json();
    const data = loanConfigSchema.parse(body);
    let config = await prisma.loanConfig.findFirst();
    if (!config) {
      config = await prisma.loanConfig.create({ data });
    } else {
      config = await prisma.loanConfig.update({
        where: { id: config.id },
        data: { ...data, updatedBy: "admin" },
      });
    }
    return NextResponse.json({ ok: true, data: config });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: error.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
