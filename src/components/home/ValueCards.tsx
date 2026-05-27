import Link from "next/link";
import { ArrowUpRight, Banknote, Building2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const CARDS = [
  {
    icon: Banknote,
    title: "Asset-backed lending",
    description:
      "Logbook, title deed, and bond-backed loans with transparent fees and clear repayment schedules. Keep using your asset while you repay.",
    href: "/products#asset-backed",
    accent: "from-indigo to-[#3a1ccc]",
  },
  {
    icon: Building2,
    title: "SME financing",
    description:
      "Working capital, expansion funding, and investor linkage services for ambitious Kenyan businesses ready to scale.",
    href: "/products#sme",
    accent: "from-[#4a2bcc] to-indigo",
  },
  {
    icon: ShieldCheck,
    title: "Insurance &amp; risk solutions",
    description:
      "Motor, WIBA, medical, travel, performance bonds, and contractor cover — protection that lets you grow with confidence.",
    href: "/products#insurance",
    accent: "from-peach to-[#ffa31a]",
  },
];

export function ValueCards() {
  return (
    <Section spacing="lg" background="white" id="value-cards">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo">
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Three pillars. One ecosystem.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-ink">
            Built around structured financial solutions, risk-managed lending, and investor-backed capital.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-indigo/30 hover:shadow-elev"
            >
              <div
                className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white shadow-button`}
              >
                <card.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink" dangerouslySetInnerHTML={{ __html: card.title }} />
              <p className="mt-3 text-sm leading-relaxed text-muted-ink" dangerouslySetInnerHTML={{ __html: card.description }} />
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo">
                Learn more
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default ValueCards;
