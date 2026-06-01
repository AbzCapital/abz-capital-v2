"use client";

import { useEffect, useState } from "react";
import { FundingOpportunityForm } from "./FundingOpportunityForm";
import { FundingOpportunityFormHTML } from "./FundingOpportunityFormHTML";

export function FundingOpportunityFormWrapper() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isNarrowScreen = window.innerWidth < 768;
      setIsMobile(isMobileUA || isNarrowScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return isMobile ? <FundingOpportunityFormHTML /> : <FundingOpportunityForm />;
}
