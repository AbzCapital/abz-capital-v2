import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { PRODUCT_WA_MESSAGES } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0820] py-20 text-white sm:py-24">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-indigo blur-3xl" />
        <div className="absolute -bottom-40 right-10 h-[28rem] w-[28rem] rounded-full bg-peach/30 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-peach">
            Ready to grow?
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Capital that meets you <span className="text-peach">where you are.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Whether you&rsquo;re an SME ready to scale, a contractor needing a performance bond, or an investor seeking secured yields — we&rsquo;ll structure something that works.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/funding"
              className="inline-flex items-center gap-2 rounded-xl bg-peach px-7 py-3.5 text-sm font-bold text-indigo shadow-[0_8px_24px_rgba(255,189,89,0.35)] transition hover:brightness-105"
            >
              Apply for funding
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <WhatsAppButton
              message={PRODUCT_WA_MESSAGES.contact()}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/5"
            >
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalCTA;
