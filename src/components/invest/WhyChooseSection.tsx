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

export function WhyChooseSection() {
  const reasons = [
    {
      icon: Shield,
      title: "Structured Due Diligence",
      description:
        "Every loan undergoes structured verification, underwriting, risk review, and background assessment.",
    },
    {
      icon: Lock,
      title: "Collateral-Backed Security",
      description:
        "All loans are secured using verified assets such as logbooks, title deeds, bonds, and other verifiable securities.",
    },
    {
      icon: Users,
      title: "Access to Curated Deal Flow",
      description:
        "We help investors access opportunities they would not discover easily independently.",
    },
    {
      icon: BarChart3,
      title: "Structured Return Opportunities",
      description:
        "Transparent structures with defined terms, timelines, and performance monitoring.",
    },
    {
      icon: Eye,
      title: "Active Monitoring",
      description:
        "We continuously monitor repayment performance, project execution, and investment progress.",
    },
    {
      icon: FileText,
      title: "Transparency & Reporting",
      description:
        "Regular updates, quarterly reports, and clear communication at every stage.",
    },
  ];

  return (
    <Section spacing="lg" background="mesh-soft">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4">
            Why Investors Choose ABZ Capital
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white p-8 shadow-card hover:shadow-lg transition"
              >
                <div className="rounded-lg bg-blue-500/10 p-3 w-fit mb-4">
                  <Icon className="size-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-ink leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
