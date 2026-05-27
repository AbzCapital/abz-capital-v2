import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { ProductCategorySection } from "@/components/products/ProductCategorySection";
import { CATEGORIES } from "@/lib/product-catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Asset-backed loans, SME financing, contractor solutions, and insurance — every product with transparent terms, dual CTAs, and direct routing to the right ABZ team.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-mesh pt-20 pb-12 sm:pt-28 sm:pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo">
                Our products
              </span>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                Structured products for <span className="text-gradient-brand">every stage of growth.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-ink sm:text-lg">
                Four categories. Sixteen products. Every card includes a direct email to the right team and a one-tap WhatsApp.
              </p>
            </div>

            <nav className="lg:col-span-5" aria-label="Product categories">
              <ul className="grid gap-3 sm:grid-cols-2">
                {CATEGORIES.map((cat, idx) => (
                  <li key={cat.key}>
                    <Link
                      href={`#${cat.anchor}`}
                      className="group flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-indigo/30 hover:bg-indigo/5"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex size-7 items-center justify-center rounded-md bg-indigo/5 text-xs font-bold text-indigo">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {cat.title}
                      </span>
                      <ArrowRight className="size-4 text-indigo transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {CATEGORIES.map((cat, idx) => (
        <ProductCategorySection key={cat.key} category={cat} index={idx} />
      ))}

      <Section spacing="lg" background="white">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo to-[#3a1ccc] p-10 text-white sm:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-extrabold sm:text-3xl">
                  Don&rsquo;t see exactly what you need?
                </h3>
                <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                  We structure bespoke solutions for SMEs, contractors and institutional clients. Talk to us &mdash; we&rsquo;ll find a way.
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
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
