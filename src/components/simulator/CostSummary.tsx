"use client";

import { LoanSchedule, formatKES } from "@/lib/loan-calc";
import { LOAN_FEES_TOTAL } from "@/lib/loan-config";

export interface CostSummaryProps {
  schedule: LoanSchedule | null;
}

export function CostSummary({ schedule }: CostSummaryProps) {
  if (!schedule) {
    return null;
  }

  const items = [
    {
      label: "Loan amount",
      value: schedule.takeHome,
    },
    {
      label: "Insurance",
      value: schedule.insurancePremium,
    },
    {
      label: "Fees",
      value: LOAN_FEES_TOTAL,
    },
    {
      label: "Principal",
      value: schedule.principal,
      highlight: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-line bg-white p-4">
        <h3 className="text-sm font-semibold text-ink mb-3">Breakdown</h3>
        <div className="space-y-2 text-sm">
          {items.map((item) => (
            <div
              key={item.label}
              className={`flex justify-between ${item.highlight ? "font-semibold text-ink" : "text-muted-ink"}`}
            >
              <span>{item.label}</span>
              <span className={item.highlight ? "text-indigo" : ""}>
                {formatKES(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-indigo/5 p-4 border border-indigo/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">
            Monthly payment
          </p>
          <p className="text-2xl font-extrabold text-indigo">
            {formatKES(schedule.monthlyPayment)}
          </p>
        </div>

        <div className="rounded-xl bg-peach/10 p-4 border border-peach/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink mb-1">
            Total interest
          </p>
          <p className="text-2xl font-extrabold text-ink">
            {formatKES(schedule.totalInterest)}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-mesh p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
          Total repayment
        </p>
        <p className="text-3xl font-extrabold text-ink">
          {formatKES(schedule.totalRepayment)}
        </p>
        <p className="text-xs text-muted-ink mt-2">
          Over {schedule.months} month{schedule.months !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
