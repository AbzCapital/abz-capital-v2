import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { requireAdminAuth } from "@/lib/admin-auth";
import { categorySchema } from "@/lib/validation/adminSchemas";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth();
    const categories = await prisma.category.findMany({
      include: { products: { select: { id: true } } },
    });
    return NextResponse.json({ ok: true, data: categories });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await req.json();
    const data = categorySchema.parse(body);
    const category = await prisma.category.create({ data });
    return NextResponse.json({ ok: true, data: category });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: error.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await req.json();
    const { id, ...data } = body;
    const updated = await prisma.category.update({
      where: { id },
      data: categorySchema.parse(data),
    });
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: error.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}
