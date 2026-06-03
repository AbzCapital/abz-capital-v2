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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [investorData, setInvestorData] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("🔵 FORM HANDLER CALLED");

    e.preventDefault();
    e.stopPropagation();

    if (selectedSectors.length === 0) {
      setMessage("⚠️ Select at least one sector");
      return;
    }

    if (isSubmitting || isSuccess) return;

    setIsSubmitting(true);
    setMessage("📤 Submitting your details...");

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

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // ✅ Show debug info on page
      const debugMsg = `response.ok: ${response.ok} | result.success: ${result.success} | Status: ${response.status}`;
      setDebugInfo(debugMsg);
      console.log("DEBUG:", debugMsg);
      console.log("Full result:", result);

      // ✅ FIXED: Check result.success directly
      if (result.success === true) {
        console.log("✅ SUCCESS - Setting isSuccess to true");
        setInvestorData(result);
        setIsSuccess(true);  // This shows the success view
        setIsSubmitting(false);

        if (formRef.current) {
          formRef.current.reset();
          setSelectedSectors([]);
        }
      } else {
        console.log("❌ NOT SUCCESS - result.success is:", result.success);
        setDebugInfo(`Failed: result.success = ${result.success}`);
        throw new Error(result.message || result.error || "Failed to register");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setMessage("❌ Error: " + msg + ". Please try again.");
      setIsSubmitting(false);
    }
  };

  const showMessage = message && !isSuccess;

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-blue-700 mb-6 inline-block">← Back</Link>

        {/* SUCCESS VIEW */}
        {isSuccess ? (
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            {/* Checkmark Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Custom Success Message */}
            <p className="text-green-800 text-lg font-medium mb-2">
              Your details have been saved successfully.
            </p>
            <p className="text-green-700 mb-6">
              You will receive alerts when a matching opportunity becomes available.
            </p>

            {/* WhatsApp CTA Button */}
            <a
              href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.614-.916-2.21-.242-.579-.487-.5-.669-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              For faster alerts Join WhatsApp Group
            </a>

            {/* Back to Invest Button - PROMINENT */}
            <button
              onClick={() => window.location.href = "/invest"}
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Back to Investment Opportunities
            </button>
          </div>
        ) : (
          /* FORM VIEW */
          <>
            <h1 className="text-3xl font-bold mb-6">Join Investor Network</h1>

            {showMessage && (
              <div className={`p-3 rounded mb-4 ${message.includes("❌") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
                {message}
              </div>
            )}

            {debugInfo && (
              <div className="p-3 rounded mb-4 bg-yellow-50 text-yellow-800 text-xs border border-yellow-200">
                <strong>DEBUG:</strong> {debugInfo}
              </div>
            )}

            <form
              ref={formRef}
              className="space-y-4"
            >
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
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  const form = formRef.current;
                  if (form) {
                    const event = new Event('submit', { bubbles: true, cancelable: true });
                    handleSubmit(event as any);
                  }
                }}
                className={`w-full py-3 font-bold rounded text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
              >
                {isSubmitting ? "Submitting..." : "Join Investor Network"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
