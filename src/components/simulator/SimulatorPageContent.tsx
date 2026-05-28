"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/Container";

export function SimulatorPageContent() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-line">
        <Container>
          <div className="flex items-center gap-4 py-4">
            <Link
              href="/products"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-indigo/5 active:brightness-95 touch-manipulation"
              aria-label="Back to products"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-indigo">Loan Terms Simulator</h1>
              <p className="text-sm text-muted-ink">Calculate your loan schedule</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 max-w-2xl pb-20">
        <div className="space-y-6">
          {/* Input Section */}
          <div>
            <label className="block text-base font-semibold text-ink mb-2">
              Amount to Take Home (KES)
            </label>
            <p className="text-xs text-muted-ink mb-3">
              The net cash amount you need after all fees
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
                KES
              </span>
              <input
                type="text"
                inputMode="numeric"
                id="loanAmount"
                placeholder="e.g. 500000"
                defaultValue="500000"
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold text-ink mb-2">
              Insurance Premium (KES)
            </label>
            <p className="text-xs text-muted-ink mb-3">
              Your estimated annual comprehensive vehicle insurance
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-ink font-medium pointer-events-none">
                KES
              </span>
              <input
                type="text"
                inputMode="numeric"
                id="insurancePremium"
                placeholder="e.g. 50000"
                defaultValue="50000"
                className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold text-ink mb-2">
              Loan Period (Months)
            </label>
            <p className="text-xs text-muted-ink mb-3">
              Number of months to repay (e.g. 1, 6, 12, 24, 36)
            </p>
            <input
              type="text"
              inputMode="numeric"
              id="loanPeriod"
              placeholder="e.g. 12"
              defaultValue="12"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent"
            />
          </div>

          {/* Calculate Button */}
          <button
            id="calculateBtn"
            className="w-full h-12 bg-indigo text-white font-semibold rounded-lg hover:brightness-110 active:brightness-95 transition touch-manipulation"
            style={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              touchAction: "manipulation",
              pointerEvents: "auto",
            } as React.CSSProperties}
          >
            Calculate Schedule →
          </button>

          {/* Summary Section - Hidden until calculated */}
          <div id="summarySection" style={{ display: "none" }}>
            <div className="border-t border-line pt-8 mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Loan Summary</h2>

              {/* Summary Text */}
              <div
                id="summaryText"
                className="bg-white rounded-lg border border-line p-6 mb-8 space-y-3 text-sm"
              ></div>

              {/* Payment Schedule */}
              <h3 className="text-lg font-bold text-ink mb-4">Payment Schedule</h3>
              <div className="overflow-x-auto rounded-lg border border-line bg-white" style={{ WebkitOverflowScrolling: "touch" }}>
                <table
                  id="scheduleTable"
                  className="w-full text-xs sm:text-sm"
                  style={{ minWidth: "500px" }}
                >
                  <thead className="bg-indigo text-white">
                    <tr>
                      <th className="px-3 py-3 text-center font-bold">Month</th>
                      <th className="px-3 py-3 text-right font-bold">Outstanding Balance</th>
                      <th className="px-3 py-3 text-right font-bold">Interest</th>
                      <th className="px-3 py-3 text-right font-bold">Principal</th>
                      <th className="px-3 py-3 text-right font-bold">Monthly Payment</th>
                      <th className="px-3 py-3 text-right font-bold">New Balance</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>

              {/* Download PDF and Apply Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  id="downloadPdfBtn"
                  className="flex-1 h-12 bg-indigo text-white font-semibold rounded-lg hover:brightness-110 active:brightness-95 transition touch-manipulation"
                  style={{
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                    touchAction: "manipulation",
                  }}
                >
                  📥 Download Schedule
                </button>
                <a
                  id="whatsappBtn"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 bg-green-500 text-white font-semibold rounded-lg hover:brightness-110 active:brightness-95 transition touch-manipulation flex items-center justify-center"
                  style={{
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                    touchAction: "manipulation",
                  }}
                >
                  💬 Apply for Loan
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* JavaScript Logic */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // ABZ Capital Loan Configuration
            const LOAN_CONFIG = {
              valuationFee: 1500,
              legalFee: 1500,
              processingFeePercentage: 0.05,
              logbookTransferFee: 2500,
              trackerFee: 15000,
              monthlyRate: 0.06
            };

            function formatKES(value) {
              return new Intl.NumberFormat('en-KE', {
                style: 'currency',
                currency: 'KES',
                maximumFractionDigits: 0
              }).format(Math.round(value));
            }

            document.addEventListener('DOMContentLoaded', function() {
              const calculateBtn = document.getElementById('calculateBtn');
              const summarySection = document.getElementById('summarySection');
              const summaryTextDiv = document.getElementById('summaryText');
              const scheduleBody = document.querySelector('#scheduleTable tbody');
              const downloadPdfBtn = document.getElementById('downloadPdfBtn');
              const whatsappBtn = document.getElementById('whatsappBtn');

              function calculateLoan() {
                let amount = parseInt(document.getElementById('loanAmount').value.replace(/[^0-9]/g, '')) || 0;
                let premium = parseInt(document.getElementById('insurancePremium').value.replace(/[^0-9]/g, '')) || 0;
                let months = parseInt(document.getElementById('loanPeriod').value.replace(/[^0-9]/g, '')) || 0;

                if (amount <= 0) {
                  alert('Please enter a valid loan amount');
                  return false;
                }
                if (premium <= 0) {
                  alert('Please enter a valid insurance premium');
                  return false;
                }
                if (months < 1) {
                  alert('Please enter a valid loan period (at least 1 month)');
                  return false;
                }

                // Calculate fees
                const processingFee = Math.round(amount * LOAN_CONFIG.processingFeePercentage);
                const feesTotal = LOAN_CONFIG.valuationFee + LOAN_CONFIG.legalFee + processingFee +
                                 LOAN_CONFIG.logbookTransferFee + LOAN_CONFIG.trackerFee;
                const principal = amount + premium + feesTotal;
                const fixedPrincipalPayment = principal / months;

                // Calculate total interest
                let outstandingBalance = principal;
                let totalInterestCharged = 0;
                const rows = [];

                for (let m = 1; m <= months; m++) {
                  const interest = Math.round(outstandingBalance * LOAN_CONFIG.monthlyRate);
                  const principalPayment = fixedPrincipalPayment;
                  const monthlyPayment = interest + principalPayment;
                  const newBalance = Math.max(0, outstandingBalance - principalPayment);

                  totalInterestCharged += interest;

                  rows.push({
                    month: m,
                    outstandingBalance: Math.round(outstandingBalance),
                    interest,
                    principal: Math.round(principalPayment),
                    monthlyPayment: Math.round(monthlyPayment),
                    newBalance: Math.round(newBalance)
                  });

                  outstandingBalance = newBalance;
                }

                const totalRepayment = principal + totalInterestCharged;

                // Build summary HTML
                summaryTextDiv.innerHTML = \`
                  <div class="flex justify-between"><span>Take Home:</span><span class="font-semibold">\${formatKES(amount)}</span></div>
                  <div class="flex justify-between"><span>Insurance Premium:</span><span class="font-semibold">\${formatKES(premium)}</span></div>
                  <div class="flex justify-between"><span>Valuation Fee:</span><span class="font-semibold">KES 1,500</span></div>
                  <div class="flex justify-between"><span>Legal Fee:</span><span class="font-semibold">KES 1,500</span></div>
                  <div class="flex justify-between"><span>Processing Fee (5%):</span><span class="font-semibold">\${formatKES(processingFee)}</span></div>
                  <div class="flex justify-between"><span>Logbook Transfer Fee:</span><span class="font-semibold">KES 2,500</span></div>
                  <div class="flex justify-between"><span>Tracker Fee:</span><span class="font-semibold">KES 15,000</span></div>
                  <div class="border-t border-line pt-2 flex justify-between"><span>Total Fees:</span><span class="font-semibold">\${formatKES(feesTotal)}</span></div>
                  <div class="border-t border-line pt-2 flex justify-between font-bold text-indigo"><span>Loan Principal:</span><span>\${formatKES(principal)}</span></div>
                  <div class="flex justify-between text-blue-700"><span>Total Interest:</span><span class="font-bold text-lg">\${formatKES(totalInterestCharged)}</span></div>
                  <div class="flex justify-between text-blue-700"><span>Total Repayment:</span><span class="font-bold text-lg">\${formatKES(totalRepayment)}</span></div>
                \`;

                // Store calculation data for PDF and WhatsApp
                window.loanData = {
                  amount,
                  premium,
                  processingFee,
                  feesTotal,
                  principal,
                  months,
                  totalInterestCharged,
                  totalRepayment,
                  monthlyPayment: rows[0].monthlyPayment,
                  rows
                };

                // Generate schedule table
                scheduleBody.innerHTML = '';
                rows.forEach((row, idx) => {
                  const tr = document.createElement('tr');
                  tr.className = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                  tr.innerHTML = \`
                    <td class="px-3 py-2 text-center font-semibold">\${row.month}</td>
                    <td class="px-3 py-2 text-right text-muted-ink">\${formatKES(row.outstandingBalance)}</td>
                    <td class="px-3 py-2 text-right text-muted-ink">\${formatKES(row.interest)}</td>
                    <td class="px-3 py-2 text-right text-muted-ink">\${formatKES(row.principal)}</td>
                    <td class="px-3 py-2 text-right font-bold">\${formatKES(row.monthlyPayment)}</td>
                    <td class="px-3 py-2 text-right font-bold">\${formatKES(row.newBalance)}</td>
                  \`;
                  scheduleBody.appendChild(tr);
                });

                return true;
              }

              function showSummaryAndScroll() {
                const success = calculateLoan();
                if (!success) return;

                summarySection.style.display = 'block';

                // Critical: scroll to summary after a small delay so mobile keyboard closes first
                setTimeout(() => {
                  summarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }

              function printSchedule() {
                if (summarySection.style.display !== 'block') {
                  alert('Please generate the loan summary first');
                  return;
                }
                window.print();
              }

              function downloadPdf() {
                if (!window.loanData) {
                  alert('Please generate the loan summary first');
                  return;
                }

                const data = window.loanData;
                const html = \`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8">
                    <title>Loan Schedule</title>
                    <style>
                      body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                      h1 { color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }
                      h2 { color: #0066cc; margin-top: 30px; }
                      .summary { margin: 20px 0; }
                      .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
                      .row-label { font-weight: bold; }
                      .row-value { text-align: right; }
                      table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                      th, td { padding: 10px; border: 1px solid #ddd; text-align: right; }
                      th { background-color: #0066cc; color: white; }
                      tr:nth-child(even) { background-color: #f9f9f9; }
                      .footer { margin-top: 40px; font-size: 12px; color: #666; }
                    </style>
                  </head>
                  <body>
                    <h1>ABZ CAPITAL LIMITED</h1>
                    <h2>Loan Repayment Schedule</h2>

                    <div class="summary">
                      <div class="row">
                        <span class="row-label">Take Home:</span>
                        <span class="row-value">KES \${data.amount.toLocaleString()}</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Insurance Premium:</span>
                        <span class="row-value">KES \${data.premium.toLocaleString()}</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Valuation Fee:</span>
                        <span class="row-value">KES 1,500</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Legal Fee:</span>
                        <span class="row-value">KES 1,500</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Processing Fee (5%):</span>
                        <span class="row-value">KES \${data.processingFee.toLocaleString()}</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Logbook Transfer Fee:</span>
                        <span class="row-value">KES 2,500</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Tracker Fee:</span>
                        <span class="row-value">KES 15,000</span>
                      </div>
                      <div class="row" style="border-top: 2px solid #333; border-bottom: 2px solid #333; font-weight: bold;">
                        <span class="row-label">Total Fees:</span>
                        <span class="row-value">KES \${data.feesTotal.toLocaleString()}</span>
                      </div>
                      <div class="row" style="border-bottom: 2px solid #333; font-weight: bold; color: #0066cc;">
                        <span class="row-label">Loan Principal:</span>
                        <span class="row-value">KES \${data.principal.toLocaleString()}</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Total Interest (6% per month):</span>
                        <span class="row-value">KES \${data.totalInterestCharged.toLocaleString()}</span>
                      </div>
                      <div class="row" style="font-weight: bold; color: #0066cc;">
                        <span class="row-label">Total Repayment:</span>
                        <span class="row-value">KES \${data.totalRepayment.toLocaleString()}</span>
                      </div>
                      <div class="row">
                        <span class="row-label">Loan Period:</span>
                        <span class="row-value">\${data.months} months</span>
                      </div>
                    </div>

                    <h2>Payment Schedule</h2>
                    <table>
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Outstanding Balance</th>
                          <th>Interest (6%)</th>
                          <th>Principal</th>
                          <th>Monthly Payment</th>
                          <th>New Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        \${data.rows.map(row => \`
                          <tr>
                            <td style="text-align: center;">\${row.month}</td>
                            <td>KES \${row.outstandingBalance.toLocaleString()}</td>
                            <td>KES \${row.interest.toLocaleString()}</td>
                            <td>KES \${row.principal.toLocaleString()}</td>
                            <td>KES \${row.monthlyPayment.toLocaleString()}</td>
                            <td>KES \${row.newBalance.toLocaleString()}</td>
                          </tr>
                        \`).join('')}
                      </tbody>
                    </table>

                    <div class="footer">
                      <p>Generated by ABZ Capital Ltd on \${new Date().toLocaleDateString('en-KE')}</p>
                      <p>Interest Rate: 6% per month (Reducing Balance)</p>
                      <p>For inquiries, contact ABZ Capital: +254 (0)XX XXX XXXX</p>
                    </div>
                  </body>
                  </html>
                \`;

                const blob = new Blob([html], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = \`loan-schedule-\${data.months}months.pdf\`;
                link.click();
                window.URL.revokeObjectURL(url);
              }

              function updateWhatsappLink() {
                if (!window.loanData) {
                  whatsappBtn.href = '#';
                  return;
                }

                const data = window.loanData;
                const message = \`Hello, I am interested in a loan of KES \${data.principal.toLocaleString()} for a period of \${data.months} month\${data.months !== 1 ? 's' : ''}. The monthly payment would be KES \${data.monthlyPayment.toLocaleString()}. Can you provide more information about the application process?\`;
                const encodedMessage = encodeURIComponent(message);
                whatsappBtn.href = \`https://wa.me/?text=\${encodedMessage}\`;
              }

              // Attach events - using standard click event (works on mobile and desktop)
              calculateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showSummaryAndScroll();
              });

              downloadPdfBtn.addEventListener('click', (e) => {
                e.preventDefault();
                downloadPdf();
              });

              summarySection.addEventListener('click', () => {
                updateWhatsappLink();
              });

              // Allow Enter key to trigger calculation
              const periodInput = document.getElementById('loanPeriod');
              periodInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  showSummaryAndScroll();
                }
              });
            });

            // Print styles
            const style = document.createElement('style');
            style.textContent = \`
              @media print {
                #calculateBtn, #printBtn {
                  display: none;
                }
                body > :not(.sticky) {
                  color: black;
                }
                table {
                  page-break-inside: avoid;
                }
              }
            \`;
            document.head.appendChild(style);
          `,
        }}
      />
    </>
  );
}
