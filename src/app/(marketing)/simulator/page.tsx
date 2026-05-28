import type { Metadata } from "next";
import { SimulatorPageContent } from "@/components/simulator/SimulatorPageContent";

export const metadata: Metadata = {
  title: "View Loan Terms & Schedule — ABZ Capital",
  description:
    "Simulate your loan schedule instantly. See exactly how much you'll pay each month, total interest, and full repayment schedule.",
};

export default function SimulatorPage() {
  return <SimulatorPageContent />;
}
