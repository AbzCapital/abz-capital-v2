# Vercel Environment Variables Setup Guide

## 🔴 CRITICAL ISSUE

The investor registration form is failing on live (www.abzcapital.co.ke) because **environment variables are not configured in Vercel**.

This works on localhost because `.env.local` exists locally, but Vercel needs explicit environment variable configuration.

---

## ✅ REQUIRED ENVIRONMENT VARIABLES

These MUST be set in your Vercel project dashboard:

### **1. DATABASE (Required - Form will fail without this)**
```
DATABASE_URL = postgresql://[user]:[password]@[host]:[port]/[database]
```
**Where to get it**: Your PostgreSQL database connection string from:
- Supabase
- Railway
- AWS RDS
- Or your database provider

### **2. EMAIL SERVICE (Required for notifications)**
```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
**Where to get it**: 
- Go to https://resend.com
- Get your API key from the dashboard

### **3. AUTHENTICATION (Required)**
```
NEXTAUTH_SECRET = [generated_secret]
NEXTAUTH_URL = https://www.abzcapital.co.ke
```

**How to generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

Or use this command to generate it:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### **4. CAPTCHA (Optional but recommended)**
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY = [your_site_key]
TURNSTILE_SECRET_KEY = [your_secret_key]
```
**Where to get it**: https://dash.cloudflare.com/

### **5. OPTIONAL EMAIL ROUTING (Custom per-category emails)**
```
CATEGORY_EMAIL_LOANS = loans@abzcapital.co.ke
CATEGORY_EMAIL_INVESTMENT = invest@abzcapital.co.ke
CATEGORY_EMAIL_INSURANCE = cover@abzcapital.co.ke
CATEGORY_EMAIL_GENERAL = hello@abzcapital.co.ke
```

---

## 🚀 HOW TO SET UP IN VERCEL

### **Step 1: Go to Vercel Project Settings**
1. Log in to https://vercel.com
2. Select your project: **abz-capital-v2** (or your project name)
3. Go to **Settings** → **Environment Variables**

### **Step 2: Add Each Variable**
1. Click **Add New**
2. Enter the variable name (e.g., `DATABASE_URL`)
3. Enter the value (e.g., your database connection string)
4. Select which environments it applies to:
   - ✓ Production (Required)
   - ✓ Preview (Recommended)
   - ✓ Development (Optional)
5. Click **Save**

### **Step 3: Redeploy**
1. After adding all variables, go to **Deployments**
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy** to apply environment variables

---

## 📋 CHECKLIST

Use this checklist to verify all variables are set:

- [ ] `DATABASE_URL` - Set and tested
- [ ] `RESEND_API_KEY` - Set (from Resend)
- [ ] `NEXTAUTH_SECRET` - Set (generated secret)
- [ ] `NEXTAUTH_URL` - Set to `https://www.abzcapital.co.ke`
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Set (if using Cloudflare)
- [ ] `TURNSTILE_SECRET_KEY` - Set (if using Cloudflare)
- [ ] Project redeployed after adding variables

---

## 🧪 HOW TO TEST

After setting environment variables and redeploying:

1. **Go to**: https://www.abzcapital.co.ke/invest
2. **Click**: "Join Lending Pool"
3. **Fill form** with:
   - First Name: Test
   - Last Name: User
   - Phone: +254700000000
   - Email: your-email@example.com
   - Investment Amount: 100000
   - Loan Category: Logbook Loans
4. **Click**: "Join Lending Pool"
5. **Expected result**: Success page OR redirect to investor welcome page

---

## 🐛 TROUBLESHOOTING

### **Error Still Appears After Setup**

Check the Vercel logs:
1. Go to **Deployments** → Latest Deployment
2. Click **View Function Logs**
3. Look for logs starting with `[API]` - they show what's configured
4. Look for `[API ERROR]` - shows what failed

### **Common Issues**

**Issue**: `DATABASE_URL not found`
- **Solution**: Check DATABASE_URL is set in Vercel Environment Variables
- **Verify**: In Vercel logs you should see `[API] DATABASE_URL configured? true`

**Issue**: `RESEND_API_KEY not found`
- **Solution**: Check RESEND_API_KEY is set correctly
- **Verify**: Get fresh key from https://resend.com

**Issue**: Database connection timeout
- **Solution**: 
  - Check DATABASE_URL is correct
  - Verify database is accessible from Vercel's IP
  - For Supabase: Check firewall/network settings
  - For Railway: Check connection string format

**Issue**: Email not sending
- **Solution**: Check RESEND_API_KEY is valid and has quota remaining

---

## 📝 EXAMPLE ENVIRONMENT VARIABLES FILE

Here's what your Vercel env variables panel should look like:

```
DATABASE_URL          | postgresql://user:pass@db.supabase.co:5432/postgres
NEXTAUTH_SECRET       | [long_base64_string]
NEXTAUTH_URL          | https://www.abzcapital.co.ke
RESEND_API_KEY        | re_[your_api_key]
NEXT_PUBLIC_TURNSTILE_SITE_KEY | [cloudflare_key]
TURNSTILE_SECRET_KEY  | [cloudflare_secret]
```

---

## 🔄 WHEN TO REDEPLOY

After adding/updating environment variables:
1. Vercel automatically redeploys when you save
2. You can manually redeploy via **Deployments** → **Redeploy**
3. Check the deployment logs to confirm variables are loaded
4. Wait 1-2 minutes for deployment to complete

---

## 📞 GETTING HELP

If the form still doesn't work after setting all variables:

1. **Check Vercel Logs**:
   - Go to Deployments → Latest Build
   - Click "View Function Logs"
   - Search for `[API ERROR]`

2. **Check Database Connection**:
   - Verify DATABASE_URL is correct
   - Test if database is accessible from Vercel's region

3. **Check Email Service**:
   - Verify RESEND_API_KEY is valid
   - Check Resend dashboard for quota/limits

4. **Check Environment Variables**:
   - Confirm all required variables are set
   - Confirm deployment has redeployed since adding variables

---

## ✨ EXPECTED BEHAVIOR AFTER SETUP

✅ Form submissions should work on live site
✅ Email notifications should be sent
✅ Success page should appear after submission
✅ Investor records should be created in database
✅ No error messages or API errors

Once all variables are configured correctly, the investor registration form will work on live just like it works on localhost!
