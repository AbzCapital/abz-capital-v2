"use client";

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
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-ink mb-6">Submit Opportunity</h1>

        <form method="POST" action="/api/submit/funding-opportunity" className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
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
              name="opportunityType"
              required
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
              name="description"
              required
              rows={5}
              placeholder="Describe the deal, its size, sector, and what you're looking for"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo text-white font-bold py-3 rounded-xl hover:bg-indigo/90 transition"
          >
            Submit Opportunity
          </button>
        </form>
      </div>
    </div>
  );
}
