import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const categorySchema = z.object({
  key: z.string().min(1).max(50),
  title: z.string().min(1).max(100),
  blurb: z.string().min(1).max(500),
  anchor: z.string().min(1).max(100),
  emailRecipient: z.string().email(),
});
export type CategoryInput = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(160),
  description: z.string().min(10).max(500),
  imageUrl: z.string().url(),
  termLabel: z.string().min(1).max(50),
  highlights: z.array(z.string()).optional(),
  hasSimulator: z.boolean().optional(),
  categoryId: z.string().min(1),
});
export type ProductInput = z.infer<typeof productSchema>;

export const loanConfigSchema = z.object({
  valuationFee: z.number().int().min(0),
  legalFee: z.number().int().min(0),
  processingFee: z.number().int().min(0),
  logbookTransferFee: z.number().int().min(0),
  trackerFee: z.number().int().min(0),
  monthlyRate: z.number().min(0).max(1),
  minMonths: z.number().int().min(1),
  maxMonths: z.number().int().min(1),
});
export type LoanConfigInput = z.infer<typeof loanConfigSchema>;

export const emailConfigSchema = z.object({
  categoryLoans: z.string().email(),
  categoryInsurance: z.string().email(),
  categoryInvest: z.string().email(),
  categoryGeneral: z.string().email(),
});
export type EmailConfigInput = z.infer<typeof emailConfigSchema>;
