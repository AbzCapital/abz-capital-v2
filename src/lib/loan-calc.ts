import {
  LOAN_FEES_TOTAL,
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
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface LoanSchedule {
  takeHome: number;
  insurancePremium: number;
  feesTotal: number;
  principal: number;
  months: number;
  monthlyRate: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  rows: AmortizationRow[];
}

export class LoanInputError extends Error {}

export function calculatePrincipal(
  takeHome: number,
  insurancePremium: number,
  feesTotal: number = LOAN_FEES_TOTAL
): number {
  return takeHome + insurancePremium + feesTotal;
}

export function calculateMonthlyPayment(
  principal: number,
  monthlyRate: number,
  months: number
): number {
  if (months <= 0) {
    throw new LoanInputError("months must be greater than 0");
  }
  if (monthlyRate <= 0) {
    return principal / months;
  }
  const factor = Math.pow(1 + monthlyRate, -months);
  return (principal * monthlyRate) / (1 - factor);
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

  const feesTotal = LOAN_FEES_TOTAL;
  const principal = calculatePrincipal(takeHome, insurancePremium, feesTotal);
  const monthlyRate = LOAN_MONTHLY_RATE;
  const monthlyPayment = calculateMonthlyPayment(principal, monthlyRate, months);

  const rows: AmortizationRow[] = [];
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const interest = balance * monthlyRate;
    let principalPaid = monthlyPayment - interest;
    if (m === months) {
      // Final row settles any rounding remainder
      principalPaid = balance;
    }
    balance -= principalPaid;
    rows.push({
      month: m,
      payment: m === months ? principalPaid + interest : monthlyPayment,
      interest,
      principal: principalPaid,
      balance: Math.max(0, balance),
    });
  }

  const totalRepayment = rows.reduce((sum, r) => sum + r.payment, 0);
  const totalInterest = totalRepayment - principal;

  return {
    takeHome,
    insurancePremium,
    feesTotal,
    principal,
    months,
    monthlyRate,
    monthlyPayment,
    totalRepayment,
    totalInterest,
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
