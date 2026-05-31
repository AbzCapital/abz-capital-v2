"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SampleAlertButtonProps {
  onDesktopClick: () => void;
}

export function SampleAlertButton({ onDesktopClick }: SampleAlertButtonProps) {
  return (
    <>
      {/* Desktop: Button with modal */}
      <button
        onClick={onDesktopClick}
        className="hidden lg:flex rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 items-center justify-center gap-2 cursor-pointer active:scale-95"
      >
        See Sample Funding Alert
        <ArrowRight className="size-4" />
      </button>

      {/* Mobile: Link to alert page */}
      <Link
        href="/alert"
        className="lg:hidden rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
      >
        See Sample Funding Alert
        <ArrowRight className="size-4" />
      </Link>
    </>
  );
}
