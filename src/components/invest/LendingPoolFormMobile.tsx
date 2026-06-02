"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
];

export function LendingPoolFormMobile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // CRITICAL: Prevent default AND stop propagation immediately
    e.preventDefault();
    e.stopPropagation();

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
      const data: any = { investor_type: "lending_pool" };

      formData.forEach((value, key) => {
        data[key] = value;
      });

      data.investment_preferences = [data.loan_category || "logbook_loans"];
      delete data.loan_category;
      data.investment_amount = parseFloat(data.investment_amount);

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // ✅ SUCCESS - Handle the JSON response
        setMessage("✅ Your details have been submitted! We'll be in touch soon.");
        setIsSubmitting(false);

        // Clear form after 3 seconds
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.reset();
            setMessage("");
          }
        }, 3000);
      } else {
        throw new Error(result.message || result.error || "Failed to register");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setMessage("❌ Error: " + msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-blue-700 mb-6 inline-block">← Back</Link>
        <h1 className="text-3xl font-bold mb-6">Join Lending Pool</h1>

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
            <label className="block text-sm font-semibold mb-2">Category</label>
            <label className="flex items-center gap-2"><input type="radio" name="loan_category" value="logbook_loans" defaultChecked /> Logbook</label>
            <label className="flex items-center gap-2"><input type="radio" name="loan_category" value="title_deed_loans" /> Title Deed</label>
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
            {isSubmitting ? "Submitting..." : "Join Lending Pool"}
          </button>
        </form>
      </div>
    </div>
  );
}
