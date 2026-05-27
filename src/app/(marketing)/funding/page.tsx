import type { Metadata } from "next";
import { CalendarDays, FileText, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { FundingForm } from "@/components/forms/FundingForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { PRODUCT_WA_MESSAGES } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Submit a funding opportunity",
  description:
    "Book a pitch with ABZ Capital's investor team or submit a funding opportunity for review.",
};

export default function FundingPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      <section className="bg-mesh pt-20 pb-12 sm:pt-28 sm:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo">
              Submit an opportunity
            </span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              Bring us your deal. <span className="text-gradient-brand">We&rsquo;ll respond fast.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-ink sm:text-lg">
              Book a pitch with our investor team or submit your funding opportunity below. We respond to every serious submission within one business day.
            </p>
          </div>
        </Container>
      </section>

      <Section spacing="md" background="white">
        <Container size="lg">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-indigo text-white">
                  <CalendarDays className="size-5" />
                </span>
                <h2 className="mt-4 text-2xl font-extrabold text-ink">Book a pitch</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                  30-minute call with our investor team. Bring your deck or a short brief.
                </p>

                {calendlyUrl ? (
                  <div className="mt-5 overflow-hidden rounded-xl border border-line">
                    <iframe
                      src={calendlyUrl}
                      title="Book a pitch with ABZ Capital"
                      className="h-[640px] w-full"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-dashed border-indigo/30 bg-indigo/5 p-5 text-sm leading-relaxed text-indigo">
                    <strong className="block text-ink">Calendly coming soon</strong>
                    <p className="mt-1 text-muted-ink">
                      Meanwhile, WhatsApp our investor team and we&rsquo;ll set up a slot manually.
                    </p>
                    <div className="mt-3">
                      <WhatsAppButton
                        message={PRODUCT_WA_MESSAGES.funding()}
                        size="md"
                      >
                        Book on WhatsApp
                      </WhatsAppButton>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-peach text-indigo">
                  <FileText className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink">What to include</h3>
                <ul className="mt-3 grid gap-2 text-sm text-muted-ink">
                  <li>· Executive summary or short pitch deck</li>
                  <li>· Financial highlights (last 12 months)</li>
                  <li>· Use of funds &amp; sought structure</li>
                  <li>· Founder bios or team page</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-indigo text-white">
                    <MessageCircle className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold text-ink">Submit the opportunity</h2>
                    <p className="text-sm text-muted-ink">We&rsquo;ll route it to the right analyst.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <FundingForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
