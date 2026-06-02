import type { Metadata } from "next";
import { CalendarDays, FileText, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { FundingOpportunityFormWrapper } from "@/components/fundraise/FundingOpportunityFormWrapper";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { PRODUCT_WA_MESSAGES } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Fundraise - Book a pitch or submit an opportunity",
  description:
    "Book a pitch with ABZ Capital's investor team or submit a funding opportunity for review. We respond within one business day.",
};

export default function FundingPage({
  searchParams,
}: {
  searchParams: { submitted?: string };
}) {
  const showSuccess = searchParams.submitted === "true";

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-green-600 mb-4">✅ Success!</h2>
          <p className="text-muted-ink mb-6 font-semibold">
            Your funding opportunity has been submitted.
          </p>
          <p className="text-muted-ink mb-8">
            Our investor team will review it and be in touch shortly.
          </p>
          <a
            href="/fundraise"
            className="inline-block px-6 py-3 bg-indigo text-white font-bold rounded-lg hover:bg-indigo/90 transition"
          >
            Submit Another
          </a>
        </div>
      </div>
    );
  }

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

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="https://cal.com/abinah-gekara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full rounded-xl bg-indigo px-6 py-3 text-center font-bold text-white transition hover:bg-indigo/90"
                  >
                    Schedule a meeting
                  </a>
                  <div className="border-t border-line pt-3">
                    <p className="text-xs text-muted-ink mb-2">
                      Prefer WhatsApp? We can book manually:
                    </p>
                    <WhatsAppButton
                      message={PRODUCT_WA_MESSAGES.funding()}
                      size="md"
                    >
                      Book on WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>
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
                  <FundingOpportunityFormWrapper />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
