"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/shared/Container";

export default function KYCPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    country: "",
    ticketSize: "",
    investmentTrack: "",
    investmentHistory: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/investor/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.ok) {
        toast.success("KYC submitted. We'll review and get back to you.");
      } else {
        toast.error(data.error || "Submission failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh py-8">
      <Container size="sm">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-card">
          <h1 className="text-3xl font-extrabold text-ink mb-2">KYC Verification</h1>
          <p className="text-muted-ink mb-6">
            Complete your investor profile to access exclusive deals.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-ink mb-1 block">Company Name</label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Your company name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink mb-1 block">Country</label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Country of operations"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink mb-1 block">Ticket Size</label>
              <select
                value={formData.ticketSize}
                onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-line"
                required
              >
                <option value="">Select ticket size</option>
                <option value="<500K">&lt;500K</option>
                <option value="500K-2M">500K-2M</option>
                <option value="2M-10M">2M-10M</option>
                <option value=">10M">&gt;10M</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-ink mb-1 block">
                Investment Track
              </label>
              <select
                value={formData.investmentTrack}
                onChange={(e) => setFormData({ ...formData, investmentTrack: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-line"
                required
              >
                <option value="">Select track</option>
                <option value="asset-backed">Asset-backed</option>
                <option value="sme-innovation">SME/Innovation</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-ink mb-1 block">
                Investment History (optional)
              </label>
              <Textarea
                value={formData.investmentHistory}
                onChange={(e) => setFormData({ ...formData, investmentHistory: e.target.value })}
                placeholder="Brief description of past investments"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo text-white hover:brightness-110"
            >
              {loading ? "Submitting..." : "Submit KYC"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-indigo/5 rounded-lg">
            <p className="text-xs text-muted-ink">
              Your information is secure and will only be used to verify your investor status and
              match you with suitable deals.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
