"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { toast } from "sonner";
import { type LoanSchedule, LoanInputError } from "@/lib/loan-calc";
import { InputsSection } from "./InputsSection";
import { LoanBreakdown } from "./LoanBreakdown";
import { LoanScheduleView } from "./LoanScheduleView";

interface LoanConfigData {
  valuationFee: number;
  legalFee: number;
  processingFeePercentage: number;
  logbookTransferFee: number;
  trackerFee: number;
  monthlyRate: number;
  minMonths: number;
  maxMonths: number;
}

type SimulatorStep = "input" | "breakdown" | "schedule";

export function SimulatorPageContent() {
  const [step, setStep] = useState<SimulatorStep>("input");
  const [takeHome, setTakeHome] = useState(0);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [months, setMonths] = useState(1);
  const [schedule, setSchedule] = useState<LoanSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loanConfig, setLoanConfig] = useState<LoanConfigData | null>(null);

  // Fetch loan config on page load
  useEffect(() => {
    fetch("/api/loan-config")
      .then(res => res.json())
      .then(data => {
        setLoanConfig(data);
        setMonths(data.minMonths || 1);
      })
      .catch(error => {
        console.error("Failed to fetch loan config:", error);
        toast.error("Failed to load loan configuration");
      });
  }, []);

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
      const processingFee = Math.round(takeHome * loanConfig.processingFeePercentage);
      const feesTotal =
        loanConfig.valuationFee +
        loanConfig.legalFee +
        processingFee +
        loanConfig.logbookTransferFee +
        loanConfig.trackerFee;

      const principal = takeHome + insurancePremium + feesTotal;
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
    setTakeHome(0);
    setInsurancePremium(0);
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
              <h1 className="text-xl font-extrabold text-indigo">Loan Calculator</h1>
              <p className="text-sm text-muted-ink">Calculate your loan terms instantly</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 max-w-2xl">
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
            onViewSchedule={() => setStep("schedule")}
          />
        )}

        {step === "schedule" && schedule && (
          <LoanScheduleView
            schedule={schedule}
            onBackToBreakdown={() => setStep("breakdown")}
          />
        )}
      </Container>

      {/* Footer CTA */}
      {step === "breakdown" && schedule && (
        <div className="bg-indigo/5 border-t border-line mt-12 py-8">
          <Container className="text-center">
            <h2 className="text-xl font-extrabold text-indigo mb-2">Ready to apply?</h2>
            <p className="text-muted-ink mb-4">Get started with your loan application today</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-indigo px-6 py-3 text-sm font-semibold text-white shadow-button transition hover:brightness-110 active:brightness-95 touch-manipulation"
              style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties}
            >
              Apply Now
            </a>
          </Container>
        </div>
      )}
    </>
  );
}
