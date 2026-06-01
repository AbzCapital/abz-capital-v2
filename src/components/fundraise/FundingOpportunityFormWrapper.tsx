"use client";

import { useEffect, useState } from "react";
import { FundingOpportunityForm } from "./FundingOpportunityForm";
import { FundingOpportunityFormHTML } from "./FundingOpportunityFormHTML";

export function FundingOpportunityFormWrapper() {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile (safe fallback)
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

  // Always render - default to mobile form (works on all devices)
  // Switch to desktop form only when mounted and confirmed desktop
  return isMobile || !mounted ? <FundingOpportunityFormHTML /> : <FundingOpportunityForm />;
}
