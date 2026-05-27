@AGENTS.md

# ABZ Capital Website — Operating Guide

## Stack
- **Next.js 16.2.6** (App Router, `src/` dir, TypeScript, Turbopack)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css` — there is no `tailwind.config.js`)
- **shadcn/ui v4** (uses `@base-ui/react` under the hood, not Radix)
- **Path alias**: `@/*` → `./src/*`

## Critical: this is NOT the Next.js or shadcn from your training data
- **Next.js 16** has breaking changes from 15. Check `node_modules/next/dist/docs/` before writing route handlers, metadata APIs, or `next.config.ts`.
- **shadcn v4** swapped Radix for `@base-ui/react`. Imports and primitive APIs differ. Inspect `node_modules/@base-ui/react/` when composing custom interactive components.
- **Tailwind v4** is CSS-first: theme tokens go in `@theme inline { ... }` inside `src/app/globals.css`. Do not create `tailwind.config.js`.

## Design pipeline — three tools, one workflow

### 1. Google Stitch (concept generation, external)
- URL: https://stitch.withgoogle.com
- Used in browser. Prompt it with the page description (e.g. *"hero section for a capital advisory firm, dark, trustworthy, with a CTA"*), pick the variant you like, **export as HTML/CSS** (or Figma if you want to iterate visually first).
- Bring the exported HTML in as a visual reference. **Don't paste raw Stitch HTML into the app** — translate it into Next.js/Tailwind/shadcn components.

### 2. 21st.dev Magic MCP (component generation, in-editor)
- Configured in `.mcp.json` as the `magic` server (uses `@21st-dev/magic`).
- API key required — get one at https://21st.dev/magic/console and paste it into `.mcp.json` (replace `PASTE_YOUR_21ST_DEV_API_KEY_HERE`).
- Invoke by asking Claude for "a component from 21st.dev" or pasting a screenshot from Stitch and asking for a matching shadcn-based component. Components land in `src/components/`.

### 3. UI/UX Pro Max skill (design rules + QA)
- Installed at `~/.claude/skills/ui-ux-pro-max/`.
- Invoke via the `Skill` tool when starting a new page or component, or before declaring work done. Run its pre-delivery checklist (accessibility, touch targets, dark-mode contrast, layout) before sign-off.

## Adding shadcn components
```
npx shadcn@latest add <name>
```
Common: `button` (already added), `card`, `input`, `label`, `dialog`, `form`, `sheet`, `tabs`. Components land in `src/components/ui/`. The `cn()` helper is at `src/lib/utils.ts`.

## Commands
- `npm run dev` — dev server (Turbopack, http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — serve the production build

## Folder conventions
- `src/app/` — App Router pages, layouts, route handlers, server actions
- `src/components/ui/` — shadcn primitives (do not hand-edit; regenerate via CLI)
- `src/components/` — project-specific composed components (Hero, Footer, ContactForm, etc.)
- `src/lib/` — utilities; add domain logic, API clients, schemas here
- `public/` — static assets

## What NOT to do
- Don't create `tailwind.config.js` — Tailwind v4 is CSS-first.
- Don't `npm install @radix-ui/*` — use `@base-ui/react` primitives that shadcn v4 wires up.
- Don't commit `.mcp.json` — it carries the 21st.dev API key (already in `.gitignore`).
- Don't paste Stitch HTML directly into a page — translate it to Next.js/Tailwind/shadcn.
