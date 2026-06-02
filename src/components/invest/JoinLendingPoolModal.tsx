"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

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

interface JoinLendingPoolModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinLendingPoolModal({
  open,
  onOpenChange,
}: JoinLendingPoolModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loanCategory, setLoanCategory] = useState("logbook_loans");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
          first_name: firstName,
          last_name: lastName,
          country_code: countryCode,
          phone_number: phoneNumber,
          email,
          investment_amount: parseFloat(amount),
          investment_preferences: preferences,
          investor_note: note,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setAmount("");
        setNote("");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md p-6">
          <button
            onClick={() => {
              setSuccess(false);
              onOpenChange(false);
            }}
            className="absolute right-4 top-4 text-muted-ink hover:text-ink"
          >
            <X className="size-5" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Registration Successful</h2>
            <p className="text-muted-ink mb-4 font-semibold">
              Your details have been saved successfully.
            </p>
            <p className="text-muted-ink mb-4">
              You will receive notifications whenever a loan matching your investment preferences becomes available.
            </p>
            <p className="text-sm font-semibold text-ink mb-4">
              For faster deal alerts, join our WhatsApp investor community.
            </p>
            <a
              href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition w-full"
            >
              <span>📱</span> Join WhatsApp Group
            </a>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b pb-4 px-6 pt-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-ink">
              Join Lending Pool
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-ink hover:text-ink"
            >
              <X className="size-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="700000000"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-3">
              Preferred Loan Category
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="category"
                  value="logbook_loans"
                  checked={loanCategory === "logbook_loans"}
                  onChange={(e) => setLoanCategory(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-ink">Logbook Loans</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="category"
                  value="title_deed_loans"
                  checked={loanCategory === "title_deed_loans"}
                  onChange={(e) => setLoanCategory(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-ink">Title Deed Loans</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="category"
                  value="both"
                  checked={loanCategory === "both"}
                  onChange={(e) => setLoanCategory(e.target.value)}
                  className="w-4 h-4"
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
              value={note}
              onChange={(e) =>
                setNote(e.target.value.substring(0, 200))
              }
              maxLength={200}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-muted-ink mt-1">
              {note.length}/200 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition"
          >
            {loading ? "Registering..." : "Join Lending Pool"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
