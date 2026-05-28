"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { toast } from "sonner";
import { type LoanSchedule } from "@/lib/loan-calc";
import { formatKES } from "@/lib/loan-calc";
import { generatePDF } from "@/lib/pdf-generator";

const LOAN_CONFIG = {
  valuationFee: 1500,
  legalFee: 1500,
  processingFeePercentage: 0.05,
  logbookTransferFee: 2500,
  trackerFee: 15000,
  monthlyRate: 0.06,
};

// Default calculation - display these results immediately
const DEFAULT_LOAN_VALUES = {
  takeHome: 500000,
  insurancePremium: 50000,
  months: 12,
};

function calculateSchedule(takeHome: number, insurancePremium: number, months: number): LoanSchedule {
  const processingFee = Math.round(takeHome * LOAN_CONFIG.processingFeePercentage);
  const feesTotal =
    LOAN_CONFIG.valuationFee +
    LOAN_CONFIG.legalFee +
    processingFee +
    LOAN_CONFIG.logbookTransferFee +
    LOAN_CONFIG.trackerFee;

  const principal = takeHome + insurancePremium + feesTotal;
  const fixedPrincipalPayment = principal / months;

  const rows = [];
  let outstandingBalance = principal;
  let totalInterestCharged = 0;

  for (let m = 1; m <= months; m++) {
    const interest = Math.round(outstandingBalance * LOAN_CONFIG.monthlyRate);
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

  return {
    takeHome,
    insurancePremium,
    feesTotal,
    principal,
    months,
    monthlyRate: LOAN_CONFIG.monthlyRate,
    fixedPrincipalPayment,
    totalRepayment: principal + totalInterestCharged,
    totalInterest: totalInterestCharged,
    rows,
  };
}

export function SimulatorPageContent() {
  const [takeHome, setTakeHome] = useState(DEFAULT_LOAN_VALUES.takeHome);
  const [insurancePremium, setInsurancePremium] = useState(DEFAULT_LOAN_VALUES.insurancePremium);
  const [months, setMonths] = useState(DEFAULT_LOAN_VALUES.months);
  const [schedule, setSchedule] = useState<LoanSchedule | null>(null);

  // Calculate on mount and whenever values change
  useEffect(() => {
    const result = calculateSchedule(takeHome, insurancePremium, months);
    setSchedule(result);
  }, [takeHome, insurancePremium, months]);

  const handleDownloadPDF = async () => {
    if (!schedule) return;
    try {
      await generatePDF(schedule);
      toast.success("PDF downloaded!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const handleCalculate = () => {
    const result = calculateSchedule(takeHome, insurancePremium, months);
    setSchedule(result);
    toast.success("Schedule calculated!");
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
              <p className="text-sm text-muted-ink">Calculate your loan payments & schedule</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 max-w-2xl">
        {/* Input Section */}
        <div className="mb-12 p-6 bg-white rounded-lg border border-line">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Enter Loan Details</h2>

          <div className="space-y-6">
            {/* Take Home Amount */}
            <div>
              <label className="block text-base font-semibold text-ink mb-2">
                Amount to Take Home (KES)
              </label>
              <p className="text-xs text-muted-ink mb-3">
                The net cash amount you need after all fees
              </p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium">
                  KES
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 500000"
                  value={takeHome}
                  onChange={(e) => setTakeHome(parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                  className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                />
              </div>
            </div>

            {/* Insurance Premium */}
            <div>
              <label className="block text-base font-semibold text-ink mb-2">
                Insurance Premium (KES)
              </label>
              <p className="text-xs text-muted-ink mb-3">
                Your estimated annual comprehensive vehicle insurance
              </p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium">
                  KES
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 50000"
                  value={insurancePremium}
                  onChange={(e) => setInsurancePremium(parseInt(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                  className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
                />
              </div>
            </div>

            {/* Loan Period */}
            <div>
              <label className="block text-base font-semibold text-ink mb-2">
                Loan Period (Months)
              </label>
              <p className="text-xs text-muted-ink mb-3">
                Number of months to repay (e.g. 1, 6, 12, 24, 36)
              </p>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 12"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
              />
            </div>

            {/* Calculate Button */}
            <div className="pt-4">
              <button
                onClick={handleCalculate}
                className="w-full h-12 bg-indigo text-white font-semibold rounded-lg hover:brightness-110 active:brightness-95 transition touch-manipulation"
              >
                Update Calculation
              </button>
            </div>
          </div>
        </div>

        {/* Results Section - Always visible with default values */}
        {schedule && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div>
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

              {/* Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <h3 className="font-bold text-ink">Fee Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">{formatKES(schedule.takeHome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Premium:</span>
                    <span className="font-semibold">{formatKES(schedule.insurancePremium)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Fees:</span>
                    <span className="font-semibold">{formatKES(schedule.feesTotal)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Principal:</span>
                    <span>{formatKES(schedule.principal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Schedule Table */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">Payment Schedule</h2>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo text-white font-semibold hover:brightness-110 active:brightness-95 transition touch-manipulation"
                >
                  <Download className="size-4" />
                  Download PDF
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-line">
                <table className="w-full text-xs sm:text-sm bg-white">
                  <thead className="bg-indigo text-white">
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
                      <tr key={row.month} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold">{row.month}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink">{formatKES(row.outstandingBalance)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink">{formatKES(row.interest)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink">{formatKES(row.principal)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right font-bold">{formatKES(row.monthlyPayment)}</td>
                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-right font-bold">{formatKES(row.newBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Apply Now CTA */}
            <div className="bg-peach rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-indigo mb-2">Ready to apply?</h3>
              <p className="text-sm text-muted-ink mb-4">Contact us to proceed with your loan application</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-2 bg-indigo text-white font-semibold rounded-lg hover:brightness-110 transition touch-manipulation"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
