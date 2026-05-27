# Admin Panel Implementation Guide
**Date**: May 27, 2026 10:58 PM GMT+3 | **Status**: ✅ COMPLETE

## What Was Built

A fully functional admin panel for managing loan parameters that power the loan simulator on the public website.

## Admin Login

**URL**: `https://www.abzcapital.co.ke/admin/login` (or localhost:3000/admin/login)

**Credentials** (set via environment variables):
- Email: `admin@abzcapital.co.ke`
- Password: (configured in `.env` file)

**Setup**: You need to create an admin user first:
```bash
# Via database, create AdminUser record with:
# email: admin@abzcapital.co.ke
# password: (bcryptjs hashed password)
```

## Admin Dashboard

**URL**: `/admin/dashboard`

Shows overview with quick access to:
- Loan Configuration (⭐ **Main feature**)
- Products Management
- Categories Management
- Leads Viewer

## Loan Configuration Admin Page

**URL**: `/admin/loans`

### What You Can Change

**Loan Fees** (all in KES):
- Car Valuation Fee: Default 1,500 KES
- Legal Fee: Default 1,500 KES
- Loan Processing Fee: Default 5% of take-home amount
- Logbook Transfer Fee: Default 2,500 KES
- Car Tracker Purchase Fee: Default 15,000 KES

**Interest Rate**:
- Monthly Rate: Default 0.06 (6% reducing balance)

**Loan Terms**:
- Minimum Period: Default 1 month
- Maximum Period: Default 12 months

### How Changes Work

1. **Edit values** on `/admin/loans` page
2. **Click "Save Configuration"** to update database
3. **Loan simulator automatically reflects** new values
4. All users see updated parameters in real-time

## Technical Architecture

### Database Flow
```
Admin Panel (/admin/loans)
    ↓
API Endpoint (/api/admin/loans PUT)
    ↓
Prisma ORM
    ↓
PostgreSQL (LoanConfig table)
    ↓
Public API (/api/loan-config GET) ← No auth required
    ↓
Loan Simulator (Client-side)
    ↓
User sees updated fees & rates
```

### Key Files

**Admin Pages**:
- `src/app/admin/login/page.tsx` - Login form
- `src/app/admin/dashboard/page.tsx` - Dashboard overview
- `src/app/admin/loans/page.tsx` - Loan configuration editor

**APIs**:
- `src/app/api/admin/loans/route.ts` - Admin CRUD (protected)
- `src/app/api/loan-config/route.ts` - Public read (no auth)

**Simulator Components** (updated to use database):
- `src/components/simulator/LoanSimulatorDialog.tsx` - Fetches config
- `src/components/simulator/InputsSection.tsx` - Uses dynamic limits
- `src/components/simulator/LoanBreakdown.tsx` - Shows dynamic fees

**Database**:
- `prisma/schema.prisma` - LoanConfig model
- `src/lib/validation/adminSchemas.ts` - Zod schemas

## Example Workflow

### Scenario: Change processing fee from 5% to 4%

1. Navigate to `https://abzcapital.co.ke/admin/loans`
2. Find "Loan Processing Fee (% of take-home amount)"
3. Change value from `0.05` to `0.04`
4. Click "Save Configuration"
5. ✅ Processing fee now shows as 4% on loan simulator
6. All users calculating loans see the new 4% rate

### Scenario: Extend loan period to 24 months

1. Navigate to `/admin/loans`
2. Find "Maximum Loan Period (months)"
3. Change value from `12` to `24`
4. Click "Save Configuration"
5. ✅ Users can now select up to 24 months in loan simulator

## Features

✅ **Real-time Updates** - Changes appear immediately
✅ **Validation** - All inputs validated before save
✅ **Type Safety** - Full TypeScript types
✅ **Database Backed** - Persistent across restarts
✅ **Fallback Defaults** - If DB unavailable, sensible defaults
✅ **Public API** - Simulator fetches config from public endpoint
✅ **Admin Protected** - Only authenticated admins can change

## Security

- Session-based authentication (24h timeout)
- Password hashing with bcryptjs
- Admin routes protected by `requireAdminAuth()`
- Zod validation on all inputs
- No sensitive data in frontend

## Deployment Notes

When deploying to production:

1. **Set environment variables**:
   ```
   DATABASE_URL=postgresql://...
   ADMIN_EMAIL=admin@abzcapital.co.ke
   ADMIN_PASSWORD=secure_password_here
   ```

2. **Create admin user** in production database:
   ```sql
   INSERT INTO "AdminUser" (id, email, password, "createdAt", "updatedAt")
   VALUES (...);
   ```

3. **Initialize loan config** - Happens automatically on first read

4. **Test the flow**:
   - Login at `/admin/login`
   - Go to `/admin/loans`
   - Change a fee value
   - Verify simulator on `/products` page reflects change

## Troubleshooting

**"Loan configuration not loaded"** error:
- Check database connection (DATABASE_URL)
- Verify LoanConfig table exists (run migrations)
- Check API is returning data: `fetch('/api/loan-config')`

**Admin can't login**:
- Verify admin user exists in database
- Check password is bcryptjs hashed
- Verify email matches exactly

**Changes don't appear in simulator**:
- Check browser console for API fetch errors
- Verify `/api/loan-config` endpoint is accessible
- Check database was actually updated (`SELECT * FROM "LoanConfig"`)

## Next Steps

The admin panel is production-ready. To fully activate:

1. ✅ Code is complete and tested
2. ⏳ Database migration needed (when deploying)
3. ⏳ Admin user creation needed (one-time setup)
4. ⏳ Environment variables configuration needed
5. ⏳ Testing on production domain

---

**Commit**: 747fdb1  
**Status**: Ready for deployment  
**Time**: ~2 hours implementation
