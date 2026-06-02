"use client";

import {
  Shield,
  Lock,
  Users,
  BarChart3,
  Eye,
  FileText,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Structured Due Diligence",
      description:
        "Every deal undergoes multi-layer vetting: credit analysis, collateral valuation, legal review, and risk grading.",
    },
    {
      icon: Lock,
      title: "Collateral-Backed Security",
      description:
        "Loans are secured against tangible assets — logbooks, title deeds, bonds, or receivables — with conservative LTV ratios.",
    },
    {
      icon: Users,
      title: "Access to Curated Deal Flow",
      description:
        "Exclusive access to pre-screened opportunities spanning asset-backed lending, SMEs, contractors, and innovation ventures.",
    },
    {
      icon: BarChart3,
      title: "Structured Return Opportunities",
      description:
        "Predictable monthly distributions on lending deals; equity upside on growth opportunities; hybrid returns on structured products.",
    },
    {
      icon: Eye,
      title: "Active Monitoring & Management",
      description:
        "Real-time portfolio tracking, quarterly cap table updates, proactive covenant monitoring, and swift remedial action on defaults.",
    },
    {
      icon: FileText,
      title: "Transparency & Reporting",
      description:
        "Dashboard access, monthly statements, quarterly performance reports, and annual compliance documentation.",
    },
  ];

  return (
    <Section spacing="lg" background="mesh-soft">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
            Why investors choose us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
            Investor-First Platform
          </h2>
          <p className="mt-4 text-base text-muted-ink max-w-2xl mx-auto">
            We&rsquo;ve built a platform that prioritizes transparency, security, and structured returns.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white p-6 sm:p-8 shadow-card transition hover:shadow-lg hover:-translate-y-1"
              >
                <div className="rounded-lg bg-blue-700/10 p-3 w-fit mb-4">
                  <Icon className="size-6 text-blue-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-ink leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
