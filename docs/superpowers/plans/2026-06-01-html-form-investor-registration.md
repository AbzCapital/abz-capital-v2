# HTML Form Investor Registration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace broken React mobile forms with vanilla HTML forms that reliably submit investor data and trigger WhatsApp invitation emails.

**Architecture:** Vanilla HTML forms (no React state complexity) post directly to existing `/api/investors/register` endpoint. Mobile wrappers detect device and render HTML form. Desktop wrappers continue to render existing React forms unchanged. Success redirects to `/investor/welcome` page where user sees WhatsApp CTA and receives email with link.

**Tech Stack:** Next.js 16 (App Router), vanilla HTML, Resend (email), Tailwind CSS

---

## File Structure

```
src/components/invest/
  ├── LendingPoolFormHTML.tsx          [NEW] Vanilla HTML form for lending pool (mobile)
  ├── InvestorNetworkFormHTML.tsx      [NEW] Vanilla HTML form for investor network (mobile)
  ├── LendingPoolFormWrapper.tsx       [MODIFY] Route to HTML form for mobile
  ├── InvestorNetworkFormWrapper.tsx   [MODIFY] Route to HTML form for mobile
  ├── LendingPoolForm.tsx              [LEAVE UNTOUCHED] Desktop form
  └── InvestorNetworkForm.tsx          [LEAVE UNTOUCHED] Desktop form

src/app/api/investors/
  └── register/route.ts                [MODIFY] Add Resend email with WhatsApp link

src/app/investor/
  └── welcome/
      └── page.tsx                     [NEW] Success page with WhatsApp CTA
```

---

## Task 1: Create LendingPoolFormHTML (Vanilla HTML Form)

**Files:**
- Create: `src/components/invest/LendingPoolFormHTML.tsx`

- [ ] **Step 1: Read current LendingPoolFormMobile to understand data structure**

Run: Open `src/components/invest/LendingPoolFormMobile.tsx`

Note the fields: first_name, last_name, country_code, phone_number, email, investment_amount, loan_category, investor_note

- [ ] **Step 2: Create LendingPoolFormHTML.tsx with vanilla HTML form**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
];

