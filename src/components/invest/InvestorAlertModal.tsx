"use client";

import { useEffect } from "react";
import { SAMPLE_LOAN } from "@/lib/invest/sampleLoanData";

interface InvestorAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvestorAlertModal({ isOpen, onClose }: InvestorAlertModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
      style={{ WebkitOverflowScrolling: "touch" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md my-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-3xl font-bold text-gray-600 hover:text-gray-900 transition p-2 cursor-pointer"
          style={{ touchAction: "manipulation" }}
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ink mb-3">
              Sample Investor Alert
            </h2>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              {SAMPLE_LOAN.statusLabel}
            </span>
          </div>

          <p className="text-ink mb-6">
            This loan has been underwritten, verified and is ready for investor funding.
          </p>

          {/* Loan Details */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 space-y-3">
            <div className="text-sm">
              <span className="font-semibold text-ink">Client ID:</span>{" "}
              <span className="text-muted-ink">{SAMPLE_LOAN.clientId}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-ink">Security:</span>{" "}
              <span className="text-muted-ink">{SAMPLE_LOAN.security}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-ink">Occupation:</span>{" "}
              <span className="text-muted-ink">{SAMPLE_LOAN.occupation}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-ink">Collateral Value:</span>{" "}
              <span className="text-muted-ink">{SAMPLE_LOAN.collateralValue}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-ink">Loan Term:</span>{" "}
              <span className="text-muted-ink">{SAMPLE_LOAN.loanTerm}</span>
            </div>
            <div className="text-sm border-t border-gray-200 pt-3">
              <span className="font-semibold text-ink">Loan Amount:</span>{" "}
              <span className="text-muted-ink">{SAMPLE_LOAN.loanAmount}</span>
            </div>
          </div>

          {/* Returns Box */}
          <div className="bg-yellow-50 rounded-2xl p-4 mb-6 text-center">
            <h3 className="font-bold text-ink mb-1">Investor Returns</h3>
            <p className="text-xs text-muted-ink mb-2">
              (3% of loan amount per month)
            </p>
            <p className="text-2xl font-bold text-orange-600 mb-1">
              {SAMPLE_LOAN.investorReturn}
            </p>
            <p className="text-xs text-muted-ink">
              {SAMPLE_LOAN.monthlyPayment}/month for {SAMPLE_LOAN.loanTerm}
            </p>
          </div>

          {/* Notification */}
          <p className="bg-blue-50 text-blue-900 text-sm p-3 rounded-lg mb-6 italic">
            📧 {SAMPLE_LOAN.notificationMessage}
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => console.log("Fund loan clicked")}
              className="w-full bg-indigo text-white font-bold py-4 rounded-full hover:brightness-110 transition active:scale-95 cursor-pointer"
              style={{ touchAction: "manipulation" }}
            >
              💰 Fund This Loan
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-800 text-white font-bold py-4 rounded-full hover:brightness-110 transition active:scale-95 cursor-pointer"
              style={{ touchAction: "manipulation" }}
            >
              📋 View All Opportunities
            </button>
          </div>

          <p className="text-center text-xs text-muted-ink mt-6">
            You can fund fully or partially based on your preference.
          </p>
        </div>
      </div>
    </div>
  );
}
