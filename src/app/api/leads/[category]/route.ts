import { NextResponse } from "next/server";
import { z } from "zod";
import { fromAddress, getResend } from "@/lib/email/resend";
import {
  CATEGORY_LABELS,
  CATEGORY_ROUTES,
  isLeadCategory,
} from "@/lib/email/routes";
import {
  contactSchema,
  fundingSchema,
  investorSchema,
  productEnquirySchema,
} from "@/lib/validation/leadSchemas";
import { verifyTurnstile } from "@/lib/turnstile";
import { generateInternalNotificationHtml } from "@/lib/email/templates/InternalNotification";
import { generateAutoReplyHtml } from "@/lib/email/templates/AutoReply";
import { whatsappUrl } from "@/lib/whatsapp";
import type { LeadCategory } from "@/lib/product-catalog";

export const runtime = "nodejs";

interface ParsedSubmission {
  fields: Array<{ label: string; value: string }>;
  message?: string;
  email: string;
  name: string;
  intro: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
]);

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

async function parseFundingMultipart(req: Request): Promise<ParsedSubmission & { token?: string }> {
  const form = await req.formData();
  const raw = Object.fromEntries(
    Array.from(form.entries()).filter(([, v]) => typeof v === "string")
  ) as Record<string, string>;

  const parsed = fundingSchema.parse({
    ...raw,
    _hp: raw._hp ?? "",
  });

  const files = form.getAll("files") as File[];
  if (files.length > MAX_FILES) {
    throw new z.ZodError([
      {
        code: "custom",
        message: `Maximum ${MAX_FILES} files allowed`,
        path: ["files"],
      },
    ]);
  }

  const attachments: Array<{ filename: string; content: Buffer }> = [];
  for (const f of files) {
    if (!f || f.size === 0) continue;
    if (f.size > MAX_FILE_SIZE) {
      throw new z.ZodError([
        {
          code: "custom",
          message: `${f.name} is larger than 5 MB`,
          path: ["files"],
        },
      ]);
    }
    if (!ALLOWED_MIME.has(f.type)) {
      throw new z.ZodError([
        {
          code: "custom",
          message: `${f.name} has an unsupported file type`,
          path: ["files"],
        },
      ]);
    }
    const buf = Buffer.from(await f.arrayBuffer());
    attachments.push({ filename: f.name, content: buf });
  }

  return {
    name: parsed.name,
    email: parsed.email,
    intro: "Thanks for submitting a funding opportunity — our investor team will review and get back to you shortly.",
    fields: [
      { label: "Name", value: parsed.name },
      { label: "Email", value: parsed.email },
      { label: "Phone", value: parsed.phone },
      { label: "Category", value: parsed.fundingCategory },
      { label: "Opportunity type", value: parsed.opportunityType },
      { label: "Attachments", value: String(attachments.length) },
    ],
    message: parsed.description,
    attachments,
    token: parsed.turnstileToken,
  };
}

async function parseJson(req: Request, category: LeadCategory): Promise<ParsedSubmission & { token?: string }> {
  const raw = await req.json();

  if (category === "contact") {
    const p = contactSchema.parse(raw);
    return {
      name: p.name,
      email: p.email,
      intro: "Thanks for getting in touch — we&rsquo;ll be back with you within one business day.",
      fields: [
        { label: "Name", value: p.name },
        { label: "Email", value: p.email },
        { label: "Phone", value: p.phone },
        { label: "Subject", value: p.subject },
      ],
      message: p.message,
      token: p.turnstileToken,
    };
  }

  if (category === "invest") {
    const p = investorSchema.parse(raw);
    return {
      name: p.name,
      email: p.email,
      intro: "Thanks for registering interest — our investor team will reach out within 24 hours.",
      fields: [
        { label: "Name", value: p.name },
        { label: "Email", value: p.email },
        { label: "Phone", value: p.phone },
        { label: "Track", value: p.track },
        { label: "Ticket size", value: p.ticket },
      ],
      message: p.notes,
      token: p.turnstileToken,
    };
  }

  // Product enquiry (loans, sme, contractor, insurance)
  const p = productEnquirySchema.parse(raw);
  return {
    name: p.name,
    email: p.email,
    intro: `Thanks for your interest in ${p.productTitle} — a specialist will reach out shortly.`,
    fields: [
      { label: "Name", value: p.name },
      { label: "Email", value: p.email },
      { label: "Phone", value: p.phone },
      { label: "Product", value: p.productTitle },
    ],
    message: p.message,
    token: p.turnstileToken,
  };
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category: categoryParam } = await params;
    if (!isLeadCategory(categoryParam)) {
      return NextResponse.json({ ok: false, error: "Unknown category" }, { status: 404 });
    }
    const category: LeadCategory = categoryParam;

    const contentType = req.headers.get("content-type") || "";
    const parsed =
      category === "funding" && contentType.includes("multipart/form-data")
        ? await parseFundingMultipart(req)
        : await parseJson(req, category);

    const turnstileOk = await verifyTurnstile(parsed.token);
    if (!turnstileOk) {
      return NextResponse.json(
        { ok: false, error: "Verification failed. Please retry the security check." },
        { status: 400 }
      );
    }

    const recipient = CATEGORY_ROUTES[category];
    const label = CATEGORY_LABELS[category];
    const submittedAt = new Date().toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const resend = getResend();

    const internalHtml = generateInternalNotificationHtml({
      category: label,
      submittedAt,
      fields: parsed.fields,
      message: parsed.message,
    });

    const autoReplyHtml = generateAutoReplyHtml({
      name: parsed.name,
      category: label.toLowerCase(),
      intro: parsed.intro,
      whatsappUrl: whatsappUrl(
        `Hello ABZ Capital, I just submitted a ${label.toLowerCase()} and would like to follow up.`
      ),
    });

    const internalResult = await resend.emails.send({
      from: fromAddress(),
      to: recipient,
      replyTo: parsed.email,
      subject: `[${label}] from ${parsed.name}`,
      html: internalHtml,
      attachments: parsed.attachments,
    });

    if (internalResult.error) {
      console.error("Resend internal send failed", internalResult.error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please try again or WhatsApp us." },
        { status: 502 }
      );
    }

    await resend.emails.send({
      from: fromAddress(),
      to: parsed.email,
      subject: `We received your ${label.toLowerCase()} — ABZ Capital`,
      html: autoReplyHtml,
    });

    return NextResponse.json({ ok: true, id: internalResult.data?.id }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("/api/leads error", err);
    const message = err instanceof Error ? err.message : "Unexpected server error";
    const status = message.includes("RESEND_API_KEY") ? 503 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
