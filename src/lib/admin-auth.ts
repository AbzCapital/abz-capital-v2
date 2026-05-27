import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_SESSION_TOKEN = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function setAdminSession(userId: string) {
  const cookieStore = await cookies();
  const token = Buffer.from(`${userId}:${Date.now()}`).toString("base64");
  cookieStore.set(ADMIN_SESSION_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
  });
}

export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_TOKEN)?.value;
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userId, timestamp] = decoded.split(":");
    const elapsed = Date.now() - parseInt(timestamp);
    if (elapsed > SESSION_DURATION) return null;
    return userId;
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_TOKEN);
}

export async function requireAdminAuth() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
