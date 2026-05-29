"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { HeroSectionNew } from "@/components/invest/HeroSectionNew";
import { LendingPoolCard } from "@/components/invest/LendingPoolCard";
import { LoanExampleCard } from "@/components/invest/LoanExampleCard";
import { EarningsBreakdown } from "@/components/invest/EarningsBreakdown";
import { TrustSection } from "@/components/invest/TrustSection";
import { CTASection } from "@/components/invest/CTASection";
import { InvestorAlertModal } from "@/components/invest/InvestorAlertModal";
import { InvestorInterestForm } from "@/components/forms/InvestorInterestForm";

export function InvestPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Hero Section - Three Offerings */}
      <HeroSectionNew />

      {/* Lending Pool Main Card */}
      <LendingPoolCard />

      {/* Real Loan Example */}
      <LoanExampleCard />

      {/* Earnings Breakdown */}
      <EarningsBreakdown />

      {/* Trust Section - Why Invest */}
      <TrustSection />

      {/* Register Interest Form Section */}
      <Section id="invest-interest" spacing="lg" background="white">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo mb-3">
                Next Step
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl mb-4">
                Register Your Interest
              </h2>
              <p className="text-base leading-relaxed text-muted-ink mb-6">
                Our investor team will reach out within 24 hours to discuss opportunities aligned with your ticket size and investment preferences.
              </p>

              <ul className="grid gap-3 text-sm text-muted-ink">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-white">
                    1
                  </span>
                  <span>Tell us your preferred track (Lending Pool, SME, or Innovation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-white">
                    2
                  </span>
                  <span>Share your ticket size and investment timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-white">
                    3
                  </span>
                  <span>We&rsquo;ll schedule a call to discuss active opportunities</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
                <InvestorInterestForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <CTASection />

      {/* Investor Alert Modal */}
      <InvestorAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
