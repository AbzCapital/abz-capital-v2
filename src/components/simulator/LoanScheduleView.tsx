"use client";

import { Button } from "@/components/ui/button";
import { LoanSchedule, formatKES } from "@/lib/loan-calc";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowLeft, Download, MessageSquare } from "lucide-react";
import { generatePDF } from "@/lib/pdf-generator";

export interface LoanScheduleViewProps {
  schedule: LoanSchedule;
  onBackToBreakdown: () => void;
}

export function LoanScheduleView({ schedule, onBackToBreakdown }: LoanScheduleViewProps) {
  const handleDownloadPDF = async () => {
    try {
      await generatePDF(schedule);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const applyMessage = `Hello, I am interested in a loan of "${formatKES(schedule.principal)}" with a payment period of "${schedule.months} month${schedule.months !== 1 ? "s" : ""}"`;
  const whatsappLink = whatsappUrl(applyMessage);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-1">Payment Schedule</h2>
        <p className="text-xs sm:text-sm text-muted-ink">
          Monthly installments calculated at 6% reducing balance interest rate
        </p>
      </div>

      {/* Amortization Table */}
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-indigo text-white sticky top-0">
            <tr>
              <th className="px-2 sm:px-3 py-3 text-center font-bold">Month</th>
              <th className="px-2 sm:px-3 py-3 text-right font-bold">Outstanding Balance</th>
              <th className="px-2 sm:px-3 py-3 text-right font-bold">Interest (6%)</th>
              <th className="px-2 sm:px-3 py-3 text-right font-bold">Principal</th>
              <th className="px-2 sm:px-3 py-3 text-right font-bold">Monthly Payment</th>
              <th className="px-2 sm:px-3 py-3 text-right font-bold">New Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {schedule.rows.map((row, idx) => (
              <tr
                key={row.month}
                className={idx % 2 === 0 ? "bg-white" : "bg-mesh"}
              >
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-center font-semibold text-ink">
                  {row.month}
                </td>
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink font-medium">
                  {formatKES(row.outstandingBalance)}
                </td>
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink font-medium">
                  {formatKES(row.interest)}
                </td>
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-muted-ink font-medium">
                  {formatKES(row.principal)}
                </td>
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-ink font-bold">
                  {formatKES(row.monthlyPayment)}
                </td>
                <td className="px-2 sm:px-3 py-2 sm:py-3 text-right text-ink font-bold">
                  {formatKES(row.newBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg bg-indigo p-4 sm:p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-2">
            Total Repayment
          </p>
          <p className="text-2xl sm:text-3xl font-bold">
            {formatKES(schedule.totalRepayment)}
          </p>
        </div>

        <div className="rounded-lg bg-peach p-4 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo/80 mb-2">
            Total Interest Paid
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-indigo">
            {formatKES(schedule.totalInterest)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4 border-t border-line">
        <Button
          variant="outline"
          onClick={handleDownloadPDF}
          className="w-full py-3 sm:py-2 text-sm sm:text-base"
        >
          <Download className="size-4 mr-2" />
          Download PDF Schedule
        </Button>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button
            className="w-full bg-indigo text-white hover:brightness-110 font-semibold py-3 sm:py-2 text-sm sm:text-base"
          >
            <MessageSquare className="size-4 mr-2" />
            Apply for This Loan
          </Button>
        </a>

        <Button
          variant="outline"
          onClick={onBackToBreakdown}
          className="w-full py-3 sm:py-2 text-sm sm:text-base"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Breakdown
        </Button>
      </div>
    </div>
  );
}
