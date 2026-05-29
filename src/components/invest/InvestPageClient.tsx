"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { HeroSection } from "@/components/invest/HeroSection";
import { InvestmentTracks } from "@/components/invest/InvestmentTracks";
import { BenefitsSection } from "@/components/invest/BenefitsSection";
import { OpportunitiesSection } from "@/components/invest/OpportunitiesSection";
import { InvestorAlertModal } from "@/components/invest/InvestorAlertModal";
import { InvestorInterestForm } from "@/components/forms/InvestorInterestForm";

export function InvestPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />

      {/* Investment Tracks */}
      <InvestmentTracks onOpenModal={() => setIsModalOpen(true)} />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Opportunities Section */}
      <OpportunitiesSection />

      {/* Register Interest Section */}
      <Section id="invest-interest" spacing="lg" background="mesh-soft">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo">
                Register interest
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Ready to Deploy Capital?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-ink">
                Our investor team will reach out within 24 hours to schedule a one-on-one conversation about active opportunities aligned with your ticket size and risk tolerance.
              </p>

              <ul className="mt-6 grid gap-3 text-sm text-muted-ink">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-white">
                    1
                  </span>
                  Tell us your preferred track and ticket size
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-white">
                    2
                  </span>
                  We&rsquo;ll share a tailored opportunity brief
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo text-[10px] font-bold text-white">
                    3
                  </span>
                  Schedule a call &amp; co-design your position
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

      {/* Investor Alert Modal */}
      <InvestorAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
