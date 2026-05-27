"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { LOAN_MIN_MONTHS, LOAN_MAX_MONTHS } from "@/lib/loan-config";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <div className="flex items-center gap-2">
          <label htmlFor="insurance" className="text-sm font-semibold text-ink">
            Comprehensive Insurance Premium
          </label>
          <Tooltip>
            <TooltipTrigger
              type="button"
              className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo/10 text-indigo hover:bg-indigo/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/30"
              aria-label="Information about comprehensive insurance premium"
            >
              <Info className="size-3" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              Enter the amount you normally pay for comprehensive insurance for your vehicle.
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="insurance"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 25000"
          value={insurancePremium || ""}
          onChange={(e) => {
            const val = Number(e.target.value);
            onInsurancePremiumChange(Math.max(0, val) || 0);
          }}
          min="0"
          step="1000"
          className="text-base"
        />
        {insurancePremium === 0 && (
          <p className="text-xs text-red-500 font-medium">
            Comprehensive insurance premium is required.
          </p>
        )}
        <p className="text-xs text-muted-ink">
          This helps calculate the total financing structure and required loan charges.
        </p>
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
        disabled={
          isLoading ||
          takeHome <= 0 ||
          insurancePremium <= 0 ||
          months < LOAN_MIN_MONTHS ||
          months > LOAN_MAX_MONTHS
        }
        className="mt-2 bg-indigo text-white hover:brightness-110"
      >
        {isLoading ? "Generating..." : "Generate Schedule"}
        {!isLoading && <ArrowRight className="size-4 ml-2" />}
      </Button>
    </div>
  );
}
