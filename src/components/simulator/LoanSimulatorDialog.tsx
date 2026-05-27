"use client";

import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { calculateSchedule, type LoanSchedule, LoanInputError } from "@/lib/loan-calc";
import { LOAN_MIN_MONTHS } from "@/lib/loan-config";
import { toast } from "sonner";
import { InputsSection } from "./InputsSection";
import { LoanBreakdown } from "./LoanBreakdown";
import { LoanScheduleView } from "./LoanScheduleView";

export interface LoanSimulatorDialogProps {
  trigger: ReactNode;
}

type SimulatorStep = "input" | "breakdown" | "schedule";

export function LoanSimulatorDialog({ trigger }: LoanSimulatorDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<SimulatorStep>("input");
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

    if (insurancePremium <= 0) {
      toast.error("Comprehensive insurance premium is required");
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
      setStep("breakdown");
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

  const handleReset = () => {
    setStep("input");
    setSchedule(null);
  };

  const handleGoToSchedule = () => {
    setStep("schedule");
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        handleReset();
      }
    }}>
      <div onClick={() => setOpen(true)}>
        {trigger}
      </div>

      <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl max-h-[95vh] overflow-y-auto p-3 sm:p-4 md:p-6">
        <DialogHeader>
          <DialogTitle>Loan Terms Simulation</DialogTitle>
        </DialogHeader>

        {step === "input" && (
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
        )}

        {step === "breakdown" && schedule && (
          <LoanBreakdown
            schedule={schedule}
            onBackToInput={handleReset}
            onViewSchedule={handleGoToSchedule}
          />
        )}

        {step === "schedule" && schedule && (
          <LoanScheduleView
            schedule={schedule}
            onBackToBreakdown={() => setStep("breakdown")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
