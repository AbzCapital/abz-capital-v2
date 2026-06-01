"use client";

import { useEffect, useState } from "react";
import { InvestorNetworkForm } from "./InvestorNetworkForm";
import { InvestorNetworkFormMobile } from "./InvestorNetworkFormMobile";

export function InvestorNetworkFormWrapper() {
  // Mobile-first: default to mobile form, only switch to desktop if needed
  const isMobileUserAgent = typeof navigator !== "undefined" && /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(navigator.userAgent);
  const [isMobile, setIsMobile] = useState<boolean>(isMobileUserAgent || true);

  useEffect(() => {
    // Detect if device is mobile based on user agent AND window size
    const isMobileDevice = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
    const isSmallWindow = window.innerWidth < 768; // md breakpoint in Tailwind

    // Use mobile form if either mobile user agent OR small window
    setIsMobile(isMobileDevice || isSmallWindow);

    console.log("🔍 InvestorNetworkFormWrapper - Device detection:", {
      userAgent: navigator.userAgent,
      isMobileUA: isMobileDevice,
      windowWidth: window.innerWidth,
      isSmallWindow: isSmallWindow,
      renderingMobile: isMobileDevice || isSmallWindow,
    });

    // Listen for window resize
    const handleResize = () => {
      const nowSmall = window.innerWidth < 768;
      setIsMobile(isMobileDevice || nowSmall);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Always render a form (never return null) - mobile-first approach
  if (isMobile) {
    return <InvestorNetworkFormMobile />;
  }

  return <InvestorNetworkForm />;
}
