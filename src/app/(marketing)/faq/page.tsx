import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const metadata: Metadata = {
  title: "FAQ - ABZ Capital",
  description: "Frequently Asked Questions about ABZ Capital investment products and platform.",
};

const faqCategories = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is ABZ Capital?",
        answer:
          "ABZ Capital is a financial technology platform that connects investors with vetted investment opportunities. We facilitate structured financing, investment, and insurance solutions for individuals, SMEs, and institutions across emerging markets. Our platform specializes in loan syndication, SME/startup funding, and alternative investment products.",
      },
      {
        question: "How do I register as an investor?",
        answer:
          "Registration is straightforward: Visit our Invest page, select either 'Lending Pool' or 'Innovation & SME Deals', fill in your details (name, email, phone, investment amount), verify your information, and submit. You'll receive a confirmation email and can start exploring opportunities immediately.",
      },
      {
        question: "What documents do I need to provide?",
        answer:
          "For investor registration, we require: valid government-issued ID, proof of address (recent utility bill or bank statement), and banking details for transfers. For larger investments, we may request additional documentation such as proof of funds source for compliance purposes.",
      },
      {
        question: "Is there a minimum investment amount?",
        answer:
          "Yes, minimum investment amounts vary by product: Lending Pool starts at KES 100,000, and SME/Innovation deals have varying minimums depending on the specific opportunity (typically KES 250,000 to KES 1,000,000).",
      },
    ],
  },
  {
    title: "Lending Pool",
    items: [
      {
        question: "How does the Lending Pool work?",
        answer:
          "The Lending Pool allows you to fund vetted loans directly. We identify loan opportunities, perform rigorous underwriting and risk assessment, and invite investors to participate. Your funds are pooled with other investors to fund approved loans. Monthly, you receive payments as borrowers repay their loans.",
      },
      {
        question: "What returns can I expect from the Lending Pool?",
        answer:
          "Our lending pool targets up to 24% per annum (approximately 2% monthly) in returns, depending on the loan category and risk profile. Returns are distributed monthly as borrowers make repayments. Past performance does not guarantee future results.",
      },
      {
        question: "How is my money protected in the Lending Pool?",
        answer:
          "Your investment is protected through multiple layers: (1) Rigorous underwriting and loan scoring, (2) Collateral backing (conservative LTV ratios), (3) GPS tracking on vehicle collateral, (4) Comprehensive insurance coverage, and (5) You are appointed as the nominee to the collateral and first beneficiary on insurance claims.",
      },
      {
        question: "What loan categories are available?",
        answer:
          "We offer various loan categories including Logbook Loans (vehicle-backed), Title Deed Loans (property-backed), Invoice Financing (business receivables), and other secured lending products. Each category has different risk profiles and return potential.",
      },
      {
        question: "Can I withdraw my investment early?",
        answer:
          "The Lending Pool operates on a committed investment model. Once you invest in a loan, your capital is committed for the loan term (typically 6-36 months depending on the loan product). Early withdrawal may not be possible; however, you can request a secondary market transfer if available.",
      },
    ],
  },
  {
    title: "SME & Innovation Funding",
    items: [
      {
        question: "What types of investments are available in SME & Innovation Deals?",
        answer:
          "We offer diversified structures including equity investments (ownership stakes), debt investments (loans with fixed returns), and hybrid structures (combination of equity and debt). Each deal is curated and structured based on the SME or startup's needs and our investors' preferences.",
      },
      {
        question: "How are investment opportunities selected?",
        answer:
          "Our deal team performs extensive due diligence including: market analysis, management team assessment, financial projections review, competitive landscape analysis, and risk evaluation. We only present opportunities that meet our strict investment criteria and fit investor risk profiles.",
      },
      {
        question: "What information do I receive about SMEs before investing?",
        answer:
          "You receive comprehensive deal documentation including: executive summary, business plan, financial statements, management bios, market opportunity analysis, investment structure details, and risk factors. This allows you to make informed investment decisions.",
      },
      {
        question: "How long is a typical SME investment lock-up period?",
        answer:
          "Lock-up periods vary by investment: debt investments typically have 1-3 year terms, while equity investments may have longer hold periods (3-7 years) with potential exit opportunities through acquisition or secondary sales.",
      },
    ],
  },
  {
    title: "Safety & Risk",
    items: [
      {
        question: "Is my investment insured?",
        answer:
          "For lending pool investments, all vehicle collateral is covered by comprehensive insurance where you are the first beneficiary on claims. For SME investments, coverage depends on the investment structure. Detailed insurance information is provided with each opportunity.",
      },
      {
        question: "What happens if a borrower defaults?",
        answer:
          "In case of default, we initiate our recovery process: (1) We communicate with the borrower, (2) We liquidate the collateral (if applicable), (3) You receive proceeds as the nominee on the collateral, (4) We pursue any remaining claims through legal channels if necessary.",
      },
      {
        question: "How do I know my collateral is really there?",
        answer:
          "All collateral is independently valued, registered in your name as nominee, and monitored throughout the loan term. Vehicle collateral includes GPS tracking, and property collateral is verified through government records. You receive regular performance updates.",
      },
      {
        question: "What is your loan approval rate?",
        answer:
          "Our approval process is rigorous: we evaluate each loan application through our scoring system, conduct background checks, verify collateral, and assess repayment capacity. Typically, we approve 15-25% of applications to maintain high portfolio quality.",
      },
      {
        question: "How do you prevent fraud?",
        answer:
          "We employ multiple fraud prevention measures: identity verification, collateral inspection and valuation, background checks, GPS tracking on vehicles, comprehensive insurance, and nominee structure protection. Additionally, we maintain relationships with credit bureaus and government agencies for verification.",
      },
    ],
  },
  {
    title: "Returns & Payments",
    items: [
      {
        question: "When do I receive my returns?",
        answer:
          "For Lending Pool: Monthly, as borrowers make repayments. You can view your earnings in real-time on your dashboard. For SME investments: Return timing depends on the structure (monthly dividend payments, annual distributions, or exit proceeds).",
      },
      {
        question: "How are returns calculated?",
        answer:
          "Your returns are based on the amount invested and the loan rate. For example: If you invest KES 1,000,000 in a 2% monthly loan, your monthly return is KES 20,000 (before any platform fees). Returns are calculated daily and distributed according to the payment schedule.",
      },
      {
        question: "Are there fees?",
        answer:
          "Yes, we charge transparent platform fees: typically 0.5-1.5% on returns for lending pool products. A detailed fee schedule is provided at investment time. All fees are deducted from your returns; your principal investment is never charged directly.",
      },
      {
        question: "How do I receive my payments?",
        answer:
          "Payments are deposited directly to your registered bank account on the scheduled payment date. You can view payment history, download statements, and track transfers through your investor dashboard.",
      },
    ],
  },
  {
    title: "Account Management",
    items: [
      {
        question: "How do I track my investments?",
        answer:
          "Your investor dashboard provides real-time visibility: portfolio overview, individual investment details, payment history, performance metrics, and earnings summaries. You can also download detailed statements and tax documents.",
      },
      {
        question: "Can I update my investment preferences?",
        answer:
          "Yes, you can update your preferences in your account settings. Changes take effect for new investment opportunities going forward. Existing investments are not affected by preference updates.",
      },
      {
        question: "How do I withdraw my earnings?",
        answer:
          "Earnings are automatically deposited to your registered bank account on payment dates. You don't need to take any action to receive distributions. You can view your payment schedule and upcoming earnings in your dashboard.",
      },
      {
        question: "Can I request a break in my investment?",
        answer:
          "For Lending Pool, investments are committed for the full loan term. You cannot pause or break the investment during this period. Once the loan term ends, your principal is returned to you. For SME investments, terms are specified in the investment agreement.",
      },
      {
        question: "How do I contact support?",
        answer:
          "You can reach our team via: Email to hello@abzcapital.co.ke for general inquiries, or through the contact form on our website. For investor-specific support, use your dashboard to submit a support ticket. Response time is typically within 24 business hours.",
      },
    ],
  },
  {
    title: "Legal & Compliance",
    items: [
      {
        question: "Is ABZ Capital regulated?",
        answer:
          "ABZ Capital operates in compliance with Kenyan regulations. We adhere to capital markets regulations, anti-money laundering (AML) requirements, and know-your-customer (KYC) standards. Our platform is designed to meet regulatory standards while providing competitive returns.",
      },
      {
        question: "What happens if I want to close my account?",
        answer:
          "You can request account closure at any time. Ongoing investments will continue until maturity, and you'll receive all due returns. After all positions are closed, your account can be fully closed. No penalties are applied for account closure.",
      },
      {
        question: "Are my investments protected by law?",
        answer:
          "Your investments are protected through: (1) The nominee and collateral structure (you own the collateral), (2) Comprehensive contracts outlining your rights, (3) Compliance with Kenyan investment regulations, (4) Insurance on eligible collateral.",
      },
      {
        question: "How is my data protected?",
        answer:
          "We implement enterprise-grade security: SSL/TLS encryption, secure authentication, regular security audits, and compliance with data protection standards. Your personal and financial information is never shared without your consent. See our Privacy Policy for complete details.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-ink mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-ink">
                Find answers to common questions about ABZ Capital investments, returns, safety, and account management.
              </p>
            </div>

            <div className="space-y-12">
              {faqCategories.map((category) => (
                <div key={category.title}>
                  <h2 className="text-2xl font-bold text-ink mb-6">{category.title}</h2>
                  <div className="space-y-4">
                    {category.items.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg px-6 py-4">
                        <h3 className="text-lg font-semibold text-ink mb-3">{item.question}</h3>
                        <p className="text-muted-ink leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl bg-blue-700/10 border border-blue-700/20 p-8">
              <h3 className="text-xl font-bold text-ink mb-3">Still have questions?</h3>
              <p className="text-muted-ink mb-6">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <a
                href="mailto:hello@abzcapital.co.ke"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-white font-semibold hover:brightness-110 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
