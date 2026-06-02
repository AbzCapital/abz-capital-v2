"use client";

import { DollarSign, Briefcase, Lightbulb, Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function OpportunitiesSection() {
  const opportunities = [
    {
      icon: DollarSign,
      title: "Secured Lending",
      description: "Asset-backed loans to individuals and MSMEs",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      items: [
        "Vehicle & equipment financing",
        "Trade receivables factoring",
        "Invoice-backed credit lines",
      ],
    },
    {
      icon: Briefcase,
      title: "Business Financing",
      description: "Growth capital for established businesses",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      items: [
        "Working capital facilities",
        "Equipment & expansion financing",
        "Franchise & distribution partnerships",
        "Contractor payment solutions",
        "Supply chain financing",
      ],
    },
    {
      icon: Lightbulb,
      title: "Innovation & Growth",
      description: "Venture equity & structured growth deals",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      items: [
        "Seed & Series A/B equity co-investment",
        "Revenue-based financing (tech & SaaS)",
        "Royalty-based partnerships",
        "Hybrid debt-equity structures",
        "Strategic minority stake investments",
      ],
    },
  ];

  return (
    <Section spacing="lg" background="white">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-700 mb-3">
            Deal types
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
            Types of Opportunities Available
          </h2>
          <p className="mt-4 text-base text-muted-ink max-w-2xl mx-auto">
            Diversify your portfolio across three distinct opportunity types.
          </p>
        </div>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp, idx) => {
            const Icon = opp.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-white shadow-card transition hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 rounded-lg bg-blue-700 p-3 shadow-lg">
                    <Icon className="size-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-ink mb-2">
                    {opp.title}
                  </h3>
                  <p className="text-sm text-muted-ink mb-6">
                    {opp.description}
                  </p>

                  {/* Items List */}
                  <ul className="space-y-2 mb-6">
                    {opp.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <Check className="size-4 text-blue-700 shrink-0 mt-1" />
                        <span className="text-sm text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className="w-full rounded-xl bg-blue-700/10 hover:bg-blue-700/20 px-4 py-2 text-sm font-bold text-blue-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
