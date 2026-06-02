"use client";

import { LoanSchedule, formatKES } from "@/lib/loan-calc";

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
      label: "Comprehensive Insurance Premium",
      value: schedule.insurancePremium,
    },
    {
      label: "Fees",
      value: schedule.feesTotal,
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
              <span className={item.highlight ? "text-blue-500" : ""}>
                {formatKES(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-500/5 p-4 border border-blue-500/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-1">
            Fixed Principal
          </p>
          <p className="text-2xl font-extrabold text-blue-500">
            {formatKES(schedule.fixedPrincipalPayment)}
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
