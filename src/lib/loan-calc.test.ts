import { describe, it, expect } from "vitest";
import {
  calculatePrincipal,
  calculateMonthlyPayment,
  calculateSchedule,
  formatKES,
  formatKESCompact,
  LoanInputError,
} from "./loan-calc";
import { LOAN_FEES_TOTAL, LOAN_MONTHLY_RATE, LOAN_MIN_MONTHS, LOAN_MAX_MONTHS } from "./loan-config";

describe("loan-calc", () => {
  describe("calculatePrincipal", () => {
    it("sums takeHome, insurance, and fees", () => {
      const result = calculatePrincipal(100000, 10000);
      expect(result).toBe(100000 + 10000 + LOAN_FEES_TOTAL);
    });

    it("handles zero insurance", () => {
      const result = calculatePrincipal(100000, 0);
      expect(result).toBe(100000 + LOAN_FEES_TOTAL);
    });
  });

  describe("calculateMonthlyPayment", () => {
    it("calculates payment using PMT formula", () => {
      const principal = 100000;
      const payment = calculateMonthlyPayment(principal, LOAN_MONTHLY_RATE, 3);
      // 3 months at 6% should be roughly 35k per month
      expect(payment).toBeGreaterThan(30000);
      expect(payment).toBeLessThan(40000);
    });

    it("throws error for invalid months", () => {
      expect(() => {
        calculateMonthlyPayment(100000, LOAN_MONTHLY_RATE, 0);
      }).toThrow(LoanInputError);
    });

    it("handles zero rate as simple division", () => {
      const principal = 100000;
      const payment = calculateMonthlyPayment(principal, 0, 4);
      expect(payment).toBe(principal / 4);
    });
  });

  describe("calculateSchedule", () => {
    it("generates valid amortization schedule", () => {
      const schedule = calculateSchedule({
        takeHome: 100000,
        insurancePremium: 0,
        months: 3,
      });

      expect(schedule.principal).toBe(100000 + LOAN_FEES_TOTAL);
      expect(schedule.months).toBe(3);
      expect(schedule.rows).toHaveLength(3);
      expect(schedule.totalRepayment).toBeGreaterThan(schedule.principal);
    });

    it("throws error for out-of-range months", () => {
      expect(() => {
        calculateSchedule({
          takeHome: 100000,
          insurancePremium: 0,
          months: 10,
        });
      }).toThrow(LoanInputError);
    });

    it("throws error for negative takeHome", () => {
      expect(() => {
        calculateSchedule({
          takeHome: -100000,
          insurancePremium: 0,
          months: 3,
        });
      }).toThrow(LoanInputError);
    });

    it("validates min months boundary", () => {
      expect(() => {
        calculateSchedule({
          takeHome: 100000,
          insurancePremium: 0,
          months: LOAN_MIN_MONTHS - 1,
        });
      }).toThrow(LoanInputError);
    });

    it("validates max months boundary", () => {
      expect(() => {
        calculateSchedule({
          takeHome: 100000,
          insurancePremium: 0,
          months: LOAN_MAX_MONTHS + 1,
        });
      }).toThrow(LoanInputError);
    });

    it("finalizes balance to zero on last month", () => {
      const schedule = calculateSchedule({
        takeHome: 100000,
        insurancePremium: 0,
        months: 3,
      });

      const lastRow = schedule.rows[schedule.rows.length - 1];
      expect(lastRow.balance).toBe(0);
    });

    it("each row payment equals interest + principal (except rounding)", () => {
      const schedule = calculateSchedule({
        takeHome: 100000,
        insurancePremium: 0,
        months: 3,
      });

      schedule.rows.forEach((row) => {
        const expectedPayment = row.interest + row.principal;
        expect(Math.abs(row.payment - expectedPayment)).toBeLessThan(1);
      });
    });
  });

  describe("formatKES", () => {
    it("formats as Kenyan currency", () => {
      const result = formatKES(100000);
      expect(result).toContain("KES");
      expect(result).toContain("100");
    });

    it("removes decimal places", () => {
      const result = formatKES(100000.99);
      expect(result).not.toContain(".99");
    });

    it("handles zero", () => {
      const result = formatKES(0);
      expect(result).toContain("0");
    });
  });

  describe("formatKESCompact", () => {
    it("formats number without currency symbol", () => {
      const result = formatKESCompact(100000);
      expect(result).not.toContain("KES");
      expect(result).toContain("100");
    });

    it("uses thousands separators", () => {
      const result = formatKESCompact(1234567);
      expect(result).toContain(",");
    });
  });
});
