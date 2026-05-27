import { NextRequest, NextResponse } from "next/server";
import { hash, compare } from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/db";
import { setAdminSession } from "@/lib/admin-auth";
import { adminLoginSchema } from "@/lib/validation/adminSchemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = adminLoginSchema.parse(body);

    const user = await prisma.adminUser.findUnique({ where: { email } });

    if (!user) {
      // Create default admin user on first login attempt
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.adminUser.create({
          data: { email, password: hashedPassword },
        });
        await setAdminSession(newUser.id);
        return NextResponse.json({ ok: true, message: "Admin user created and logged in" });
      }
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    await setAdminSession(user.id);
    return NextResponse.json({ ok: true, message: "Logged in" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0]?.message || "Validation error";
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // Logout endpoint
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("admin_session");
  return response;
}
