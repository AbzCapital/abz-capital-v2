"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
          <div>
            <label htmlFor="takeHome" className="text-base font-semibold text-ink block mb-1">
              Amount to Take Home (KES)
            </label>
            <p className="text-xs text-muted-ink mb-2">
              The net cash amount you need after all fees
            </p>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
              KES
            </span>
            <Input
              id="takeHome"
              type="number"
              inputMode="numeric"
              placeholder="e.g. 500000"
              value={takeHome || ""}
              onChange={(e) => onTakeHomeChange(Number(e.target.value) || 0)}
              min="1"
              step="10000"
              className="text-base pl-12 touch-manipulation"
              style={{
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Insurance Premium */}
        <div className="space-y-3">
          <div>
            <label htmlFor="insurance" className="text-base font-semibold text-ink block mb-1">
              Insurance Premium (KES)
            </label>
            <p className="text-xs text-muted-ink mb-2">
              Your estimated annual comprehensive vehicle insurance cost
            </p>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
              KES
            </span>
            <Input
              id="insurance"
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
              className="text-base pl-12 touch-manipulation"
              style={{
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
              } as React.CSSProperties}
            />
          </div>
          {insurancePremium === 0 && (
            <p className="text-xs text-red-500 font-medium">
              ⚠️ Please enter an insurance amount
            </p>
          )}
        </div>

        {/* Loan Period */}
        <div className="space-y-3">
          <div>
            <label htmlFor="months" className="text-base font-semibold text-ink block mb-1">
              Loan Period (Months)
            </label>
            <p className="text-xs text-muted-ink mb-2">
              How many months to repay (e.g., 1, 6, 12, 24, 36)
            </p>
          </div>
          <Input
            id="months"
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
            className="text-base touch-manipulation"
            style={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
            } as React.CSSProperties}
          />
          {months < 1 && (
            <p className="text-xs text-red-500 font-medium">
              ⚠️ Loan period must be at least 1 month
            </p>
          )}
        </div>
      </div>

      <Button
        type="button"
        onClick={onGenerate}
        disabled={isLoading || takeHome <= 0 || insurancePremium <= 0 || months < 1}
        className="w-full bg-peach text-indigo font-semibold hover:brightness-95 active:brightness-90 py-6 text-base touch-manipulation"
        style={{
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        } as React.CSSProperties}
      >
        {isLoading ? "Simulating..." : "Simulate Loan Schedule"}
        {!isLoading && <ArrowRight className="size-4 ml-2" />}
      </Button>

      {/* Info Box */}
      <div className="bg-indigo/5 rounded-lg p-4 border border-indigo/10">
        <p className="text-xs text-muted-ink leading-relaxed">
          <strong>How it works:</strong> Enter the amount you need (after fees), your insurance cost, and how long you want to repay. We'll show you the exact monthly payment, total interest, and full payment schedule.
        </p>
      </div>
    </div>
  );
}
