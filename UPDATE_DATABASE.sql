-- Run this SQL in Supabase SQL Editor to update the database schema
-- This updates the LoanConfig table to match the new Prisma schema

-- Step 1: Drop the old processingFee column and add the new processingFeePercentage column
ALTER TABLE "LoanConfig"
DROP COLUMN IF EXISTS "processingFee",
ADD COLUMN "processingFeePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0.05;

-- Step 2: Update the default values for maxMonths and trackerFee
ALTER TABLE "LoanConfig"
ALTER COLUMN "maxMonths" SET DEFAULT 12,
ALTER COLUMN "trackerFee" SET DEFAULT 15000;

-- Verify the changes
SELECT * FROM "LoanConfig" LIMIT 1;
