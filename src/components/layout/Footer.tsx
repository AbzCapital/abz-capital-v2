import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FullLockup } from "@/components/brand/FullLockup";
import { Container } from "@/components/shared/Container";
import { whatsappUrl } from "@/lib/whatsapp";

const EMAIL_LINKS = [
  { label: "General", email: "hello@abzcapital.co.ke" },
  { label: "Loans", email: "loans@abzcapital.co.ke" },
  { label: "Investments", email: "invest@abzcapital.co.ke" },
  { label: "Insurance & Bonds", email: "cover@abzcapital.co.ke" },
];

const QUICK_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/invest", label: "Invest" },
  { href: "/funding", label: "Funding" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Talk to us" },
];

const LEGAL_LINKS = [
  { href: "/about", label: "About ABZ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[#0a0820] text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-32 top-10 size-72 rounded-full bg-indigo blur-3xl" />
        <div className="absolute right-0 bottom-0 size-80 rounded-full bg-peach/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-white p-5 inline-block shadow-elev">
              <FullLockup width={220} />
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75">
              Structured financing, investment, and insurance for individuals, SMEs and institutions across emerging markets.
            </p>
            <a
              href={whatsappUrl("Hello ABZ Capital, I'd like to chat with your team.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-whatsapp)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(37,211,102,0.35)] transition hover:brightness-110"
            >
              <span aria-hidden>📱</span> Chat on WhatsApp · +254 141 576 254
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-peach">
                Office
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                <MapPin className="mr-2 inline size-4 text-peach" aria-hidden />
                34487 Nairobi, Solaret Building, Utawala (next to Miaduck shop)
              </p>
              <a
                href="tel:+254141576254"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-peach"
              >
                <Phone className="size-4 text-peach" aria-hidden /> +254 141 576 254
              </a>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-peach">
                Quick links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/85 transition hover:text-peach"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-peach">
                Email us
              </h3>
              <ul className="mt-4 space-y-2.5">
                {EMAIL_LINKS.map((item) => (
                  <li key={item.email}>
                    <a
                      href={`mailto:${item.email}`}
                      className="group flex items-start gap-2 text-sm text-white/85 transition hover:text-peach"
                    >
                      <Mail className="mt-0.5 size-4 shrink-0 text-peach" aria-hidden />
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-white/55">
                          {item.label}
                        </span>
                        {item.email}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} ABZ Capital Limited. All rights reserved.</span>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-peach">
                {link.label}
              </Link>
            ))}
            <span className="hidden sm:inline">Unlocking Potential · Securing Futures</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
