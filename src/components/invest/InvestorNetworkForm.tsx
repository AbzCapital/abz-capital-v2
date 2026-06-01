"use client";

import { useState } from "react";
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

export function InvestorNetworkForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Form submit event fired!");
    console.log("Form submitted");
    console.log("Selected sectors:", selectedSectors);
    setError("");
    setLoading(true);

    try {
      console.log("About to fetch...");
      setApiResponse("Sending request...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investor_type: "investor_network",
          first_name: firstName,
          last_name: lastName,
          country_code: countryCode,
          phone_number: phoneNumber,
          email,
          investment_amount: parseFloat(amount),
          investment_preferences: selectedSectors.length > 0 ? selectedSectors : ["Not specified"],
          investor_note: note,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      console.log("Response status:", response.status);
      let data;
      try {
        data = await response.json();
        console.log("Response data:", data);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        setApiResponse(`Status: ${response.status} | Parse Error: ${String(parseError)}`);
        setError("Failed to parse API response");
        return;
      }

      // Store API response for debugging
      setApiResponse(`Status: ${response.status} | Response: ${JSON.stringify(data)}`);

      if (response.ok) {
        console.log("Success! Setting success state");
        console.log("Response data:", data);
        alert("✅ Server response: " + JSON.stringify(data));
        alert("✅ Registration successful! Your details have been saved.");
        setSuccess(true);
      } else {
        console.log("Error from API:", data.error);
        alert("❌ API Error: " + JSON.stringify(data));
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Catch error:", error);
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Error type:", errorMsg);
      alert("❌ Fetch error: " + errorMsg);
      setApiResponse(`ERROR: ${errorMsg}`);
      setError(`Network error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Registration Successful</h2>
          <p className="text-muted-ink mb-4 font-semibold">
            Your details have been saved successfully.
          </p>
          <p className="text-muted-ink mb-4">
            You will receive notifications whenever an investment opportunity matching your preferred sectors becomes available.
          </p>
          <p className="text-sm text-ink mb-6">
            Our investment team may also contact you directly regarding suitable opportunities.
          </p>
          <Link href="/invest" className="inline-block text-indigo hover:text-indigo/80 font-semibold">
            Back to Invest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <Link href="/invest" className="inline-flex items-center gap-2 text-indigo mb-6">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-ink mb-6">Join Investor Network</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {apiResponse && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4 text-xs font-mono break-words">
            <strong>API Debug:</strong> {apiResponse}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              How much are you willing to invest? (KES)
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="600000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

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
              <p className="text-xs text-muted-ink mt-2">Selected: {selectedSectors.length} sector{selectedSectors.length !== 1 ? 's' : ''}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Additional Notes <span className="text-xs text-muted-ink">(max 200)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.substring(0, 200))}
              maxLength={200}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-muted-ink mt-1">{note.length}/200</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={(e) => {
              alert("⚡ Button clicked!");
              console.log("Button clicked, form should submit");
            }}
            className="w-full bg-indigo text-white font-bold py-3 rounded-xl disabled:opacity-50 transition"
          >
            {loading ? "Registering..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
