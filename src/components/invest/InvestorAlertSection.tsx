"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SAMPLE_LOAN } from "@/lib/invest/sampleLoanData";

interface InvestorAlertSectionProps {
  isVisible: boolean;
  onClose: () => void;
}

export function InvestorAlertSection({ isVisible, onClose }: InvestorAlertSectionProps) {

  return (
    <>
      {/* Alert Section - Only shows when button is clicked */}
      {isVisible && (
        <Section spacing="lg" background="indigo">
          <Container size="lg">
            <div className="rounded-3xl bg-white shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between bg-white border-b border-line p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-8 text-green-500" />
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-ink">
                      Loan {SAMPLE_LOAN.loanId} Approved
                    </h2>
                    <p className="text-xs text-muted-ink">Ready for Funding</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-muted-ink hover:bg-gray-100 transition p-2 rounded-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-sm font-bold text-green-700">
                    {SAMPLE_LOAN.statusLabel}
                  </span>
                  <span className="text-xs text-muted-ink">
                    Loan status verified and approved
                  </span>
                </div>

                {/* Loan Details Grid */}
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
                      Investor Returns (3% of loan amount per month)
                    </p>
                    <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.monthlyPayment}/month</p>
                  </div>
                </div>

                {/* Investor Returns Section */}
                <div className="rounded-2xl bg-blue-700/10 border border-blue-700/20 p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-ink mb-6">
                    Your Investor Returns
                  </h3>

                  <div className="space-y-6">
                    {/* Monthly Payment */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-ink mb-1">Monthly Payment</p>
                        <p className="text-2xl sm:text-3xl font-bold text-ink">
                          {SAMPLE_LOAN.monthlyPayment}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-ink mb-1">Per Month</p>
                        <p className="text-lg font-bold text-blue-700">
                          +{SAMPLE_LOAN.returnPerMonth}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-blue-700/20" />

                    {/* Return Calculation */}
                    <div>
                      <p className="text-sm text-muted-ink mb-3">
                        Total Returns Over {SAMPLE_LOAN.loanTerm}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-ink">
                            Total Repayment
                          </span>
                          <span className="font-bold text-ink">
                            {SAMPLE_LOAN.totalRepayment}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-ink">
                            Loan Principal
                          </span>
                          <span className="font-bold text-ink">
                            {SAMPLE_LOAN.loanAmount}
                          </span>
                        </div>
                        <div className="h-px bg-blue-700/20 my-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-blue-700">
                            Your Total Return
                          </span>
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
                  <button type="button" className="flex-1 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 flex items-center justify-center gap-2 cursor-pointer">
                    Fund This Loan
                    <ArrowRight className="size-4" />
                  </button>
                  <button type="button" onClick={onClose} className="flex-1 rounded-xl border-2 border-blue-700 bg-transparent px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 cursor-pointer">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
