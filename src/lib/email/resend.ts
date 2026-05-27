import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not configured. Set it in your environment before sending email."
    );
  }
  cached = new Resend(key);
  return cached;
}

export function fromAddress(): string {
  return (
    process.env.LEAD_FROM_EMAIL ||
    "ABZ Capital <no-reply@abzcapital.co.ke>"
  );
}
