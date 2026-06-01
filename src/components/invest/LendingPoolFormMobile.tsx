"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

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
  const debugPanelRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUsingLocalhost, setIsUsingLocalhost] = useState(false);
  const [debugPanelOpen, setDebugPanelOpen] = useState(true);

  // Debug state - all visible on screen - initialize with startup message
  const [debugLog, setDebugLog] = useState<Array<{ time: string; message: string; type: string }>>([
    { time: new Date().toLocaleTimeString(), message: "🟢 Component loaded and initialized", type: "success" }
  ]);

  const addDebugLog = (message: string, type: "info" | "success" | "error" | "warning" = "info") => {
    const time = new Date().toLocaleTimeString();
    setDebugLog((prev) => [...prev, { time, message, type }].slice(-10)); // Keep last 10 logs
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  const lastClickTimeRef = useRef<number>(0);

  // Check for localhost on mobile
  useEffect(() => {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    setIsUsingLocalhost(isLocalhost);

    const isMobileUA = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
    const deviceType = isMobileUA ? "MOBILE" : "DESKTOP";
    const screenSize = `${window.innerWidth}x${window.innerHeight}`;

    addDebugLog(`Page loaded - Device: ${deviceType} (${screenSize})`, "info");
    addDebugLog(`User-Agent: ${navigator.userAgent}`, "info");

    if (isLocalhost && isMobileUA) {
      addDebugLog("⚠️ LOCALHOST DETECTED ON MOBILE - Use PC IP instead!", "warning");
    }
  }, []);

  // Attach event listeners
  useEffect(() => {
    const form = formRef.current;
    const submitBtn = submitBtnRef.current;

    if (!form || !submitBtn) {
      addDebugLog("❌ Form or button refs not found", "error");
      return;
    }

    addDebugLog("✅ Form refs initialized", "success");

    // Handle form submit
    const handleFormSubmit = async (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastClickTimeRef.current < 1000) {
        addDebugLog("⏸️ Double-click prevented (< 1 second)", "warning");
        return;
      }
      lastClickTimeRef.current = now;

      addDebugLog("📤 Form submit event fired", "info");
      await submitForm();
    };

    // Handle button click (fallback)
    const handleButtonClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastClickTimeRef.current < 1000) {
        addDebugLog("⏸️ Double-click prevented on button", "warning");
        return;
      }
      lastClickTimeRef.current = now;

      addDebugLog("🖱️ Button click detected", "info");
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    };

    // Attach listeners with capture to ensure they fire first
    form.addEventListener("submit", handleFormSubmit, { capture: true });
    submitBtn.addEventListener("click", handleButtonClick, { passive: false });

    addDebugLog("✅ Event listeners attached (form + button)", "success");

    return () => {
      form.removeEventListener("submit", handleFormSubmit, { capture: true });
      submitBtn.removeEventListener("click", handleButtonClick);
    };
  }, [isSubmitting]);

  // Main submit function
  const submitForm = async () => {
    const form = formRef.current;
    const submitBtn = submitBtnRef.current;

    if (!form || !submitBtn) {
      addDebugLog("❌ Form refs missing during submit", "error");
      return;
    }

    // Check HTML5 validation
    if (!form.checkValidity()) {
      addDebugLog("⚠️ Form validation failed - missing required fields", "warning");
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    submitBtn.disabled = true;
    addDebugLog("⏳ Starting submission...", "info");

    try {
      // Collect form data
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

      addDebugLog(`📝 Data collected: ${data.email}`, "info");

      // Build fetch URL
      const apiUrl = "/api/investors/register";
      const fullUrl = `${window.location.origin}${apiUrl}`;
      addDebugLog(`📡 Fetching: ${apiUrl}`, "info");
      addDebugLog(`Full URL: ${fullUrl}`, "info");

      // Submit with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        addDebugLog("⏱️ Request timeout (15 seconds)", "warning");
      }, 15000);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      addDebugLog(`📥 Response received - Status: ${response.status}`, "info");

      // Check for errors
      if (response.status === 429) {
        throw new Error("Duplicate submission - please wait a moment");
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (!result.success || !result.investor_id) {
        addDebugLog(`❌ Server error: ${result.error || "Unknown error"}`, "error");
        throw new Error(result.error || "Server validation failed");
      }

      addDebugLog(`✅ SUCCESS! Investor ID: ${result.investor_id}`, "success");

      setSuccessData({
        investor_id: result.investor_id,
        email: data.email,
        investment_amount: data.investment_amount,
      });
      setSuccess(true);

      // Scroll success message into view
      setTimeout(() => {
        statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);

      setTimeout(() => {
        window.location.href = "/invest";
      }, 3000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      addDebugLog(`❌ ERROR: ${errorMsg}`, "error");

      setIsSubmitting(false);
      submitBtn.disabled = false;

      // Scroll error into view
      setTimeout(() => {
        statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  };

  // Test API function
  const testAPI = async () => {
    addDebugLog("🧪 Testing API with hardcoded data...", "info");

    const testData = {
      investor_type: "lending_pool",
      first_name: "Test",
      last_name: "User",
      email: `test-${Date.now()}@example.com`,
      phone_number: "700000000",
      country_code: "+254",
      investment_amount: 100000,
      investment_preferences: ["logbook_loans"],
      investor_note: "API Test",
    };

    try {
      const apiUrl = "/api/investors/register";
      addDebugLog(`🧪 POST ${apiUrl}`, "info");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      });

      addDebugLog(`🧪 Response Status: ${response.status}`, "info");

      const result = await response.json();

      if (response.ok && result.success) {
        addDebugLog(`🧪 ✅ API WORKS! ID: ${result.investor_id}`, "success");
      } else {
        addDebugLog(`🧪 ❌ API Error: ${result.error || "Unknown"}`, "error");
      }
    } catch (error) {
      addDebugLog(`🧪 ❌ Fetch failed: ${error instanceof Error ? error.message : String(error)}`, "error");
    }
  };

  if (success && successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
        <div ref={statusRef} className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-green-600 mb-4">✅ Success!</h2>
          <p className="text-muted-ink mb-6 font-semibold">Your details have been saved successfully.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Confirmation ID:</strong>
            </p>
            <p className="font-mono text-sm text-gray-800 break-all mb-4">{successData.investor_id}</p>
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
        {/* LOCALHOST WARNING */}
        {isUsingLocalhost && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700 font-semibold text-sm">
              ⚠️ LOCALHOST DETECTED
            </p>
            <p className="text-red-600 text-xs mt-1">
              You're using localhost:3000. Mobile devices can't reach localhost. Use your PC's IP address instead:
              <br />
              <code className="bg-red-100 px-2 py-1 rounded text-red-900 font-mono">http://192.168.x.x:3000</code>
            </p>
          </div>
        )}

        {/* DEBUG PANEL */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg mb-6 overflow-hidden">
          <button
            onClick={() => setDebugPanelOpen(!debugPanelOpen)}
            className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 flex items-center justify-between text-sm font-semibold text-gray-800"
          >
            <span>🐛 Debug Panel</span>
            {debugPanelOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {debugPanelOpen && (
            <div className="p-4 bg-white text-xs font-mono space-y-1 max-h-48 overflow-y-auto">
              {debugLog.length === 0 ? (
                <div className="text-gray-500">Waiting for events...</div>
              ) : (
                debugLog.map((log, i) => (
                  <div key={i} className={`${
                    log.type === "success" ? "text-green-600" :
                    log.type === "error" ? "text-red-600" :
                    log.type === "warning" ? "text-orange-600" :
                    "text-gray-700"
                  }`}>
                    <span className="text-gray-400">[{log.time}]</span> {log.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <Link href="/invest" className="inline-flex items-center gap-2 text-indigo mb-6">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-ink mb-6">Join Lending Pool</h1>

        {/* STATUS MESSAGES */}
        <div ref={statusRef} id="status-messages"></div>

        {/* TEST API BUTTON */}
        <button
          onClick={testAPI}
          className="w-full mb-4 py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg transition"
        >
          🧪 Test API with Sample Data
        </button>

        {/* NATIVE HTML FORM */}
        <form ref={formRef} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                required
                minLength={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                required
                minLength={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Mobile Number</label>
            <div className="flex gap-2">
              <select
                name="country_code"
                defaultValue="+254"
                required
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
                pattern="[0-9]{9,}"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">Email Address</label>
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
              min="1000"
              placeholder="600000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>

          {/* Loan Category */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-3">Loan Category</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan_category"
                  value="logbook_loans"
                  defaultChecked
                  required
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

          {/* SUBMIT BUTTON */}
          <button
            ref={submitBtnRef}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addDebugLog("🔵 Submit button clicked via React onClick", "info");
              submitForm();
            }}
            disabled={isSubmitting}
            className={`
              w-full py-4 font-bold text-base rounded-xl transition-all
              min-h-[48px] min-w-[48px]
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
              "Join Lending Pool"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
