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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
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
    setError("");
    setLoading(true);

    try {
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
          investment_preferences: selectedSectors.length > 0 ? selectedSectors : ["Not specified"],
          investor_note: note,
        }),
        signal: controller.signal,
        redirect: "follow",
      });
      clearTimeout(timeoutId);

      // Check if we were redirected (success)
      if (response.redirected) {
        // Silently redirect to success page without alert
        window.location.href = response.url;
        return;
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        setError("Failed to parse API response");
        return;
      }

      if (response.ok) {
        // Redirect to success page silently
        window.location.href = "/investor-network-success";
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
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
          <Link href="/invest" className="inline-block text-blue-700 hover:text-blue-700/80 font-semibold">
            Back to Invest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <Link href="/invest" className="inline-flex items-center gap-2 text-blue-700 mb-6">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <h1 className="text-3xl font-bold text-ink mb-6">Join Investor Network</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700"
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
            <label className="block text-sm font-semibold text-ink mb-3">
              Investment Sector Preferences
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto mb-4">
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

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Or enter a specific sector if not listed:
              </label>
              <input
                type="text"
                placeholder="e.g., Biotech, Media, Tourism"
                onBlur={(e) => {
                  if (e.target.value.trim() && !selectedSectors.includes(e.target.value.trim())) {
                    toggleSector(e.target.value.trim());
                    e.target.value = "";
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
              />
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
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition"
          >
            {loading ? "Registering..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
