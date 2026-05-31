-- CreateTable
CREATE TABLE "InvestorRegistration" (
    "id" TEXT NOT NULL,
    "investor_type" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "investment_amount" DOUBLE PRECISION NOT NULL,
    "investment_preferences" TEXT[],
    "investor_note" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestorRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InvestorRegistration_investor_type_idx" ON "InvestorRegistration"("investor_type");

-- CreateIndex
CREATE INDEX "InvestorRegistration_email_idx" ON "InvestorRegistration"("email");

-- CreateIndex
CREATE INDEX "InvestorRegistration_status_idx" ON "InvestorRegistration"("status");
