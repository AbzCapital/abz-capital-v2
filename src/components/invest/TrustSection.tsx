"use client";

import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Shield, Target, BarChart3 } from "lucide-react";

export function TrustSection() {
  return (
    <Section spacing="lg" background="mesh-soft">
      <Container>
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4">
            Why Fund Our Loanbook
          </h2>
          <p className="text-base text-muted-ink max-w-2xl mx-auto">
            Three reasons investors choose ABZ Capital
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Trust Point 1 */}
          <div className="rounded-2xl bg-white p-8 shadow-card hover:shadow-lg transition">
            <div className="rounded-lg bg-blue-700/10 p-4 w-fit mb-6">
              <Shield className="size-6 text-blue-700" />
            </div>

            <h3 className="text-xl font-bold text-ink mb-3">100% Secured</h3>

            <p className="text-muted-ink text-sm leading-relaxed mb-4">
              Every loan is collateralized. Conservative underwriting. Real assets backing your investment.
            </p>

            <ul className="space-y-2 text-sm text-muted-ink">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Conservative LTV ratios</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>GPS tracking on vehicles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Comprehensive insurance required</span>
              </li>
            </ul>
          </div>

          {/* Trust Point 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-card hover:shadow-lg transition">
            <div className="rounded-lg bg-blue-700/10 p-4 w-fit mb-6">
              <Target className="size-6 text-blue-700" />
            </div>

            <h3 className="text-xl font-bold text-ink mb-3">Humane Lending</h3>

            <p className="text-muted-ink text-sm leading-relaxed mb-4">
              We score borrowers to help them succeed, not to liquidate assets. Your returns depend on borrower success.
            </p>

            <ul className="space-y-2 text-sm text-muted-ink">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Credit risk analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Borrower affordability checks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Focus on loan performance</span>
              </li>
            </ul>
          </div>

          {/* Trust Point 3 */}
          <div className="rounded-2xl bg-white p-8 shadow-card hover:shadow-lg transition">
            <div className="rounded-lg bg-blue-700/10 p-4 w-fit mb-6">
              <BarChart3 className="size-6 text-blue-700" />
            </div>

            <h3 className="text-xl font-bold text-ink mb-3">Full Transparency</h3>

            <p className="text-muted-ink text-sm leading-relaxed mb-4">
              Real loan data. Monthly reports. Dashboard access. See exactly what you're funding and how it performs.
            </p>

            <ul className="space-y-2 text-sm text-muted-ink">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Real-time loan performance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Monthly payment tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue-700" />
                <span>Downloadable statements</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom trust signals */}
        <div className="mt-16 rounded-2xl bg-white p-8 sm:p-10 border border-blue-700/10">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink mb-2">Our Commitment</h3>
            <p className="text-muted-ink">What you can expect when you invest with ABZ Capital</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-center text-sm">
            <div>
              <p className="font-bold text-blue-700 text-2xl mb-1">100%</p>
              <p className="text-muted-ink text-xs">Secured Loans</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 text-2xl mb-1">Humane</p>
              <p className="text-muted-ink text-xs">Lending Practices</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 text-2xl mb-1">Transparent</p>
              <p className="text-muted-ink text-xs">Real Data</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 text-2xl mb-1">Protected</p>
              <p className="text-muted-ink text-xs">Your Investment</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
