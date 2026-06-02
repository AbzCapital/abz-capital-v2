"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { AlertModal } from "./AlertModal";
import { SampleAlertButton } from "./SampleAlertButton";

export function OfferingCardsSection() {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <AlertModal open={alertOpen} onOpenChange={setAlertOpen} />
    <Section spacing="lg" background="white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Option 1: Loanbook */}
          <div className="rounded-2xl bg-blue-500 p-8 sm:p-10">
            <div className="mb-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-peach mb-4">
                Option 1
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 text-white">
                Loanbook Funding Investment Pool
              </h3>
            </div>

            <p className="text-base text-white mb-8 leading-relaxed font-semibold">
              Investors fund our approved loanbook. Your investment is directly linked to a specific loan — not pooled with other funds. Funds are released only when a vetted loan is approved and ready for funding. You will be notified in real-time to review and fund each opportunity.
            </p>

            <p className="text-sm font-bold text-white mb-8 bg-white/20 rounded-lg p-4 border border-white/40">
              💰 Earn 3% per month on your loanbook investment = 36% per year
            </p>

            {/* How You Invest */}
            <div className="mb-8 pb-8 border-b border-white/20">
              <p className="text-xs font-bold uppercase tracking-widest text-peach mb-4">
                How You Invest (Step-by-Step)
              </p>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-white/30 font-bold text-sm text-white">
                    1
                  </span>
                  <span className="text-white">We underwrite and approve a loan</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-white/30 font-bold text-sm text-white">
                    2
                  </span>
                  <span className="text-white">You are notified with full loan details</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-white/30 font-bold text-sm text-white">
                    3
                  </span>
                  <span className="text-white">You review the opportunity</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-white/30 font-bold text-sm text-white">
                    4
                  </span>
                  <span className="text-white">You fund the loan (all or partially)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-white/30 font-bold text-sm text-white">
                    5
                  </span>
                  <span className="text-white">We disburse to the borrower</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-white/30 font-bold text-sm text-white">
                    6
                  </span>
                  <span className="text-white">Borrower repays and you earn returns</span>
                </li>
              </ol>
            </div>

            {/* Why Secure */}
            <div className="mb-8">
              <div className="rounded-xl bg-white/20 border border-white/40 p-4 flex gap-3">
                <ShieldCheck className="size-5 text-peach shrink-0 mt-0.5" />
                <p className="text-sm text-white font-semibold">
                  <strong>Your funds are secure and loan-specific.</strong> They never sit with us.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/lending-pool"
                className="flex-1 rounded-xl bg-peach px-6 py-3 text-sm font-bold text-ink transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/40 cursor-pointer text-center"
              >
                Join Lending Pool
              </Link>
              <div className="flex-1">
                <SampleAlertButton onDesktopClick={() => setAlertOpen(true)} />
              </div>
            </div>
          </div>

          {/* Option 2: SME & Opportunity */}
          <div className="rounded-2xl bg-peach/20 p-8 sm:p-10 border-2 border-peach/30">
            <div className="mb-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">
                Option 2
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">
                SME & Opportunity Investment Network
              </h3>
            </div>

            <p className="text-base text-muted-ink mb-8 leading-relaxed">
              Access curated business and investment opportunities including SMEs seeking growth capital, contract financing, LPO/invoice financing, expansion-stage businesses, and vetted innovation projects.
            </p>

            <p className="text-sm text-muted-ink mb-8 font-semibold">
              ABZ Capital evaluates and structures opportunities before matching them with aligned investors.
            </p>

            {/* Key Features */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">
                Key Features
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-blue-500/20 text-blue-500">
                    ✓
                  </span>
                  <span className="text-ink">Curated investment opportunities</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-blue-500/20 text-blue-500">
                    ✓
                  </span>
                  <span className="text-ink">Business and founder screening</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-blue-500/20 text-blue-500">
                    ✓
                  </span>
                  <span className="text-ink">Contract & supply financing opportunities</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-blue-500/20 text-blue-500">
                    ✓
                  </span>
                  <span className="text-ink">Sector-based investor matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-blue-500/20 text-blue-500">
                    ✓
                  </span>
                  <span className="text-ink">Structured investment discussions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-blue-500/20 text-blue-500">
                    ✓
                  </span>
                  <span className="text-ink">Ongoing monitoring and support</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/investor-network"
              className="w-full rounded-xl bg-blue-500 px-6 py-3 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              Join Investor Network
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
    </>
  );
}
