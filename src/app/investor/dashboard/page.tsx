"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/shared/Container";
import { LogOut, FileText } from "lucide-react";

interface Investor {
  id: string;
  companyName?: string;
  country?: string;
  kycStatus: string;
  ticketSize?: string;
}

export default function InvestorDashboard() {
  const { data: session } = useSession();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const res = await fetch("/api/investor/profile");
        const data = await res.json();
        if (data.ok) {
          setInvestor(data.data);
        }
      } catch {
        // Silently fail
      }
    };

    const fetchDeals = async () => {
      try {
        const res = await fetch("/api/investor/deals");
        const data = await res.json();
        if (data.ok) {
          setDeals(data.data || []);
        }
      } catch {
        // Silently fail
      }
    };

    if (session?.user) {
      fetchInvestor();
      fetchDeals();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-mesh">
      <header className="border-b border-line bg-white shadow-sm sticky top-0">
        <Container>
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-extrabold text-indigo">ABZ Investor</h1>
              <p className="text-xs text-muted-ink">{session?.user?.email}</p>
            </div>
            <div className="flex gap-2">
              {!investor?.kycStatus || investor.kycStatus === "pending" ? (
                <Link href="/investor/kyc">
                  <Button className="bg-peach text-indigo">
                    <FileText className="size-4 mr-2" />
                    Complete KYC
                  </Button>
                </Link>
              ) : null}
              <Button
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                variant="ghost"
              >
                <LogOut className="size-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="p-6">
              <p className="text-sm text-muted-ink mb-1">KYC Status</p>
              <p className="text-2xl font-extrabold text-indigo">
                {investor?.kycStatus || "Pending"}
              </p>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-muted-ink mb-1">Ticket Size</p>
              <p className="text-2xl font-extrabold text-indigo">
                {investor?.ticketSize || "Not set"}
              </p>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-muted-ink mb-1">Available Deals</p>
              <p className="text-2xl font-extrabold text-indigo">{deals.length}</p>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-ink mb-4">Profile Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-ink">Company:</span>
                  <span className={investor?.companyName ? "text-ink font-medium" : "text-muted-ink"}>
                    {investor?.companyName || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-ink">Country:</span>
                  <span className={investor?.country ? "text-ink font-medium" : "text-muted-ink"}>
                    {investor?.country || "Not set"}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2 p-6">
              <h3 className="font-semibold text-ink mb-4">Deal Pipeline</h3>
              {deals.length === 0 ? (
                <p className="text-sm text-muted-ink">No deals available yet.</p>
              ) : (
                <div className="space-y-2 text-sm">
                  {deals.map((deal: any) => (
                    <div key={deal.id} className="p-2 bg-indigo/5 rounded">
                      <p className="font-medium text-ink">{deal.title}</p>
                      <p className="text-muted-ink">{deal.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </Container>
      </main>
    </div>
  );
}
