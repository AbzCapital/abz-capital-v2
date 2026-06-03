"use client";

import { useEffect, useState } from "react";
import { LendingPoolForm } from "./LendingPoolForm";
import { LendingPoolFormMobile } from "./LendingPoolFormMobile";

export function LendingPoolFormWrapper() {
  const isMobileUserAgent =
    typeof navigator !== "undefined" &&
    /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
  const [isMobile, setIsMobile] = useState<boolean>(isMobileUserAgent || true);

  useEffect(() => {
    const isMobileDevice = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
    const isSmallWindow = window.innerWidth < 768;

    setIsMobile(isMobileDevice || isSmallWindow);

    const handleResize = () => {
      const nowSmall = window.innerWidth < 768;
      setIsMobile(isMobileDevice || nowSmall);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Always use FormMobile - it has proper React fetch handling
  return <LendingPoolFormMobile />;
}
