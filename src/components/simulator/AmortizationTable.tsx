"use client";

import { LoanSchedule, formatKESCompact } from "@/lib/loan-calc";

export interface AmortizationTableProps {
  schedule: LoanSchedule | null;
}

export function AmortizationTable({ schedule }: AmortizationTableProps) {
  if (!schedule || schedule.rows.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-ink">Amortization Schedule</h3>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-indigo/5">
              <th className="px-3 py-2.5 text-left font-semibold text-ink">Month</th>
              <th className="px-3 py-2.5 text-right font-semibold text-ink">Payment</th>
              <th className="px-3 py-2.5 text-right font-semibold text-ink">Principal</th>
              <th className="px-3 py-2.5 text-right font-semibold text-ink">Interest</th>
              <th className="px-3 py-2.5 text-right font-semibold text-ink">Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.rows.map((row) => (
              <tr
                key={row.month}
                className="border-b border-line/50 hover:bg-indigo/2.5 transition"
              >
                <td className="px-3 py-2 text-ink font-medium">{row.month}</td>
                <td className="px-3 py-2 text-right text-ink font-semibold">
                  {formatKESCompact(row.payment)}
                </td>
                <td className="px-3 py-2 text-right text-muted-ink">
                  {formatKESCompact(row.principal)}
                </td>
                <td className="px-3 py-2 text-right text-muted-ink">
                  {formatKESCompact(row.interest)}
                </td>
                <td className="px-3 py-2 text-right font-semibold text-indigo">
                  {formatKESCompact(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
