"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
];

const SECTORS = [
  "FinTech",
  "Agritech",
  "Logistics",
  "Solar Energy",
  "Healthcare",
  "Education",
  "Real Estate",
  "Technology",
  "Manufacturing",
  "Infrastructure",
];

export function InvestorNetworkFormHTML() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  useEffect(() => {
    const form = document.getElementById('investorNetworkForm');
    if (!form) return;

    const handleSubmit = async (e: Event) => {
      // CRITICAL: Stop default form submission FIRST
      e.preventDefault();
      e.stopPropagation();

      console.log('✅ Form submitted - preventDefault worked');

      if (selectedSectors.length === 0) {
        alert("⚠️ Select at least one sector");
        return;
      }

      const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (button) button.disabled = true;

      try {
        const formData = new FormData(form as HTMLFormElement);
        const data: any = { investor_type: "investor_network" };

        formData.forEach((value, key) => {
          data[key] = value;
        });

        data.investment_preferences = selectedSectors;
        data.investment_amount = parseFloat(data.investment_amount);

        console.log('📤 Sending data:', data);

        const response = await fetch("/api/investors/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('✅ API Response:', result);

        if (response.ok && result.success) {
          alert(`✅ Success! ID: ${result.investor_id}`);
          window.location.href = `/investor/welcome?id=${result.investor_id}&email=${encodeURIComponent(result.email)}`;
        } else {
          throw new Error(result.error || "Submission failed");
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        console.error('❌ Error:', msg);
        alert(`❌ Error: ${msg}`);
        if (button) button.disabled = false;
      }
    };

    form.addEventListener('submit', handleSubmit, false);
    return () => form.removeEventListener('submit', handleSubmit);
  }, [selectedSectors]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-indigo mb-6 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mb-6">Join Investor Network</h1>

        <form id="investorNetworkForm" className="space-y-4">
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
            className={`w-full py-3 font-bold rounded text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
