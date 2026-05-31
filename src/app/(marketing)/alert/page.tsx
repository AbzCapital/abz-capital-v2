import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import Link from "next/link";

export const metadata = {
  title: "Sample Investor Alert | ABZ Capital",
  description: "View a sample investor alert showing how loan funding opportunities are presented.",
};

export default function AlertPage() {
  return (
    <Section spacing="lg" background="white">
      <Container>
        <Link
          href="/invest"
          className="inline-flex items-center gap-2 text-indigo hover:text-indigo/80 transition mb-6"
        >
          ← Back
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <h1 className="text-2xl font-bold text-ink mb-8">
            Loan Approved 868DT & Ready for Funding
          </h1>

          {/* Loan Details Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-ink mb-4">Loan Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Loan ID</span>
                <span className="font-semibold text-ink">868DT</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Rating</span>
                <span className="font-semibold text-ink">🟢 Safe</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Occupation</span>
                <span className="font-semibold text-ink">Employed</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Loan Amount</span>
                <span className="font-semibold text-ink">KES 600,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Collateral</span>
                <span className="font-semibold text-ink">Toyota Fielder</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Collateral Value</span>
                <span className="font-semibold text-ink">KES 1,400,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-ink">Loan Term</span>
                <span className="font-semibold text-ink">12 Months</span>
              </div>
            </div>
          </div>

          {/* Investor Earnings Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-ink mb-4">Investor Earnings</h2>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Amount Invested</span>
                <span className="font-semibold text-ink">KES 600,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Monthly Return</span>
                <span className="font-semibold text-indigo">3%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Monthly Earnings</span>
                <span className="font-semibold text-ink">KES 18,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-muted-ink">Total Earnings (12 months)</span>
                <span className="font-semibold text-ink">KES 216,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-ink">Total Amount to be Received</span>
                <span className="font-semibold text-ink">KES 816,000</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-xl bg-indigo text-white px-6 py-4 text-base font-bold shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40 cursor-pointer">
            Fund Loan
          </button>
        </div>
      </Container>
    </Section>
  );
}
