import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const REASONS = [
  {
    title: "Structured financial solutions",
    description: "Every loan, bond, and policy follows a transparent, documented process.",
  },
  {
    title: "Risk-managed lending",
    description: "Asset-backed underwriting and conservative ratios keep your capital safe.",
  },
  {
    title: "Transparent processes",
    description: "Itemised fees, clear amortization, and no hidden surprises.",
  },
  {
    title: "Investor-backed ecosystem",
    description: "We connect capital owners with vetted, ready-to-scale opportunities.",
  },
  {
    title: "Fast execution",
    description: "From application to disbursement in days, not weeks.",
  },
];

export function WhyABZ() {
  return (
    <Section background="mesh-soft" spacing="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo">
              Why ABZ Capital
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Built on trust. <br />
              <span className="text-gradient-brand">Engineered for growth.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-ink">
              We bridge capital and innovation through structured, transparent, and scalable financial solutions designed for the realities of doing business in emerging markets.
            </p>
          </div>

          <ul className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
            {REASONS.map((reason, idx) => (
              <li
                key={reason.title}
                className="group relative rounded-2xl border border-line bg-white p-6 transition hover:border-indigo/20 hover:shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-peach-50 text-base font-extrabold text-indigo">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink">{reason.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-ink">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export default WhyABZ;
