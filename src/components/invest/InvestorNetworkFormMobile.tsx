"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
];

const SECTORS = [
  "FinTech", "Agritech", "Logistics", "Solar Energy", "Healthcare",
  "Education", "Real Estate", "Technology", "Manufacturing", "Infrastructure",
];

export function InvestorNetworkFormMobile() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedSectors.length === 0) {
      setMessage("⚠️ Select at least one sector");
      return;
    }

    setMessage("");

    // Add sectors to form as hidden inputs before submission
    if (formRef.current) {
      // Remove any existing sector inputs
      Array.from(formRef.current.querySelectorAll('input[name="investment_preferences"]')).forEach(el => el.remove());

      // Add selected sectors as hidden inputs
      selectedSectors.forEach(sector => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'investment_preferences';
        input.value = sector;
        formRef.current?.appendChild(input);
      });

      // Submit the form natively
      formRef.current.submit();
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-blue-700 mb-6 inline-block">← Back</Link>

        <h1 className="text-3xl font-bold mb-6">Join Investor Network</h1>

        {message && (
          <div className={`p-3 rounded mb-4 ${message.includes("❌") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
            {message}
          </div>
        )}

        <form
          ref={formRef}
          method="POST"
          action="/api/investors/register"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input type="hidden" name="investor_type" value="investor_network" />

          <div>
            <label className="block text-sm font-semibold mb-1">First Name *</label>
            <input type="text" name="first_name" required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Last Name *</label>
            <input type="text" name="last_name" required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mobile *</label>
            <div className="flex gap-2">
              <select name="country_code" defaultValue="+254" className="px-3 py-2 border rounded">
                {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
              <input type="tel" name="phone_number" required placeholder="700000000" className="flex-1 px-3 py-2 border rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email *</label>
            <input type="email" name="email" required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Investment Sectors *</label>
            <div className="grid grid-cols-2 gap-2">
              {SECTORS.map(s => (
                <label key={s} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedSectors.includes(s)} onChange={() => setSelectedSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
                  <span className="text-sm">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Notes</label>
            <textarea name="investor_note" maxLength={200} className="w-full px-3 py-2 border rounded" />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold rounded text-white bg-blue-700 hover:bg-blue-800 transition"
          >
            Join Investor Network
          </button>
        </form>
      </div>
    </div>
  );
}
