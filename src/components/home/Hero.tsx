import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { RotatingWord } from "@/components/shared/RotatingWord";

const CHIPS = [
  { href: "/products#asset-backed", label: "Asset-backed lending" },
  { href: "/products#sme", label: "SME financing" },
  { href: "/products#insurance", label: "Insurance" },
  { href: "/invest", label: "Investment opportunities" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-12%] top-[-10%] h-[480px] w-[480px] rounded-full bg-indigo/15 blur-3xl" />
        <div className="absolute -left-32 bottom-[-20%] h-[420px] w-[420px] rounded-full bg-peach/35 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo/15 bg-white/70 px-3 py-1.5 text-xs font-semibold text-indigo backdrop-blur">
              <Sparkles className="size-3.5 text-peach" aria-hidden />
              Trusted partner for SMEs, investors &amp; institutions
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[64px] lg:leading-[1.04]">
              Unlock financial{" "}
              <RotatingWord
                words={["opportunities", "capital", "coverage", "investments"]}
                className="font-extrabold"
              />
              <br className="hidden sm:block" /> that drive real growth.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-ink sm:text-lg">
              Structured financing, investment, and insurance products designed for individuals, SMEs, and institutions across emerging markets. Transparent, asset-backed, and built for trust.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo px-6 py-3.5 text-sm font-semibold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40"
              >
                Explore products
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo/20 bg-white px-6 py-3.5 text-sm font-semibold text-indigo transition hover:bg-indigo/5"
              >
                Apply for funding
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {CHIPS.map((chip) => (
                <Link
                  key={chip.href}
                  href={chip.href}
                  className="rounded-full border border-indigo/15 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-indigo backdrop-blur transition hover:bg-indigo hover:text-white"
                >
                  {chip.label}
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted-ink">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-peach" />
                Asset-backed
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-peach" />
                Transparent fees
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-peach" />
                Fast execution
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-peach" />
                Investor-backed ecosystem
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo to-[#3a1ccc] shadow-elev" />

      <div className="absolute right-[-18px] top-8 w-[78%] rounded-2xl bg-white p-5 shadow-elev">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-ink">
          <span>Loan summary</span>
          <span className="rounded-full bg-peach-50 px-2 py-0.5 text-[10px] text-indigo">Logbook</span>
        </div>
        <div className="mt-3 text-2xl font-extrabold text-ink">KES 500,000</div>
        <div className="mt-1 text-xs text-muted-ink">4-month reducing balance · 6%/mo</div>
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-3 text-[10px] text-muted-ink">
          <div>
            <div className="text-[9px] uppercase tracking-wide">Monthly</div>
            <div className="text-sm font-bold text-ink">KES 144,300</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wide">Total</div>
            <div className="text-sm font-bold text-ink">577,200</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wide">Term</div>
            <div className="text-sm font-bold text-ink">4 mo</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-[-18px] w-[72%] rounded-2xl bg-white p-4 shadow-elev">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-peach text-indigo">
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
              <path d="M3 12 L12 4 L21 12 V20 H14 V14 H10 V20 H3 Z" />
            </svg>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-ink">SME Financing</div>
            <div className="text-sm font-bold text-ink">Working capital · approved</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-indigo/10">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo to-peach" />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-ink">
          <span>Application</span>
          <span>Disbursement</span>
        </div>
      </div>

      <div className="absolute bottom-[-12px] right-8 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-elev">
        <span className="flex size-7 items-center justify-center rounded-full bg-[color:var(--color-whatsapp)] text-white">
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.4-1.5c-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5s0-.4 0-.5c-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.1-1.4 0-.1-.2-.2-.5-.4z" />
          </svg>
        </span>
        <span className="text-[11px] font-semibold text-ink">Apply via WhatsApp</span>
      </div>
    </div>
  );
}

export default Hero;
