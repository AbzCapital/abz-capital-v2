"use client";

import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { calculateSchedule, type LoanSchedule, LoanInputError } from "@/lib/loan-calc";
import { LOAN_MIN_MONTHS } from "@/lib/loan-config";
import { toast } from "sonner";
import { InputsSection } from "./InputsSection";
import { CostSummary } from "./CostSummary";
import { AmortizationTable } from "./AmortizationTable";

export interface LoanSimulatorDialogProps {
  trigger: ReactNode;
}

export function LoanSimulatorDialog({ trigger }: LoanSimulatorDialogProps) {
  const [open, setOpen] = useState(false);
  const [takeHome, setTakeHome] = useState(0);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [months, setMonths] = useState(LOAN_MIN_MONTHS);
  const [schedule, setSchedule] = useState<LoanSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (takeHome <= 0) {
      toast.error("Please enter a loan amount");
      return;
    }

    setIsLoading(true);
    try {
      const result = calculateSchedule({
        takeHome,
        insurancePremium,
        months,
      });
      setSchedule(result);
      toast.success("Schedule generated");
    } catch (error) {
      if (error instanceof LoanInputError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to generate schedule");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="contents"
      >
        {trigger}
      </button>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Loan Calculator</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <InputsSection
              takeHome={takeHome}
              insurancePremium={insurancePremium}
              months={months}
              onTakeHomeChange={setTakeHome}
              onInsurancePremiumChange={setInsurancePremium}
              onMonthsChange={setMonths}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>

          <div className="space-y-4">
            {schedule && (
              <>
                <CostSummary schedule={schedule} />
              </>
            )}
            {!schedule && (
              <div className="rounded-xl border border-dashed border-line bg-mesh p-6 text-center">
                <p className="text-sm text-muted-ink">
                  Enter your loan details and generate a schedule to see the breakdown.
                </p>
              </div>
            )}
          </div>
        </div>

        {schedule && (
          <div className="mt-4 border-t border-line pt-4">
            <AmortizationTable schedule={schedule} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
