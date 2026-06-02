"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { LogOut } from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/loans", label: "Loan Config" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-mesh">
      <header className="border-b border-line bg-white shadow-sm sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="text-xl font-extrabold text-blue-700">
              ABZ Admin
            </Link>

            <nav className="flex gap-1">
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                    pathname === item.href
                      ? "bg-blue-700 text-white"
                      : "text-muted-ink hover:bg-blue-700/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-muted-ink"
            >
              <LogOut className="size-4 mr-1" />
              Logout
            </Button>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
