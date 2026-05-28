"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { toast } from "sonner";

export function SimulatorPageContent() {
  const router = useRouter();
  const [takeHome, setTakeHome] = useState("");
  const [insurancePremium, setInsurancePremium] = useState("");
  const [months, setMonths] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    const takeHomeNum = parseInt(takeHome) || 0;
    const insuranceNum = parseInt(insurancePremium) || 0;
    const monthsNum = parseInt(months) || 0;

    if (takeHomeNum <= 0) {
      toast.error("Please enter amount to take home");
      return;
    }

    if (insuranceNum <= 0) {
      toast.error("Please enter insurance premium");
      return;
    }

    if (monthsNum < 1) {
      toast.error("Loan period must be at least 1 month");
      return;
    }

    setLoading(true);
    try {
      // Navigate to loan summary with parameters
      const params = new URLSearchParams({
        amount: takeHomeNum.toString(),
        insurance: insuranceNum.toString(),
        months: monthsNum.toString(),
      });
      router.push(`/loan-summary?${params.toString()}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to navigate to summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-line">
        <Container>
          <div className="flex items-center gap-4 py-4">
            <Link
              href="/products"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-indigo/5 active:brightness-95 touch-manipulation"
              aria-label="Back to products"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-indigo">Loan Terms Simulator</h1>
              <p className="text-sm text-muted-ink">Calculate your loan payments</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 max-w-2xl pb-20">
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">Loan Terms Simulation</h2>
            <p className="text-sm sm:text-base text-muted-ink">
              Enter your details to see your monthly payment and full repayment schedule.
            </p>
          </div>

          <div className="space-y-8">
            {/* Take Home Amount */}
            <div className="space-y-3">
              <label className="block">
                <span className="text-base font-semibold text-ink mb-1 block">Amount to Take Home (KES)</span>
                <p className="text-xs text-muted-ink mb-2">
                  The net cash amount you need after all fees
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
                    KES
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 500000"
                    value={takeHome}
                    onChange={(e) => setTakeHome(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>
              </label>
            </div>

            {/* Insurance Premium */}
            <div className="space-y-3">
              <label className="block">
                <span className="text-base font-semibold text-ink mb-1 block">Insurance Premium (KES)</span>
                <p className="text-xs text-muted-ink mb-2">
                  Your estimated annual comprehensive vehicle insurance
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
                    KES
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 50000"
                    value={insurancePremium}
                    onChange={(e) => setInsurancePremium(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>
              </label>
            </div>

            {/* Loan Period */}
            <div className="space-y-3">
              <label className="block">
                <span className="text-base font-semibold text-ink mb-1 block">Loan Period (Months)</span>
                <p className="text-xs text-muted-ink mb-2">
                  Number of months to repay (e.g. 1, 6, 12, 24, 36)
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 12"
                  value={months}
                  onChange={(e) => setMonths(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                />
              </label>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full h-12 bg-indigo text-white font-semibold rounded-lg hover:brightness-110 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition touch-manipulation flex items-center justify-center gap-2"
            style={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              pointerEvents: "auto",
            } as React.CSSProperties}
          >
            {loading ? "Loading Summary..." : "View Summary"}
            {!loading && <ArrowRight className="size-4" />}
          </button>

          {/* Info Box */}
          <div className="bg-indigo/5 rounded-lg p-4 border border-indigo/10">
            <p className="text-xs text-muted-ink leading-relaxed">
              <strong>How it works:</strong> Enter the amount you need (after fees), your insurance cost, and your preferred repayment period. Click "View Summary" to see your monthly payment, total interest, and complete payment breakdown.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
