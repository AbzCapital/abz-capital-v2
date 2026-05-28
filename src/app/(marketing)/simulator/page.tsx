import type { Metadata } from "next";
import { SimulatorPageContent } from "@/components/simulator/SimulatorPageContent";

export const metadata: Metadata = {
  title: "Loan Calculator — ABZ Capital",
  description:
    "Calculate your loan terms instantly. See monthly payments, interest, and schedule for ABZ Capital products.",
};

export default function SimulatorPage() {
  return <SimulatorPageContent />;
}
