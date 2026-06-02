"use client";

import { SAMPLE_LOAN } from "@/lib/invest/sampleLoanData";

interface InvestorAlertDisplayProps {
  onClose: () => void;
}

export function InvestorAlertDisplay({ onClose }: InvestorAlertDisplayProps) {
  return (
    <>
      {/* Alert Display Section */}
      <div className="my-12 mx-auto max-w-4xl px-4">
        <div className="rounded-3xl bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-700 p-6 sm:p-8 text-white">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✓</div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  Loan {SAMPLE_LOAN.loanId} Approved
                </h2>
                <p className="text-xs opacity-90">Ready for Funding</p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-white hover:opacity-80 transition p-2 cursor-pointer text-2xl leading-none"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-sm font-bold text-green-700">
                {SAMPLE_LOAN.statusLabel}
              </span>
              <span className="text-xs text-muted-ink">Loan status verified and approved</span>
            </div>

            {/* Details Grid */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                  Client ID
                </p>
                <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.clientId}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                  Security / Collateral
                </p>
                <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.security}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                  Occupation
                </p>
                <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.occupation}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                  Collateral Value
                </p>
                <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.collateralValue}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                  Loan Amount
                </p>
                <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.loanAmount}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                  Monthly Returns
                </p>
                <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.monthlyPayment}</p>
              </div>
            </div>

            {/* Returns Section */}
            <div className="rounded-2xl bg-blue-700/10 border border-blue-700/20 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-ink mb-6">
                Your Investor Returns
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-ink mb-1">Monthly Payment</p>
                    <p className="text-2xl sm:text-3xl font-bold text-ink">
                      {SAMPLE_LOAN.monthlyPayment}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-ink mb-1">Per Month</p>
                    <p className="text-lg font-bold text-blue-700">+{SAMPLE_LOAN.returnPerMonth}</p>
                  </div>
                </div>

                <div className="h-px bg-blue-700/20" />

                <div>
                  <p className="text-sm text-muted-ink mb-3">
                    Total Returns Over {SAMPLE_LOAN.loanTerm}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-ink">Total Repayment</span>
                      <span className="font-bold text-ink">{SAMPLE_LOAN.totalRepayment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-ink">Loan Principal</span>
                      <span className="font-bold text-ink">{SAMPLE_LOAN.loanAmount}</span>
                    </div>
                    <div className="h-px bg-blue-700/20 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-blue-700">Your Total Return</span>
                      <span className="text-xl font-extrabold text-blue-700">
                        {SAMPLE_LOAN.investorReturn}
                      </span>
                    </div>
                    <p className="text-xs text-muted-ink mt-2">
                      {SAMPLE_LOAN.returnPercentage} return on capital deployed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 sm:p-6">
              <p className="text-sm text-blue-900">
                <span className="font-bold">📧 {SAMPLE_LOAN.notificationMessage}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                className="flex-1 rounded-xl bg-blue-700 px-6 py-4 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 cursor-pointer active:scale-95"
                style={{ touchAction: 'manipulation' }}
              >
                Fund This Loan →
              </button>
              <button
                onClick={onClose}
                type="button"
                className="flex-1 rounded-xl border-2 border-blue-700 bg-transparent px-6 py-4 text-sm font-bold text-blue-700 transition hover:bg-blue-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
