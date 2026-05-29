"use client";

import { DollarSign, Briefcase, Lightbulb } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function OpportunitiesTypesSection() {
  const opportunities = [
    {
      icon: DollarSign,
      title: "Secured Lending",
      items: ["Logbook Loans", "Title Deed Financing", "Bond-Backed Lending"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    },
    {
      icon: Briefcase,
      title: "Business Financing",
      items: [
        "SME Expansion Financing",
        "Working Capital Loans",
        "Contract Financing",
        "Supply Order (LPO) Financing",
        "Invoice Discounting",
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Growth",
      items: ["FinTech", "AgriTech", "Manufacturing", "Logistics", "HealthTech & More"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    },
  ];

  return (
    <Section spacing="lg" background="white">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4">
            Types of Opportunities Available
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {opportunities.map((opp, idx) => {
            const Icon = opp.icon;
            return (
              <div key={idx} className="rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-lg transition">
                {/* Image */}
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 right-4 rounded-lg bg-indigo p-3">
                    <Icon className="size-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-ink mb-4">
                    {opp.title}
                  </h3>

                  <ul className="space-y-2">
                    {opp.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-ink">
                        <span className="inline-block size-1.5 rounded-full bg-indigo mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
