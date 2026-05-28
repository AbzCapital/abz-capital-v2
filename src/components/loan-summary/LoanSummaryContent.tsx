"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { toast } from "sonner";
import { type LoanSchedule, formatKES } from "@/lib/loan-calc";
import { generatePDF } from "@/lib/pdf-generator";

const LOAN_CONFIG = {
  valuationFee: 1500,
  legalFee: 1500,
  processingFeePercentage: 0.05,
  logbookTransferFee: 2500,
  trackerFee: 15000,
  monthlyRate: 0.06,
};

export function LoanSummaryContent() {
  const searchParams = useSearchParams();
  const [schedule, setSchedule] = useState<LoanSchedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get parameters from URL
    const amount = parseInt(searchParams.get("amount") || "0") || 0;
    const insurance = parseInt(searchParams.get("insurance") || "0") || 0;
    const months = parseInt(searchParams.get("months") || "1") || 1;

    // Validate inputs
    if (amount <= 0 || insurance <= 0 || months < 1) {
      toast.error("Invalid loan parameters");
      setLoading(false);
      return;
    }

    // Calculate schedule
    try {
      const processingFee = Math.round(amount * LOAN_CONFIG.processingFeePercentage);
      const feesTotal =
        LOAN_CONFIG.valuationFee +
        LOAN_CONFIG.legalFee +
        processingFee +
        LOAN_CONFIG.logbookTransferFee +
        LOAN_CONFIG.trackerFee;

      const principal = amount + insurance + feesTotal;
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

      const result: LoanSchedule = {
        takeHome: amount,
        insurancePremium: insurance,
        feesTotal,
        principal,
        months,
        monthlyRate: LOAN_CONFIG.monthlyRate,
        fixedPrincipalPayment,
        totalRepayment: principal + totalInterestCharged,
        totalInterest: totalInterestCharged,
        rows,
      };

      setSchedule(result);
    } catch (error) {
      console.error("Calculation error:", error);
      toast.error("Failed to calculate schedule");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

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

  const handlePrint = () => {
    if (!schedule) return;
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-ink">Loading loan summary...</p>
        </div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-ink mb-4">No Loan Summary Found</h2>
          <p className="text-muted-ink mb-6">Please go back and enter your loan details first.</p>
          <Link
            href="/products"
            className="inline-block px-6 py-2 bg-indigo text-white font-semibold rounded-lg hover:brightness-110 transition"
          >
            Back to Products
          </Link>
        </Container>
      </div>
    );
  }

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
              <h1 className="text-xl font-extrabold text-indigo">Loan Summary</h1>
              <p className="text-sm text-muted-ink">Your repayment schedule</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 max-w-4xl pb-20">
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
                <span>Valuation Fee:</span>
                <span className="font-semibold">KES 1,500</span>
              </div>
              <div className="flex justify-between">
                <span>Legal Fee:</span>
                <span className="font-semibold">KES 1,500</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee (5%):</span>
                <span className="font-semibold">{formatKES(Math.round(schedule.takeHome * 0.05))}</span>
              </div>
              <div className="flex justify-between">
                <span>Logbook Transfer Fee:</span>
                <span className="font-semibold">KES 2,500</span>
              </div>
              <div className="flex justify-between">
                <span>Tracker Purchase Fee:</span>
                <span className="font-semibold">KES 15,000</span>
              </div>
              <div className="border-t border-line pt-2 flex justify-between font-bold">
                <span>Total Fees:</span>
                <span>{formatKES(schedule.feesTotal)}</span>
              </div>
              <div className="border-t border-line pt-2 flex justify-between font-bold text-indigo">
                <span>Total Principal:</span>
                <span>{formatKES(schedule.principal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Schedule Table */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">Payment Schedule</h2>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo text-white font-semibold hover:brightness-110 active:brightness-95 transition touch-manipulation text-sm"
              >
                <Download className="size-4" />
                Download PDF
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-ink font-semibold hover:brightness-95 active:brightness-90 transition touch-manipulation text-sm"
              >
                <Printer className="size-4" />
                Print
              </button>
            </div>
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

        {/* Apply CTA */}
        <div className="bg-peach rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-indigo mb-2">Ready to apply?</h3>
          <p className="text-sm text-muted-ink mb-4">Contact us to proceed with your loan application</p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-indigo text-white font-semibold rounded-lg hover:brightness-110 transition"
          >
            Apply Now
          </Link>
        </div>
      </Container>
    </>
  );
}
