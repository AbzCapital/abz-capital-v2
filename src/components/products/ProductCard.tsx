"use client";

import { useState } from "react";
import Image from "next/image";
import { Calculator, Mail } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/product-catalog";
import { PRODUCT_WA_MESSAGES, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/WhatsAppButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputsSection } from "@/components/simulator/InputsSection";
import { LoanBreakdown } from "@/components/simulator/LoanBreakdown";
import { LoanScheduleView } from "@/components/simulator/LoanScheduleView";
import { type LoanSchedule, LoanInputError } from "@/lib/loan-calc";
import { toast } from "sonner";

export interface ProductCardProps {
  product: Product;
  category: ProductCategory;
}

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

export function ProductCard({ product, category }: ProductCardProps) {
  const mailto = buildMailto(category.emailRecipient, product.title);
  const waMessage = PRODUCT_WA_MESSAGES.product(product.title);

  // Loan Simulator State
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState<"input" | "breakdown" | "schedule">("input");
  const [takeHome, setTakeHome] = useState(0);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [months, setMonths] = useState(1);
  const [schedule, setSchedule] = useState<LoanSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loanConfig, setLoanConfig] = useState<LoanConfigData | null>(null);

  const handleSimulatorOpen = () => {
    setSimulatorOpen(true);
    // Fetch loan config
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
      setSimulatorStep("breakdown");
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

  const handleSimulatorClose = () => {
    setSimulatorOpen(false);
    setSimulatorStep("input");
    setSchedule(null);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-1 hover:border-indigo/30 hover:shadow-elev">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-indigo/5">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo backdrop-blur">
          {product.termLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-tight text-ink">
          {product.title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed text-muted-ink"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {product.highlights && product.highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="rounded-full bg-indigo/5 px-2.5 py-1 text-[11px] font-semibold text-indigo"
                dangerouslySetInnerHTML={{ __html: h }}
              />
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-2 w-full">
          {product.hasSimulator && (
            <button
              type="button"
              onClick={handleSimulatorOpen}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-peach bg-peach px-3 py-3 text-xs sm:text-sm font-semibold text-indigo transition active:brightness-95 touch-manipulation"
              style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties}
            >
              <Calculator className="size-4" />
              Simulate
            </button>
          )}
          <a
            href={mailto}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo px-3 py-3 text-xs sm:text-sm font-semibold text-white transition active:brightness-95 touch-manipulation"
            style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties}
          >
            <Mail className="size-4" />
            Email
          </a>
          <a
            href={whatsappUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[color:var(--color-whatsapp)] px-3 py-3 text-xs sm:text-sm font-semibold text-white transition active:brightness-90 touch-manipulation"
            style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties}
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>

        {/* Loan Simulator Dialog */}
        <Dialog open={simulatorOpen} onOpenChange={handleSimulatorClose}>
          <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl max-h-[95vh] overflow-y-auto p-3 sm:p-4 md:p-6">
            <DialogHeader>
              <DialogTitle>Loan Terms Simulation</DialogTitle>
            </DialogHeader>

            {simulatorStep === "input" && (
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

            {simulatorStep === "breakdown" && schedule && (
              <LoanBreakdown
                schedule={schedule}
                onBackToInput={() => setSimulatorStep("input")}
                onViewSchedule={() => setSimulatorStep("schedule")}
              />
            )}

            {simulatorStep === "schedule" && schedule && (
              <LoanScheduleView
                schedule={schedule}
                onBackToBreakdown={() => setSimulatorStep("breakdown")}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}

function buildMailto(recipient: string, productTitle: string): string {
  const subject = encodeURIComponent(`Enquiry — ${productTitle}`);
  const body = encodeURIComponent(
    `Hello ABZ Capital,\n\nI'd like more information about ${productTitle}.\n\nName:\nPhone:\nNotes:\n\nThank you.`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export default ProductCard;
