"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileField } from "./TurnstileField";
import { contactSchema, type ContactInput } from "@/lib/validation/leadSchemas";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [token, setToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      _hp: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error(data.error || "We couldn't send your message. Please try again.");
        return;
      }
      toast.success("Message sent. We'll be back within one business day.");
      reset();
    } catch {
      toast.error("Network error. Please try again or WhatsApp us.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <FormRow>
        <FormField label="Full name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Jane Wanjiku" />
        </FormField>
        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" inputMode="email" {...register("email")} placeholder="you@example.com" />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField label="Phone" error={errors.phone?.message}>
          <Input type="tel" inputMode="tel" {...register("phone")} placeholder="+254 7XX XXX XXX" />
        </FormField>
        <FormField label="Subject" error={errors.subject?.message}>
          <Input {...register("subject")} placeholder="How can we help?" />
        </FormField>
      </FormRow>

      <FormField label="Message" error={errors.message?.message}>
        <Textarea rows={5} {...register("message")} placeholder="Tell us a bit about what you need." />
      </FormField>

      <Honeypot register={register("_hp")} />
      <TurnstileField onToken={setToken} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo px-6 py-3.5 text-sm font-bold text-white shadow-button transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/40 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send message"}
        {!isSubmitting && <Send className="size-4" />}
      </button>
    </form>
  );
}

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

export function FormField({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-ink/80">
        {label}
      </Label>
      {children}
      {error ? (
        <p className={cn("text-xs font-medium text-red-600")}>{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-ink">{hint}</p>
      ) : null}
    </div>
  );
}

export function Honeypot({ register }: { register: ReturnType<ReturnType<typeof useForm<{ _hp?: string }>>["register"]> }) {
  return (
    <div aria-hidden className="hidden">
      <label>
        Leave this field blank
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}

export default ContactForm;
