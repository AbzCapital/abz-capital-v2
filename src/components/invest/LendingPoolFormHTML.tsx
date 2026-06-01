"use client";

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
  { code: "+353", name: "Luxembourg" },
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
  { code: "+39", name: "Vatican City" },
  { code: "+356", name: "Malta" },
  { code: "+357", name: "Cyprus" },
];

export function LendingPoolFormHTML() {

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-indigo mb-6 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mb-6">Join Lending Pool</h1>

        <form method="POST" action="/api/investors/register" className="space-y-4">
          <input type="hidden" name="investor_type" value="lending_pool" />
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
            className="w-full py-3 font-bold rounded text-white bg-indigo hover:bg-indigo-700"
          >
            Join Lending Pool
          </button>
        </form>
      </div>
    </div>
  );
}
