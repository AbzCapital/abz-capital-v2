"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function InvestorWelcomePage() {
  const searchParams = useSearchParams();
  const investorId = searchParams.get("id");
  const email = searchParams.get("email");

  useEffect(() => {
    // Optional: Log success to analytics
    if (investorId) {
      console.log("Investor registered:", investorId);
    }
  }, [investorId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Welcome!</h1>
        <p className="text-gray-700 mb-6">
          Your registration is complete. We've sent you an email with details.
        </p>

        {investorId && (
          <div className="bg-blue-50 p-4 rounded mb-6">
            <p className="text-sm text-gray-600 mb-1">Your Investor ID:</p>
            <p className="font-mono text-lg font-bold text-blue-700">
              {investorId}
            </p>
          </div>
        )}

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-4 mb-6">
          <p className="text-sm font-semibold text-yellow-800 mb-3">
            🚀 Next Step: Join Our WhatsApp Group
          </p>
          <p className="text-sm text-yellow-700 mb-4">
            Get instant alerts for new investment opportunities and deal updates.
          </p>
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
          >
            Join WhatsApp Group
          </a>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Check your email ({email}) for more details and the WhatsApp group
          link.
        </p>

        <Link
          href="/invest"
          className="inline-block bg-indigo text-white font-semibold py-2 px-6 rounded hover:bg-indigo-700"
        >
          Back to Invest
        </Link>
      </div>
    </div>
  );
}
