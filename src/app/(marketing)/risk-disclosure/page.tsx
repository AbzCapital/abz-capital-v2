import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Risk Disclosure Statement - ABZ Capital",
  description: "Risk Disclosure Statement for ABZ Capital investment products and services.",
};

export default function RiskDisclosurePage() {
  return (
    <>
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-ink mb-2">Risk Disclosure Statement</h1>
            <p className="text-muted-ink mb-8">Last Updated: June 2026</p>

            <div className="space-y-8 text-ink">
              <section>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="mb-4">
                  ABZ Capital provides access to different categories of investment opportunities, each with its own risk and return characteristics.
                </p>
                <p className="mb-4">
                  We are committed to transparency and helping investors make informed decisions by clearly communicating how our investment products work and the associated risks.
                </p>
                <p>
                  Investors are encouraged to review all available information and seek independent financial, legal, or tax advice where appropriate before making investment decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">1. Lending Pool Investments</h2>
                <p className="mb-4">
                  The ABZ Capital Lending Pool is designed to provide investors with exposure to a diversified portfolio of loans secured by motor vehicle logbooks and other approved collateral.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Loans are secured by tangible collateral.</li>
                  <li>Borrowers undergo credit and due diligence assessments.</li>
                  <li>Collateral is independently verified before financing.</li>
                  <li>Recovery procedures are in place for non-performing loans.</li>
                  <li>Investors benefit from diversification across multiple loans rather than relying on a single borrower.</li>
                  <li>Continuous monitoring is conducted throughout the loan lifecycle.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Capital Protection Measures</h3>
                <p className="mb-4">
                  ABZ Capital's lending pool focuses on financing loans backed by assets whose value is intended to provide security against borrower default.
                </p>
                <p className="mb-4">
                  In the event of non-payment, recovery processes may include repossession and disposal of collateral in accordance with applicable laws and contractual agreements.
                </p>
                <p>
                  The lending pool is structured with capital preservation as a primary objective through:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Collateral-backed lending.</li>
                  <li>Rigorous borrower screening.</li>
                  <li>Asset verification processes.</li>
                  <li>Diversification across multiple borrowers.</li>
                  <li>Loan monitoring and recovery procedures.</li>
                </ul>
                <p className="mt-4">
                  While no financial investment can be completely free from risk, the lending pool has been designed to minimize risk through prudent lending practices and asset-backed security structures.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Direct Investment Opportunities</h2>
                <p className="mb-4">
                  ABZ Capital may from time to time provide access to investment opportunities involving:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Small and Medium Enterprises (SMEs).</li>
                  <li>Invoice Financing.</li>
                  <li>Purchase Order Financing.</li>
                  <li>Asset-Backed Transactions.</li>
                  <li>Business Expansion Financing.</li>
                  <li>Innovation and Growth Ventures.</li>
                  <li>Other approved investment opportunities.</li>
                </ul>
                <p>
                  These opportunities may offer higher potential returns than traditional investments but may also carry a higher level of risk.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Due Diligence and Screening</h3>
                <p className="mb-4">
                  Before an opportunity is presented to investors, ABZ Capital may undertake:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Identity verification of business owners and directors.</li>
                  <li>Business registration and compliance checks.</li>
                  <li>Financial and operational assessments.</li>
                  <li>Credit and repayment capacity analysis.</li>
                  <li>Verification of contracts, invoices, purchase orders, or collateral where applicable.</li>
                  <li>Industry and market assessment.</li>
                </ul>
                <p>
                  Our objective is to identify quality opportunities that meet our internal assessment standards. However, no due diligence process can completely eliminate investment risk.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Potential Risks</h3>
                <p className="mb-4">
                  Investors should understand that returns from these opportunities depend on the performance of the underlying business or transaction.
                </p>

                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-ink mb-2">Business Performance Risk</h4>
                    <p className="text-muted-ink mb-2">Businesses may experience:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-ink">
                      <li>Lower-than-expected sales.</li>
                      <li>Reduced customer demand.</li>
                      <li>Increased operating costs.</li>
                      <li>Cash flow constraints.</li>
                      <li>Loss of key customers or contracts.</li>
                      <li>Management or operational challenges.</li>
                    </ul>
                    <p className="mt-2 text-muted-ink">These factors may affect the business's ability to generate returns or meet its financial obligations.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">Market and Economic Risk</h4>
                    <p className="text-muted-ink mb-2">Changes in economic conditions may impact business performance, including:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-ink">
                      <li>Inflation.</li>
                      <li>Currency fluctuations.</li>
                      <li>Interest rate changes.</li>
                      <li>Industry downturns.</li>
                      <li>Changes in consumer demand.</li>
                      <li>Regional or global economic disruptions.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">Operational Risk</h4>
                    <p className="text-muted-ink mb-2">Businesses may encounter:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-ink">
                      <li>Supply chain disruptions.</li>
                      <li>Delays in project execution.</li>
                      <li>Equipment failures.</li>
                      <li>Workforce challenges.</li>
                      <li>Technology-related disruptions.</li>
                    </ul>
                    <p className="mt-2 text-muted-ink">These events may impact profitability and project delivery.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">Invoice and Purchase Order Financing Risk</h4>
                    <p className="text-muted-ink">Where investments are linked to invoices or purchase orders, risks may include:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-ink mt-2">
                      <li>Delayed customer payments.</li>
                      <li>Contract disputes.</li>
                      <li>Order cancellations.</li>
                      <li>Customer insolvency.</li>
                      <li>Performance-related disputes between contracting parties.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">Regulatory and Legal Risk</h4>
                    <p className="text-muted-ink">Changes in laws, regulations, taxation, licensing requirements, or government policies may affect the performance of an investment opportunity.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-ink mb-2">Liquidity Risk</h4>
                    <p className="text-muted-ink">Some investment opportunities may have fixed investment periods and may not be immediately redeemable or transferable before maturity. Investors should be prepared to remain invested for the duration of the investment term.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. ABZ Capital's Role</h2>
                <p className="mb-4">
                  ABZ Capital acts as a facilitator, arranger, administrator, and investment marketplace operator.
                </p>
                <p className="mb-4">
                  Our role includes sourcing opportunities, conducting due diligence, facilitating investor participation, and monitoring investments where applicable.
                </p>
                <p>
                  While we undertake reasonable efforts to assess and monitor opportunities, ABZ Capital does not guarantee the commercial success of any individual business, project, transaction, or investment opportunity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Diversification</h2>
                <p className="mb-4">
                  Investors are encouraged to diversify their investments across multiple opportunities rather than concentrating capital in a single investment.
                </p>
                <p>
                  Diversification can help reduce exposure to risks associated with any one borrower, business, or transaction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Investor Responsibility</h2>
                <p className="mb-4">Investors are encouraged to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Review all available investment information carefully.</li>
                  <li>Assess their own financial circumstances and investment objectives.</li>
                  <li>Seek independent professional advice where necessary.</li>
                  <li>Understand the characteristics of each investment opportunity.</li>
                  <li>Invest only amounts they are comfortable allocating to the selected investment category.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Our Commitment</h2>
                <p>
                  ABZ Capital is committed to maintaining robust screening, monitoring, governance, and risk management processes designed to safeguard investor interests and support sustainable investment outcomes. Our goal is to create a trusted platform that connects capital with productive opportunities while maintaining transparency, accountability, and responsible investment practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Acknowledgement</h2>
                <p className="mb-4">
                  By participating in investment opportunities through ABZ Capital, investors acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>They have read and understood this Risk Disclosure Statement.</li>
                  <li>They understand the characteristics and risks associated with different investment products.</li>
                  <li>They have had an opportunity to review available information before investing.</li>
                  <li>They understand that direct investment opportunities are subject to business and market risks.</li>
                  <li>They understand that the Lending Pool is structured around collateral-backed lending and capital preservation principles.</li>
                  <li>They are making investment decisions based on their own assessment and judgment.</li>
                </ul>
                <p>
                  For any questions regarding investment opportunities offered through ABZ Capital, investors are encouraged to contact our team before making an investment decision.
                </p>
              </section>

              <section className="mt-8 rounded-lg bg-blue-700/10 border border-blue-700/20 p-4">
                <h3 className="font-semibold text-ink mb-2">Questions About Risk?</h3>
                <p className="text-muted-ink">Contact us at hello@abzcapital.co.ke for clarification on investment risks and characteristics.</p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
