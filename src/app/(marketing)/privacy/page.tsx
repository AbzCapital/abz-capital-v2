import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Privacy Policy - ABZ Capital",
  description: "Privacy Policy for ABZ Capital investment and financing platform.",
};

export default function PrivacyPage() {
  return (
    <>
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-ink mb-2">Privacy Policy</h1>
            <p className="text-muted-ink mb-8">Last Updated: June 2026</p>

            <div className="space-y-8 text-ink">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  ABZ Capital ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="mb-4">We may collect information about you in a variety of ways.</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Information You Provide Directly:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Account registration information (name, email, phone number)</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Investment preferences and profile details</li>
                  <li>Communication records (messages, feedback, support requests)</li>
                  <li>Documentation (identification, proof of address, banking details)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Information Collected Automatically:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Device information (type, operating system, browser)</li>
                  <li>Usage data (pages visited, time spent, interactions)</li>
                  <li>IP address and location information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Provide and manage investment services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Perform compliance and anti-fraud checks</li>
                  <li>Improve website functionality and user experience</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Meet legal and regulatory obligations</li>
                  <li>Prevent fraudulent activity and secure our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                <p className="mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>With service providers who assist us in operating the website and conducting our business</li>
                  <li>To comply with legal obligations or government requests</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>With investment partners necessary for transaction processing</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
                <p className="mb-4">Security measures include:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure authentication protocols</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited employee access to personal information</li>
                  <li>Strict confidentiality agreements with service providers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser, but some features may not function properly if cookies are disabled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                <p className="mb-4">Depending on your location, you may have the right to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Access the personal data we hold about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Data portability (receive your data in a portable format)</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at hello@abzcapital.co.ke.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Retention of Information</h2>
                <p className="mb-4">
                  We retain your personal information for as long as necessary to provide our services and fulfill legal obligations. Investment-related records are typically retained for a minimum of 7 years for compliance purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
                <p className="mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with information, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. International Data Transfers</h2>
                <p className="mb-4">
                  Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using our website, you consent to the transfer of your information to countries outside your country of residence.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-blue-700/10 border border-blue-700/20 rounded-lg p-4">
                  <p className="font-semibold text-ink mb-2">ABZ Capital</p>
                  <p className="text-muted-ink">Email: hello@abzcapital.co.ke</p>
                  <p className="text-muted-ink">Location: Nairobi, Kenya</p>
                  <p className="text-muted-ink mt-2">Response time: We will respond to all privacy inquiries within 30 days.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">14. Compliance</h2>
                <p>
                  This Privacy Policy is designed to comply with applicable data protection regulations in Kenya and other relevant jurisdictions. We are committed to protecting your privacy and maintaining transparency in our data practices.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
