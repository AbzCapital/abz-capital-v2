// TODO(admin-dash): replace these constants with values fetched from the
// Settings table once sub-project 3 (admin dashboard) is built.

export const LOAN_FEES = {
  valuation: 1_500,
  legal: 1_500,
  // processing fee is calculated as 5% of take-home amount (see calculateTotalFees)
  logbookTransfer: 2_500,
  tracker: 25_000,
} as const;

export const LOAN_PROCESSING_FEE_PERCENTAGE = 0.05; // 5% of take-home

// Static fees total (without dynamic processing fee)
export const LOAN_FEES_TOTAL_STATIC =
  LOAN_FEES.valuation +
  LOAN_FEES.legal +
  LOAN_FEES.logbookTransfer +
  LOAN_FEES.tracker; // 32,000

// Helper function to calculate total fees including dynamic processing fee
export function calculateTotalFees(takeHome: number): number {
  const processingFee = takeHome * LOAN_PROCESSING_FEE_PERCENTAGE;
  return (
    LOAN_FEES.valuation +
    LOAN_FEES.legal +
    processingFee +
    LOAN_FEES.logbookTransfer +
    LOAN_FEES.tracker
  );
}

export const LOAN_MONTHLY_RATE = 0.06; // 6% per month reducing balance
export const LOAN_MIN_MONTHS = 1;
export const LOAN_MAX_MONTHS = 12;
export const LOAN_MIN_TAKE_HOME = 50_000;
export const LOAN_MAX_TAKE_HOME = 5_000_000;

// Static fee items (processing fee is dynamic, calculated as 5% of take-home)
export const FEE_ITEMS: Array<{ label: string; amount: number }> = [
  { label: "Valuation fee", amount: LOAN_FEES.valuation },
  { label: "Legal fee", amount: LOAN_FEES.legal },
  { label: "Logbook transfer", amount: LOAN_FEES.logbookTransfer },
  { label: "Tracker fee", amount: LOAN_FEES.tracker },
];
