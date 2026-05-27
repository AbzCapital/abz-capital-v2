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
      "Borrow against your vehicle logbook with 6% monthly reducing balance. Keep driving while you repay.",
    highlights: ["1–6 month terms", "KES 50K – 5M"],
    hasSimulator: true,
    termLabel: "1–6 mo",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "title-deed-loan",
    title: "Title Deed Loan",
    category: "asset-backed",
    description:
      "Unlock equity from your land or property with a registered charge. Competitive rates, structured terms.",
    highlights: ["Up to 60% LTV", "Flexible tenor"],
    termLabel: "3–24 mo",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "bond-backed-lending",
    title: "Bond-Backed Lending",
    category: "asset-backed",
    description:
      "Use Treasury bonds and corporate notes as collateral for liquidity without selling the position.",
    highlights: ["High LTV", "Same-week disbursal"],
    termLabel: "Flexible",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70",
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
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "business-expansion",
    title: "Business Expansion Financing",
    category: "sme",
    description:
      "Scale operations, open new locations, or finance equipment with disciplined growth capital.",
    highlights: ["CAPEX-aligned", "1–4 year tenor"],
    termLabel: "1–4 years",
    imageUrl:
      "https://images.unsplash.com/photo-1664575602807-e0fe26a3a0eb?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "investor-linkage",
    title: "Investor Linkage Services",
    category: "sme",
    description:
      "We connect vetted SMEs with our investor network — equity, debt, or structured rounds.",
    highlights: ["Vetted matchmaking", "Deal structuring support"],
    termLabel: "By deal",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=70",
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
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "bid-bonds",
    title: "Bid Bonds",
    category: "contractor",
    description:
      "Tender-ready bid bonds delivered in days. Strengthen every proposal you submit.",
    highlights: ["Tender-compliant", "Fast turnaround"],
    termLabel: "Tender period",
    imageUrl:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "advance-payment-guarantees",
    title: "Advance Payment Guarantees",
    category: "contractor",
    description:
      "Unlock mobilisation funds with employer-trusted advance payment guarantees.",
    highlights: ["Mobilisation cover", "Per-employer terms"],
    termLabel: "Project term",
    imageUrl:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "contractors-all-risk",
    title: "Contractor's All Risk Insurance",
    category: "contractor",
    description:
      "Comprehensive cover for works, materials, equipment, and third-party liability on site.",
    highlights: ["Works + plant cover", "Third-party liability"],
    termLabel: "Project term",
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "bank-guarantees",
    title: "Bank Guarantees",
    category: "contractor",
    description:
      "Bank-backed guarantees structured for tenders, performance, payment, or retention.",
    highlights: ["Flexible structures", "Tier-1 issuance"],
    termLabel: "Per use",
    imageUrl:
      "https://images.unsplash.com/photo-1554224154-26032cdc0f25?auto=format&fit=crop&w=800&q=70",
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
    imageUrl:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "wiba-insurance",
    title: "WIBA Insurance",
    category: "insurance",
    description:
      "Workplace Injury Benefit Act cover — statutorily required, properly structured.",
    highlights: ["Statutory compliance", "Per-employee pricing"],
    termLabel: "12 months",
    imageUrl:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "medical-insurance",
    title: "Medical Insurance",
    category: "insurance",
    description:
      "Individual, family, and corporate medical schemes with curated provider networks.",
    highlights: ["Inpatient + outpatient", "Dental &amp; optical add-ons"],
    termLabel: "12 months",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "travel-insurance",
    title: "Travel Insurance",
    category: "insurance",
    description:
      "Schengen-compliant and global travel cover for business, leisure, and study trips.",
    highlights: ["Schengen-compliant", "Single &amp; multi-trip"],
    termLabel: "Per trip",
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=70",
  },
  {
    slug: "personal-accident-cover",
    title: "Personal Accident Cover",
    category: "insurance",
    description:
      "24/7 personal accident cover — income protection if life takes an unexpected turn.",
    highlights: ["24/7 worldwide", "Lump-sum payouts"],
    termLabel: "12 months",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=70",
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
