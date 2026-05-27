import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

export interface WhatsAppButtonProps {
  message: string;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

const variantMap = {
  solid:
    "bg-[color:var(--color-whatsapp)] text-white hover:brightness-95 shadow-[0_4px_12px_rgba(37,211,102,0.3)]",
  outline:
    "border border-[color:var(--color-whatsapp)] text-[color:var(--color-whatsapp)] hover:bg-[color:var(--color-whatsapp)]/5",
  ghost:
    "text-[color:var(--color-whatsapp)] hover:bg-[color:var(--color-whatsapp)]/10",
};

const sizeMap = {
  sm: "text-xs px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2.5",
};

export function WhatsAppButton({
  message,
  className,
  variant = "solid",
  size = "md",
  children,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-whatsapp)]/40",
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      <WhatsAppIcon className="size-4" />
      {children ?? "Chat on WhatsApp"}
    </a>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("inline-block", className)} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.4-1.5c-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5s0-.4 0-.5c-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.1-1.4 0-.1-.2-.2-.5-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.3.8.8-3.2-.2-.3C3.7 14.7 3.4 13.4 3.4 12c0-4.7 3.8-8.5 8.5-8.5 4.7 0 8.5 3.8 8.5 8.5.1 4.7-3.7 8.6-8.4 8.7z" />
    </svg>
  );
}

export default WhatsAppButton;
