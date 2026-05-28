"use client";

import { useState, ReactNode, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type LoanSchedule, LoanInputError } from "@/lib/loan-calc";
import { toast } from "sonner";
import { InputsSection } from "./InputsSection";
import { LoanBreakdown } from "./LoanBreakdown";
import { LoanScheduleView } from "./LoanScheduleView";

export interface LoanSimulatorDialogProps {
  trigger: ReactNode;
}

type SimulatorStep = "input" | "breakdown" | "schedule";

export interface LoanConfigData {
  valuationFee: number;
  legalFee: number;
  processingFeePercentage: number;
  logbookTransferFee: number;
  trackerFee: number;
  monthlyRate: number;
  minMonths: number;
  maxMonths: number;
}

export function LoanSimulatorDialog({ trigger }: LoanSimulatorDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<SimulatorStep>("input");
  const [takeHome, setTakeHome] = useState(0);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [months, setMonths] = useState(1);
  const [schedule, setSchedule] = useState<LoanSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loanConfig, setLoanConfig] = useState<LoanConfigData | null>(null);

  // Fetch loan config when dialog opens
  useEffect(() => {
    if (!open) return;

    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/loan-config");
        const data = await response.json();
        setLoanConfig(data);
        setMonths(data.minMonths || 1);
      } catch (error) {
        console.error("Failed to fetch loan config:", error);
        toast.error("Failed to load loan configuration");
      }
    };

    fetchConfig();
  }, [open]);

  const handleOpenDialog = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpen(true);
  };

  const handleGenerate = async () => {
    if (takeHome <= 0) {
      toast.error("Please enter a loan amount");
      return;
    }

    if (insurancePremium <= 0) {
      toast.error("Comprehensive insurance premium is required");
      return;
    }

    if (!loanConfig) {
      toast.error("Loan configuration not loaded");
      return;
    }

    setIsLoading(true);
    try {
      // Calculate fees using database config
      const processingFee = Math.round(takeHome * loanConfig.processingFeePercentage);
      const feesTotal =
        loanConfig.valuationFee +
        loanConfig.legalFee +
        processingFee +
        loanConfig.logbookTransferFee +
        loanConfig.trackerFee;

      const principal = takeHome + insurancePremium + feesTotal;

      // Fixed principal payment each month (reducing balance method)
      const fixedPrincipalPayment = principal / months;

      const rows = [];
      let outstandingBalance = principal;
      let totalInterestCharged = 0;

      for (let m = 1; m <= months; m++) {
        const interest = Math.round(outstandingBalance * loanConfig.monthlyRate);
        const principalPayment = fixedPrincipalPayment;
        const monthlyPayment = interest + principalPayment;
        const newBalance = Math.max(0, outstandingBalance - principalPayment);

        totalInterestCharged += interest;

        rows.push({
          month: m,
          outstandingBalance: Math.round(outstandingBalance),
          interest,
          principal: Math.round(principalPayment),
          monthlyPayment: Math.round(monthlyPayment),
          newBalance: Math.round(newBalance),
        });

        outstandingBalance = newBalance;
      }

      const result: LoanSchedule = {
        takeHome,
        insurancePremium,
        feesTotal,
        principal,
        months,
        monthlyRate: loanConfig.monthlyRate,
        fixedPrincipalPayment,
        totalRepayment: principal + totalInterestCharged,
        totalInterest: totalInterestCharged,
        rows,
      };

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
      <div
        onPointerDown={handleOpenDialog}
        onClick={handleOpenDialog}
        onTouchEnd={handleOpenDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleOpenDialog();
          }
        }}
        className="cursor-pointer inline-block"
        style={{
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          pointerEvents: "auto",
          WebkitUserSelectNone: "none"
        } as React.CSSProperties}
      >
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
