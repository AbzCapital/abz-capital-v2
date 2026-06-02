import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InvestorTrackCardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  href?: string;
  variant?: "indigo" | "peach";
}

export function InvestorTrackCard({
  icon: Icon,
  label,
  title,
  description,
  bullets,
  href = "#invest-interest",
  variant = "indigo",
}: InvestorTrackCardProps) {
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl p-8 shadow-elev sm:p-10",
        variant === "indigo"
          ? "bg-blue-500 text-white"
          : "bg-[#fff5e3] text-ink"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute right-[-30px] top-[-30px] size-44 rounded-full blur-3xl",
          variant === "indigo" ? "bg-peach/30" : "bg-blue-500/20"
        )}
      />

      <span
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-xl",
          variant === "indigo" ? "bg-peach text-blue-500" : "bg-blue-500 text-white"
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>

      <span
        className={cn(
          "mt-6 text-xs font-semibold uppercase tracking-widest",
          variant === "indigo" ? "text-peach" : "text-blue-500"
        )}
      >
        {label}
      </span>
      <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h3>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed sm:text-base",
          variant === "indigo" ? "text-white/80" : "text-muted-ink"
        )}
      >
        {description}
      </p>

      <ul className="mt-6 grid gap-3 text-sm">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span
              className={cn(
                "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                variant === "indigo"
                  ? "bg-white/15 text-peach"
                  : "bg-blue-500 text-white"
              )}
              aria-hidden
            >
              ✓
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={cn(
          "mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition",
          variant === "indigo"
            ? "bg-peach text-blue-500 hover:brightness-105"
            : "bg-blue-500 text-white hover:brightness-110"
        )}
      >
        Register interest
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </article>
  );
}

export default InvestorTrackCard;
