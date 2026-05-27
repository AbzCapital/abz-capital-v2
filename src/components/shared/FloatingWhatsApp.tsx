"use client";

import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppButton";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(
        "Hello ABZ Capital, I'd like to chat with your team."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ABZ Capital on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-whatsapp)] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-whatsapp)]/40 sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon className="size-7" />
      <span className="absolute inset-0 rounded-full bg-[color:var(--color-whatsapp)] opacity-40 motion-safe:animate-ping" aria-hidden />
    </a>
  );
}

export default FloatingWhatsApp;
