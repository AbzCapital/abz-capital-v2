"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { toast } from "sonner";
import { type LoanSchedule } from "@/lib/loan-calc";
import { formatKES } from "@/lib/loan-calc";
import { generatePDF } from "@/lib/pdf-generator";

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

export function SimulatorPageContent() {
  const [takeHome, setTakeHome] = useState(0);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [months, setMonths] = useState(1);
  const [schedule, setSchedule] = useState<LoanSchedule | null>(null);
  const [loanConfig, setLoanConfig] = useState<LoanConfigData | null>(null);

  // Fetch loan config on page load
  useEffect(() => {
    fetch("/api/loan-config")
      .then(res => res.json())
      .then(data => {
        setLoanConfig(data);
      })
      .catch(error => {
        console.error("Failed to fetch loan config:", error);
        toast.error("Failed to load loan configuration");
      });
  }, []);

  // Auto-calculate when values change
  useEffect(() => {
    if (!takeHome || !insurancePremium || !months || !loanConfig) {
      setSchedule(null);
      return;
    }

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
    } catch (error) {
      console.error("Error calculating schedule:", error);
      setSchedule(null);
    }
  }, [takeHome, insurancePremium, months, loanConfig]);

  const handleDownloadPDF = async () => {
    if (!schedule) return;
    try {
      await generatePDF(schedule);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF. Please try again.");
    }
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
              <h1 className="text-xl font-extrabold text-indigo">Loan Terms Simulator</h1>
              <p className="text-sm text-muted-ink">See your monthly payments & schedule</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 max-w-2xl">
        {/* Input Section */}
        <div className="space-y-6 sm:space-y-8 mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">Loan Terms Simulation</h2>
            <p className="text-sm sm:text-base text-muted-ink">
              Enter your details to see your loan summary and payment schedule.
            </p>
          </div>

          <div className="space-y-8">
            {/* Take Home Amount */}
            <div className="space-y-3">
              <label className="block">
                <span className="text-base font-semibold text-ink mb-1 block">Amount to Take Home (KES)</span>
                <p className="text-xs text-muted-ink mb-2">The net cash amount you need after all fees</p>
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
                      setTakeHome(num);
                    }}
                    className="w-full h-10 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>
              </label>
            </div>

            {/* Insurance Premium */}
            <div className="space-y-3">
              <label className="block">
                <span className="text-base font-semibold text-ink mb-1 block">Insurance Premium (KES)</span>
                <p className="text-xs text-muted-ink mb-2">Your estimated annual comprehensive vehicle insurance cost</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
                    KES
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 50000"
                    value={insurancePremium || ""}
                    onChange={(e) => {
                      const num = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0;
                      setInsurancePremium(num);
                    }}
                    className="w-full h-10 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>
              </label>
            </div>

            {/* Loan Period */}
            <div className="space-y-3">
              <label className="block">
                <span className="text-base font-semibold text-ink mb-1 block">Loan Period (Months)</span>
                <p className="text-xs text-muted-ink mb-2">How many months to repay (e.g., 1, 6, 12, 24, 36)</p>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 12"
                  value={months || ""}
                  onChange={(e) => {
                    const num = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1;
                    setMonths(Math.max(1, num));
                  }}
                  className="w-full h-10 px-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                />
              </label>
            </div>
          </div>

          <div className="bg-indigo/5 rounded-lg p-4 border border-indigo/10">
            <p className="text-xs text-muted-ink leading-relaxed">
              <strong>How it works:</strong> Enter your loan amount, insurance cost, and repayment period above. The loan summary and full payment schedule will appear below automatically.
            </p>
          </div>
        </div>

        {/* Loan Summary - Auto appears when all fields filled */}
        {schedule && (
          <>
            {/* Summary Cards */}
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Loan Summary</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg bg-indigo p-4 sm:p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-2">Loan Principal</p>
                  <p className="text-2xl sm:text-3xl font-bold">{formatKES(schedule.principal)}</p>
                </div>

                <div className="rounded-lg bg-peach p-4 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo/80 mb-2">Monthly Payment</p>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo">{formatKES(schedule.rows[0]?.monthlyPayment || 0)}</p>
                </div>

                <div className="rounded-lg bg-green-50 border border-green-200 p-4 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">Total Interest</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700">{formatKES(schedule.totalInterest)}</p>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">Total Repayment</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-700">{formatKES(schedule.totalRepayment)}</p>
                </div>
              </div>

              {/* Breakdown Details */}
              <div className="bg-white rounded-lg border border-line p-6 space-y-4">
                <h3 className="font-bold text-ink">Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Loan Amount:</span><span className="font-semibold">{formatKES(schedule.takeHome)}</span></div>
                  <div className="flex justify-between"><span>Insurance Premium:</span><span className="font-semibold">{formatKES(schedule.insurancePremium)}</span></div>
                  <div className="flex justify-between"><span>Total Fees:</span><span className="font-semibold">{formatKES(schedule.feesTotal)}</span></div>
                  <div className="border-t border-line pt-2 flex justify-between font-bold"><span>Principal:</span><span>{formatKES(schedule.principal)}</span></div>
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">Payment Schedule</h2>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo text-white font-semibold hover:brightness-110 active:brightness-95 touch-manipulation"
                  style={{ touchAction: "manipulation" } as React.CSSProperties}
                >
                  <Download className="size-4" />
                  Download PDF
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-line bg-white">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-indigo text-white sticky top-0">
                    <tr>
                      <th className="px-2 sm:px-3 py-3 text-center font-bold">Month</th>
                      <th className="px-2 sm:px-3 py-3 text-right font-bold">Outstanding Balance</th>
                      <th className="px-2 sm:px-3 py-3 text-right font-bold">Interest</th>
                      <th className="px-2 sm:px-3 py-3 text-right font-bold">Principal</th>
                      <th className="px-2 sm:px-3 py-3 text-right font-bold">Monthly Payment</th>
                      <th className="px-2 sm:px-3 py-3 text-right font-bold">New Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {schedule.rows.map((row, idx) => (
                      <tr key={row.month} className={idx % 2 === 0 ? "bg-white" : "bg-mesh"}>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold text-ink">{row.month}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink font-medium">{formatKES(row.outstandingBalance)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink font-medium">{formatKES(row.interest)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink font-medium">{formatKES(row.principal)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-ink font-bold">{formatKES(row.monthlyPayment)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-ink font-bold">{formatKES(row.newBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
