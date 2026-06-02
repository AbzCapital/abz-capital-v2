"use client";

import { useRef, useEffect, useState } from "react";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
  { code: "+255", name: "Tanzania" },
  { code: "+233", name: "Ghana" },
  { code: "+234", name: "Nigeria" },
  { code: "+27", name: "South Africa" },
  { code: "+212", name: "Morocco" },
  { code: "+216", name: "Tunisia" },
  { code: "+213", name: "Algeria" },
  { code: "+243", name: "Democratic Republic of Congo" },
  { code: "+237", name: "Cameroon" },
  { code: "+265", name: "Malawi" },
  { code: "+258", name: "Mozambique" },
  { code: "+260", name: "Zambia" },
  { code: "+263", name: "Zimbabwe" },
  { code: "+249", name: "Sudan" },
  { code: "+251", name: "Ethiopia" },
  { code: "+250", name: "Rwanda" },
  { code: "+244", name: "Angola" },
  { code: "+226", name: "Burkina Faso" },
  { code: "+228", name: "Togo" },
  { code: "+229", name: "Benin" },
  { code: "+230", name: "Mauritius" },
  { code: "+248", name: "Seychelles" },
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+33", name: "France" },
  { code: "+49", name: "Germany" },
  { code: "+91", name: "India" },
  { code: "+86", name: "China" },
  { code: "+81", name: "Japan" },
  { code: "+61", name: "Australia" },
];

export function FundingOpportunityForm() {
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = formRef.current;
    const submitBtn = submitBtnRef.current;

    if (!form || !submitBtn) return;

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
      setStatus("");

      const formData = new FormData(form);

      try {
        const response = await fetch("/api/submit/funding-opportunity", {
          method: "POST",
          body: formData,
          redirect: "follow",
        });

        const result = await response.json();
        if (response.ok && result.ok) {
          setStatusType("success");
          setStatus("✅ Success! Your opportunity has been submitted.");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/fundraise";
          }, 2000);
        } else {
          throw new Error(result.error || "Submission failed");
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        setStatusType("error");
        setStatus(`❌ Error: ${errorMsg}`);
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Opportunity";
      }
    };

    form.addEventListener("submit", handleSubmit);
    submitBtn.addEventListener("click", (e) => {
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    });

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  if (success) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-green-600 mb-4">✅ Success!</h2>
          <p className="text-muted-ink mb-6 font-semibold">
            Your funding opportunity has been submitted.
          </p>
          <p className="text-muted-ink">
            Our investor team will review it and be in touch shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-ink mb-6">Submit Opportunity</h1>

        {status && (
          <div
            className={`px-4 py-3 rounded-lg mb-4 ${
              statusType === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {status}
          </div>
        )}

        <form ref={formRef} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Phone *
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                defaultValue="+254"
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phoneNumber"
                required
                placeholder="700000000"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Category *
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a category</option>
              <option value="asset-backed">Asset-backed</option>
              <option value="sme">SME</option>
              <option value="contractor">Contractor</option>
              <option value="investment">Investment opportunity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Opportunity Type *
            </label>
            <select
              name="opportunityType"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select opportunity type</option>
              <option value="equity">Equity</option>
              <option value="debt">Debt</option>
              <option value="working-capital">Working capital</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              minLength={20}
              rows={5}
              placeholder="Describe the deal, its size, sector, and what you're looking for"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Attachments (optional)
            </label>
            <input
              type="file"
              name="files"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-muted-ink mt-1">
              PDF, Word, Excel, Images (max 5 files)
            </p>
          </div>

          <button
            ref={submitBtnRef}
            type="submit"
            className="w-full bg-indigo text-white font-bold py-3 rounded-xl disabled:opacity-50 transition"
          >
            Submit Opportunity
          </button>
        </form>
      </div>
    </div>
  );
}
