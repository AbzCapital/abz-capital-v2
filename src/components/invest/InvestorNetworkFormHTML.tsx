"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
];

const SECTORS = [
  "FinTech",
  "Government Contracts",
  "Agritech",
  "Logistics",
  "Solar Energy",
  "Supply Chain",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Real Estate",
  "Retail & E-commerce",
  "Technology & Software",
  "Infrastructure",
  "Renewable Energy",
];

export function InvestorNetworkFormHTML() {
  const router = useRouter();
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-indigo mb-6 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mb-6">Join Investor Network</h1>

        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();

          if (selectedSectors.length === 0) {
            alert("⚠️ Select at least one sector");
            return;
          }

          const form = e.currentTarget;
          const formData = new FormData(form);

          // Add investor type
          formData.set('investor_type', 'investor_network');

          // Add selected sectors
          selectedSectors.forEach(sector => {
            formData.append('investment_preferences', sector);
          });

          console.log("[FORM] Submitting with sectors:", selectedSectors);

          setIsSubmitting(true);

          // Send via fetch
          fetch('/api/investors/register', {
            method: 'POST',
            body: formData,
          })
            .then(res => {
              console.log("[FORM] Response status:", res.status);
              if (res.redirected) {
                window.location.href = res.url;
              } else if (res.ok) {
                // If no redirect, try to parse error
                return res.json().then(data => {
                  if (data.error) {
                    alert("❌ Error: " + data.error);
                    setIsSubmitting(false);
                  }
                });
              } else {
                return res.json().then(data => {
                  alert("❌ Error: " + (data.error || "Failed to register"));
                  setIsSubmitting(false);
                });
              }
            })
            .catch(err => {
              console.error("[FORM] Fetch error:", err);
              alert("❌ Network error: " + err.message);
              setIsSubmitting(false);
            });
        }}>
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mobile *</label>
            <div className="flex gap-2">
              <select
                name="country_code"
                defaultValue="+254"
                className="px-3 py-2 border rounded"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone_number"
                required
                placeholder="700000000"
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Amount (KES) *
            </label>
            <input
              type="number"
              name="investment_amount"
              required
              placeholder="600000"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Investment Sectors *
              <span className="text-indigo ml-2">({selectedSectors.length} selected)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SECTORS.map((sector) => (
                <label key={sector} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector)}
                    onChange={() =>
                      setSelectedSectors((prev) =>
                        prev.includes(sector)
                          ? prev.filter((x) => x !== sector)
                          : [...prev, sector]
                      )
                    }
                  />
                  <span className="text-sm">{sector}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Notes</label>
            <textarea
              name="investor_note"
              maxLength={200}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 font-bold rounded text-white bg-indigo hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
