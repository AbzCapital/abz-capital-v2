"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
  { code: "+255", name: "Tanzania" },
  { code: "+233", name: "Ghana" },
  { code: "+234", name: "Nigeria" },
  { code: "+27", name: "South Africa" },
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

export function InvestorNetworkFormMobile() {
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"" | "success" | "error">("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    alert("🔵 FORM SUBMIT HANDLER FIRED!");
    e.preventDefault();

    if (isSubmitting) {
      alert("⏳ Already submitting...");
      return;
    }

    if (selectedSectors.length === 0) {
      alert("⚠️ Please select at least one sector");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("📤 Submitting...");
    setStatusType("success");

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, any> = {
        investor_type: "investor_network",
      };

      formData.forEach((value, key) => {
        data[key] = value;
      });

      data.investment_preferences = selectedSectors;
      data.investment_amount = parseFloat(data.investment_amount);

      setStatusMsg("📡 Sending to server...");

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMsg("✅ Success! Investor ID: " + result.investor_id);
        setStatusType("success");
        setSuccessData({
          investor_id: result.investor_id,
          email: data.email,
          investment_amount: data.investment_amount,
        });
        setSuccess(true);

        setTimeout(() => {
          window.location.href = "/invest";
        }, 2000);
      } else {
        throw new Error(result.error || "Server error");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setStatusMsg("❌ Error: " + msg);
      setStatusType("error");
      setIsSubmitting(false);
    }
  };

  if (success && successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-green-600 mb-4">✅ Success!</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2"><strong>ID:</strong></p>
            <p className="font-mono text-sm text-gray-800 break-all">{successData.investor_id}</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Email:</strong> {successData.email}</p>
          </div>
          <Link href="/invest" className="text-indigo font-semibold">Back to Invest</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="max-w-md mx-auto px-4 py-8">
        <Link href="/invest" className="inline-flex items-center gap-2 text-indigo mb-6">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-ink mb-6">Join Investor Network</h1>

        {statusMsg && (
          <div className={`px-4 py-3 rounded-lg mb-4 text-base ${
            statusType === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Mobile Number</label>
            <div className="flex gap-2">
              <select
                name="country_code"
                defaultValue="+254"
                className="px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
              <input
                type="tel"
                name="phone_number"
                required
                placeholder="700000000"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Investment Amount (KES)</label>
            <input
              type="number"
              name="investment_amount"
              required
              placeholder="600000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">Investment Sectors *</label>
            <div className="grid grid-cols-2 gap-2">
              {SECTORS.map((sector) => (
                <label key={sector} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector)}
                    onChange={() =>
                      setSelectedSectors((prev) =>
                        prev.includes(sector)
                          ? prev.filter((s) => s !== sector)
                          : [...prev, sector]
                      )
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{sector}</span>
                </label>
              ))}
            </div>
            {selectedSectors.length > 0 && (
              <p className="text-xs text-muted-ink mt-2">
                Selected: {selectedSectors.length} sector{selectedSectors.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Additional Notes (max 200)</label>
            <textarea
              name="investor_note"
              maxLength={200}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 font-bold text-base rounded-xl transition-all min-h-[48px] ${
              isSubmitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-indigo text-white hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
