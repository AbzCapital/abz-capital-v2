import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { PRODUCT_WA_MESSAGES } from "@/lib/whatsapp";

const EMAILS = [
  { label: "General enquiries", email: "hello@abzcapital.co.ke" },
  { label: "Loans", email: "loans@abzcapital.co.ke" },
  { label: "Investments", email: "invest@abzcapital.co.ke" },
  { label: "Insurance &amp; bonds", email: "cover@abzcapital.co.ke" },
];

export function ContactInfoCard() {
  return (
    <aside className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-indigo to-[#3a1ccc] p-7 text-white shadow-elev sm:p-8">
      <div className="absolute" aria-hidden />

      <div>
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-peach">
          Reach us directly
        </span>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Talk to a real person at ABZ Capital.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75">
          We respond fastest on WhatsApp. Office hours are 8:30 AM – 6:00 PM EAT, Monday to Saturday.
        </p>
      </div>

      <WhatsAppButton
        message={PRODUCT_WA_MESSAGES.contact()}
        size="lg"
        className="w-full"
      >
        Chat on WhatsApp · +254 141 576 254
      </WhatsAppButton>

      <div className="space-y-4 rounded-2xl bg-white/5 p-5 backdrop-blur">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-lg bg-peach text-indigo">
            <Phone className="size-4" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-peach/90">Phone</div>
            <a href="tel:+254141576254" className="text-sm font-semibold text-white hover:text-peach">
              +254 141 576 254
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-lg bg-peach text-indigo">
            <MapPin className="size-4" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-peach/90">Office</div>
            <p className="text-sm text-white/90">
              34487 Nairobi Office, Solaret Building, Utawala — next to Miaduck shop
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 items-center justify-center rounded-lg bg-peach text-indigo">
            <Clock className="size-4" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-peach/90">Hours</div>
            <p className="text-sm text-white/90">Mon – Sat · 8:30 AM – 6:00 PM EAT</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-peach/90">Email by category</div>
        <ul className="grid gap-2.5">
          {EMAILS.map((item) => (
            <li key={item.email}>
              <a
                href={`mailto:${item.email}`}
                className="group flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 transition hover:bg-white/10"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-peach" />
                <span>
                  <span
                    className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                    dangerouslySetInnerHTML={{ __html: item.label }}
                  />
                  <span className="text-xs font-semibold text-white group-hover:text-peach">
                    {item.email}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default ContactInfoCard;
