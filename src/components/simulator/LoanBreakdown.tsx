"use client";

import { Button } from "@/components/ui/button";
import { LoanSchedule, formatKES } from "@/lib/loan-calc";
import { LOAN_FEES, LOAN_PROCESSING_FEE_PERCENTAGE } from "@/lib/loan-config";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface LoanBreakdownProps {
  schedule: LoanSchedule;
  onBackToInput: () => void;
  onViewSchedule: () => void;
}

export function LoanBreakdown({ schedule, onBackToInput, onViewSchedule }: LoanBreakdownProps) {
  const processingFee = schedule.takeHome * LOAN_PROCESSING_FEE_PERCENTAGE;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink mb-1">Loan Summary</h2>
        <p className="text-sm text-muted-ink">How your total loan amount is calculated</p>
      </div>

      {/* Breakdown Table */}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-indigo text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Item</th>
              <th className="px-4 py-3 text-right font-semibold">Amount (KES)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            <tr className="bg-white">
              <td className="px-4 py-3 text-ink font-medium">Amount to Take Home</td>
              <td className="px-4 py-3 text-right text-ink font-semibold">
                {formatKES(schedule.takeHome)}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 text-ink font-medium">Comprehensive Insurance Premium</td>
              <td className="px-4 py-3 text-right text-ink font-semibold">
                {formatKES(schedule.insurancePremium)}
              </td>
            </tr>
            <tr className="bg-mesh">
              <td colSpan={2} className="px-4 py-2">
                <div className="text-xs text-muted-ink font-bold uppercase tracking-wide">Loan Charges</div>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="pl-8 pr-4 py-2 text-muted-ink text-sm">Car Valuation Fee</td>
              <td className="px-4 py-2 text-right text-muted-ink font-medium">
                {formatKES(LOAN_FEES.valuation)}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="pl-8 pr-4 py-2 text-muted-ink text-sm">Legal Fee</td>
              <td className="px-4 py-2 text-right text-muted-ink font-medium">
                {formatKES(LOAN_FEES.legal)}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="pl-8 pr-4 py-2 text-muted-ink text-sm">Loan Processing Fee (5%)</td>
              <td className="px-4 py-2 text-right text-muted-ink font-medium">
                {formatKES(processingFee)}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="pl-8 pr-4 py-2 text-muted-ink text-sm">Logbook Transfer Fee</td>
              <td className="px-4 py-2 text-right text-muted-ink font-medium">
                {formatKES(LOAN_FEES.logbookTransfer)}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="pl-8 pr-4 py-2 text-muted-ink text-sm">Car Tracker Purchase Fee</td>
              <td className="px-4 py-2 text-right text-muted-ink font-medium">
                {formatKES(LOAN_FEES.tracker)}
              </td>
            </tr>
            <tr className="bg-peach/10">
              <td className="px-4 py-3 font-bold text-ink">Total Charges</td>
              <td className="px-4 py-3 text-right font-bold text-ink text-base">
                {formatKES(schedule.feesTotal)}
              </td>
            </tr>
            <tr className="bg-indigo text-white">
              <td className="px-4 py-4 font-bold">Net Loan Amount</td>
              <td className="px-4 py-4 text-right font-bold text-lg">
                {formatKES(schedule.principal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-line">
        <Button
          variant="outline"
          onClick={onBackToInput}
          className="flex-1"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onViewSchedule}
          className="flex-1 bg-indigo text-white hover:brightness-110"
        >
          View Payment Schedule
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
