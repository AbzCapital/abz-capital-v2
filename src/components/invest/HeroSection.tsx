"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=900&fit=crop')`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-screen py-12 sm:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 items-center">
            {/* Left: Text Content */}
            <div className="text-white">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-peach mb-4">
                Investor Platform
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                Deploy Capital Into Africa&apos;s Fastest Growing Deals
              </h1>

              <p className="text-base sm:text-lg text-white/90 mb-8 max-w-xl">
                Structured, transparent, risk-managed investments in asset-backed lending and SME growth opportunities. From KES 100,000 to multi-million deployments.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-peach px-6 py-3.5 text-sm font-bold text-ink shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/40"
                >
                  Explore Opportunities
                  <ArrowRight className="size-4" />
                </button>

                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  See Sample Investment Alert
                  <ArrowRight className="size-4" />
                </button>
              </div>

              {/* Feature Badges */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-lg bg-white/10 backdrop-blur px-3 py-2 sm:px-4 sm:py-3">
                  <p className="text-xs font-bold text-peach uppercase">Vetted Deals</p>
                  <p className="text-xs text-white/80">Structured due diligence</p>
                </div>
                <div className="rounded-lg bg-white/10 backdrop-blur px-3 py-2 sm:px-4 sm:py-3">
                  <p className="text-xs font-bold text-peach uppercase">Transparent</p>
                  <p className="text-xs text-white/80">Real-time reporting</p>
                </div>
                <div className="rounded-lg bg-white/10 backdrop-blur px-3 py-2 sm:px-4 sm:py-3">
                  <p className="text-xs font-bold text-peach uppercase">Secure</p>
                  <p className="text-xs text-white/80">Collateral-backed</p>
                </div>
                <div className="rounded-lg bg-white/10 backdrop-blur px-3 py-2 sm:px-4 sm:py-3">
                  <p className="text-xs font-bold text-peach uppercase">Flexible</p>
                  <p className="text-xs text-white/80">KES 100k+ entry point</p>
                </div>
              </div>
            </div>

            {/* Right: Metrics Cards (Stack on mobile) */}
            <div className="grid gap-4 sm:gap-6 mt-8 md:mt-0">
              {/* Card 1: Projected Returns */}
              <div className="rounded-2xl bg-white/95 backdrop-blur p-6 sm:p-8 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-2">
                  Projected Returns
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-ink">18-24%</p>
                <p className="text-sm text-muted-ink mt-2">Per annum (asset-backed track)</p>
              </div>

              {/* Card 2: Total Funded */}
              <div className="rounded-2xl bg-white/95 backdrop-blur p-6 sm:p-8 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-2">
                  Total Funded
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-ink">KES 450M+</p>
                <p className="text-sm text-muted-ink mt-2">Since 2019</p>
              </div>

              {/* Card 3: Repayment Rate */}
              <div className="rounded-2xl bg-white/95 backdrop-blur p-6 sm:p-8 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-2">
                  Repayment Rate
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-ink">96.3%</p>
                <div className="mt-3 h-2 w-full rounded-full bg-ink/10 overflow-hidden">
                  <div className="h-full w-[96.3%] bg-blue-700 rounded-full" />
                </div>
                <p className="text-sm text-muted-ink mt-2">Average on funded assets</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
