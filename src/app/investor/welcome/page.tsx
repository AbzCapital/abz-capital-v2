"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function InvestorWelcomeContent() {
  const searchParams = useSearchParams();
  const investorId = searchParams.get("id");
  const email = searchParams.get("email");
  const type = searchParams.get("type");
  const isLendingPool = type === "lending_pool";

  useEffect(() => {
    if (investorId) {
      console.log("Investor registered:", investorId);
    }
  }, [investorId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Registration Successful</h1>

        <p className="text-gray-700 mb-4">
          Your details have been saved successfully.
        </p>

        {isLendingPool ? (
          <p className="text-gray-700 mb-6">
            You will receive notifications whenever a loan matching your investment preferences becomes available.
          </p>
        ) : (
          <p className="text-gray-700 mb-6">
            You will receive notifications whenever an investment opportunity matching your preferred sectors becomes available. Our investment team may also contact you directly regarding suitable opportunities.
          </p>
        )}

        {isLendingPool && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-4 mb-6">
            <p className="text-sm font-semibold text-yellow-800 mb-3">
              For faster deal alerts, join our WhatsApp investor community.
            </p>
            <a
              href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
            >
              Join WhatsApp Group
            </a>
          </div>
        )}

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

export default function InvestorWelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InvestorWelcomeContent />
    </Suspense>
  );
}
