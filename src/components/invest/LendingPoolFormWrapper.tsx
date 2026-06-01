"use client";

import { useEffect, useState } from "react";
import { LendingPoolForm } from "./LendingPoolForm";
import { LendingPoolFormMobile } from "./LendingPoolFormMobile";

export function LendingPoolFormWrapper() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Detect if device is mobile based on user agent
    const isMobileDevice = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );

    setIsMobile(isMobileDevice);

    // Also listen for window resize (responsive design)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render nothing until client-side detection is done
  if (!isClient) {
    return null;
  }

  // Render appropriate form based on device type
  if (isMobile) {
    return <LendingPoolFormMobile />;
  }

  return <LendingPoolForm />;
}
