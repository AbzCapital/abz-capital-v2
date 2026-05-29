"use client";

import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function EarningsBreakdown() {
  return (
    <Section spacing="lg" background="white">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4">
              3% Monthly — Your Actual Returns
            </h2>
            <p className="text-base text-muted-ink">
              See exactly how much you'll earn from your investment
            </p>
          </div>

          {/* Investment Breakdown */}
          <div className="space-y-8">
            {/* Example 1: KES 100,000 */}
            <div className="rounded-2xl border border-indigo/20 p-6 sm:p-8 bg-gradient-to-br from-indigo/5 to-white">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo mb-4">
                Example 1: Conservative Investment
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-muted-ink">Your investment:</span>
                  <p className="text-2xl font-bold text-ink">KES 100,000</p>
                </div>

                <div className="h-px bg-line" />

                <div className="flex items-center justify-between">
                  <span className="text-muted-ink">3% per month:</span>
                  <p className="text-xl font-bold text-indigo">KES 3,000/month</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-ink">12 months:</span>
                  <p className="text-xl font-bold text-indigo">KES 36,000/year</p>
                </div>

                <div className="h-px bg-line" />

                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-ink">Total return on capital:</span>
                  <p className="text-2xl font-extrabold text-indigo">36%</p>
                </div>

                <p className="text-xs text-muted-ink mt-3">
                  *Conservative communication: "Up to 24% p.a. on lending pool" accounts for portfolio mix & occasional defaults
                </p>
              </div>
            </div>

            {/* Example 2: Larger Investment */}
            <div className="rounded-2xl border border-peach/20 p-6 sm:p-8 bg-gradient-to-br from-peach/5 to-white">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo mb-4">
                Example 2: Larger Deployment
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-muted-ink">Your investment:</span>
                  <p className="text-2xl font-bold text-ink">KES 500,000</p>
                </div>

                <div className="h-px bg-line" />

                <div className="flex items-center justify-between">
                  <span className="text-muted-ink">3% per month:</span>
                  <p className="text-xl font-bold text-indigo">KES 15,000/month</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-ink">12 months:</span>
                  <p className="text-xl font-bold text-indigo">KES 180,000/year</p>
                </div>

                <div className="h-px bg-line" />

                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-ink">Total return on capital:</span>
                  <p className="text-2xl font-extrabold text-indigo">36%</p>
                </div>

                <p className="text-xs text-muted-ink mt-3">
                  Payout options: Monthly deposits or lump sum at end of loan term
                </p>
              </div>
            </div>
          </div>

          {/* Key Info Box */}
          <div className="mt-12 rounded-xl bg-indigo/5 border border-indigo/20 p-6 sm:p-8">
            <h3 className="font-bold text-ink mb-4">Key Takeaways</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="inline-block size-1.5 rounded-full bg-indigo mt-2" />
                <span className="text-ink">
                  <strong>3% per month</strong> = 36% per year (on individual loans you fund)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block size-1.5 rounded-full bg-indigo mt-2" />
                <span className="text-ink">
                  <strong>Portfolio average: up to 24% p.a.</strong> (accounts for mix of loan types and occasional defaults)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block size-1.5 rounded-full bg-indigo mt-2" />
                <span className="text-ink">
                  <strong>You choose payout timing:</strong> Monthly deposits or lump sum at end of loan term
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block size-1.5 rounded-full bg-indigo mt-2" />
                <span className="text-ink">
                  <strong>100% protected:</strong> Every earning is backed by collateral + insurance
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