export function LendingPoolFormHTML() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("📤 Submitting...");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data: any = { investor_type: "lending_pool" };

      formData.forEach((value, key) => {
        data[key] = value;
      });

      data.investment_preferences = [data.loan_category || "logbook_loans"];
      delete data.loan_category;
      data.investment_amount = parseFloat(data.investment_amount);

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Redirect to success page
        window.location.href = `/investor/welcome?id=${result.investor_id}&email=${encodeURIComponent(result.email)}`;
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setMessage(`❌ Error: ${msg}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-indigo mb-6 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mb-6">Join Lending Pool</h1>

        {message && (
          <div
            className={`p-3 rounded mb-4 ${
              message.startsWith("✅")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mobile *</label>
            <div className="flex gap-2">
              <select
                name="country_code"
                defaultValue="+254"
                className="px-3 py-2 border rounded"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone_number"
                required
                placeholder="700000000"
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Amount (KES) *
            </label>
            <input
              type="number"
              name="investment_amount"
              required
              placeholder="600000"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="loan_category"
                value="logbook_loans"
                defaultChecked
              />
              Logbook
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="loan_category"
                value="title_deed_loans"
              />
              Title Deed
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Notes</label>
            <textarea
              name="investor_note"
              maxLength={200}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 font-bold rounded text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Join Lending Pool"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/LendingPoolFormHTML.tsx
git commit -m "feat: add vanilla HTML lending pool form for mobile"
```

---

## Task 2: Create InvestorNetworkFormHTML (Vanilla HTML Form with Sectors)

**Files:**
- Create: `src/components/invest/InvestorNetworkFormHTML.tsx`

- [ ] **Step 1: Create InvestorNetworkFormHTML.tsx with sector checkboxes**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const COUNTRIES = [
  { code: "+254", name: "Kenya" },
  { code: "+256", name: "Uganda" },
];

const SECTORS = [
  "FinTech",
  "Agritech",
  "Logistics",
  "Solar Energy",
  "Healthcare",
  "Education",
  "Real Estate",
  "Technology",
  "Manufacturing",
  "Infrastructure",
];

export function InvestorNetworkFormHTML() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedSectors.length === 0) {
      setMessage("⚠️ Select at least one sector");
      return;
    }

    setIsSubmitting(true);
    setMessage("📤 Submitting...");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data: any = { investor_type: "investor_network" };

      formData.forEach((value, key) => {
        data[key] = value;
      });

      data.investment_preferences = selectedSectors;
      data.investment_amount = parseFloat(data.investment_amount);

      const response = await fetch("/api/investors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Redirect to success page
        window.location.href = `/investor/welcome?id=${result.investor_id}&email=${encodeURIComponent(result.email)}`;
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setMessage(`❌ Error: ${msg}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/invest" className="text-indigo mb-6 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold mb-6">Join Investor Network</h1>

        {message && (
          <div
            className={`p-3 rounded mb-4 ${
              message.startsWith("✅")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mobile *</label>
            <div className="flex gap-2">
              <select
                name="country_code"
                defaultValue="+254"
                className="px-3 py-2 border rounded"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone_number"
                required
                placeholder="700000000"
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Amount (KES) *
            </label>
            <input
              type="number"
              name="investment_amount"
              required
              placeholder="600000"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Investment Sectors *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SECTORS.map((sector) => (
                <label key={sector} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector)}
                    onChange={() =>
                      setSelectedSectors((prev) =>
                        prev.includes(sector)
                          ? prev.filter((x) => x !== sector)
                          : [...prev, sector]
                      )
                    }
                  />
                  <span className="text-sm">{sector}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Notes</label>
            <textarea
              name="investor_note"
              maxLength={200}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 font-bold rounded text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Join Investor Network"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/invest/InvestorNetworkFormHTML.tsx
git commit -m "feat: add vanilla HTML investor network form for mobile"
```

---

## Task 3: Create Investor Welcome Page (Success Page with WhatsApp CTA)

**Files:**
- Create: `src/app/investor/welcome/page.tsx`

- [ ] **Step 1: Create welcome page**

```tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function InvestorWelcomePage() {
  const searchParams = useSearchParams();
  const investorId = searchParams.get("id");
  const email = searchParams.get("email");

  useEffect(() => {
    // Optional: Log success to analytics
    if (investorId) {
      console.log("Investor registered:", investorId);
    }
  }, [investorId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Welcome!</h1>
        <p className="text-gray-700 mb-6">
          Your registration is complete. We've sent you an email with details.
        </p>

        {investorId && (
          <div className="bg-blue-50 p-4 rounded mb-6">
            <p className="text-sm text-gray-600 mb-1">Your Investor ID:</p>
            <p className="font-mono text-lg font-bold text-blue-700">
              {investorId}
            </p>
          </div>
        )}

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-4 mb-6">
          <p className="text-sm font-semibold text-yellow-800 mb-3">
            🚀 Next Step: Join Our WhatsApp Group
          </p>
          <p className="text-sm text-yellow-700 mb-4">
            Get instant alerts for new investment opportunities and deal updates.
          </p>
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
          >
            Join WhatsApp Group
          </a>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Check your email ({email}) for more details and the WhatsApp group
          link.
        </p>

        <Link
          href="/invest"
          className="inline-block bg-indigo text-white font-semibold py-2 px-6 rounded hover:bg-indigo-700"
        >
          Back to Invest
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/investor/welcome/page.tsx
git commit -m "feat: add investor welcome/success page with WhatsApp CTA"
```

---

## Task 4: Update API Route to Send Resend Email with WhatsApp Link

**Files:**
- Modify: `src/app/api/investors/register/route.ts`

- [ ] **Step 1: Read current route.ts to understand structure**

Run: Open `src/app/api/investors/register/route.ts`

Note the current response structure and Resend setup.

- [ ] **Step 2: Update route to send Resend email after successful registration**

Add this import at the top:

```typescript
import { Resend } from "resend";
```

Find where the investor is created in the database (look for `prisma.investorRegistration.create()` or similar). After that line, add:

```typescript
// Send welcome email with WhatsApp link
const resend = new Resend(process.env.RESEND_API_KEY);

const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #indigo; color: white; padding: 20px; text-align: center; border-radius: 5px; }
    .content { padding: 20px; }
    .cta-button { display: inline-block; background-color: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
    .investor-id { background-color: #f0f0f0; padding: 15px; border-left: 4px solid #indigo; margin: 20px 0; }
    .footer { color: #666; font-size: 12px; text-align: center; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to ABZ Capital Investor Network! 🎉</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.first_name},</p>
      
      <p>Thank you for registering as an investor with ABZ Capital. We're excited to have you on board!</p>
      
      <div class="investor-id">
        <strong>Your Investor ID:</strong><br/>
        <code>${investor.id}</code>
      </div>
      
      <p>Investment Amount: <strong>KES ${data.investment_amount.toLocaleString()}</strong></p>
      
      <p><strong>Join our WhatsApp group for instant deal alerts and investment opportunities:</strong></p>
      
      <a href="https://chat.whatsapp.com/your-group-link" class="cta-button">👉 Join WhatsApp Group</a>
      
      <p>In the WhatsApp group, you'll receive:</p>
      <ul>
        <li>Instant notifications for new investment opportunities</li>
        <li>Deal summaries and loan performance updates</li>
        <li>Direct support from our investment team</li>
      </ul>
      
      <p>If you have any questions, feel free to reach out to us at support@abzcapital.com</p>
      
      <p>Happy investing!<br/>
      <strong>The ABZ Capital Team</strong></p>
    </div>
    
    <div class="footer">
      <p>ABZ Capital Ltd | investment@abzcapital.com<br/>
      This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

try {
  await resend.emails.send({
    from: "investors@abzcapital.com",
    to: data.email,
    subject: `Welcome to ABZ Capital! Your Investor ID: ${investor.id}`,
    html: emailContent,
  });
  
  console.log("✅ Welcome email sent to", data.email);
} catch (emailError) {
  console.error("⚠️ Email failed (continuing):", emailError);
  // Don't fail the registration if email fails
}
```

- [ ] **Step 3: Test the route with curl to ensure it still works**

Run:
```bash
curl -X POST http://localhost:3000/api/investors/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "country_code": "+254",
    "phone_number": "700000000",
    "investment_amount": 100000,
    "investor_type": "lending_pool",
    "investment_preferences": ["logbook_loans"]
  }'
```

Expected: Returns `{ success: true, investor_id: "...", email: "..." }`

- [ ] **Step 4: Commit**

```bash
git add src/app/api/investors/register/route.ts
git commit -m "feat: add Resend email notification with WhatsApp link to investor registration"
```

---

## Task 5: Update LendingPoolFormWrapper to Use HTML Form for Mobile

**Files:**
- Modify: `src/components/invest/LendingPoolFormWrapper.tsx`

- [ ] **Step 1: Read current wrapper**

Open `src/components/invest/LendingPoolFormWrapper.tsx`

- [ ] **Step 2: Update wrapper to import and use HTML form for mobile**

Replace entire file with:

```tsx
"use client";

import { useEffect, useState } from "react";
import { LendingPoolForm } from "./LendingPoolForm";
import { LendingPoolFormHTML } from "./LendingPoolFormHTML";

export function LendingPoolFormWrapper() {
  const isMobileUserAgent =
    typeof navigator !== "undefined" &&
    /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
  const [isMobile, setIsMobile] = useState(isMobileUserAgent || true);

  useEffect(() => {
    const isMobileDevice = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
    const isSmallWindow = window.innerWidth < 768;

    setIsMobile(isMobileDevice || isSmallWindow);

    const handleResize = () => {
      const nowSmall = window.innerWidth < 768;
      setIsMobile(isMobileDevice || nowSmall);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <LendingPoolFormHTML />;
  }

  return <LendingPoolForm />;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/LendingPoolFormWrapper.tsx
git commit -m "refactor: use HTML form for mobile in LendingPoolFormWrapper"
```

---

## Task 6: Update InvestorNetworkFormWrapper to Use HTML Form for Mobile

**Files:**
- Modify: `src/components/invest/InvestorNetworkFormWrapper.tsx`

- [ ] **Step 1: Update wrapper to import and use HTML form for mobile**

Replace entire file with:

```tsx
"use client";

import { useEffect, useState } from "react";
import { InvestorNetworkForm } from "./InvestorNetworkForm";
import { InvestorNetworkFormHTML } from "./InvestorNetworkFormHTML";

export function InvestorNetworkFormWrapper() {
  const isMobileUserAgent =
    typeof navigator !== "undefined" &&
    /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
  const [isMobile, setIsMobile] = useState(isMobileUserAgent || true);

  useEffect(() => {
    const isMobileDevice = /mobile|android|iphone|ipad|ipod|windows phone|blackberry/i.test(
      navigator.userAgent
    );
    const isSmallWindow = window.innerWidth < 768;

    setIsMobile(isMobileDevice || isSmallWindow);

    const handleResize = () => {
      const nowSmall = window.innerWidth < 768;
      setIsMobile(isMobileDevice || nowSmall);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <InvestorNetworkFormHTML />;
  }

  return <InvestorNetworkForm />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/invest/InvestorNetworkFormWrapper.tsx
git commit -m "refactor: use HTML form for mobile in InvestorNetworkFormWrapper"
```

---

## Task 7: Test Both Forms on Mobile and Desktop

**Files:**
- Test: `src/components/invest/LendingPoolFormHTML.tsx`
- Test: `src/components/invest/InvestorNetworkFormHTML.tsx`
- Test: `src/app/investor/welcome/page.tsx`

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

Expected: Server running on http://localhost:3000

- [ ] **Step 2: Test LendingPoolFormHTML on desktop (should render HTML form)**

1. Open http://localhost:3000/lending-pool in desktop browser
2. Should see "Join Lending Pool" form with simple HTML fields
3. Fill form with test data:
   - First Name: John
   - Last Name: Doe
   - Phone: +254 700000000
   - Email: test+lending@example.com
   - Amount: 100000
   - Category: Logbook (default)
   - Notes: Test submission

4. Click "Join Lending Pool"
5. Should see "📤 Submitting..." message
6. Should redirect to `/investor/welcome?id=...&email=...`
7. Success page should show investor ID and WhatsApp CTA

- [ ] **Step 3: Test InvestorNetworkFormHTML on desktop**

1. Open http://localhost:3000/investor-network in desktop browser
2. Fill form with test data:
   - First Name: Jane
   - Last Name: Smith
   - Phone: +254 700000001
   - Email: test+network@example.com
   - Amount: 200000
   - Sectors: Select "FinTech" and "AgriTech"
   - Notes: Test

3. Click "Join Investor Network"
4. Should redirect to success page with investor ID

- [ ] **Step 4: Verify database records**

Run: Open Supabase dashboard and check `investor_registration` table

Expected: See 2 new records with:
- first_name, last_name, email, phone_number, investment_amount
- investment_type: "lending_pool" and "investor_network"
- status: "pending" (or whatever your approval workflow uses)

- [ ] **Step 5: Verify Resend email was sent**

Check email inbox for:
- Subject: "Welcome to ABZ Capital! Your Investor ID: [id]"
- HTML email with WhatsApp group link

- [ ] **Step 6: Test desktop forms still work (unchanged)**

1. Resize browser to desktop size (>768px)
2. Navigate to `/lending-pool`
3. Should see original **LendingPoolForm** (React version) - NOT the HTML form
4. Fill and submit
5. Should work as before

Same for `/investor-network` → should use original **InvestorNetworkForm**

- [ ] **Step 7: Commit test results**

```bash
git add -A
git commit -m "test: verify HTML forms work on mobile, desktop forms unchanged"
```

---

## Summary

✅ **Desktop forms (InvestorNetworkForm, LendingPoolForm)** — UNTOUCHED, still work

✅ **Mobile forms** — Replaced with vanilla HTML forms (LendingPoolFormHTML, InvestorNetworkFormHTML)

✅ **Success flow** — Redirects to `/investor/welcome` with investor ID and WhatsApp CTA

✅ **Email notifications** — Resend sends welcome email with WhatsApp group link

✅ **Database** — Same API endpoint stores all investor data
