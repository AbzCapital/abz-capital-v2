import { Hero } from "@/components/home/Hero";
import { ValueCards } from "@/components/home/ValueCards";
import { WhyABZ } from "@/components/home/WhyABZ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueCards />
      <WhyABZ />
      <FinalCTA />
    </>
  );
}
