import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { ContactInfoCard } from "@/components/contact/ContactInfoCard";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Talk to us",
  description:
    "Reach ABZ Capital by WhatsApp, phone, email, or our office in Utawala, Nairobi. Send us a message and we'll respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <section className="bg-mesh-soft py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo">
            Talk to us
          </span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Let&rsquo;s find the right solution{" "}
            <span className="text-gradient-brand">together.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-ink sm:text-lg">
            Loans, investments, insurance, or just exploring — we&rsquo;ll point you to the right person on our team within one business day.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
              <h2 className="text-xl font-extrabold text-ink">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-ink">
                We reply to every message — usually within a few hours.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ContactInfoCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
