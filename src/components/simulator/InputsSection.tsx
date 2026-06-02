"use client";

import { ArrowRight } from "lucide-react";

export interface InputsSectionProps {
  takeHome: number;
  insurancePremium: number;
  months: number;
  onTakeHomeChange: (value: number) => void;
  onInsurancePremiumChange: (value: number) => void;
  onMonthsChange: (value: number) => void;
  onGenerate: () => void;
  isLoading?: boolean;
}

export function InputsSection({
  takeHome,
  insurancePremium,
  months,
  onTakeHomeChange,
  onInsurancePremiumChange,
  onMonthsChange,
  onGenerate,
  isLoading,
}: InputsSectionProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">Loan Terms Simulation</h2>
        <p className="text-sm sm:text-base text-muted-ink">
          Enter your details below to see your monthly payment and full repayment schedule.
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
                value={takeHome || ""}
                onChange={(e) => {
                  const num = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0;
                  onTakeHomeChange(num);
                }}
                className="w-full h-10 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </label>
        </div>

        {/* Insurance Premium */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-base font-semibold text-ink mb-1 block">Insurance Premium (KES)</span>
            <p className="text-xs text-muted-ink mb-2">
              Your estimated annual comprehensive vehicle insurance cost
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
                KES
              </span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="e.g. 50000"
                value={insurancePremium || ""}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onInsurancePremiumChange(Math.max(0, val) || 0);
                }}
                min="1"
                step="10000"
                className="w-full h-10 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                  WebkitUserSelect: "text",
                } as React.CSSProperties}
              />
            </div>
            {insurancePremium === 0 && (
              <p className="text-xs text-red-500 font-medium mt-1">
                ⚠️ Please enter an insurance amount
              </p>
            )}
          </label>
        </div>

        {/* Loan Period */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-base font-semibold text-ink mb-1 block">Loan Period (Months)</span>
            <p className="text-xs text-muted-ink mb-2">
              How many months to repay (e.g., 1, 6, 12, 24, 36)
            </p>
            <input
              type="number"
              inputMode="numeric"
              placeholder="e.g. 12"
              value={months || ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                onMonthsChange(Math.max(1, val) || 1);
              }}
              min="1"
              step="1"
              className="w-full h-10 px-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
                WebkitUserSelect: "text",
              } as React.CSSProperties}
            />
            {months < 1 && (
              <p className="text-xs text-red-500 font-medium mt-1">
                ⚠️ Loan period must be at least 1 month
              </p>
            )}
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          console.log("Button clicked!", { takeHome, insurancePremium, months });
          e.preventDefault();
          onGenerate();
        }}
        disabled={isLoading}
        className="w-full bg-peach text-blue-500 font-semibold hover:brightness-95 active:brightness-90 py-6 text-base rounded-lg border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        style={{
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          touchAction: "manipulation",
          pointerEvents: "auto",
        } as React.CSSProperties}
      >
        {isLoading ? "Simulating..." : "Simulate Loan Schedule"}
        {!isLoading && <ArrowRight className="size-4" />}
      </button>

      {/* Info Box */}
      <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/10">
        <p className="text-xs text-muted-ink leading-relaxed">
          <strong>How it works:</strong> Enter the amount you need (after fees), your insurance cost, and how long you want to repay. We'll show you the exact monthly payment, total interest, and full payment schedule.
        </p>
      </div>
    </div>
  );
}
