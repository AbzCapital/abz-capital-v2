"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ChevronMark } from "@/components/brand/ChevronMark";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/invest", label: "Invest" },
  { href: "/funding", label: "Funding" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Talk to us" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes (legitimate use of setState in effect)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent bg-white/85 backdrop-blur transition-all",
        scrolled && "border-line shadow-sm"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 focus:outline-none"
            aria-label="ABZ Capital home"
          >
            <ChevronMark size={34} className="transition-transform group-hover:scale-105" />
            <span className="text-[19px] font-extrabold tracking-tight text-indigo leading-none sm:text-xl">
              ABZ Capital
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium text-ink/80 transition hover:text-indigo",
                    active && "text-indigo"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-peach" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex">
            <Link
              href="/funding"
              className="inline-flex items-center justify-center rounded-lg bg-indigo px-4 py-2.5 text-sm font-semibold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/30"
            >
              Apply now
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-indigo/5 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "border-t border-line bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <Container className="py-6">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition",
                    active
                      ? "bg-indigo/5 text-indigo"
                      : "text-ink/80 hover:bg-indigo/5 hover:text-indigo"
                  )}
                >
                  {item.label}
                  <span aria-hidden>→</span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/funding"
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-indigo px-4 py-3 text-base font-semibold text-white shadow-button"
          >
            Apply now
          </Link>
        </Container>
      </div>
    </header>
  );
}

export default Header;
