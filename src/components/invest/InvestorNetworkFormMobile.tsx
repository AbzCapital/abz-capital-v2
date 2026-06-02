"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
];

const SECTORS = [
  "FinTech", "Agritech", "Logistics", "Solar Energy", "Healthcare",
  "Education", "Real Estate", "Technology", "Manufacturing", "Infrastructure",
];

export function InvestorNetworkFormMobile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // CRITICAL: Prevent default AND stop propagation immediately
    e.preventDefault();
    e.stopPropagation();

    // Validate sectors
    if (selectedSectors.length === 0) {
      setMessage("⚠️ Select at least one sector");
      return;
    }

    // Guard against double submission
    if (isSubmitting) {
      console.log("[FORM] Already submitting, ignoring duplicate submit");
      return;
    }

    setIsSubmitting(true);
    setMessage("📤 Submitting form...");

    try {
      const form = formRef.current;
      if (!form) {
        throw new Error("Form not found");
      }

      const formData = new FormData(form);
      const data: any = { investor_type: "investor_network" };

      formData.forEach((value, key) => {
        data[key] = value;
      });

      data.investment_preferences = selectedSectors;
      data.investment_amount = parseFloat(data.investment_amount);

      setMessage("📡 Calling API...");
      console.log("[FORM] Starting fetch to /api/investors/register");

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        redirect: "manual",
      });

      console.log("[FORM] Got response:", { status: response.status, statusText: response.statusText });

      // Check for redirect status codes (303, 302, 301, 307, 308)
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const redirectUrl = response.headers.get("location");
        console.log("[FORM] Redirect detected - Status:", response.status, "URL:", redirectUrl);

        if (redirectUrl) {
          // Set success state FIRST to show success page
          setSuccess(true);
          setMessage("✅ Registration successful! Redirecting...");

          // Wait 2 seconds to let success page render, then redirect
          setTimeout(() => {
            console.log("[FORM] Executing redirect now...");
            window.location.href = redirectUrl;
          }, 2000);
          return; // Stop execution
        }
      }

      // If not a redirect, try to parse response
      console.log("[FORM] No redirect detected, parsing JSON...");
      const result = await response.json();
      console.log("[FORM] JSON result:", result);

      if (response.ok) {
        // Show success page without redirecting
        setMessage("✅ Success!");
        setSuccess(true);
        setSuccessData(result);
      } else {
        throw new Error(result.error || "Failed to register");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.log("[FORM] Error caught:", msg);
      setMessage("❌ Error: " + msg);
      setIsSubmitting(false);
    }
  };

  if (success && successData) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Success!</h2>
          <p className="mb-2"><strong>ID:</strong> {successData.investor_id}</p>
          <p><strong>Email:</strong> {successData.email}</p>
          <Link href="/invest" className="text-blue-700 mt-4 block">Back to Invest</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-blue-700 mb-6 inline-block">← Back</Link>
        <h1 className="text-3xl font-bold mb-6">Join Investor Network</h1>

        {message && (
          <div className={`p-3 rounded mb-4 ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message}
          </div>
        )}

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
            disabled={isSubmitting}
            className={`w-full py-3 font-bold rounded text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-700-700"}`}
          >
            {isSubmitting ? "Submitting..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
