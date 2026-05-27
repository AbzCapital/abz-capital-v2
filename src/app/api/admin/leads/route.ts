import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdminAuth } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 50;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      ok: true,
      data: leads,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdminAuth();
    const body = await req.json();
    const { id, status } = body;
    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ ok: true, data: lead });
  } catch {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  // CSV export endpoint
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Category",
      "Status",
      "Subject",
      "Message",
      "Created",
    ];
    const rows = leads.map((lead: any) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.category,
      lead.status,
      lead.subject || "",
      (lead.message || "").replace(/"/g, '""'),
      new Date(lead.createdAt).toISOString(),
    ]);

    const csv = [headers, ...rows].map((row: any[]) => row.map((cell: any) => `"${cell}"`).join(",")).join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="leads.csv"',
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
}
