"use client";

import { useState } from "react";

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

export function FundingOpportunityFormHTML() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");
  const [opportunityType, setOpportunityType] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("countryCode", countryCode);
      formData.append("phoneNumber", phoneNumber);
      formData.append("category", category);
      formData.append("opportunityType", opportunityType);
      formData.append("description", description);

      // Append files
      files.forEach((file) => {
        formData.append("files", file);
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("/api/submit/funding-opportunity", {
        method: "POST",
        body: formData,
        signal: controller.signal,
        redirect: "follow",
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok && data.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/fundraise";
        }, 2000);
      } else {
        setError(data.error || "Submission failed");
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Phone *
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
              Category *
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
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
              required
              value={opportunityType}
              onChange={(e) => setOpportunityType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
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
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-muted-ink mt-1">
              PDF, Word, Excel, Images (max 5 files)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo text-white font-bold py-3 rounded-xl disabled:opacity-50 transition"
          >
            {loading ? "Submitting..." : "Submit Opportunity"}
          </button>
        </form>
      </div>
    </div>
  );
}
