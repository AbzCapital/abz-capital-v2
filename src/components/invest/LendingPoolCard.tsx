"use client";

import { useState } from "react";
import { ChevronDown, Shield, Lock, FileText } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function LendingPoolCard() {
  const [expandedProtection, setExpandedProtection] = useState(false);

  return (
    <Section spacing="lg" background="white">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-indigo/10 to-indigo/5 border border-indigo/20 p-8 sm:p-10 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo mb-3">
                Main Investment Vehicle
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink mb-4">
                Loanbook — 100% Asset-Backed Loans
              </h2>

              <p className="text-base sm:text-lg text-muted-ink leading-relaxed">
                Every loan is fully secured by collateral. We lend to help borrowers grow their businesses and handle emergencies — not to trap them. That&rsquo;s why we score every borrower. When they succeed, you succeed.
              </p>
            </div>

            {/* Three Trust Points */}
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              <div className="flex gap-4">
                <div className="rounded-lg bg-indigo/20 p-3 h-fit">
                  <Shield className="size-5 text-indigo shrink-0" />
                </div>
                <div>
                  <h4 className="font-bold text-ink mb-1">100% Secured</h4>
                  <p className="text-sm text-muted-ink">Every loan backed by collateral. GPS-tracked, insured.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-lg bg-indigo/20 p-3 h-fit">
                  <Lock className="size-5 text-indigo shrink-0" />
                </div>
                <div>
                  <h4 className="font-bold text-ink mb-1">Humane Lending</h4>
                  <p className="text-sm text-muted-ink">We score to help borrowers succeed, not liquidate.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-lg bg-indigo/20 p-3 h-fit">
                  <FileText className="size-5 text-indigo shrink-0" />
                </div>
                <div>
                  <h4 className="font-bold text-ink mb-1">Transparent</h4>
                  <p className="text-sm text-muted-ink">Monthly reports. Real data. Full visibility.</p>
                </div>
              </div>
            </div>

            {/* Expandable Protection Section */}
            <div className="mb-8 border-t border-indigo/20 pt-8">
              <button
                onClick={() => setExpandedProtection(!expandedProtection)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white hover:bg-indigo/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40"
              >
                <span className="font-bold text-ink text-left">How We Protect Your Investment</span>
                <ChevronDown
                  className={`size-5 text-indigo transition-transform ${
                    expandedProtection ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedProtection && (
                <div className="mt-4 space-y-3 p-4 rounded-xl bg-white border border-indigo/10">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-indigo/20 text-xs font-bold text-indigo mt-1 shrink-0">
                      ✓
                    </span>
                    <p className="text-sm sm:text-base text-ink">
                      <strong>You're registered as nominee on collateral</strong> — Legal protection over the asset
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-indigo/20 text-xs font-bold text-indigo mt-1 shrink-0">
                      ✓
                    </span>
                    <p className="text-sm sm:text-base text-ink">
                      <strong>First beneficiary on insurance claims</strong> — You're paid first if anything happens
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-indigo/20 text-xs font-bold text-indigo mt-1 shrink-0">
                      ✓
                    </span>
                    <p className="text-sm sm:text-base text-ink">
                      <strong>Registered as interested party with insurers</strong> — Insurers know you have a claim
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-indigo/20 text-xs font-bold text-indigo mt-1 shrink-0">
                      ✓
                    </span>
                    <p className="text-sm sm:text-base text-ink">
                      <strong>Monthly performance reports</strong> — See exactly how your loans are performing
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 rounded-xl bg-indigo px-6 py-3.5 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40">
                Explore Loans
              </button>
              <button className="flex-1 rounded-xl border-2 border-indigo bg-transparent px-6 py-3.5 text-sm font-bold text-indigo transition hover:bg-indigo/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40">
                View Sample Alert
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
