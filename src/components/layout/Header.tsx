"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronMark } from "@/components/brand/ChevronMark";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/invest", label: "Invest" },
  { href: "/fundraise", label: "Fundraise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Talk to us" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
                href="/products#asset-backed"
                className="inline-flex items-center justify-center rounded-lg bg-indigo px-4 py-2.5 text-sm font-semibold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/30"
              >
                Apply for a loan now
              </Link>
            </div>

          </div>
        </Container>
      </header>

    </>
  );
}

export default Header;
