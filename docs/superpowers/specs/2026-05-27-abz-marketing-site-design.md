# ABZ Capital — Public Marketing Site (Sub-project 1)

**Status:** Design approved, ready for implementation planning
**Date:** 2026-05-27
**Sub-project:** 1 of 3 (Marketing site → Backend pipeline → Admin dashboard)

---

## 1. Context & scope decomposition

The user requested a "complete production-ready fintech platform" spanning a public site, full backend with PostgreSQL/Prisma, SendGrid automation, and a secure admin dashboard. That is three independent subsystems, each warranting its own spec/plan/build cycle:

- **Sub-project 1 (this spec):** Public marketing site + loan simulator + WhatsApp/email routing + thin email forwarder API. Shippable on its own.
- **Sub-project 2 (deferred):** PostgreSQL + Prisma persistence layer for leads, branded transactional templates, rate limiting via Upstash.
- **Sub-project 3 (deferred):** Auth.js v5 admin dashboard, product CMS, loan-rate/fee settings, lead inbox, email log viewer.

This decomposition was confirmed with the user before brainstorming began.

## 2. Goals

1. ABZ Capital can go live with a credible, premium-feeling fintech website that visitors can use today via WhatsApp, email, and live forms.
2. Every form submission lands in the correct category inbox without the team needing a database.
3. The loan simulator produces mathematically correct amortization schedules that an internal spreadsheet check will validate.
4. Codebase is structured so sub-projects 2 and 3 layer on top without rewriting components or pages.

## 3. Non-goals (out of scope for sub-project 1)

- Database persistence (Postgres, Prisma).
- Admin dashboard / authentication.
- Lead status pipeline, email delivery log viewer.
- Dynamic, admin-editable loan rates and fees (hardcoded constants in `loan-config.ts` with a TODO marker; replaced in sub-project 3).
- Dark mode.
- i18n / multi-language support.
- Server-side rate limiting (honeypot + Cloudflare Turnstile only).

## 4. Stack (already scaffolded)

