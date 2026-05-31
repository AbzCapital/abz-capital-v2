import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import Link from "next/link";
import { SAMPLE_LOAN } from "@/lib/invest/sampleLoanData";

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
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-ink mb-2">
              Loan {SAMPLE_LOAN.clientId} Approved & Ready for Funding
            </h1>
            <div className="flex items-center gap-2">
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                🟢 Safe
              </span>
            </div>
          </div>

          {/* Two Section Layout */}
          <div className="grid gap-8 lg:grid-cols-2 mb-8">
            {/* Loan Details Section */}
            <div>
              <h2 className="text-lg font-bold text-ink mb-4 border-b-2 border-indigo pb-2">
                Loan Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Loan ID</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.clientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Rating</span>
                  <span className="font-semibold text-ink">🟢 Safe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Occupation</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Loan Amount</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.loanAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Collateral</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.security}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Collateral Value</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.collateralValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Loan Term</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.loanTerm}</span>
                </div>
              </div>
            </div>

            {/* Investor Earnings Section */}
            <div>
              <h2 className="text-lg font-bold text-ink mb-4 border-b-2 border-peach pb-2">
                Investor Earnings
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Amount Invested</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.loanAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Monthly Return</span>
                  <span className="font-semibold text-indigo">3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Monthly Earnings</span>
                  <span className="font-semibold text-ink">{SAMPLE_LOAN.monthlyPayment}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-sm text-muted-ink">Total Earnings (12 Months)</span>
                  <span className="font-bold text-indigo">{SAMPLE_LOAN.investorReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-ink">Total Amount Received</span>
                  <span className="font-bold text-indigo">{SAMPLE_LOAN.totalRepayment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-xl bg-indigo text-white px-6 py-4 text-base font-bold shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40 cursor-pointer">
            Fund Loan 🚀
          </button>
        </div>
      </Container>
    </Section>
  );
}
