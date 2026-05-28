import type { Metadata } from "next";
import { LoanSummaryContent } from "@/components/loan-summary/LoanSummaryContent";

export const metadata: Metadata = {
  title: "Loan Summary & Schedule — ABZ Capital",
  description:
    "View your loan summary, payment schedule, and download PDF of your repayment plan.",
};

export default function LoanSummaryPage() {
  return <LoanSummaryContent />;
}
