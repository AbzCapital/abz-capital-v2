import { z } from "zod";

const kePhone = z
  .string()
  .trim()
  .min(7, "Phone number is too short")
  .max(20, "Phone number is too long")
  .regex(/^[+\d][\d\s\-()]*$/, "Phone number contains invalid characters");

const baseLead = {
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Invalid email address").max(160),
  phone: kePhone,
  _hp: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
};

export const contactSchema = z.object({
  ...baseLead,
  subject: z.string().trim().min(2).max(180),
  message: z.string().trim().min(10, "Tell us a bit more — at least 10 characters").max(4000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const investorSchema = z.object({
  ...baseLead,
  track: z.enum(["asset-backed", "sme-innovation"], {
    message: "Choose an investor track",
  }),
  ticket: z.enum(["<500K", "500K-2M", "2M-10M", ">10M"], {
    message: "Choose a ticket size band",
  }),
  notes: z.string().trim().max(4000).optional(),
});
export type InvestorInput = z.infer<typeof investorSchema>;

export const fundingSchema = z.object({
  ...baseLead,
  fundingCategory: z.enum(["asset-backed", "sme", "contractor", "investment"], {
    message: "Pick a category",
  }),
  opportunityType: z.enum(["equity", "debt", "working-capital", "other"], {
    message: "Pick an opportunity type",
  }),
  description: z.string().trim().min(20, "Add at least a short description").max(4000),
});
export type FundingInput = z.infer<typeof fundingSchema>;

export const productEnquirySchema = z.object({
  ...baseLead,
  productSlug: z.string().trim().min(1).max(120),
  productTitle: z.string().trim().min(1).max(160),
  message: z.string().trim().max(4000).optional().default(""),
});
export type ProductEnquiryInput = z.infer<typeof productEnquirySchema>;
