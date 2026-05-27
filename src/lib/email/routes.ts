import type { LeadCategory } from "@/lib/product-catalog";

export const CATEGORY_ROUTES: Record<LeadCategory, string> = {
  loans: process.env.LEAD_EMAIL_LOANS || "loans@abzcapital.co.ke",
  sme: process.env.LEAD_EMAIL_LOANS || "loans@abzcapital.co.ke",
  contractor: process.env.LEAD_EMAIL_COVER || "cover@abzcapital.co.ke",
  insurance: process.env.LEAD_EMAIL_COVER || "cover@abzcapital.co.ke",
  funding: process.env.LEAD_EMAIL_INVEST || "invest@abzcapital.co.ke",
  invest: process.env.LEAD_EMAIL_INVEST || "invest@abzcapital.co.ke",
  contact: process.env.LEAD_EMAIL_HELLO || "hello@abzcapital.co.ke",
};

export const CATEGORY_LABELS: Record<LeadCategory, string> = {
  loans: "Asset-backed loan enquiry",
  sme: "SME financing enquiry",
  contractor: "Contractor financial solutions enquiry",
  insurance: "Insurance enquiry",
  funding: "Funding opportunity submission",
  invest: "Investor interest",
  contact: "General enquiry",
};

export function isLeadCategory(value: string): value is LeadCategory {
  return value in CATEGORY_ROUTES;
}
