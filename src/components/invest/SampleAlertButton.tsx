"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface SampleAlertButtonProps {
  onDesktopClick: () => void;
}

export function SampleAlertButton({ onDesktopClick }: SampleAlertButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Check window size at click time (not state-based) to avoid hydration issues
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
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
