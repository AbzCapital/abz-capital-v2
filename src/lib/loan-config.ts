// TODO(admin-dash): replace these constants with values fetched from the
// Settings table once sub-project 3 (admin dashboard) is built.

export const LOAN_FEES = {
  valuation: 1_500,
  legal: 1_500,
  processing: 15_000,
  logbookTransfer: 2_500,
  tracker: 25_000,
} as const;

export const LOAN_FEES_TOTAL =
  LOAN_FEES.valuation +
  LOAN_FEES.legal +
  LOAN_FEES.processing +
  LOAN_FEES.logbookTransfer +
  LOAN_FEES.tracker; // 45,500

export const LOAN_MONTHLY_RATE = 0.06; // 6% per month reducing balance
export const LOAN_MIN_MONTHS = 1;
export const LOAN_MAX_MONTHS = 6;
export const LOAN_MIN_TAKE_HOME = 50_000;
export const LOAN_MAX_TAKE_HOME = 5_000_000;

export const FEE_ITEMS: Array<{ label: string; amount: number }> = [
  { label: "Valuation fee", amount: LOAN_FEES.valuation },
  { label: "Legal fee", amount: LOAN_FEES.legal },
  { label: "Processing fee", amount: LOAN_FEES.processing },
  { label: "Logbook transfer", amount: LOAN_FEES.logbookTransfer },
  { label: "Tracker fee", amount: LOAN_FEES.tracker },
];
