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
import { FormField, FormRow, Honeypot } from "./ContactForm";
import {
  investorSchema,
  type InvestorInput,
} from "@/lib/validation/leadSchemas";

export function InvestorInterestForm() {
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InvestorInput>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      track: undefined,
      ticket: undefined,
      notes: "",
      _hp: "",
    },
  });

  async function onSubmit(values: InvestorInput) {
    try {
      const res = await fetch("/api/leads/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data.error || "Submission failed. Please retry.");
        return;
      }
      toast.success("Registered. Our investor team will reach out within 24 hours.");
      reset();
    } catch {
      toast.error("Network error. Please try again or WhatsApp us.");
    }
  }

  const track = watch("track");
  const ticket = watch("ticket");

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
        <FormField label="Investor track" error={errors.track?.message}>
          <Select value={track} onValueChange={(v) => setValue("track", v as InvestorInput["track"], { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="Pick a track" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="asset-backed">Asset-Backed Lending Pool</SelectItem>
              <SelectItem value="sme-innovation">SME &amp; Innovation Deals</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>

      <FormField label="Ticket size band" error={errors.ticket?.message}>
        <Select value={ticket} onValueChange={(v) => setValue("ticket", v as InvestorInput["ticket"], { shouldValidate: true })}>
          <SelectTrigger><SelectValue placeholder="Pick a ticket size band" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="<500K">Under KES 500,000</SelectItem>
            <SelectItem value="500K-2M">KES 500,000 – 2M</SelectItem>
            <SelectItem value="2M-10M">KES 2M – 10M</SelectItem>
            <SelectItem value=">10M">Over KES 10M</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Notes (optional)" error={errors.notes?.message}>
        <Textarea rows={4} {...register("notes")} placeholder="Sectors of interest, risk tolerance, anything else." />
      </FormField>

      <Honeypot register={register("_hp")} />
      <TurnstileField onToken={setToken} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo px-6 py-3.5 text-sm font-bold text-white shadow-button transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Register interest"}
        {!isSubmitting && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}

export default InvestorInterestForm;
