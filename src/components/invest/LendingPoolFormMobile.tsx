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

export function LendingPoolFormMobile() {
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    const submitBtn = submitBtnRef.current;

    if (!form || !submitBtn) return;

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      // Prevent double submission
      if (isSubmitting || submitBtn.disabled) {
        console.warn("Form already submitting, ignoring duplicate click");
        return;
      }

      setIsSubmitting(true);
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
      setStatus("");

      try {
        // Collect form data using FormData API
        const formData = new FormData(form);
        const data: Record<string, any> = {
          investor_type: "lending_pool",
        };

        formData.forEach((value, key) => {
          data[key] = value;
        });

        // Transform data
        data.investment_preferences = [data.loan_category || "logbook_loans"];
        delete data.loan_category;
        data.investment_amount = parseFloat(data.investment_amount);

        // API call with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await fetch("/api/investors/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const result = await response.json();

        // Validate response structure
        if (!result.investor_id || !result.success) {
          throw new Error("Invalid server response");
        }

        if (response.ok && result.success) {
          alert("✅ Registration successful! Your details have been saved.");
          setStatusType("success");
          setStatus("✅ Success! Your details have been saved. Redirecting...");
          setSuccessData({
            investor_id: result.investor_id,
            email: data.email,
            investment_amount: data.investment_amount,
          });
          setSuccess(true);

          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = "/invest";
          }, 2000);
        } else {
          throw new Error(result.error || "Submission failed");
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);

        // Provide helpful error message
        let userMessage = errorMsg;
        if (errorMsg.includes("AbortError") || errorMsg.includes("timeout")) {
          userMessage = "Connection timeout. Please check your internet and try again.";
        } else if (errorMsg.includes("Failed to fetch")) {
          userMessage = "Network error. Please check your internet connection.";
        } else if (errorMsg.includes("already registered")) {
          userMessage = "This email is already registered. Please use a different email.";
        }

        alert("❌ Error: " + userMessage);
        setStatusType("error");
        setStatus(`❌ Error: ${userMessage}`);

        // Re-enable button on error
        setIsSubmitting(false);
        submitBtn.disabled = false;
        submitBtn.textContent = "Join Lending Pool";
      }
    };

    // PRIMARY: Listen to form submit (capture phase to catch all events)
    form.addEventListener("submit", handleSubmit, { capture: true });

    // BACKUP: Listen directly to button click (handles edge cases on some mobile browsers)
    const handleButtonClick = () => {
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    };
    submitBtn.addEventListener("click", handleButtonClick);

    return () => {
      form.removeEventListener("submit", handleSubmit, true);
      submitBtn.removeEventListener("click", handleButtonClick);
    };
  }, [isSubmitting]);

  if (success && successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-green-600 mb-4">✅ Success!</h2>
          <p className="text-muted-ink mb-6 font-semibold">
            Your details have been saved successfully.
          </p>

          {/* Show confirmation data */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Confirmation ID:</strong>
            </p>
            <p className="font-mono text-sm text-gray-800 break-all mb-4">
              {successData.investor_id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Email:</strong> {successData.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Investment Amount:</strong> {successData.investment_amount.toLocaleString()} KES
            </p>
          </div>

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

          <Link href="/invest" className="block text-indigo hover:text-indigo/80 font-semibold">
            Back to Invest
          </Link>
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

        {/* NATIVE HTML FORM - Never use React state for form fields */}
        <form ref={formRef} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <select
                name="country_code"
                defaultValue="+254"
                className="px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>

          {/* Investment Amount */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              How much are you willing to invest? (KES)
            </label>
            <input
              type="number"
              name="investment_amount"
              required
              placeholder="600000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>

          {/* Loan Category */}
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
                  className="w-4 h-4"
                />
                <span className="text-base text-ink">Logbook Loans</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan_category"
                  value="title_deed_loans"
                  className="w-4 h-4"
                />
                <span className="text-base text-ink">Title Deed Loans</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan_category"
                  value="both"
                  className="w-4 h-4"
                />
                <span className="text-base text-ink">Both</span>
              </label>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Additional Notes <span className="text-xs text-muted-ink">(max 200)</span>
            </label>
            <textarea
              name="investor_note"
              maxLength={200}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>

          {/* SUBMIT BUTTON - Mobile optimized */}
          <button
            ref={submitBtnRef}
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-4 font-bold text-base rounded-xl transition-all
              min-h-12 min-w-12
              ${
                isSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50 pointer-events-none"
                  : "bg-indigo text-white hover:bg-indigo-700 active:scale-95"
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Submitting...
              </span>
            ) : (
              "Join Lending Pool"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
