"use client";

import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { HeroWithMetrics } from "@/components/invest/HeroWithMetrics";
import { OfferingCardsSection } from "@/components/invest/OfferingCardsSection";
import { WhyChooseSection } from "@/components/invest/WhyChooseSection";
import { OpportunitiesTypesSection } from "@/components/invest/OpportunitiesTypesSection";
import { SimpleInvestorAlert } from "@/components/invest/SimpleInvestorAlert";
import { InvestorInterestForm } from "@/components/forms/InvestorInterestForm";

export function InvestPageClient() {
  return (
    <>
      {/* Hero Section with Metrics */}
      <HeroWithMetrics />

      {/* Offering Cards - Loanbook vs SME */}
      <OfferingCardsSection />

      {/* Why Investors Choose ABZ Capital */}
      <WhyChooseSection />

      {/* Types of Opportunities Available */}
      <OpportunitiesTypesSection />

      {/* Register Interest Form Section */}
      <Section id="invest-interest" spacing="lg" background="white">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
                Next Step
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl mb-4">
                Register Your Interest
              </h2>
              <p className="text-base leading-relaxed text-muted-ink mb-6">
                Our investor team will reach out within 24 hours to schedule a one-on-one conversation about active opportunities aligned with your ticket size and risk tolerance.
              </p>

              <ul className="grid gap-3 text-sm text-muted-ink">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                    1
                  </span>
                  <span>Tell us your preferred track and ticket size</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                    2
                  </span>
                  <span>We&rsquo;ll share a tailored opportunity brief</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[10px] font-bold text-white">
                    3
                  </span>
                  <span>Schedule a call &amp; co-design your position</span>
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
      <Section spacing="lg" background="indigo">
        <Container>
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
              Ready to Grow <span className="text-peach">Your Wealth?</span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 mb-8">
              Join thousands of smart investors earning structured returns while supporting real businesses and economic growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="rounded-xl bg-peach px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-ink shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/40 flex items-center justify-center gap-2">
                Join Lending Pool
              </button>

              <button className="rounded-xl border-2 border-white/40 bg-transparent hover:bg-white/10 px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center gap-2">
                Access Opportunities
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Simple Investor Alert Section */}
      <SimpleInvestorAlert />
    </>
  );
}
