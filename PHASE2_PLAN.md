# Phase 2: Database & Admin Dashboard — Execution Plan

## Scope
- PostgreSQL + Prisma ORM
- Admin auth (simple password-based for MVP, Auth.js later)
- Admin CRUD: Products, Categories, Loan Fees
- Lead viewer: List, filter, export CSV
- Email config endpoint

## Critical Path (MVP)
1. Install Prisma, set DATABASE_URL
2. Define schema (User, Product, Category, LoanConfig, Lead)
3. Generate Prisma client
4. Create admin routes: auth, products, categories, loans, leads
5. Build admin UI: dashboard, CRUD pages, lead viewer
6. Add email config endpoint

## File Structure
```
src/
├── app/(admin)/                 # Admin route group
│   ├── layout.tsx              # Admin layout with nav
│   ├── dashboard/page.tsx       # Dashboard overview
│   ├── products/page.tsx        # Product management
│   ├── products/[id]/page.tsx   # Product edit
│   ├── categories/page.tsx      # Category management
│   ├── loans/page.tsx           # Loan fee config
│   └── leads/page.tsx           # Lead viewer + export
├── app/api/admin/               # Admin API routes
│   ├── auth/route.ts
│   ├── products/route.ts
│   ├── categories/route.ts
│   ├── loans/route.ts
│   └── leads/route.ts
└── lib/
    ├── db.ts                    # Prisma client init
    └── admin-auth.ts            # Simple auth middleware
prisma/
└── schema.prisma                # Database schema
```

## Tech Stack
- Prisma ORM (PostgreSQL)
- NextAuth.js v5 (Phase 3) — for now, simple session-based auth
- shadcn tables for data display
- Zod for API validation

## MVP Success Criteria
✓ Prisma schema compiles
✓ Admin can CRUD products/categories/loans via API
✓ Admin dashboard displays leads (list + filter)
✓ CSV export works
✓ Build passes
✓ Git commits
