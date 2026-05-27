import type { Metadata } from "next";
import { Shield, TrendingUp } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { InvestorTrackCard } from "@/components/invest/InvestorTrackCard";
import { InvestorInterestForm } from "@/components/forms/InvestorInterestForm";

export const metadata: Metadata = {
  title: "Invest with ABZ",
  description:
    "Two investor tracks: secured asset-backed lending pools or SME & innovation deals — vetted, structured, transparent.",
};

export default function InvestPage() {
  return (
    <>
      <section className="bg-mesh pt-20 pb-12 sm:pt-28 sm:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo">
              Investor platform
            </span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              Two tracks. <span className="text-gradient-brand">One disciplined approach.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-ink sm:text-lg">
              Invest into a collateral-backed lending pool, or co-invest into vetted SME &amp; innovation opportunities. Either way, transparent, structured, and risk-managed.
            </p>
          </div>
        </Container>
      </section>

      <Section spacing="md" background="white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <InvestorTrackCard
              icon={Shield}
              variant="indigo"
              label="Track A"
              title="Asset-Backed Lending Investors"
              description="Deploy into our secured lending pool. Every position is collateralised against logbooks, title deeds, or bonds with conservative loan-to-value ratios."
              bullets={[
                "Collateral-backed positions",
                "Predictable monthly returns",
                "Quarterly distributions",
                "Risk-graded portfolios",
              ]}
            />
            <InvestorTrackCard
              icon={TrendingUp}
              variant="peach"
              label="Track B"
              title="SME &amp; Innovation Investors"
              description="Co-invest into vetted Kenyan SMEs and innovation opportunities — equity, debt, or structured deals — matched to your sector and stage."
              bullets={[
                "Vetted SMEs &amp; founders",
                "Equity / debt / hybrid structures",
                "Sector-based matching",
                "Quarterly reporting",
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section id="invest-interest" spacing="lg" background="mesh-soft">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo">Register interest</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                We&rsquo;ll send a personalised brief based on your preferences.
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
    </>
  );
}
