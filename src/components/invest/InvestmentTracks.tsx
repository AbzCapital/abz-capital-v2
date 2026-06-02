"use client";

import { Shield, TrendingUp, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

interface InvestmentTracksProps {
  onOpenModal: () => void;
}

export function InvestmentTracks({ onOpenModal }: InvestmentTracksProps) {
  return (
    <Section spacing="lg" background="white">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
            Two investment tracks
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
            Choose Your Investment Path
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Option 1: Asset-Backed Lending */}
          <div className="rounded-2xl bg-blue-500 p-8 sm:p-10 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-white/20 p-3">
                <Shield className="size-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Loanbook Funding Pool</h3>
            </div>

            <p className="text-base text-white/90 mb-8">
              Deploy capital into our secured lending pool. Every position is collateralised against logbooks, title deeds, bonds, or invoice receivables — with conservative LTV ratios.
            </p>

            {/* 6-Step Process */}
            <div className="space-y-4 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-peach">How it works</p>

              {[
                { num: 1, text: "We underwrite & select deals" },
                { num: 2, text: "You are notified of opportunity" },
                { num: 3, text: "You review loan & collateral terms" },
                { num: 4, text: "You fund your allocation" },
                { num: 5, text: "We disburse to borrower" },
                { num: 6, text: "You earn monthly returns" },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {step.num}
                  </div>
                  <span className="text-sm">{step.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 rounded-xl bg-peach px-6 py-3 text-sm font-bold text-ink transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/40">
                Join Lending Pool
              </button>
              <button
                onClick={onOpenModal}
                className="flex-1 rounded-xl border-2 border-white bg-transparent px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                See Sample Alert
              </button>
            </div>
          </div>

          {/* Option 2: SME & Opportunity Network */}
          <div className="rounded-2xl bg-peach/20 p-8 sm:p-10 border border-peach/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-peach/20 p-3">
                <TrendingUp className="size-6 text-blue-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">SME & Innovation Network</h3>
            </div>

            <p className="text-base text-muted-ink mb-8">
              Co-invest into vetted Kenyan SMEs, startups, and innovation opportunities. Equity, debt, or structured deals — matched to your sector preferences and ticket size.
            </p>

            {/* Key Features Checklist */}
            <div className="space-y-3 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500">Key features</p>

              {[
                "Pre-screened & validated SMEs",
                "Equity, debt & hybrid structures",
                "Sector-based deal matching",
                "Quarterly cap table & KPI updates",
                "Co-investor syndication network",
                "Exit & liquidity pathways",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="size-5 text-blue-500 shrink-0" />
                  <span className="text-sm text-ink">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="w-full rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 flex items-center justify-center gap-2">
              Access Opportunities
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
