"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SAMPLE_LOAN } from "@/lib/invest/sampleLoanData";

export function SimpleInvestorAlert() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      {/* Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowAlert(!showAlert)}
          className="px-6 py-3 bg-peach text-ink font-bold rounded-xl hover:brightness-110 transition cursor-pointer"
        >
          {showAlert ? "Hide Alert" : "See Sample Funding Alert"}
        </button>
      </div>

      {/* Alert Section - Shows only when button clicked */}
      {showAlert && (
        <div className="mb-12">
          <Container>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-700/20">
              {/* Header */}
              <div className="mb-6 pb-4 border-b border-blue-700/10">
                <h3 className="text-2xl font-bold text-ink mb-2">Sample Investor Alert</h3>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  {SAMPLE_LOAN.statusLabel}
                </span>
              </div>

              {/* Simple Info */}
              <div className="space-y-4 mb-6">
                <p className="text-ink font-semibold">
                  <span className="text-muted-ink">Client ID:</span> {SAMPLE_LOAN.clientId}
                </p>
                <p className="text-ink font-semibold">
                  <span className="text-muted-ink">Security:</span> {SAMPLE_LOAN.security}
                </p>
                <p className="text-ink font-semibold">
                  <span className="text-muted-ink">Occupation:</span> {SAMPLE_LOAN.occupation}
                </p>
                <p className="text-ink font-semibold">
                  <span className="text-muted-ink">Collateral Value:</span> {SAMPLE_LOAN.collateralValue}
                </p>
                <p className="text-ink font-semibold">
                  <span className="text-muted-ink">Loan Amount:</span> {SAMPLE_LOAN.loanAmount}
                </p>
              </div>


              {/* CTA */}
              <button className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl hover:brightness-110 transition cursor-pointer">
                Fund This Loan
              </button>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
