"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertModal({ open, onOpenChange }: AlertModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        <DialogHeader className="border-b p-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-ink">
                Loan 868DT Approved & Ready for Funding
              </DialogTitle>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  🟢 Safe
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-ink hover:text-ink transition"
            >
              <X className="size-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6">
          {/* Two Section Layout */}
          <div className="grid gap-8 lg:grid-cols-2 mb-8">
            {/* Loan Details Section */}
            <div>
              <h2 className="text-lg font-bold text-ink mb-4 border-b-2 border-blue-700 pb-2">
                Loan Details
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Loan ID</span>
                  <span className="font-semibold text-ink">868DT</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Rating</span>
                  <span className="font-semibold text-ink">🟢 Safe</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Occupation</span>
                  <span className="font-semibold text-ink">Employed</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Loan Amount</span>
                  <span className="font-semibold text-ink">KES 600,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Collateral</span>
                  <span className="font-semibold text-ink">Toyota Fielder</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Collateral Value</span>
                  <span className="font-semibold text-ink">KES 1,400,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-ink">Loan Term</span>
                  <span className="font-semibold text-ink">12 Months</span>
                </div>
              </div>
            </div>

            {/* Investor Earnings Section */}
            <div>
              <h2 className="text-lg font-bold text-ink mb-4 border-b-2 border-peach pb-2">
                Investor Earnings
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Amount Invested</span>
                  <span className="font-semibold text-ink">KES 600,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Monthly Return</span>
                  <span className="font-semibold text-blue-700">3%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Monthly Earnings</span>
                  <span className="font-semibold text-ink">KES 18,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-muted-ink">Total Earnings (12 months)</span>
                  <span className="font-semibold text-ink">KES 216,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-ink">Total Amount to be Received</span>
                  <span className="font-semibold text-ink">KES 816,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-xl bg-blue-700 text-white px-6 py-4 text-base font-bold shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700/40 cursor-pointer">
            Fund this Loan
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
