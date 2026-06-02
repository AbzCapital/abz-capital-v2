"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

export function LendingPoolForm() {
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">(""); // success, error, or empty
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = formRef.current;
    const submitBtn = submitBtnRef.current;

    if (!form || !submitBtn) return;

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      alert("✅ Form submit event fired!");

      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
      setStatus("");

      const formData = new FormData(form);
      const data: Record<string, any> = {
        investor_type: "lending_pool",
      };

      formData.forEach((value, key) => {
        data[key] = value;
      });

      data.investment_preferences = [data.loan_category || "logbook_loans"];
      delete data.loan_category;
      data.investment_amount = parseFloat(data.investment_amount);

      try {
        const response = await fetch("/api/investors/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          redirect: "follow",
        });

        // Check if we were redirected
        if (response.redirected) {
          // Success - API redirected us to success page
          setStatusType("success");
          setStatus("✅ Success! Your details have been saved. Redirecting...");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = response.url;
          }, 500);
        } else {
          // Try to parse as JSON for error handling
          const result = await response.json();
          if (response.ok && result.success) {
            setStatusType("success");
            setStatus("✅ Success! Your details have been saved. Redirecting...");
            setSuccess(true);
            setTimeout(() => {
              window.location.href = "/invest";
            }, 1500);
          } else {
            throw new Error(result.error || "Submission failed");
          }
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        alert("❌ Error: " + errorMsg);
        setStatusType("error");
        setStatus(`❌ Error: ${errorMsg}`);
        submitBtn.disabled = false;
        submitBtn.textContent = "Join Lending Pool";
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
            Your details have been saved successfully.
          </p>
          <p className="text-muted-ink mb-6">
            You will receive notifications whenever a loan matching your investment preferences becomes available.
          </p>
          <p className="text-sm font-semibold text-ink mb-4">
            For faster deal alerts, join our WhatsApp investor community.
          </p>
          <a
            href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition w-full mb-4"
          >
            <span>📱</span> Join WhatsApp Group
          </a>
          <Link href="/invest" className="block text-blue-500 hover:text-blue-500/80 font-semibold">
            Back to Invest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <Link href="/invest" className="inline-flex items-center gap-2 text-blue-500 mb-6">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-ink mb-6">Join Lending Pool</h1>

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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <select
                name="country_code"
                defaultValue="+254"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone_number"
                required
                placeholder="700000000"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Email Address
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
              How much are you willing to invest? (KES)
            </label>
            <input
              type="number"
              name="investment_amount"
              required
              placeholder="600000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-3">
              Loan Category
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan_category"
                  value="logbook_loans"
                  defaultChecked
                />
                <span className="text-ink">Logbook Loans</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan_category"
                  value="title_deed_loans"
                />
                <span className="text-ink">Title Deed Loans</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan_category"
                  value="both"
                />
                <span className="text-ink">Both</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Additional Notes <span className="text-xs text-muted-ink">(max 200)</span>
            </label>
            <textarea
              name="investor_note"
              maxLength={200}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            ref={submitBtnRef}
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition"
          >
            Join Lending Pool
          </button>
        </form>
      </div>
    </div>
  );
}
