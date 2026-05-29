"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";

export function HeroSectionNew() {
  return (
    <section className="relative bg-gradient-to-b from-indigo/5 to-white py-12 sm:py-20 md:py-28">
      <Container>
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-4 sm:mb-6">
            Deploy Capital Into{" "}
            <span className="text-gradient-brand">100% Secured Lending</span>
            {" "}+ Growth Opportunities
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-ink max-w-3xl mx-auto leading-relaxed">
            Fund real businesses and real people. Backed by real assets. Humane lending practices. Predictable returns.
          </p>
        </div>

        {/* Three Offering Boxes */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* Box 1: Lending Pool */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo to-indigo/80 p-6 sm:p-8 text-white border border-indigo/30 shadow-lg hover:shadow-xl transition">
            <div className="mb-4">
              <div className="inline-block rounded-lg bg-white/20 p-3 mb-4">
                <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">Loanbook</h3>
              <p className="text-sm text-white/80 mt-1">100% Secured Loans</p>
            </div>

            <p className="text-sm sm:text-base text-white/90 mb-6 leading-relaxed">
              Fund vetted loans directly. Every loan is fully collateralized. Earn 3% monthly. Choose monthly payouts or lump sum.
            </p>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-peach" />
                <span>100% Asset-backed</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-peach" />
                <span>Up to 24% p.a.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-peach" />
                <span>Start from KES 100k</span>
              </li>
            </ul>

            <button className="w-full rounded-xl bg-peach px-4 py-3 text-sm font-bold text-ink transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/40 flex items-center justify-center gap-2">
              Explore Loans
              <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Box 2: SME Deals */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 border-2 border-peach/30 shadow-lg hover:shadow-xl transition">
            <div className="mb-4">
              <div className="inline-block rounded-lg bg-peach/20 p-3 mb-4">
                <svg className="size-6 text-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">SME Deals</h3>
              <p className="text-sm text-muted-ink mt-1">Growth Capital for Businesses</p>
            </div>

            <p className="text-sm sm:text-base text-muted-ink mb-6 leading-relaxed">
              Invest in vetted businesses. Equity, debt, or hybrid structures. Matched to your sector preferences.
            </p>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-indigo" />
                <span className="text-ink">Pre-screened businesses</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-indigo" />
                <span className="text-ink">Flexible structures</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-indigo" />
                <span className="text-ink">Quarterly updates</span>
              </li>
            </ul>

            <button className="w-full rounded-xl bg-indigo/10 hover:bg-indigo/20 px-4 py-3 text-sm font-bold text-indigo transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40 flex items-center justify-center gap-2">
              Browse Opportunities
              <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Box 3: Innovation */}
          <div className="rounded-2xl bg-white p-6 sm:p-8 border-2 border-indigo/20 shadow-lg hover:shadow-xl transition">
            <div className="mb-4">
              <div className="inline-block rounded-lg bg-indigo/10 p-3 mb-4">
                <svg className="size-6 text-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">Innovation Fund</h3>
              <p className="text-sm text-muted-ink mt-1">Startups & Project Capital</p>
            </div>

            <p className="text-sm sm:text-base text-muted-ink mb-6 leading-relaxed">
              Fund projects, purchase orders, and startup expansion. Real businesses with real growth potential.
            </p>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-indigo" />
                <span className="text-ink">Curated opportunities</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-indigo" />
                <span className="text-ink">Growth potential</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-indigo" />
                <span className="text-ink">Monthly monitoring</span>
              </li>
            </ul>

            <button className="w-full rounded-xl bg-indigo px-4 py-3 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40 flex items-center justify-center gap-2">
              View Startups
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
