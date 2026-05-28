"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, TrendingUp, Calculator, PhoneCall, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/products", icon: ShoppingBag, label: "Products" },
  { href: "/simulator", icon: Calculator, label: "Calculate" },
  { href: "/invest", icon: TrendingUp, label: "Invest" },
  { href: "/contact", icon: PhoneCall, label: "Contact" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-line shadow-lg">
      <div className="flex justify-around items-center">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-2 min-h-16 text-xs font-medium transition touch-manipulation",
                isActive
                  ? "text-indigo"
                  : "text-muted-ink hover:text-indigo"
              )}
              style={{
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
              } as React.CSSProperties}
            >
              <Icon className="size-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
