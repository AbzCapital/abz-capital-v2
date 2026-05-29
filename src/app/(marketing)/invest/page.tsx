import type { Metadata } from "next";
import { InvestPageClient } from "@/components/invest/InvestPageClient";

export const metadata: Metadata = {
  title: "Invest with ABZ",
  description:
    "Two investor tracks: secured asset-backed lending pools or SME & innovation deals — vetted, structured, transparent.",
};

export default function InvestPage() {
  return <InvestPageClient />;
}
