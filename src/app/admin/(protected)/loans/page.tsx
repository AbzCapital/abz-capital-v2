"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface LoanConfig {
  id: string;
  valuationFee: number;
  legalFee: number;
  processingFeePercentage: number;
  logbookTransferFee: number;
  trackerFee: number;
  monthlyRate: number;
  minMonths: number;
  maxMonths: number;
  updatedAt: string;
  updatedBy: string;
}

export default function LoanConfigPage() {
  const [config, setConfig] = useState<LoanConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/admin/loans");
        if (!response.ok) throw new Error("Failed to fetch loan config");
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        toast.error("Failed to load loan configuration");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleSave = async () => {
    if (!config) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/loans", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!response.ok) throw new Error("Failed to save");
      toast.success("Loan configuration updated successfully");
    } catch (error) {
      toast.error("Failed to save loan configuration");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof LoanConfig, value: string | number) => {
    if (!config) return;
    setConfig({
      ...config,
      [field]: typeof value === "string" ? parseFloat(value) || value : value,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 text-blue-700 animate-spin" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-ink">Failed to load loan configuration</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-ink mb-2">
          Loan Configuration
        </h1>
        <p className="text-muted-ink">
          Configure loan fees, interest rates, and terms that appear in the loan
          simulator
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fees Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-ink border-b border-line pb-3">
            Loan Fees
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="valuation" className="text-sm font-medium">
                Car Valuation Fee (KES)
              </Label>
              <Input
                id="valuation"
                type="number"
                value={config.valuationFee}
                onChange={(e) => handleChange("valuationFee", e.target.value)}
                className="mt-2 px-4 py-2"
              />
            </div>

            <div>
              <Label htmlFor="legal" className="text-sm font-medium">
                Legal Fee (KES)
              </Label>
              <Input
                id="legal"
                type="number"
                value={config.legalFee}
                onChange={(e) => handleChange("legalFee", e.target.value)}
                className="mt-2 px-4 py-2"
              />
            </div>

            <div>
              <Label htmlFor="processing" className="text-sm font-medium">
                Loan Processing Fee (% of take-home amount)
              </Label>
              <Input
                id="processing"
                type="number"
                step="0.01"
                value={config.processingFeePercentage}
                onChange={(e) =>
                  handleChange("processingFeePercentage", e.target.value)
                }
                className="mt-2 px-4 py-2"
              />
              <p className="text-xs text-muted-ink mt-1">
                Example: 0.05 = 5% of take-home amount
              </p>
            </div>

            <div>
              <Label htmlFor="logbook" className="text-sm font-medium">
                Logbook Transfer Fee (KES)
              </Label>
              <Input
                id="logbook"
                type="number"
                value={config.logbookTransferFee}
                onChange={(e) =>
                  handleChange("logbookTransferFee", e.target.value)
                }
                className="mt-2 px-4 py-2"
              />
            </div>

            <div>
              <Label htmlFor="tracker" className="text-sm font-medium">
                Car Tracker Purchase Fee (KES)
              </Label>
              <Input
                id="tracker"
                type="number"
                value={config.trackerFee}
                onChange={(e) => handleChange("trackerFee", e.target.value)}
                className="mt-2 px-4 py-2"
              />
            </div>
          </div>
        </Card>

        {/* Interest & Terms Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-ink border-b border-line pb-3">
            Interest Rate & Terms
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyRate" className="text-sm font-medium">
                Monthly Interest Rate (Reducing Balance)
              </Label>
              <Input
                id="monthlyRate"
                type="number"
                step="0.001"
                value={config.monthlyRate}
                onChange={(e) => handleChange("monthlyRate", e.target.value)}
                className="mt-2 px-4 py-2"
              />
              <p className="text-xs text-muted-ink mt-1">
                Example: 0.06 = 6% per month
              </p>
            </div>

            <div>
              <Label htmlFor="minMonths" className="text-sm font-medium">
                Minimum Loan Period (months)
              </Label>
              <Input
                id="minMonths"
                type="number"
                min="1"
                value={config.minMonths}
                onChange={(e) => handleChange("minMonths", e.target.value)}
                className="mt-2 px-4 py-2"
              />
            </div>

            <div>
              <Label htmlFor="maxMonths" className="text-sm font-medium">
                Maximum Loan Period (months)
              </Label>
              <Input
                id="maxMonths"
                type="number"
                min="1"
                value={config.maxMonths}
                onChange={(e) => handleChange("maxMonths", e.target.value)}
                className="mt-2 px-4 py-2"
              />
            </div>

            <div className="bg-blue-700/5 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-700 mb-2">
                Summary
              </p>
              <ul className="text-xs space-y-1 text-muted-ink">
                <li>
                  • Loan period: {config.minMonths} - {config.maxMonths} months
                </li>
                <li>
                  • Monthly interest rate: {(config.monthlyRate * 100).toFixed(2)}
                  %
                </li>
                <li>
                  • Total fixed fees: KES{" "}
                  {(
                    config.valuationFee +
                    config.legalFee +
                    config.logbookTransferFee +
                    config.trackerFee
                  ).toLocaleString()}
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <strong>Note:</strong> Changes to these parameters will automatically
          appear in the loan simulator on the public website. Users will see
          updated fees, interest rates, and available loan periods.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-700 text-white hover:brightness-110 px-6 py-2 font-semibold flex items-center gap-2"
        >
          {isSaving && <Loader2 className="size-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save Configuration"}
        </Button>
        <Button variant="outline" className="px-6 py-2 font-semibold">
          Cancel
        </Button>
      </div>

      <div className="text-xs text-muted-ink">
        <p>
          Last updated: {new Date(config.updatedAt).toLocaleString()} by{" "}
          {config.updatedBy}
        </p>
      </div>
    </div>
  );
}
