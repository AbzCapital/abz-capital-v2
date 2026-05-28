-- AlterTable: Replace processingFee with processingFeePercentage
ALTER TABLE "LoanConfig" DROP COLUMN "processingFee";
ALTER TABLE "LoanConfig" ADD COLUMN "processingFeePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0.05;

-- Update default values
ALTER TABLE "LoanConfig" ALTER COLUMN "maxMonths" SET DEFAULT 12;
ALTER TABLE "LoanConfig" ALTER COLUMN "trackerFee" SET DEFAULT 15000;
