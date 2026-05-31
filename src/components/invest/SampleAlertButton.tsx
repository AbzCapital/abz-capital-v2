"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface SampleAlertButtonProps {
  onDesktopClick: () => void;
}

export function SampleAlertButton({ onDesktopClick }: SampleAlertButtonProps) {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const handleClick = () => {
    if (isDesktop) {
      onDesktopClick();
    } else {
      router.push("/alert");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
    >
      See Sample Funding Alert
      <ArrowRight className="size-4" />
    </button>
  );
}
