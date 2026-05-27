"use client";

import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileFieldProps {
  onToken: (token: string) => void;
  onError?: () => void;
}

export function TurnstileField({ onToken, onError }: TurnstileFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    // Turnstile not configured — render nothing (dev mode passes through on the server).
    return null;
  }
  return (
    <div className="my-2">
      <Turnstile
        siteKey={siteKey}
        onSuccess={onToken}
        onError={onError}
        options={{ theme: "light", size: "flexible" }}
      />
    </div>
  );
}

export default TurnstileField;
