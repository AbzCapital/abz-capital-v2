"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LOAN_MIN_MONTHS, LOAN_MAX_MONTHS } from "@/lib/loan-config";

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
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="takeHome" className="text-sm font-semibold text-ink">
          Loan amount (Take-home)
        </label>
        <Input
          id="takeHome"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 500000"
          value={takeHome || ""}
          onChange={(e) => onTakeHomeChange(Number(e.target.value) || 0)}
          min="0"
          step="1000"
          className="text-base"
        />
        <p className="text-xs text-muted-ink">The net loan amount you need</p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="insurance" className="text-sm font-semibold text-ink">
          Insurance premium (optional)
        </label>
        <Input
          id="insurance"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 0"
          value={insurancePremium || ""}
          onChange={(e) => onInsurancePremiumChange(Number(e.target.value) || 0)}
          min="0"
          step="1000"
          className="text-base"
        />
        <p className="text-xs text-muted-ink">Loan protection insurance (optional)</p>
      </div>

      <div className="grid gap-2">
        <label htmlFor="months" className="text-sm font-semibold text-ink">
          Repayment period
        </label>
        <div className="flex gap-2">
          <Input
            id="months"
            type="number"
            inputMode="numeric"
            placeholder="1"
            value={months || ""}
            onChange={(e) => onMonthsChange(Number(e.target.value) || 1)}
            min={LOAN_MIN_MONTHS}
            max={LOAN_MAX_MONTHS}
            step="1"
            className="text-base"
          />
          <span className="flex items-center text-sm font-medium text-muted-ink">
            months
          </span>
        </div>
        <p className="text-xs text-muted-ink">
          {LOAN_MIN_MONTHS}–{LOAN_MAX_MONTHS} months
        </p>
      </div>

      <Button
        type="button"
        onClick={onGenerate}
        disabled={isLoading || takeHome <= 0 || months < LOAN_MIN_MONTHS || months > LOAN_MAX_MONTHS}
        className="mt-2 bg-indigo text-white hover:brightness-110"
      >
        {isLoading ? "Generating..." : "Generate Schedule"}
        {!isLoading && <ArrowRight className="size-4 ml-2" />}
      </Button>
    </div>
  );
}
