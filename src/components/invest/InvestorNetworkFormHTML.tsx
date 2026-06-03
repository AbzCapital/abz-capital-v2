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

export function InvestorNetworkFormHTML() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // MUST prevent default FIRST
    e.preventDefault();
    e.stopPropagation();
    console.log("✅ handleSubmit called");

    if (selectedSectors.length === 0) {
      setMessage("⚠️ Select at least one sector");
      return;
    }

    if (isSubmitting || isSuccess) return;

    setIsSubmitting(true);
    setMessage("📤 Submitting your details...");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const data = {
        investor_type: "investor_network",
        first_name: formData.get("first_name") || "",
        last_name: formData.get("last_name") || "",
        country_code: formData.get("country_code") || "+254",
        phone_number: formData.get("phone_number") || "",
        email: formData.get("email") || "",
        investment_amount: parseFloat((formData.get("investment_amount") as string) || "0"),
        investment_preferences: selectedSectors,
        investor_note: formData.get("investor_note") || "",
      };

      console.log("Sending:", data);
      setMessage("📡 Calling API...");

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (result.success === true) {
        console.log("✅ Success!");
        setMessage("✅ Your details have been saved successfully.");
        setIsSuccess(true);
        setIsSubmitting(false);
        if (formRef.current) {
          formRef.current.reset();
          setSelectedSectors([]);
        }
      } else {
        throw new Error(result.message || "Failed to register");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error("Error:", msg);
      setMessage("❌ " + msg);
      setIsSubmitting(false);
    }
  };

  // Success view
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-md mx-auto py-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-800 text-lg font-medium mb-2">Your details have been saved successfully.</p>
          <p className="text-green-700 mb-6">You will receive alerts when a matching opportunity becomes available.</p>

          <a
            href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
          >
            For faster alerts Join WhatsApp Group
          </a>

          <button
            onClick={() => window.location.href = "/invest"}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            ← Back to Investment Opportunities
          </button>
        </div>
      </div>
    );
  }

  // Form view
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

        {/* CRITICAL: form MUST have onSubmit={handleSubmit} */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-semibold mb-1">Amount (KES) *</label>
            <input type="number" name="investment_amount" required placeholder="600000" className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Investment Sectors *</label>
            <div className="grid grid-cols-2 gap-2">
              {SECTORS.map(s => (
                <label key={s} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(s)}
                    onChange={() => setSelectedSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                  />
                  <span className="text-sm">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Notes</label>
            <textarea name="investor_note" maxLength={200} className="w-full px-3 py-2 border rounded" />
          </div>

          {/* CRITICAL: button MUST be type="submit" and INSIDE the form */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 font-bold rounded text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
          >
            {isSubmitting ? "Submitting..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
