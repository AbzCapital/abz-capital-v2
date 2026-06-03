"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
  { code: "+255", name: "Tanzania" },
  { code: "+233", name: "Ghana" },
  { code: "+234", name: "Nigeria" },
  { code: "+27", name: "South Africa" },
  { code: "+260", name: "Zambia" },
  { code: "+265", name: "Malawi" },
  { code: "+258", name: "Mozambique" },
  { code: "+250", name: "Rwanda" },
  { code: "+257", name: "Burundi" },
  { code: "+243", name: "Democratic Republic of Congo" },
  { code: "+242", name: "Republic of Congo" },
  { code: "+237", name: "Cameroon" },
  { code: "+212", name: "Morocco" },
  { code: "+213", name: "Algeria" },
  { code: "+216", name: "Tunisia" },
  { code: "+244", name: "Angola" },
  { code: "+238", name: "Cape Verde" },
  { code: "+291", name: "Eritrea" },
  { code: "+251", name: "Ethiopia" },
  { code: "+224", name: "Guinea" },
  { code: "+245", name: "Guinea-Bissau" },
  { code: "+231", name: "Liberia" },
  { code: "+221", name: "Senegal" },
  { code: "+232", name: "Sierra Leone" },
  { code: "+880", name: "Bangladesh" },
  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+33", name: "France" },
  { code: "+49", name: "Germany" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+31", name: "Netherlands" },
  { code: "+41", name: "Switzerland" },
  { code: "+43", name: "Austria" },
  { code: "+46", name: "Sweden" },
  { code: "+47", name: "Norway" },
  { code: "+45", name: "Denmark" },
  { code: "+358", name: "Finland" },
  { code: "+353", name: "Ireland" },
  { code: "+32", name: "Belgium" },
  { code: "+352", name: "Luxembourg" },
  { code: "+30", name: "Greece" },
  { code: "+48", name: "Poland" },
  { code: "+420", name: "Czech Republic" },
  { code: "+421", name: "Slovakia" },
  { code: "+36", name: "Hungary" },
  { code: "+40", name: "Romania" },
  { code: "+359", name: "Bulgaria" },
  { code: "+385", name: "Croatia" },
  { code: "+386", name: "Slovenia" },
  { code: "+381", name: "Serbia" },
  { code: "+356", name: "Malta" },
  { code: "+357", name: "Cyprus" },
];

export function LendingPoolFormHTML() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("[FORM] handleSubmit CALLED");
    e.preventDefault();
    e.stopPropagation();
    console.log("[FORM] preventDefault done, isSubmitting:", isSubmitting, "isSuccess:", isSuccess);

    if (isSubmitting || isSuccess) return;
    setIsSubmitting(true);
    console.log("[FORM] setIsSubmitting(true)");

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        investor_type: "lending_pool",
        first_name: formData.get("first_name") || "",
        last_name: formData.get("last_name") || "",
        country_code: formData.get("country_code") || "+254",
        phone_number: formData.get("phone_number") || "",
        email: formData.get("email") || "",
        investment_amount: parseFloat((formData.get("investment_amount") as string) || "0"),
        investment_preferences: [formData.get("loan_category") || "logbook_loans"],
        investor_note: formData.get("investor_note") || "",
      };

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success === true) {
        console.log("[FORM] SUCCESS! Setting isSuccess=true");
        setIsSuccess(true);
        setIsSubmitting(false);
        if (formRef.current) formRef.current.reset();
      } else {
        console.log("[FORM] API returned success=false:", result);
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      alert("Error: " + msg);
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-md mx-auto py-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-800 text-lg font-medium mb-2">Success!</p>
          <p className="text-gray-700 mb-6">Your details have been saved. Check your email for confirmation.</p>
          <a href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full mb-4">
            Join WhatsApp Group
          </a>
          <button onClick={() => window.location.href = "/invest"} className="text-blue-700 hover:text-blue-800 font-semibold">
            ← Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-blue-700 mb-6 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mb-6">Join Lending Pool</h1>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
              How much are you planning to invest? (KES) *
            </label>
            <input
              type="number"
              name="investment_amount"
              required
              placeholder="Enter amount e.g. 600000"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="loan_category"
                value="logbook_loans"
                defaultChecked
              />
              Logbook
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="loan_category"
                value="title_deed_loans"
              />
              Title Deed
            </label>
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
            className="w-full py-3 font-bold rounded text-white bg-blue-700 hover:bg-blue-700-700"
          >
            Join Lending Pool
          </button>
        </form>
      </div>
    </div>
  );
}
