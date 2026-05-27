import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { requireAdminAuth } from "@/lib/admin-auth";
import { productSchema } from "@/lib/validation/adminSchemas";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth();
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    return NextResponse.json({ ok: true, data: products });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await req.json();
    const data = productSchema.parse(body);
    const product = await prisma.product.create({
      data,
      include: { category: true },
    });
    return NextResponse.json({ ok: true, data: product });
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
    const updated = await prisma.product.update({
      where: { id },
      data: productSchema.parse(data),
      include: { category: true },
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
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}
