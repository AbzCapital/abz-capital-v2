import {
  calculateTotalFees,
  LOAN_MONTHLY_RATE,
  LOAN_MIN_MONTHS,
  LOAN_MAX_MONTHS,
} from "./loan-config";

export interface LoanInput {
  takeHome: number;
  insurancePremium: number;
  months: number;
}

export interface AmortizationRow {
  month: number;
  outstandingBalance: number;
  interest: number;
  principal: number;
  monthlyPayment: number;
  newBalance: number;
}

export interface LoanSchedule {
  takeHome: number;
  insurancePremium: number;
  feesTotal: number;
  principal: number;
  months: number;
  monthlyRate: number;
  fixedPrincipalPayment: number;
  totalRepayment: number;
  totalInterest: number;
  rows: AmortizationRow[];
}

export class LoanInputError extends Error {}

export function calculatePrincipal(
  takeHome: number,
  insurancePremium: number,
  feesTotal: number
): number {
  return takeHome + insurancePremium + feesTotal;
}

export function calculateSchedule(input: LoanInput): LoanSchedule {
  const { takeHome, insurancePremium, months } = input;

  if (months < LOAN_MIN_MONTHS || months > LOAN_MAX_MONTHS) {
    throw new LoanInputError(
      `months must be between ${LOAN_MIN_MONTHS} and ${LOAN_MAX_MONTHS}`
    );
  }
  if (!Number.isFinite(takeHome) || takeHome < 0) {
    throw new LoanInputError("takeHome must be a non-negative number");
  }
  if (!Number.isFinite(insurancePremium) || insurancePremium < 0) {
    throw new LoanInputError("insurancePremium must be a non-negative number");
  }

  // Calculate fees dynamically (processing fee is 5% of takeHome)
  const feesTotal = calculateTotalFees(takeHome);
  const principal = calculatePrincipal(takeHome, insurancePremium, feesTotal);
  const monthlyRate = LOAN_MONTHLY_RATE;

  // Fixed principal payment each month (reducing balance method)
  const fixedPrincipalPayment = principal / months;

  const rows: AmortizationRow[] = [];
  let outstandingBalance = principal;
  let totalInterestCharged = 0;

  for (let m = 1; m <= months; m++) {
    // Interest on outstanding balance
    const interest = Math.round(outstandingBalance * monthlyRate);

    // Principal is fixed each month
    const principalPayment = fixedPrincipalPayment;

    // Total monthly payment
    const monthlyPayment = interest + principalPayment;

    // New balance after payment
    const newBalance = Math.max(0, outstandingBalance - principalPayment);

    totalInterestCharged += interest;

    rows.push({
      month: m,
      outstandingBalance: Math.round(outstandingBalance),
      interest,
      principal: Math.round(principalPayment),
      monthlyPayment: Math.round(monthlyPayment),
      newBalance: Math.round(newBalance),
    });

    // Update outstanding balance for next iteration
    outstandingBalance = newBalance;
  }

  const totalRepayment = principal + totalInterestCharged;

  return {
    takeHome,
    insurancePremium,
    feesTotal,
    principal,
    months,
    monthlyRate,
    fixedPrincipalPayment,
    totalRepayment,
    totalInterest: totalInterestCharged,
    rows,
  };
}

export function formatKES(value: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatKESCompact(value: number): string {
  return new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
