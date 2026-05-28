"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { AlertCircle, CheckCircle } from "lucide-react";

interface TurnstileFieldProps {
  onToken: (token: string) => void;
  onError?: () => void;
}

export function TurnstileField({ onToken, onError }: TurnstileFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [loadError, setLoadError] = useState(false);
  const [verified, setVerified] = useState(false);

  if (!siteKey) {
    // Turnstile not configured — render nothing (dev mode passes through on the server).
    return null;
  }

  return (
    <div className="my-4 space-y-2">
      {loadError ? (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 border border-amber-200">
          <AlertCircle className="size-4 text-amber-600" />
          <p className="text-sm text-amber-700">
            Security check temporarily unavailable. Your submission may still work.
          </p>
        </div>
      ) : verified ? (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 border border-green-200">
          <CheckCircle className="size-4 text-green-600" />
          <p className="text-sm text-green-700">Security verification passed</p>
        </div>
      ) : (
        <div>
          <Turnstile
            siteKey={siteKey}
            onSuccess={(token) => {
              onToken(token);
              setVerified(true);
              setLoadError(false);
            }}
            onError={() => {
              setLoadError(true);
              onError?.();
            }}
            onExpire={() => {
              setVerified(false);
            }}
            options={{ theme: "light", size: "flexible" }}
          />
        </div>
      )}
    </div>
  );
}

export default TurnstileField;
