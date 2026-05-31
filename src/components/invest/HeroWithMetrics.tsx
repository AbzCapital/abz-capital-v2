"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { AlertModal } from "./AlertModal";

export function HeroWithMetrics() {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <AlertModal open={alertOpen} onOpenChange={setAlertOpen} />
    <section className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=900&fit=crop')`,
        }}
      />
      {/* Dark overlay - makes background darker */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen py-12 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left: Text & CTAs */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-peach mb-6">
                Investor Platform
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-white">
                Invest in Secured Lending &{" "}
                <span className="text-peach">High-Growth Business Opportunities</span>
              </h1>

              <p className="text-base sm:text-lg text-white mb-8 max-w-2xl leading-relaxed font-semibold">
                Join a structured investment platform connecting investors to collateral-backed lending opportunities, SME growth financing, contract funding, and vetted innovation opportunities.
              </p>

              {/* Trust Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-white font-semibold">
                  <svg className="size-5 text-peach" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Secure & Transparent</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white font-semibold">
                  <svg className="size-5 text-peach" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 7h8m0 0v8m0-8L5.343 20.657M21 21H3V3h18v18z" />
                  </svg>
                  <span>Attractive Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white font-semibold">
                  <svg className="size-5 text-peach" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Vetted & Monitored</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white font-semibold">
                  <svg className="size-5 text-peach" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Structured & Compliant</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="rounded-xl bg-peach px-6 py-3.5 text-sm font-bold text-ink shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/40 flex items-center justify-center gap-2">
                  Join Lending Pool
                  <ArrowRight className="size-4" />
                </button>

                <button
                  onClick={() => setAlertOpen(true)}
                  className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  See Sample Funding Alert
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Right: Metrics Cards */}
            <div className="grid gap-6 mt-8 lg:mt-0">
              {/* Card 1 */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
                  Loanbook Returns
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-ink mb-1">
                  3% Monthly
                </p>
                <p className="text-sm text-muted-ink font-semibold">36% p.a. on loanbook loans</p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
                  Total Funded
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-ink">
                  KES 450M+
                </p>
                <p className="text-sm text-muted-ink">Across all loans</p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
                  Loan Repayment Rate
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl sm:text-4xl font-extrabold text-ink">96.3%</p>
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#1800ad"
                        strokeWidth="8"
                        strokeDasharray={`${96.3 * 2.51} 251`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-ink mt-2">Current Performance</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
    </>
  );
}
