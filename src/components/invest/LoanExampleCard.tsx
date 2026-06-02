"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function LoanExampleCard() {
  return (
    <Section spacing="lg" background="mesh-soft">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
            Real Example
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4">
            Here's What You'll Invest In
          </h2>
          <p className="text-base text-muted-ink max-w-2xl mx-auto">
            Loan ID, borrower occupation, score, collateral, and your exact earnings. Real data, no personal information.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Loan Card */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg border border-line">
            {/* Header with Status */}
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-line">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-2">
                  Loan LN-2024-045612
                </h3>
                <p className="text-sm text-muted-ink">Available for funding</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 border border-green-200">
                <CheckCircle2 className="size-4 text-green-600" />
                <span className="text-xs font-bold text-green-700">100% Secured</span>
              </div>
            </div>

            {/* Loan Details Grid */}
            <div className="grid gap-6 mb-8">
              {/* Row 1 */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-2">
                    Borrower Occupation
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-ink">
                    Transport Entrepreneur
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-2">
                    Credit Score
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg sm:text-xl font-bold text-ink">78/100</p>
                    <span className="inline-block px-2 py-1 rounded-full bg-green-50 text-xs font-bold text-green-700">
                      Safe
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-2">
                    Collateral
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-ink">
                    Toyota Hiace Van (2018)
                  </p>
                  <p className="text-xs text-muted-ink mt-1">GPS-tracked, Insured</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-2">
                    Collateral Value
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-ink">
                    KES 1,200,000
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-2">
                    Loan Amount
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-ink">
                    KES 600,000
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-2">
                    Loan Term
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-ink">
                    24 months
                  </p>
                </div>
              </div>
            </div>

            {/* Your Earning Highlight */}
            <div className="rounded-xl bg-blue-700/10 border border-blue-700/20 p-6 sm:p-8 mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
                Your Investment Returns
              </p>
              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <span className="text-muted-ink">If you invest KES 100,000:</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">
                    KES 3,000/month
                  </p>
                </div>
                <div className="h-px bg-blue-700/20" />
                <div className="flex items-end justify-between">
                  <span className="text-muted-ink">Annual earning (3% monthly):</span>
                  <p className="text-xl font-bold text-blue-700">
                    KES 36,000/year
                  </p>
                </div>
              </div>
            </div>

            {/* Protection Summary */}
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 mb-8 flex gap-3">
              <CheckCircle2 className="size-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-green-900 mb-1">Your Protection</p>
                <p className="text-xs text-green-800">
                  You're registered as nominee on collateral + first beneficiary on insurance + interested party with insurers
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 flex items-center justify-center gap-2">
                Fund This Loan
                <ArrowRight className="size-4" />
              </button>
              <button className="flex-1 rounded-xl border-2 border-blue-700 bg-transparent px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40">
                View More Loans
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
