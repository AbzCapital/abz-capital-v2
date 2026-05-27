import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Flag, Heart, Shield, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "ABZ Capital — a forward-thinking investment and financial solutions firm bridging capital and innovation for emerging markets.",
};

const VALUES = [
  { icon: Shield, label: "Integrity", desc: "We do the right thing, always." },
  { icon: Sparkles, label: "Transparency", desc: "Every fee, every rate, written down." },
  { icon: TrendingUp, label: "Innovation", desc: "Structured products fit for modern markets." },
  { icon: Flag, label: "Discipline", desc: "Risk-managed, asset-backed underwriting." },
  { icon: Heart, label: "Long-term value", desc: "Relationships that compound." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-mesh pt-20 pb-16 sm:pt-28 sm:pb-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo">
                About ABZ Capital
              </span>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                Bridging capital and <span className="text-gradient-brand">innovation</span> across emerging markets.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-ink sm:text-lg">
                ABZ Capital is a forward-thinking investment and financial solutions firm dedicated to unlocking growth opportunities for individuals, SMEs, and institutions across emerging markets. We bridge capital and innovation through structured, transparent, and scalable financial solutions.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-ink">
                We specialize in asset-backed financing, working capital solutions, and investment structuring that transforms economic challenges into structured opportunities. We support SMEs, innovators, and investors within a single ecosystem designed for trust, growth, and efficiency.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-indigo to-[#3a1ccc] p-8 text-white shadow-elev">
                <div className="absolute right-[-30px] top-[-30px] size-44 rounded-full bg-peach/40 blur-3xl" />
                <Compass className="size-10 text-peach" />
                <p className="mt-8 text-2xl font-extrabold leading-tight">
                  &ldquo;Unlocking potential. Securing futures.&rdquo;
                </p>
                <p className="mt-4 text-sm text-white/75">
                  The values we operate by aren&rsquo;t aspirational — they&rsquo;re how we underwrite every deal.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section spacing="lg" background="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-indigo text-white">
                <Compass className="size-5" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-ink">Vision</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-ink">
                To become a leading catalyst for inclusive financial growth across Africa and beyond.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-peach text-indigo">
                <Flag className="size-5" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold text-ink">Mission</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-ink">
                To provide innovative, accessible, and structured capital solutions that empower businesses to grow sustainably and responsibly.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="mesh-soft">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo">Our values</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Principles that shape every deal.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v) => (
              <div
                key={v.label}
                className="rounded-2xl border border-line bg-white p-6 text-left shadow-card transition hover:-translate-y-1 hover:border-indigo/20"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-indigo/5 text-indigo">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-ink">{v.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-ink">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="white">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo to-[#3a1ccc] p-10 text-white sm:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-extrabold sm:text-3xl">
                  Ready to bridge capital and opportunity?
                </h3>
                <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                  Whether you&rsquo;re raising, lending, or insuring — our team will structure the right solution.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-peach px-6 py-3 text-sm font-bold text-indigo transition hover:brightness-105"
                >
                  Talk to us
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  See products
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
