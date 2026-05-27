"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Info } from "lucide-react";
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
  minMonths?: number;
  maxMonths?: number;
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
  minMonths = 1,
  maxMonths = 12,
}: InputsSectionProps) {
  const monthOptions = Array.from(
    { length: maxMonths - minMonths + 1 },
    (_, i) => minMonths + i
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">Loan Terms Simulation</h2>
        <p className="text-sm sm:text-base text-muted-ink">
          Estimate your loan amount, applicable charges, and repayment schedule instantly.
        </p>
      </div>

      <div className="space-y-6">
        {/* Take Home Amount */}
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="takeHome" className="text-base font-semibold text-ink">
              Amount to Take Home
            </label>
            <Tooltip>
              <TooltipTrigger
                type="button"
                className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo/10 text-indigo hover:bg-indigo/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/30"
                aria-label="Information about amount to take home"
              >
                <Info className="size-3" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                Enter the net amount you need after all loan charges are deducted.
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium">
              KES
            </span>
            <Input
              id="takeHome"
              type="number"
              inputMode="numeric"
              placeholder="e.g. 500000"
              value={takeHome || ""}
              onChange={(e) => onTakeHomeChange(Number(e.target.value) || 0)}
              min="0"
              step="1000"
              className="text-base pl-12"
            />
          </div>
          <p className="text-xs text-muted-ink">
            The net loan amount you need
          </p>
        </div>

        {/* Insurance Premium */}
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="insurance" className="text-base font-semibold text-ink">
              Insurance Premium
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
                On average, how much do you currently pay for comprehensive vehicle insurance annually?
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium">
              KES
            </span>
            <Input
              id="insurance"
              type="number"
              inputMode="numeric"
              placeholder="Enter insurance amount"
              value={insurancePremium || ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                onInsurancePremiumChange(Math.max(0, val) || 0);
              }}
              min="0"
              step="1000"
              className="text-base pl-12"
            />
          </div>
          {insurancePremium === 0 && (
            <p className="text-xs text-red-500 font-medium">
              Comprehensive insurance premium is required.
            </p>
          )}
          <p className="text-xs text-muted-ink">
            Enter your estimated comprehensive insurance premium amount.
          </p>
        </div>

        {/* Loan Period */}
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="months" className="text-base font-semibold text-ink">
              Loan Period
            </label>
            <Tooltip>
              <TooltipTrigger
                type="button"
                className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo/10 text-indigo hover:bg-indigo/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/30"
                aria-label="Information about loan period"
              >
                <Info className="size-3" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                Select how long you would like to repay the loan.
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={months.toString()}
            onValueChange={(val) => onMonthsChange(Number(val))}
          >
            <SelectTrigger id="months" className="text-base">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((m) => (
                <SelectItem key={m} value={m.toString()}>
                  {m} month{m !== 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-ink">
            Select how long you would like to repay the loan.
          </p>
        </div>
      </div>

      <Button
        type="button"
        onClick={onGenerate}
        disabled={
          isLoading ||
          takeHome <= 0 ||
          insurancePremium <= 0 ||
          months < minMonths ||
          months > maxMonths
        }
        className="w-full bg-peach text-indigo font-semibold hover:brightness-95 py-6 text-base"
      >
        {isLoading ? "Simulating..." : "Simulate Loan Schedule"}
        {!isLoading && <ArrowRight className="size-4 ml-2" />}
      </Button>
    </div>
  );
}
