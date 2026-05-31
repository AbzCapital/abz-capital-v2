"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LendingPoolForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loanCategory, setLoanCategory] = useState("logbook_loans");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const preferences =
        loanCategory === "both"
          ? ["logbook_loans", "title_deed_loans"]
          : [loanCategory];

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investor_type: "lending_pool",
          full_name: fullName,
          country_code: countryCode,
          phone_number: phoneNumber,
          email,
          investment_amount: parseFloat(amount),
          investment_preferences: preferences,
          investor_note: note,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-ink mb-4">✓ Success</h2>
          <p className="text-muted-ink mb-6">
            Your details have been saved. You will be notified when a matching
            secured loan is available.
          </p>
          <a
            href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition w-full"
          >
            <span>📱</span> Join WhatsApp Alerts
          </a>
          <Link href="/invest" className="block mt-4 text-indigo hover:text-indigo/80">
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

        <h1 className="text-3xl font-bold text-ink mb-6">Join Lending Pool</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="+254">+254</option>
                <option value="+256">+256</option>
                <option value="+255">+255</option>
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
              Email
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
              Amount (KES)
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
                  value="logbook_loans"
                  checked={loanCategory === "logbook_loans"}
                  onChange={(e) => setLoanCategory(e.target.value)}
                />
                <span className="text-ink">Logbook Loans</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="title_deed_loans"
                  checked={loanCategory === "title_deed_loans"}
                  onChange={(e) => setLoanCategory(e.target.value)}
                />
                <span className="text-ink">Title Deed Loans</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="both"
                  checked={loanCategory === "both"}
                  onChange={(e) => setLoanCategory(e.target.value)}
                />
                <span className="text-ink">Both</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Note (max 200)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.substring(0, 200))}
              maxLength={200}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-muted-ink mt-1">{note.length}/200</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo text-white font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Registering..." : "Join Lending Pool"}
          </button>
        </form>
      </div>
    </div>
  );
}
