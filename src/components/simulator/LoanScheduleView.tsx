"use client";

import { Button } from "@/components/ui/button";
import { LoanSchedule, formatKES } from "@/lib/loan-calc";
import { whatsappUrl } from "@/lib/whatsapp";
import { ArrowLeft, Download, MessageSquare } from "lucide-react";

export interface LoanScheduleViewProps {
  schedule: LoanSchedule;
  onBackToBreakdown: () => void;
}

export function LoanScheduleView({ schedule, onBackToBreakdown }: LoanScheduleViewProps) {
  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation and download
    alert("PDF download coming soon");
  };

  const applyMessage = `Hello, I am interested in a loan of "${formatKES(schedule.principal)}" with a payment period of "${schedule.months} month${schedule.months !== 1 ? "s" : ""}"`;
  const whatsappLink = whatsappUrl(applyMessage);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-ink">Repayment Schedule</h3>
        <p className="text-sm text-muted-ink">
          Interest is charged monthly on the remaining loan balance at {(schedule.monthlyRate * 100).toFixed(0)}% per month.
        </p>
      </div>

      {/* Amortization Table */}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-indigo text-white">
            <tr>
              <th className="px-3 py-3 text-center font-semibold">Month</th>
              <th className="px-3 py-3 text-right font-semibold">Loan Balance</th>
              <th className="px-3 py-3 text-right font-semibold">Interest (6%)</th>
              <th className="px-3 py-3 text-right font-semibold">Principal</th>
              <th className="px-3 py-3 text-right font-semibold">Monthly Instalment</th>
              <th className="px-3 py-3 text-right font-semibold">Remaining Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {schedule.rows.map((row, idx) => (
              <tr
                key={row.month}
                className={idx % 2 === 0 ? "bg-white" : "bg-mesh hover:bg-gray-100"}
              >
                <td className="px-3 py-3 text-center font-semibold text-ink">
                  {row.month}
                </td>
                <td className="px-3 py-3 text-right text-muted-ink">
                  {formatKES(row.balance + row.principal)}
                </td>
                <td className="px-3 py-3 text-right text-muted-ink">
                  {formatKES(row.interest)}
                </td>
                <td className="px-3 py-3 text-right text-muted-ink">
                  {formatKES(row.principal)}
                </td>
                <td className="px-3 py-3 text-right font-semibold text-ink">
                  {formatKES(row.payment)}
                </td>
                <td className="px-3 py-3 text-right font-semibold text-ink">
                  {formatKES(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-indigo p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-90 mb-2">
            Total Repayment
          </p>
          <p className="text-3xl font-bold">
            {formatKES(schedule.totalRepayment)}
          </p>
        </div>

        <div className="rounded-lg bg-peach p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-90 mb-2">
            Total Interest Paid
          </p>
          <p className="text-3xl font-bold">
            {formatKES(schedule.totalInterest)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4 border-t border-line">
        <Button
          variant="outline"
          onClick={handleDownloadPDF}
          className="w-full"
        >
          <Download className="size-4 mr-2" />
          Download PDF Schedule
        </Button>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button
            className="w-full bg-indigo text-white hover:brightness-110"
          >
            <MessageSquare className="size-4 mr-2" />
            Apply for This Loan
          </Button>
        </a>

        <Button
          variant="outline"
          onClick={onBackToBreakdown}
          className="w-full"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Breakdown
        </Button>
      </div>
    </div>
  );
}
