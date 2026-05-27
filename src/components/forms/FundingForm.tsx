"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TurnstileField } from "./TurnstileField";
import { FileDropzone } from "./FileDropzone";
import { FormField, FormRow, Honeypot } from "./ContactForm";
import { fundingSchema, type FundingInput } from "@/lib/validation/leadSchemas";

export function FundingForm() {
  const [token, setToken] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FundingInput>({
    resolver: zodResolver(fundingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      fundingCategory: undefined,
      opportunityType: undefined,
      description: "",
      _hp: "",
    },
  });

  async function onSubmit(values: FundingInput) {
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (typeof v === "string") fd.append(k, v);
      });
      fd.append("turnstileToken", token);
      files.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/leads/funding", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data.error || "Submission failed.");
        return;
      }
      toast.success("Funding opportunity received. Our investor team will be in touch.");
      reset();
      setFiles([]);
    } catch {
      toast.error("Network error. Please try again or WhatsApp us.");
    }
  }

  const fundingCategory = watch("fundingCategory");
  const opportunityType = watch("opportunityType");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <FormRow>
        <FormField label="Full name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Your full name" />
        </FormField>
        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" inputMode="email" {...register("email")} placeholder="you@example.com" />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Phone" error={errors.phone?.message}>
          <Input type="tel" inputMode="tel" {...register("phone")} placeholder="+254 7XX XXX XXX" />
        </FormField>
        <FormField label="Category" error={errors.fundingCategory?.message}>
          <Select value={fundingCategory} onValueChange={(v) => setValue("fundingCategory", v as FundingInput["fundingCategory"], { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Pick a category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="asset-backed">Asset-backed</SelectItem>
              <SelectItem value="sme">SME</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="investment">Investment opportunity</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>

      <FormField label="Opportunity type" error={errors.opportunityType?.message}>
        <Select value={opportunityType} onValueChange={(v) => setValue("opportunityType", v as FundingInput["opportunityType"], { shouldValidate: true })}>
          <SelectTrigger><SelectValue placeholder="Pick an opportunity type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="equity">Equity</SelectItem>
            <SelectItem value="debt">Debt</SelectItem>
            <SelectItem value="working-capital">Working capital</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Describe the opportunity" error={errors.description?.message}>
        <Textarea rows={5} {...register("description")} placeholder="Briefly describe the deal, its size, your sector, and what you're looking for." />
      </FormField>

      <FormField label="Upload supporting documents (optional)">
        <FileDropzone files={files} onChange={setFiles} />
      </FormField>

      <Honeypot register={register("_hp")} />
      <TurnstileField onToken={setToken} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo px-6 py-3.5 text-sm font-bold text-white shadow-button transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit opportunity"}
        {!isSubmitting && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}

export default FundingForm;
