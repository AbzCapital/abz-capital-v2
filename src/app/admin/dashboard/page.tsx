"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Settings, Package, Layers, FileText } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  leadsCount: number;
  productsCount: number;
  categoriesCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    leadsCount: 0,
    productsCount: 0,
    categoriesCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsRes, productsRes, categoriesRes] = await Promise.all([
          fetch("/api/admin/leads?limit=1"),
          fetch("/api/admin/products?limit=1"),
          fetch("/api/admin/categories?limit=1"),
        ]);

        // These are just placeholders since we don't have proper stat endpoints yet
        setStats({
          leadsCount: 0,
          productsCount: 0,
          categoriesCount: 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const menuItems = [
    {
      title: "Loan Configuration",
      description: "Manage loan fees, interest rates, and terms",
      href: "/admin/loans",
      icon: Settings,
      color: "bg-indigo",
    },
    {
      title: "Products",
      description: "Create and manage loan products",
      href: "/admin/products",
      icon: Package,
      color: "bg-peach",
    },
    {
      title: "Categories",
      description: "Manage product categories",
      href: "/admin/categories",
      icon: Layers,
      color: "bg-blue-500",
    },
    {
      title: "Leads",
      description: "View and manage customer leads",
      href: "/admin/leads",
      icon: FileText,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-ink mb-2">Dashboard</h1>
        <p className="text-muted-ink">Welcome to the ABZ Capital admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-ink mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-indigo">{stats.leadsCount}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-ink mb-1">Products</p>
          <p className="text-3xl font-bold text-peach">{stats.productsCount}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-ink mb-1">Categories</p>
          <p className="text-3xl font-bold text-blue-500">
            {stats.categoriesCount}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-ink mb-1">Status</p>
          <p className="text-3xl font-bold text-green-500">✓</p>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-ink mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card className="p-6 hover:shadow-lg transition cursor-pointer h-full">
                  <div className="flex items-start gap-4">
                    <div className={`${item.color} p-3 rounded-lg text-white`}>
                      <IconComponent className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-ink">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
