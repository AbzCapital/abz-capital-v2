# ABZ Capital Marketing Site — Implementation Plan

**Goal:** Build sub-project 1 end-to-end: 6-page marketing site + loan simulator + thin email forwarder API + WhatsApp deep links, in Next.js 16 / Tailwind v4 / shadcn v4.

**Spec:** `docs/superpowers/specs/2026-05-27-abz-marketing-site-design.md`

## Phase 0 — Foundations

1. `git init` + `.gitignore` already in place + initial commit of scaffold + spec.
2. Install deps: `react-hook-form @hookform/resolvers zod resend @react-email/components @react-pdf/renderer @marsidev/react-turnstile`; dev: `vitest @vitejs/plugin-react @testing-library/react jsdom`.
3. Add shadcn primitives: `dialog sheet form input label textarea select sonner card tabs separator`.
4. Add `vitest.config.ts` + `src/test/setup.ts`.
5. Create `.env.example` with all keys from spec §13.

## Phase 1 — Design system & chrome

6. Replace `src/app/globals.css` brand tokens (override shadcn `--primary` with indigo, add `--color-indigo / --color-peach / --color-ink / --color-whatsapp`).
7. Swap fonts in `src/app/layout.tsx`: Geist → Inter via `next/font/google`.
8. `src/components/brand/ChevronMark.tsx` (inline SVG).
9. `src/components/brand/FullLockup.tsx` (inline SVG, used in footer).
10. `src/components/shared/Container.tsx`, `src/components/shared/Section.tsx`.
11. `src/lib/whatsapp.ts` + Vitest tests for prefill helpers.
12. `src/components/shared/WhatsAppButton.tsx`, `src/components/shared/FloatingWhatsApp.tsx`.
13. `src/components/shared/RotatingWord.tsx` (respects `prefers-reduced-motion`).
14. `src/components/layout/Header.tsx` (desktop nav + mobile `Sheet`).
15. `src/components/layout/Footer.tsx`.
16. `src/app/(marketing)/layout.tsx` route group, root metadata.

## Phase 2 — Static pages

17. `src/components/home/Hero.tsx` (static, rotating accent word, chips).
18. `src/components/home/ValueCards.tsx`.
19. `src/components/home/WhyABZ.tsx`.
20. `src/components/home/FinalCTA.tsx`.
21. `src/app/(marketing)/page.tsx` (assemble home).
22. `src/app/(marketing)/about/page.tsx`.
23. `src/components/invest/InvestorTrackCard.tsx`.
24. `src/app/(marketing)/invest/page.tsx` (without form yet).
25. `src/components/contact/ContactInfoCard.tsx`.

## Phase 3 — Products

26. `src/lib/product-catalog.ts` — 16 typed products with Unsplash imagery URLs.
27. `src/components/products/ProductCard.tsx` (compact icon-tile).
28. `src/components/products/ProductCategorySection.tsx`.
29. `src/app/(marketing)/products/page.tsx`.

## Phase 4 — Loan simulator (TDD on math)

30. `src/lib/loan-config.ts` — FEES + RATE constants.
31. `src/lib/loan-calc.ts` — pure functions + Vitest tests (write tests first).
32. `src/components/simulator/InputsSection.tsx`.
33. `src/components/simulator/CostSummary.tsx`.
34. `src/components/simulator/AmortizationTable.tsx`.
35. `src/components/simulator/LoanSummaryPDF.tsx` (`@react-pdf/renderer`).
36. `src/components/simulator/LoanSimulatorDialog.tsx`.
37. Wire `Simulate` CTA in logbook ProductCard to open the dialog.

## Phase 5 — Email forwarder API

38. `src/lib/email/resend.ts` (client).
39. `src/lib/email/routes.ts` (category → recipient map).
40. `src/lib/email/templates/InternalNotification.tsx` (`@react-email/components`).
41. `src/lib/email/templates/AutoReply.tsx`.
42. `src/lib/validation/leadSchemas.ts` (Zod schemas per category).
43. `src/lib/turnstile.ts` (server-side verify).
44. `src/app/api/leads/[category]/route.ts` (POST handler).

## Phase 6 — Forms

45. `src/components/forms/TurnstileField.tsx`.
46. `src/components/forms/ContactForm.tsx` + wire to `/contact` page.
47. `src/components/forms/InvestorInterestForm.tsx` + wire to `/invest`.
48. `src/components/forms/FileDropzone.tsx`.
49. `src/components/forms/FundingForm.tsx` + Calendly embed + wire to `/funding`.

## Phase 7 — Polish & sign-off

50. Add `metadata` exports per page; `robots.txt`, `sitemap.ts`, `favicon`.
51. Mobile breakpoint smoke at 375/768/1280.
52. `prefers-reduced-motion` audit.
53. `npm run lint`, `npm run build`, `npm run test` all green.
54. Lighthouse mobile ≥ 90 on `/` and `/products`.

## Out of scope (sub-projects 2 + 3)

DB, Auth, Admin dashboard, rate limiting, delivery log viewer, dark mode, i18n.
