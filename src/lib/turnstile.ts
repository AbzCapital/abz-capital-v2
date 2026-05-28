interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
}

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // In development or if Turnstile not configured, accept submissions
  if (!secret || process.env.NODE_ENV !== "production") {
    // Accept submissions with or without token in non-production environments
    return true;
  }

  // In production, token is required
  if (!token) return false;

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    if (!res.ok) return false;
    const data = (await res.json()) as TurnstileVerifyResponse;
    return Boolean(data.success);
  } catch (error) {
    console.error("Turnstile verification error:", error);
    // In case of network error, allow submission but log it
    return true;
  }
}
