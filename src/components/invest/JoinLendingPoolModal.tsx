"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setAmount("");
        setNote("");
      }
    } catch (error) {
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
            <h2 className="text-2xl font-bold text-ink mb-4">
              ✓ Successfully Registered
            </h2>
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
              <span>📱</span> Join WhatsApp Alerts Group
            </a>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
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
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo"
              >
                <option value="+254">+254 (Kenya)</option>
                <option value="+256">+256 (Uganda)</option>
                <option value="+255">+255 (Tanzania)</option>
              </select>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="700000000"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Amount Willing to Invest (KES)
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="600000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
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
              Investor Note <span className="text-xs text-muted-ink">(max 200)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) =>
                setNote(e.target.value.substring(0, 200))
              }
              maxLength={200}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
            />
            <p className="text-xs text-muted-ink mt-1">
              {note.length}/200 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo text-white font-bold py-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition"
          >
            {loading ? "Registering..." : "Join Lending Pool"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
