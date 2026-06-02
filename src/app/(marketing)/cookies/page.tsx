import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "Cookie & Communication Preferences - ABZ Capital",
  description: "Cookie policy and communication preferences for ABZ Capital.",
};

export default function CookiesPage() {
  return (
    <>
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-ink mb-2">Cookie & Communication Preferences Policy</h1>
            <p className="text-muted-ink mb-8">Last Updated: June 2026</p>

            <div className="space-y-8 text-ink">
              <section>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p>
                  ABZ Capital uses cookies and similar technologies to improve website functionality, enhance user experience, maintain security, and provide relevant information about investment opportunities and platform updates.
                </p>
                <p className="mt-4">
                  This policy explains how cookies are used and how users can manage their communication preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
                <p className="mb-4">
                  Cookies are small text files stored on your device when you visit a website.
                </p>
                <p>
                  They help websites:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Remember user preferences.</li>
                  <li>Improve performance and security.</li>
                  <li>Analyze website usage.</li>
                  <li>Enhance functionality and user experience.</li>
                </ul>
                <p className="mt-4">
                  Cookies do not typically contain information that directly identifies an individual, but they may be linked to information you voluntarily provide to us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Types of Cookies We Use</h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies</h3>
                <p className="mb-2">
                  These cookies are necessary for the operation of the website and cannot be disabled through our systems.
                </p>
                <p className="mb-2">
                  They may be used for:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>User authentication.</li>
                  <li>Secure login sessions.</li>
                  <li>Fraud prevention.</li>
                  <li>Website security.</li>
                  <li>Form submissions.</li>
                  <li>Account management.</li>
                </ul>
                <p>
                  Without these cookies, certain parts of the website may not function properly.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Performance and Analytics Cookies</h3>
                <p className="mb-2">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <p className="mb-2">
                  They may collect information such as:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Pages visited.</li>
                  <li>Time spent on pages.</li>
                  <li>User navigation patterns.</li>
                  <li>Browser and device information.</li>
                  <li>Website performance metrics.</li>
                </ul>
                <p>
                  This information is used to improve platform performance and user experience.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Functionality Cookies</h3>
                <p className="mb-2">
                  These cookies allow the website to remember choices you make, such as:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Preferred language.</li>
                  <li>Login preferences.</li>
                  <li>Saved form information.</li>
                  <li>User interface settings.</li>
                </ul>
                <p>
                  These cookies enhance convenience and usability.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Marketing and Communication Cookies</h3>
                <p className="mb-2">
                  These cookies may be used to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Measure the effectiveness of marketing campaigns.</li>
                  <li>Understand user interests.</li>
                  <li>Provide relevant information about products and services.</li>
                  <li>Improve investor engagement.</li>
                </ul>
                <p>
                  ABZ Capital does not sell personal information to advertisers or third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Third-Party Services</h2>
                <p className="mb-4">
                  We may use trusted third-party service providers for:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Website analytics.</li>
                  <li>Customer support.</li>
                  <li>Security monitoring.</li>
                  <li>Email communication.</li>
                  <li>Platform performance monitoring.</li>
                </ul>
                <p>
                  These providers may use cookies or similar technologies in accordance with their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Managing Cookies</h2>
                <p className="mb-4">
                  Most web browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>View cookies.</li>
                  <li>Delete cookies.</li>
                  <li>Block cookies.</li>
                  <li>Restrict cookie usage.</li>
                </ul>
                <p>
                  Please note that disabling certain cookies may affect website functionality and user experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Communication Preferences</h2>
                <p className="mb-4">
                  As part of using ABZ Capital's services, you may receive communications related to your account, investments, applications, and platform activities.
                </p>
                <p>
                  Users may choose their preferred communication channels, including:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Email.</li>
                  <li>SMS.</li>
                  <li>Phone calls.</li>
                  <li>WhatsApp notifications (where available).</li>
                  <li>In-platform notifications.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Types of Communications</h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">Essential Service Communications</h3>
                <p className="mb-2">
                  These communications are necessary for providing services and may include:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Account verification.</li>
                  <li>Security alerts.</li>
                  <li>Password resets.</li>
                  <li>Transaction confirmations.</li>
                  <li>Investment updates.</li>
                  <li>Funding application updates.</li>
                  <li>Regulatory notices.</li>
                </ul>
                <p>
                  These communications cannot generally be opted out of while maintaining an active account.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Investment Opportunity Notifications</h3>
                <p className="mb-2">
                  Investors may choose to receive notifications regarding:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>New investment opportunities.</li>
                  <li>Lending pool openings.</li>
                  <li>SME financing opportunities.</li>
                  <li>Invoice financing opportunities.</li>
                  <li>Asset-backed investment opportunities.</li>
                  <li>Portfolio updates.</li>
                </ul>
                <p>
                  Users may opt in or out of these notifications at any time.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Educational and Market Updates</h3>
                <p className="mb-2">
                  Users may choose to receive:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Investment insights.</li>
                  <li>Market updates.</li>
                  <li>Industry reports.</li>
                  <li>Newsletters.</li>
                  <li>Educational content.</li>
                </ul>
                <p>
                  Participation in these communications is entirely optional.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Updating Communication Preferences</h2>
                <p className="mb-4">
                  Users may update their communication preferences at any time by:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Adjusting settings within their account.</li>
                  <li>Following unsubscribe instructions in emails.</li>
                  <li>Contacting ABZ Capital support.</li>
                </ul>
                <p>
                  Preference updates may take a reasonable period to become effective.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Data Protection</h2>
                <p className="mb-4">
                  Any information collected through cookies or communication preferences is handled in accordance with our Privacy Policy and applicable data protection laws.
                </p>
                <p>
                  ABZ Capital implements reasonable administrative, technical, and organizational measures to safeguard user information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="mb-4">
                  ABZ Capital may update this Cookie & Communication Preferences Policy from time to time.
                </p>
                <p>
                  Any changes will be published on this page with an updated effective date. Continued use of the platform following any updates constitutes acceptance of the revised policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="mb-4">
                  If you have questions regarding this Cookie & Communication Preferences Policy, please contact:
                </p>
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
