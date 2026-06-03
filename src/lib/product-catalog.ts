export type LeadCategory =
  | "loans"
  | "sme"
  | "contractor"
  | "insurance"
  | "funding"
  | "invest"
  | "contact";

export type ProductCategoryKey = "asset-backed" | "sme" | "contractor" | "insurance";

export interface ProductCategory {
  key: ProductCategoryKey;
  anchor: string;
  title: string;
  blurb: string;
  emailRoute: LeadCategory;
  emailRecipient: string;
}

export interface Product {
  slug: string;
  title: string;
  category: ProductCategoryKey;
  description: string;
  highlights?: string[];
  hasSimulator?: boolean;
  imageUrl: string;
  termLabel: string;
}

export const CATEGORIES: ProductCategory[] = [
  {
    key: "asset-backed",
    anchor: "asset-backed",
    title: "Asset-backed loans",
    blurb:
      "Borrow against logbooks, title deeds, or government bonds. Asset-backed, transparent, fast.",
    emailRoute: "loans",
    emailRecipient: "loans@abzcapital.co.ke",
  },
  {
    key: "sme",
    anchor: "sme",
    title: "SME financing",
    blurb:
      "Working capital, expansion funding, and investor linkage for Kenyan SMEs ready to scale.",
    emailRoute: "sme",
    emailRecipient: "loans@abzcapital.co.ke",
  },
  {
    key: "contractor",
    anchor: "contractor",
    title: "Contractor financial solutions",
    blurb:
      "Bonds, guarantees, and contractor insurance — built for builders, fabricators, and project teams.",
    emailRoute: "contractor",
    emailRecipient: "cover@abzcapital.co.ke",
  },
  {
    key: "insurance",
    anchor: "insurance",
    title: "Insurance solutions",
    blurb:
      "Cover for vehicles, workers, health, and travel — backed by ABZ&rsquo;s risk team.",
    emailRoute: "insurance",
    emailRecipient: "cover@abzcapital.co.ke",
  },
];

