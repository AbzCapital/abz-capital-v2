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
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const lastSubmitTimeRef = useRef<number>(0);

  useEffect(() => {
    // Device detection: verify we're on real mobile
    const isMobileUserAgent = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
    console.log("🔍 InvestorNetworkFormMobile mounted - Device:", isMobileUserAgent ? "MOBILE" : "DESKTOP");
    console.log("📱 User-Agent:", navigator.userAgent);
  }, []);

  useEffect(() => {
    const form = formRef.current;
    const submitBtn = submitBtnRef.current;

    if (!form || !submitBtn) {
      alert("⚠️ Form elements not found - refresh page");
      console.error("❌ Form or button refs not initialized");
      return;
    }

    console.log("✅ Form refs initialized:", { form, submitBtn });

    // Scroll button into view after virtual keyboard closes
    const handleInputBlur = (e: Event) => {
      const input = e.target as HTMLInputElement;
      setTimeout(() => {
        try {
          submitBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        } catch (err) {
          console.log("Scroll-into-view not supported");
        }
      }, 300);
    };

    // Add blur listeners to all inputs for virtual keyboard handling
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", handleInputBlur);
    });

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      alert("🔵 Button tapped - starting submission...");
      console.log("📤 Form submit triggered");

      // Prevent double submission
      const now = Date.now();
      if (isSubmitting || submitBtn.disabled || now - lastSubmitTimeRef.current < 1000) {
        alert("⏳ Please wait - submission in progress");
        return;
      }

      lastSubmitTimeRef.current = now;
      setIsSubmitting(true);
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
      setStatus("");

      try {
        // Validate form before submitting
        if (!form.checkValidity()) {
          throw new Error("Please fill in all required fields");
        }

        // Collect form data using FormData API
        const formData = new FormData(form);
        const data: Record<string, any> = {
          investor_type: "investor_network",
        };

        formData.forEach((value, key) => {
          data[key] = value;
        });

        // Transform data - use selected sectors from state
        data.investment_preferences = selectedSectors.length > 0 ? selectedSectors : ["Not specified"];
        data.investment_amount = parseFloat(data.investment_amount);

        console.log("📝 Submitting data:", { email: data.email, sectors: data.investment_preferences });

        // API call with timeout (15 seconds)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          console.error("⏱️ Request timeout (15s)");
        }, 15000);

        const response = await fetch("/api/investors/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        console.log("📡 Response status:", response.status);

        // Check for duplicate submission (429 Too Many Requests)
        if (response.status === 429) {
          throw new Error("You recently submitted. Please wait a moment before submitting again.");
        }

        const result = await response.json();
        console.log("📥 API Response:", { success: result.success, investor_id: result.investor_id });

        // Validate response structure
        if (!result.investor_id || !result.success) {
          throw new Error(result.error || "Invalid server response");
        }

        if (response.ok && result.success) {
          alert("✅ Registration successful!\nInvestor ID: " + result.investor_id);
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

        console.error("❌ Form error:", errorMsg);

        // Provide helpful error message
        let userMessage = errorMsg;
        if (errorMsg.includes("AbortError") || errorMsg.includes("timeout")) {
          userMessage = "Connection timeout. Please check your internet and try again.";
        } else if (errorMsg.includes("Failed to fetch")) {
          userMessage = "Network error. Please check your internet connection.";
        } else if (errorMsg.includes("already registered")) {
          userMessage = "This email is already registered. Please use a different email.";
        } else if (errorMsg.includes("fill in all required")) {
          userMessage = "Please fill in all required fields before submitting.";
        }

        alert("❌ Error: " + userMessage);
        setStatusType("error");
        setStatus(`❌ Error: ${userMessage}`);

        // Re-enable button on error
        setIsSubmitting(false);
        submitBtn.disabled = false;
        submitBtn.textContent = "Join Investor Network";
      }
    };

    // PRIMARY: Form submit listener with capture to catch all events
    form.addEventListener("submit", handleSubmit, { capture: true });

    // TOUCH EVENT: Direct touch listener for immediate response (no 300ms delay)
    const handleTouchStart = (e: TouchEvent) => {
      console.log("👆 Touch detected on button");
      (e.target as HTMLElement).style.opacity = "0.8";
    };

    const handleTouchEnd = (e: TouchEvent) => {
      (e.target as HTMLElement).style.opacity = "1";
    };

    submitBtn.addEventListener("touchstart", handleTouchStart, { passive: false });
    submitBtn.addEventListener("touchend", handleTouchEnd, { passive: false });

    // BACKUP: Click listener for mouse/hybrid devices
    const handleButtonClick = (e: MouseEvent) => {
      console.log("🖱️ Click detected on button");
      e.preventDefault();
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    };

    submitBtn.addEventListener("click", handleButtonClick);

    // Also log when listeners are attached
    console.log("✅ Event listeners attached:", {
      formSubmit: "capture mode",
      touchstart: "passive:false",
      touchend: "passive:false",
      buttonClick: "backup handler",
    });

    return () => {
      form.removeEventListener("submit", handleSubmit, { capture: true });
      submitBtn.removeEventListener("touchstart", handleTouchStart);
      submitBtn.removeEventListener("touchend", handleTouchEnd);
      submitBtn.removeEventListener("click", handleButtonClick);
      inputs.forEach((input) => {
        input.removeEventListener("blur", handleInputBlur);
      });
    };
  }, [isSubmitting, selectedSectors]);

  // React onClick handler as additional fallback
  const handleReactClick = () => {
    alert("🟢 React onClick fired!");
    console.log("React onClick handler triggered");
    const form = formRef.current;
    if (form) {
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }
  };

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

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
            You will receive notifications whenever an investment opportunity matching your preferred sectors becomes available.
          </p>

          <p className="text-sm text-ink mb-6">
            Our investment team may also contact you directly regarding suitable opportunities.
          </p>

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

        <h1 className="text-3xl font-bold text-ink mb-6">Join Investor Network</h1>

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

          {/* Investment Sector Preferences */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-3">
              Investment Sector Preferences
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {SECTORS.map((sector) => (
                <label key={sector} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector)}
                    onChange={() => toggleSector(sector)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-ink">{sector}</span>
                </label>
              ))}
            </div>
            {selectedSectors.length > 0 && (
              <p className="text-xs text-muted-ink mt-2">
                Selected: {selectedSectors.length} sector{selectedSectors.length !== 1 ? "s" : ""}
              </p>
            )}
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

          {/* SUBMIT BUTTON - Mobile optimized with 48x48px minimum and touch optimizations */}
          <button
            ref={submitBtnRef}
            type="submit"
            onClick={handleReactClick}
            disabled={isSubmitting}
            className={`
              w-full py-4 font-bold text-base rounded-xl transition-all
              min-h-[48px] min-w-[48px]
              touch-action-manipulation pointer-events-auto relative z-10
              ${
                isSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
                  : "bg-indigo text-white hover:bg-indigo-700 active:scale-95"
              }
            `}
            style={{
              touchAction: "manipulation",
              pointerEvents: isSubmitting ? "none" : "auto",
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Submitting...
              </span>
            ) : (
              "Join Investor Network"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
