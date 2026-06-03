"use client";

import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { HeroWithMetrics } from "@/components/invest/HeroWithMetrics";
import { OfferingCardsSection } from "@/components/invest/OfferingCardsSection";
import { WhyChooseSection } from "@/components/invest/WhyChooseSection";
import { OpportunitiesTypesSection } from "@/components/invest/OpportunitiesTypesSection";
import { SimpleInvestorAlert } from "@/components/invest/SimpleInvestorAlert";

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