export const PRODUCTS: Product[] = [
  // Asset-backed
  {
    slug: "logbook-loan",
    title: "Logbook Loan",
    category: "asset-backed",
    description:
      "Borrow against your vehicle logbook. Keep driving while you repay.",
    highlights: ["1–6 month terms", "KES 50K – 5M"],
    hasSimulator: true,
    termLabel: "1–6 mo",
    imageUrl: "/images/products/Logbook Loan.jpg",
  },
  {
    slug: "title-deed-loan",
    title: "Title Deed Loan",
    category: "asset-backed",
    description:
      "Unlock equity from your land or property with a registered charge. Competitive rates, structured terms.",
    highlights: ["Up to 60% LTV", "Flexible tenor"],
    termLabel: "3–24 mo",
    imageUrl: "/images/products/Title Deed Loan.jpg",
  },
  {
    slug: "bond-backed-lending",
    title: "Bond-Backed Lending",
    category: "asset-backed",
    description:
      "Use Treasury bonds and corporate notes as collateral for liquidity without selling the position.",
    highlights: ["High LTV", "Same-week disbursal"],
    termLabel: "Flexible",
    imageUrl: "/images/products/Bond-backed lending.jpg",
  },

  // SME
  {
    slug: "working-capital",
    title: "Working Capital Financing",
    category: "sme",
    description:
      "Cover payroll, stock, or short-term gaps with a structured working capital line tailored to your cycle.",
    highlights: ["30–180 day cycles", "Recurring availability"],
    termLabel: "30–180 days",
    imageUrl: "/images/products/Working Capital financing.jpg",
  },
  {
    slug: "business-expansion",
    title: "Business Expansion Financing",
    category: "sme",
    description:
      "Scale operations, open new locations, or finance equipment with disciplined growth capital.",
    highlights: ["CAPEX-aligned", "1–4 year tenor"],
    termLabel: "1–4 years",
    imageUrl: "/images/products/Business Expansion Finance.jpg",
  },
  {
    slug: "investor-linkage",
    title: "Investor Linkage Services",
    category: "sme",
    description:
      "We connect vetted SMEs with our investor network — equity, debt, or structured rounds.",
    highlights: ["Vetted matchmaking", "Deal structuring support"],
    termLabel: "By deal",
    imageUrl: "/images/products/Investor Linkage sevices.jpg",
  },

  // Contractor
  {
    slug: "performance-bonds",
    title: "Performance Bonds",
    category: "contractor",
    description:
      "Secure contract performance with bonds underwritten by approved insurers, issued fast.",
    highlights: ["Up to 10% of contract", "Same-week issuance"],
    termLabel: "Per contract",
    imageUrl: "/images/products/Performance Bonds.jpg",
  },
  {
    slug: "bid-bonds",
    title: "Bid Bonds",
    category: "contractor",
    description:
      "Tender-ready bid bonds delivered in days. Strengthen every proposal you submit.",
    highlights: ["Tender-compliant", "Fast turnaround"],
    termLabel: "Tender period",
    imageUrl: "/images/products/Bid Bonds.jpg",
  },
  {
    slug: "advance-payment-guarantees",
    title: "Advance Payment Guarantees",
    category: "contractor",
    description:
      "Unlock mobilisation funds with employer-trusted advance payment guarantees.",
    highlights: ["Mobilisation cover", "Per-employer terms"],
    termLabel: "Project term",
    imageUrl: "/images/products/Advance Payment Guarantee.jpg",
  },
  {
    slug: "contractors-all-risk",
    title: "Contractor's All Risk Insurance",
    category: "contractor",
    description:
      "Comprehensive cover for works, materials, equipment, and third-party liability on site.",
    highlights: ["Works + plant cover", "Third-party liability"],
    termLabel: "Project term",
    imageUrl: "/images/products/Contractors's All Risk Insurance.jpg",
  },
  {
    slug: "bank-guarantees",
    title: "Bank Guarantees",
    category: "contractor",
    description:
      "Bank-backed guarantees structured for tenders, performance, payment, or retention.",
    highlights: ["Flexible structures", "Tier-1 issuance"],
    termLabel: "Per use",
    imageUrl: "/images/products/Bank Guarantees.jpg",
  },

  // Insurance
  {
    slug: "motor-vehicle-insurance",
    title: "Motor Vehicle Insurance",
    category: "insurance",
    description:
      "Comprehensive and third-party motor cover with seamless claims handling.",
    highlights: ["Comprehensive / TPO", "24/7 claims"],
    termLabel: "12 months",
    imageUrl: "/images/products/Motor Vehicle Insurance.jpg",
  },
  {
    slug: "wiba-insurance",
    title: "WIBA Insurance",
    category: "insurance",
    description:
      "Workplace Injury Benefit Act cover — statutorily required, properly structured.",
    highlights: ["Statutory compliance", "Per-employee pricing"],
    termLabel: "12 months",
    imageUrl: "/images/products/WIBA Insurance.jpg",
  },
  {
    slug: "medical-insurance",
    title: "Medical Insurance",
    category: "insurance",
    description:
      "Individual, family, and corporate medical schemes with curated provider networks.",
    highlights: ["Inpatient + outpatient", "Dental &amp; optical add-ons"],
    termLabel: "12 months",
    imageUrl: "/images/products/Medical Insurance.jpg",
  },
  {
    slug: "travel-insurance",
    title: "Travel Insurance",
    category: "insurance",
    description:
      "Schengen-compliant and global travel cover for business, leisure, and study trips.",
    highlights: ["Schengen-compliant", "Single &amp; multi-trip"],
    termLabel: "Per trip",
    imageUrl: "/images/products/Travel Insurance.jpg",
  },
  {
    slug: "personal-accident-cover",
    title: "Personal Accident Cover",
    category: "insurance",
    description:
      "24/7 personal accident cover — income protection if life takes an unexpected turn.",
    highlights: ["24/7 worldwide", "Lump-sum payouts"],
    termLabel: "12 months",
    imageUrl: "/images/products/Personal Accident Cover.jpg",
  },
];

export function productsByCategory(key: ProductCategoryKey): Product[] {
  return PRODUCTS.filter((p) => p.category === key);
}

export function categoryFor(key: ProductCategoryKey): ProductCategory {
  const cat = CATEGORIES.find((c) => c.key === key);
  if (!cat) throw new Error(`Unknown product category: ${key}`);
  return cat;
}
