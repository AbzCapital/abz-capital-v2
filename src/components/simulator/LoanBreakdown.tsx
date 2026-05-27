"use client";

import { Button } from "@/components/ui/button";
import { LoanSchedule, formatKES } from "@/lib/loan-calc";
import { LOAN_FEES, LOAN_PROCESSING_FEE_PERCENTAGE, LOAN_MONTHLY_RATE } from "@/lib/loan-config";
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
      {/* Main Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Loan Summary</h3>

        {/* Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-indigo text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Item</th>
                <th className="px-4 py-3 text-right font-semibold">Amount (KES)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-ink">Amount to Take Home</td>
                <td className="px-4 py-3 text-right text-ink font-medium">
                  {formatKES(schedule.takeHome)}
                </td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="px-4 py-3 text-ink">Comprehensive Insurance Premium</td>
                <td className="px-4 py-3 text-right text-ink font-medium">
                  {formatKES(schedule.insurancePremium)}
                </td>
              </tr>
              <tr className="bg-mesh hover:bg-gray-100">
                <td colSpan={2} className="px-4 py-2">
                  <div className="text-xs text-muted-ink font-semibold uppercase tracking-wide">Loan Charges</div>
                </td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="pl-8 pr-4 py-2 text-muted-ink">Car Valuation Fee</td>
                <td className="px-4 py-2 text-right text-muted-ink">
                  {formatKES(LOAN_FEES.valuation)}
                </td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="pl-8 pr-4 py-2 text-muted-ink">Legal Fee</td>
                <td className="px-4 py-2 text-right text-muted-ink">
                  {formatKES(LOAN_FEES.legal)}
                </td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="pl-8 pr-4 py-2 text-muted-ink">Loan Processing Fee (5%)</td>
                <td className="px-4 py-2 text-right text-muted-ink">
                  {formatKES(processingFee)}
                </td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="pl-8 pr-4 py-2 text-muted-ink">Logbook Transfer Fee</td>
                <td className="px-4 py-2 text-right text-muted-ink">
                  {formatKES(LOAN_FEES.logbookTransfer)}
                </td>
              </tr>
              <tr className="bg-white hover:bg-gray-50">
                <td className="pl-8 pr-4 py-2 text-muted-ink">Car Tracker Purchase Fee</td>
                <td className="px-4 py-2 text-right text-muted-ink">
                  {formatKES(LOAN_FEES.tracker)}
                </td>
              </tr>
              <tr className="bg-peach/10">
                <td className="px-4 py-3 font-semibold text-ink">Total Charges</td>
                <td className="px-4 py-3 text-right font-semibold text-ink">
                  {formatKES(schedule.feesTotal)}
                </td>
              </tr>
              <tr className="bg-indigo/5">
                <td className="px-4 py-4 font-bold text-indigo">Net Loan Amount</td>
                <td className="px-4 py-4 text-right font-bold text-indigo text-lg">
                  {formatKES(schedule.principal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg bg-indigo/5 p-4 border border-indigo/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
            Interest Rate
          </p>
          <p className="text-lg font-bold text-indigo">
            {(LOAN_MONTHLY_RATE * 100).toFixed(0)}% per month
          </p>
          <p className="text-xs text-muted-ink mt-1">Reducing balance</p>
        </div>

        <div className="rounded-lg bg-peach/10 p-4 border border-peach/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink mb-2">
            Loan Period
          </p>
          <p className="text-lg font-bold text-ink">
            {schedule.months} month{schedule.months !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="rounded-lg bg-mesh p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-2">
            Monthly Instalment
          </p>
          <p className="text-lg font-bold text-ink">
            {formatKES(schedule.monthlyPayment)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-line">
        <Button
          variant="outline"
          onClick={onBackToInput}
          className="flex-1"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Input
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
