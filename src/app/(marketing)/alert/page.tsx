import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { ArrowRight } from "lucide-react";
import { SAMPLE_LOAN } from "@/lib/invest/sampleLoanData";
import Link from "next/link";

export const metadata = {
  title: "Sample Investor Alert | ABZ Capital",
  description: "View a sample investor alert showing how loan funding opportunities are presented.",
};

export default function AlertPage() {
  return (
    <>
      {/* Back Button Section */}
      <Section spacing="lg" background="white">
        <Container>
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 text-indigo hover:text-indigo/80 transition mb-8"
          >
            ← Back to Invest
          </Link>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-ink mb-4">
                Sample Investor Alert
              </h1>
              <p className="text-lg text-muted-ink">
                This is how we notify you when approved loans are ready for funding.
              </p>
            </div>

            {/* Alert Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo/20 p-8">
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                  {SAMPLE_LOAN.statusLabel}
                </span>
                <span className="text-sm text-muted-ink">Loan approved & ready for funding</span>
              </div>

              {/* Loan Details */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-ink mb-6">Loan Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                      Client ID
                    </p>
                    <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.clientId}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                      Security / Collateral
                    </p>
                    <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.security}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                      Occupation
                    </p>
                    <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.occupation}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                      Collateral Value
                    </p>
                    <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.collateralValue}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                      Loan Amount
                    </p>
                    <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.loanAmount}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-ink mb-1">
                      Loan Term
                    </p>
                    <p className="text-lg font-bold text-ink">{SAMPLE_LOAN.loanTerm}</p>
                  </div>
                </div>
              </div>

              {/* Returns Section */}
              <div className="bg-gradient-to-br from-indigo/10 to-indigo/5 border border-indigo/20 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-ink mb-6">Your Investor Returns</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-ink">Monthly Payment (3% of loan amount)</span>
                    <span className="text-2xl font-bold text-indigo">{SAMPLE_LOAN.monthlyPayment}</span>
                  </div>

                  <div className="h-px bg-indigo/20" />

                  <div className="flex justify-between items-center">
                    <span className="text-muted-ink">Loan Term</span>
                    <span className="font-bold text-ink">{SAMPLE_LOAN.loanTerm}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-ink">Total Repayment</span>
                    <span className="font-bold text-ink">{SAMPLE_LOAN.totalRepayment}</span>
                  </div>

                  <div className="h-px bg-indigo/20" />

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-indigo">Your Total Return</span>
                    <span className="text-2xl font-extrabold text-indigo">{SAMPLE_LOAN.investorReturn}</span>
                  </div>

                  <p className="text-xs text-muted-ink pt-2">
                    {SAMPLE_LOAN.returnPercentage} return on capital deployed
                  </p>
                </div>
              </div>

              {/* Notification Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <p className="text-blue-900">
                  <span className="font-bold">📧 {SAMPLE_LOAN.notificationMessage}</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 rounded-xl bg-indigo text-white px-6 py-4 text-sm font-bold shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40 flex items-center justify-center gap-2 cursor-pointer">
                  Fund This Loan
                  <ArrowRight className="size-4" />
                </button>
                <Link
                  href="/invest"
                  className="flex-1 rounded-xl border-2 border-indigo bg-transparent px-6 py-4 text-sm font-bold text-indigo transition hover:bg-indigo/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40 text-center"
                >
                  View All Opportunities
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center text-muted-ink">
                You can fund fully or partially based on your preference.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
