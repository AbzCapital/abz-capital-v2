import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Terms and Conditions - ABZ Capital",
  description: "Terms and Conditions for ABZ Capital services and investment platform.",
};

export default function TermsPage() {
  return (
    <>
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-ink mb-2">Terms and Conditions</h1>
            <p className="text-muted-ink mb-8">Last Updated: June 2026</p>

            <div className="space-y-8 text-ink">
              <section>
                <h2 className="text-2xl font-bold mb-4">Welcome to ABZ Capital</h2>
                <p className="mb-4">
                  By accessing or using this website and our services, you agree to be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">1. About ABZ Capital</h2>
                <p className="mb-4">
                  ABZ Capital is a financial technology and investment facilitation platform that connects investors with vetted investment opportunities, including but not limited to SME financing, invoice financing, asset-backed lending, lending pools, and other investment products.
                </p>
                <p>
                  ABZ Capital does not guarantee investment returns and all investments carry varying levels of risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
                <p className="mb-4">By using our website, you confirm that:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>You are at least 18 years old.</li>
                  <li>You have the legal capacity to enter into binding agreements.</li>
                  <li>Information provided by you is accurate and complete.</li>
                  <li>You will comply with all applicable laws and regulations.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Investment Risks</h2>
                <p className="mb-4">All investments involve risk.</p>
                <p className="mb-4">You acknowledge and understand that:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Returns are not guaranteed.</li>
                  <li>Past performance is not indicative of future results.</li>
                  <li>Capital may be partially or fully at risk.</li>
                  <li>Investment opportunities may be affected by market conditions, borrower performance, economic changes, regulatory changes, and other factors beyond our control.</li>
                </ul>
                <p>
                  You are responsible for conducting your own due diligence before making any investment decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Information Provided</h2>
                <p className="mb-4">The information provided on this website is for informational purposes only and does not constitute:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Financial advice</li>
                  <li>Investment advice</li>
                  <li>Tax advice</li>
                  <li>Legal advice</li>
                </ul>
                <p>
                  Users should seek independent professional advice before making financial decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Investor Registration</h2>
                <p className="mb-4">Investors may be required to provide:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Full legal name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Identification documents</li>
                  <li>Proof of address</li>
                  <li>Source of funds information</li>
                  <li>Any other information required for compliance purposes</li>
                </ul>
                <p>
                  We reserve the right to approve, reject, suspend, or terminate any investor account at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. SME and Funding Applications</h2>
                <p className="mb-4">Businesses, entrepreneurs, innovators, and SMEs submitting funding applications agree that:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Information submitted is truthful and accurate.</li>
                  <li>Supporting documentation is authentic.</li>
                  <li>ABZ Capital may conduct verification and due diligence checks.</li>
                  <li>Submission of an application does not guarantee approval or funding.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
                <p className="mb-4">All content on this website, including:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Logos</li>
                  <li>Branding</li>
                  <li>Graphics</li>
                  <li>Text</li>
                  <li>Software</li>
                  <li>Reports</li>
                  <li>Designs</li>
                </ul>
                <p className="mt-4">
                  remain the property of ABZ Capital unless otherwise stated. No content may be copied, reproduced, distributed, or used without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Prohibited Activities</h2>
                <p className="mb-4">Users shall not:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Provide false information.</li>
                  <li>Attempt unauthorized access to systems.</li>
                  <li>Interfere with website operations.</li>
                  <li>Upload malicious software.</li>
                  <li>Use the platform for unlawful activities.</li>
                  <li>Violate any applicable laws or regulations.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="mb-4">To the maximum extent permitted by law, ABZ Capital shall not be liable for:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Direct losses</li>
                  <li>Indirect losses</li>
                  <li>Consequential damages</li>
                  <li>Loss of profits</li>
                  <li>Loss of business opportunities</li>
                  <li>Investment losses</li>
                </ul>
                <p className="mt-4">
                  arising from use of the website or investment activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Third-Party Services</h2>
                <p className="mb-4">
                  The website may contain links to third-party websites or services. ABZ Capital is not responsible for the content, security, or practices of third-party websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Suspension and Termination</h2>
                <p className="mb-4">We reserve the right to suspend or terminate access to the platform if:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Terms are violated.</li>
                  <li>Fraud is suspected.</li>
                  <li>Regulatory requirements necessitate action.</li>
                  <li>User conduct poses risk to the platform or other users.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
                <p className="mb-4">
                  We may modify these Terms and Conditions at any time. Updated versions will be posted on this website with the revised effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
                <p className="mb-4">
                  These Terms and Conditions shall be governed by and interpreted in accordance with the laws of the Republic of Kenya.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
                <p className="mb-4">For questions regarding these Terms and Conditions, please contact:</p>
                <div className="bg-blue-700/10 border border-blue-700/20 rounded-lg p-4">
                  <p className="font-semibold text-ink mb-2">ABZ Capital</p>
                  <p className="text-muted-ink">Email: hello@abzcapital.co.ke</p>
                  <p className="text-muted-ink">Location: Nairobi, Kenya</p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