- Next.js 16.2.6 (App Router, `src/` dir, TypeScript, Turbopack)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css` — no `tailwind.config.js`)
- shadcn/ui v4 on `@base-ui/react` (not Radix)
- Path alias `@/*` → `./src/*`

Additions for this sub-project:

```jsonc
{
  "react-hook-form": "^7",
  "@hookform/resolvers": "^3",
  "zod": "^3",
  "resend": "^4",
  "@react-email/components": "^0.0",
  "@react-pdf/renderer": "^4",
  "@marsidev/react-turnstile": "^1"
}
```

shadcn primitives to add via CLI: `dialog sheet form input label textarea select toast card tabs separator`.

Dev-only: `vitest @vitest/ui @testing-library/react @testing-library/dom jsdom` for testing `loan-calc.ts`.

## 5. Brand & design system

### Brand

- Colors: `--color-indigo #1800ad`, `--color-peach #ffbd59`, `--color-ink #0d0a2c`, white.
- Logo: chevron mark vectorized as inline SVG (`ChevronMark`). Full lockup (chevron + "ABZ CAPITAL LIMITED" + tagline) used only in the footer. Header uses chevron mark next to "ABZ Capital" as live Inter 800 text in indigo.
- Tagline: "Unlocking Potential, Securing Futures."

### Visual direction (locked)

Modern fintech aesthetic — clean Inter sans-serif, generous whitespace, soft `indigo → peach` gradient washes as background accents, gradient-text accents on key headline words, pill buttons, no parallax or video backgrounds.

### Design tokens — `src/app/globals.css`

```css
@theme inline {
  --color-indigo:    #1800ad;
  --color-indigo-50: #f5f3ff;
  --color-indigo-100:#ebe6ff;
  --color-peach:     #ffbd59;
  --color-peach-50:  #fff5e3;
  --color-ink:       #0d0a2c;
  --color-muted:     #6b7280;
  --color-line:      #e5e7eb;
  --color-whatsapp:  #25d366;

  --font-sans:    'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Inter', system-ui, sans-serif;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-card: 0 4px 16px rgba(13,10,44,.05);
  --shadow-elev: 0 12px 32px rgba(24,0,173,.10);
}
```

Typography weights: 400 body, 500 labels, 600 buttons, 700 sub-heads, 800 display headlines.

Accessibility: WCAG AA throughout. Indigo on white = 12.6:1. Peach on indigo button = 4.8:1 (AA pass for ≥18 px text). `prefers-reduced-motion` respected — rotating word and fade-ins disable.

### Motion

Subtle only. `tw-animate-css` for the headline rotating word, fade-in-on-scroll for section reveals, hover lift on cards (`-translate-y-1`). No parallax, video backgrounds, or marquee.

## 6. Information architecture

| Route | Purpose |
|---|---|
| `/` | Home |
| `/about` | About |
| `/products` | Product hub (4 category sections, 16 cards) |
| `/funding` | Funding request (Calendly + form with file upload) |
| `/invest` | Investor platform (2 tracks + interest form) |
| `/contact` | Talk to us (form + WhatsApp/email CTAs + office card) |
| `POST /api/leads/[category]` | Email forwarder (server route handler) |

Header nav order: **Products · Invest · Funding · About · Talk to us** + primary CTA "Apply now" → `/funding`. Hamburger sheet on mobile (shadcn `Sheet`).

## 7. Page specifications

### 7.1 Home (`/`)

1. **Hero** — Static layout, no slider.
   - Headline: "Unlock financial **{rotatingWord}** that drive real growth." Rotating word cycles through `opportunities → capital → coverage → investments` every 3.5 s with cross-fade. Reduced-motion users see "opportunities" statically.
   - Sub: "Structured financing, investment, and insurance for individuals, SMEs and institutions."
   - CTAs: `[Explore products]` (indigo primary) `[Apply for funding]` (ghost).
   - Product chips below CTAs: Lending · SME Finance · Insurance · Investment (all click through to anchored sections on `/products`).
   - Background: layered radial gradients indigo→peach, no photography.

2. **Value cards (3)** — Asset-backed lending · SME financing · Insurance & risk solutions. Compact icon-tile cards, each links to its `/products` anchor.

3. **Why ABZ Capital** — five-item grid, peach numerals: Structured solutions · Risk-managed lending · Transparent processes · Investor-backed ecosystem · Fast execution.

4. **Final CTA strip** — indigo bg, single CTA: "Apply for funding" → `/funding`.

### 7.2 About (`/about`)

- Hero with brand intro paragraph (from user spec).
- Three blocks: Vision · Mission · Values — peach accent, icon per block.
- "Our principles" callout: Integrity, transparency, innovation, discipline, long-term value creation.

### 7.3 Products (`/products`)

Vertical-scrolling page, one section per category, each category anchor-linkable.

- **A. Asset-Backed Loans** → `loans@abzcapital.co.ke`
  - Logbook Loans *(includes "Simulate loan terms" CTA → opens simulator dialog)*
  - Title Deed Loans
  - Bond-Backed Lending
- **B. SME Financing** → `loans@abzcapital.co.ke`
  - Working Capital Financing
  - Business Expansion Financing
  - Investor Linkage Services
- **C. Contractor Financial Solutions** → `cover@abzcapital.co.ke`
  - Performance Bonds
  - Bid Bonds
  - Advance Payment Guarantees
  - Contractor's All Risk Insurance
  - Bank Guarantees
- **D. Insurance Solutions** → `cover@abzcapital.co.ke`
  - Motor Vehicle Insurance
  - WIBA Insurance
  - Medical Insurance
  - Travel Insurance
  - Personal Accident Cover

Each card is the **compact icon-tile** style: icon + title + category pill + 2-line description + three inline CTAs: `[Email]` (indigo) `[📱 WhatsApp]` (green `#25d366`) and, for Logbook Loans only, `[Simulate]` (peach).

Cards live as typed data in `src/lib/product-catalog.ts`:

```ts
export type ProductCategory = 'loans' | 'sme' | 'contractor' | 'insurance';
export interface Product {
  slug: string;
  title: string;
  category: ProductCategory;
  description: string;
  emailRoute: 'loans' | 'sme' | 'contractor' | 'insurance';
  whatsappMessage: string;
  hasSimulator?: boolean;
  imageUrl?: string; // Unsplash URL or local /public/photos path
}
```

This data shape is intentionally aligned with what sub-project 3's admin CMS will later persist, so swap is trivial.

### 7.4 Funding (`/funding`)

Two-column layout on desktop, stacked on mobile.

- **Left:** "Book a pitch with our team" — Calendly inline embed (`<iframe src={env.NEXT_PUBLIC_CALENDLY_URL}>`). If the env var is unset, show a placeholder card with "Coming soon — talk to us on WhatsApp meanwhile."
- **Right:** Funding form. Fields: Full Name, Email, Phone, Category (select: Asset-backed / SME / Contractor / Investment opportunity), Opportunity Type (select: Equity / Debt / Working capital / Other), Description (textarea), Upload documents (`FileDropzone`, ≤ 5 files × 5 MB, accepts `.pdf .docx .xlsx .jpg .png`).
- Posts to `POST /api/leads/funding`.

### 7.5 Invest (`/invest`)

- Hero with two investor tracks side-by-side as `InvestorTrackCard`:
  - **A. Asset-Backed Lending Investors** — secured pool, collateral-backed, monthly returns.
  - **B. SME & Innovation Investors** — equity / debt / structured deals, vetted opportunities, sector matching.
- Below: `InvestorInterestForm` — Name, Email, Phone, Track preference (select), Ticket size band (select: <500K · 500K–2M · 2M–10M · >10M), Notes (textarea). Posts to `POST /api/leads/invest`.

### 7.6 Contact / Talk to us (`/contact`)

- Two-column: contact form (left) + `ContactInfoCard` (right).
- ContactInfoCard shows office address, all four category emails, phone, large WhatsApp CTA.
- Form fields: Name, Email, Phone, Subject, Message. Posts to `POST /api/leads/contact`.

## 8. Loan simulator — math & flow

### Math (canonical)

Defined in `src/lib/loan-calc.ts` as pure functions, unit-tested.

```
FEES.valuation        = 1,500
FEES.legal            = 1,500
FEES.processing       = 15,000
FEES.logbookTransfer  = 2,500
FEES.tracker          = 25,000
FEES.total            = 45,500

principal       = takeHome + insurancePremium + FEES.total
monthlyRate     = 0.06
months          = 1..6  (validated)
payment         = principal * monthlyRate / (1 - (1 + monthlyRate)^-months)

For month i = 1..months:
  interest_i      = balance * monthlyRate
  principalPaid_i = payment - interest_i
  balance        -= principalPaid_i

totalRepayment  = payment * months
totalInterest   = totalRepayment - principal
```

**User interpretation confirmed:** "Take-Home" is the *net cash the borrower receives*. Fees and insurance are rolled into the principal that gets amortized.

### Modal UX

Single shadcn `Dialog` (max-w-2xl, `backdrop-blur-sm`), scrollable, four labeled sections in one view (NOT a multi-step wizard):

1. **Inputs** — Take-Home (KES), Insurance Premium (KES), Loan Period (1–6 mo select). `[Generate schedule]` triggers recalc.
2. **Cost summary** — Itemized fees, principal, fixed monthly payment.
3. **Amortization table** — month / payment / interest / principal / balance, with totals row.
4. **Sticky footer actions** — `[Download PDF]` `[📱 Apply on WhatsApp]` (primary, peach) `[Apply via form →]`.

WhatsApp prefill includes the simulated numbers:
> "Hello ABZ Capital, I simulated a logbook loan: KES {takeHome} take-home, {months} months. Total repayment KES {totalRepayment}. I'd like to proceed."

### PDF

`@react-pdf/renderer` — branded with chevron + indigo header, contains the summary, fee breakdown, full amortization table, and a footer "Apply on WhatsApp: +254141576254" line.

## 9. Forms & email forwarder

### API contract

`POST /api/leads/[category]` where `category ∈ {loans, sme, contractor, insurance, funding, invest, contact}`.

Per-category routing (env-driven defaults shown):

```ts
const ROUTES: Record<Category, string> = {
  loans:      'loans@abzcapital.co.ke',
  sme:        'loans@abzcapital.co.ke',
  contractor: 'cover@abzcapital.co.ke',
  insurance:  'cover@abzcapital.co.ke',
  funding:    'invest@abzcapital.co.ke',
  invest:     'invest@abzcapital.co.ke',
  contact:    'hello@abzcapital.co.ke',
};
```

### Pipeline per submission

1. Parse body — JSON for plain forms, `multipart/form-data` for funding (file upload).
2. Validate with Zod schema specific to category.
3. Honeypot check — reject when `_hp` is non-empty.
4. Verify Turnstile token server-side (call `https://challenges.cloudflare.com/turnstile/v0/siteverify`).
5. Send via Resend:
   - **Internal email** → category inbox, branded HTML template (`@react-email/components`), full submission data + uploaded files as attachments.
   - **Auto-reply** to applicant → "We received your request, expect a reply within 24 hours" + WhatsApp fallback link.
6. Return `{ ok: true, id }` (id = Resend send id) or `{ ok: false, error }`.

Client UX: optimistic `Sending…` state on the submit button, shadcn `Toast` confirmation on success, inline field errors from Zod on validation failure, generic error toast otherwise.

### File upload limits

Funding form only. Max 5 files × 5 MB each. Accepted MIME types: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `image/jpeg`, `image/png`. Reject on the server, even if the client accepted them.

## 10. WhatsApp deep links

`src/lib/whatsapp.ts`:

```ts
export function whatsappUrl(message: string) {
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '254141576254';
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export const PRODUCT_WA_MESSAGES = {
  default:    (product: string) => `Hello ABZ Capital, I am interested in ${product}. Kindly assist me with details.`,
  simulator:  (takeHome: number, months: number, total: number) =>
    `Hello ABZ Capital, I simulated a logbook loan: KES ${takeHome.toLocaleString()} take-home, ${months} months. Total repayment KES ${total.toLocaleString()}. I'd like to proceed.`,
  contact:    () => `Hello ABZ Capital, I'd like to chat with your team.`,
};
```

Used by every product card, simulator footer, contact page, and the floating WhatsApp button (bottom-right on all pages).

## 11. Photography & imagery

Real, category-matched imagery curated from Unsplash (royalty-free, commercial use):

- **Asset-Backed Loans** — vehicles (logbook), land + title document overhead shot (title deed), government-bond stylized photo (bond-backed).
- **SME Financing** — small business owners, shop interiors, market traders.
- **Contractor Financial Solutions** — construction sites, heavy equipment, hard-hat scenes.
- **Insurance Solutions** — hospital interiors, family travel, vehicle inspections.

Each `Product.imageUrl` is a configurable field — admin dash (sub-project 3) replaces them without code changes. For sub-project 1, Unsplash hotlink URLs are fine; we can move to `/public/photos/` if hotlinking causes performance issues.

## 12. File structure (target end state)

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── products/page.tsx
│   │   ├── funding/page.tsx
│   │   ├── invest/page.tsx
│   │   └── contact/page.tsx
│   ├── api/leads/[category]/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── brand/        { ChevronMark, FullLockup }
│   ├── layout/       { Header, Footer, MobileNav }
│   ├── home/         { Hero, ValueCards, WhyABZ }
│   ├── products/     { ProductCard, ProductCategorySection }
│   ├── simulator/    { LoanSimulatorDialog, InputsSection, CostSummary, AmortizationTable, LoanSummaryPDF }
│   ├── forms/        { FundingForm, ContactForm, InvestorInterestForm, FileDropzone, TurnstileField }
│   ├── invest/       { InvestorTrackCard }
│   ├── contact/      { ContactInfoCard }
│   ├── shared/       { Section, Container, WhatsAppButton, RotatingWord, FloatingWhatsApp }
│   └── ui/           # shadcn primitives
├── lib/
│   ├── loan-calc.ts
│   ├── loan-config.ts
│   ├── whatsapp.ts
│   ├── product-catalog.ts
│   ├── email/        { resend.ts, routes.ts, templates/ }
│   ├── validation/   # Zod schemas per form
│   └── utils.ts
└── public/
    └── brand/        # chevron, lockup SVGs
```

## 13. Environment variables

```
# Email
RESEND_API_KEY=re_...
LEAD_FROM_EMAIL=no-reply@abzcapital.co.ke

# WhatsApp & Calendly
NEXT_PUBLIC_WHATSAPP_NUMBER=254141576254
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/...

# Cloudflare Turnstile (anti-spam)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...

# Optional per-category overrides (default to fixed map if unset)
LEAD_EMAIL_LOANS=loans@abzcapital.co.ke
LEAD_EMAIL_INVEST=invest@abzcapital.co.ke
LEAD_EMAIL_COVER=cover@abzcapital.co.ke
LEAD_EMAIL_HELLO=hello@abzcapital.co.ke
```

A `.env.example` will be committed; `.env*` stays gitignored.

## 14. Testing

- **Unit (Vitest):** `loan-calc.ts` — verify amortization rows, totals, fees-rolled-into-principal, edge cases (1-month minimum, 6-month max, zero insurance).
- **Manual smoke (pre-sign-off checklist):**
  - Every product card opens correct `mailto:` + working WhatsApp deep link.
  - Simulator: typing recalculates live; PDF downloads with branded layout; WhatsApp apply prefills numeric values.
  - Funding/contact/invest forms: submit → land in correct inbox → applicant gets branded auto-reply.
  - Mobile breakpoints (375, 768, 1280) — no horizontal scroll, no overlaps.
  - Reduced-motion: rotating word and fade-ins disabled.
  - Lighthouse mobile ≥ 90 on `/` and `/products`.
- **No e2e framework** in this sub-project; Playwright comes with sub-project 3.

## 15. Hosting & deploy

- **Vercel** — zero-config for Next 16, env-var UI, preview URLs per branch.
- Domain configured via Vercel DNS or external CNAME pointed at Vercel.
- Resend and Turnstile both on free tier (3K emails/mo, free Turnstile usage).

## 16. Success criteria (Done = all of these)

1. All 6 marketing pages render at 375 / 768 / 1280 px breakpoints with no visual breaks.
2. Every product card opens the correct `mailto:` and a working WhatsApp link.
3. Loan simulator produces results matching the canonical-math spreadsheet check.
4. Every form submission lands in the correct inbox; applicant receives a branded auto-reply.
5. `npm run build` and `npm run lint` pass cleanly.
6. `loan-calc.ts` unit tests pass.
7. Lighthouse mobile ≥ 90 on home and products pages.
8. Deployed Vercel preview URL accessible to the user.

## 17. Sequencing for the implementation plan

This is a hint for the writing-plans skill, not the plan itself:

1. **Design system & layout chrome** — globals.css tokens, fonts, `ChevronMark`, `Header`, `Footer`, `MobileNav`, `Container`, `Section`, `WhatsAppButton`, `FloatingWhatsApp`.
2. **Static pages first** — Home (hero, value cards, why), About, Invest (without form). Lowest risk, unblocks visual review.
3. **Product catalog + Products page** — `product-catalog.ts`, `ProductCard`, `ProductCategorySection`, full `/products` page.
4. **Loan simulator** — `loan-calc.ts` + Vitest tests, then `LoanSimulatorDialog` + sections, then `LoanSummaryPDF`. WhatsApp prefill last.
5. **Email forwarder API + branded templates** — `lib/email/`, route handler, Zod schemas, Resend integration, Turnstile verify.
6. **Forms** — `ContactForm`, `InvestorInterestForm`, `FundingForm` (file upload last), all wired to the API.
7. **Polish & sign-off** — Lighthouse pass, reduced-motion audit, smoke checklist, Vercel deploy.
