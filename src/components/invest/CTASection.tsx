"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function CTASection() {
  return (
    <Section spacing="lg" background="indigo">
      <Container>
        <div className="text-center text-white max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Deploy Capital?
          </h2>

          <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Choose your investment path. Start from KES 100,000. 100% secured. Transparent returns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-xl bg-peach px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-ink shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach/40 flex items-center justify-center gap-2">
              Fund a Loan
              <ArrowRight className="size-5" />
            </button>

            <button className="rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center gap-2">
              Explore SME Deals
              <ArrowRight className="size-5" />
            </button>

            <button className="rounded-xl border-2 border-white/40 bg-transparent hover:bg-white/10 px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center gap-2">
              Support Innovation
              <ArrowRight className="size-5" />
            </button>
          </div>

          {/* Small trust text */}
          <p className="mt-8 text-sm text-white/70">
            Questions? <a href="/contact" className="underline hover:text-white transition">Contact us</a> or WhatsApp +254 141 576 254
          </p>
        </div>
      </Container>
    </Section>
  );
}
