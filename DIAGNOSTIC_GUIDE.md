# ABZ Capital Investor Registration - Diagnostic Guide

## Overview
This guide helps you test and debug the three remaining issues with the investor registration system:
1. Email sending failures
2. Mobile form submission notifications
3. Improved error handling on investor network form

## Issue 1: Email Not Sending

### Test Endpoint
A new diagnostic endpoint has been created to test email sending:
```
http://localhost:3000/api/test-email?email=youremail@example.com
```

### How to Test
1. Start the dev server: `npm run dev`
2. Visit: `http://localhost:3000/api/test-email?email=test@example.com`
3. Check the response - it will show:
   - ✅ If email was sent successfully (look for `success: true`)
   - ❌ If there's an error (look for `error` field with details)

### What to Do Based on Response

**If you see: `"error": "RESEND_API_KEY is not set"`**
- The RESEND_API_KEY environment variable is not configured
- Check `.env.local` to ensure `RESEND_API_KEY` is set
- Restart the dev server after adding the key

**If you see: `"error": "Failed to initialize Resend"`**
- The API key might be invalid or malformed
- Go to https://resend.com/api-keys and verify your API key
- Update `.env.local` with the correct key

**If you see: `"error": "Invalid from address"` or similar**
- The sender domain (no-reply@abzcapital.co.ke) might not be verified in Resend
- Go to https://resend.com/domains and check if the domain is verified
- You may need to add the domain and complete verification

**If you see: `success: true`**
- Email sending is working! Check your test email inbox (including spam)
- The registration forms should now send emails

---

## Issue 2: Mobile Form Submission Notification

### How to Test on Mobile

#### Desktop Testing (Simulate Mobile)
1. Open Chrome DevTools (F12)
2. Click the device icon to enable mobile view
3. Navigate to `http://localhost:3000/lending-pool` or `http://localhost:3000/investor-network`

#### Real Mobile Device
1. On your phone, visit: `http://<your-computer-ip>:3000/lending-pool`
   - Replace `<your-computer-ip>` with your computer's IP address
   - To find your IP: run `ipconfig` in PowerShell and look for IPv4 Address

### Testing Steps
1. Fill out the form completely
2. Click "Join Lending Pool" or "Join Investor Network"
3. **Check for**:
   - ✅ Success message appears (green header with checkmark)
   - ✅ WhatsApp group link appears
   - ✅ "Back to Invest" link appears
   - ✅ No error messages showing

4. **If something goes wrong**:
   - Open Chrome DevTools Console (F12 → Console tab)
   - Submit the form again
   - Look for red error messages with details
   - Screenshot the error and check what went wrong

### Expected Success Message on Mobile
When the form submits successfully, you should see:
```
✅ Registration Successful

Your details have been saved successfully.

You will receive notifications whenever a loan matching 
your investment preferences becomes available.

For faster deal alerts, join our WhatsApp investor community.

[📱 Join WhatsApp Group button]

Back to Invest
```

---

## Issue 3: Investor Network Form Improvements

### What Was Improved
1. **Error Display**: Errors from failed submissions now display to the user
2. **Sector Selection Feedback**: 
   - Shows required indicator (*) next to sector label when none selected
   - Shows validation message if no sectors chosen
   - Shows count of selected sectors: "Selected: 3 sectors"
3. **Better Logging**: Console logs show exactly what's happening during submission

### How to Test Sector Selection
1. Visit `http://localhost:3000/investor-network`
2. **Before selecting sectors**:
   - Button should be greyed out (disabled)
   - Should see: "Please select at least one sector" message
3. **After selecting 1+ sectors**:
   - Button should be bright blue (enabled)
   - Should see: "Selected: X sector(s)" at bottom
4. **Click button**:
   - Should submit form successfully if other fields are valid

---

## Debugging Console Logs

### Enabling Console Logging
1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Look for messages starting with `[API]`, `[EMAIL]`, or regular console logs

### What to Look For
When submitting a form, you should see console logs like:

```
Form submitted
Sending data: {investor_type: "lending_pool", first_name: "John", ...}
Response status: 201
Response data: {success: true, investor_id: "clq..."}
Success! Setting success state
```

### If Something Goes Wrong
```
Form submitted
Sending data: {investor_type: "lending_pool", ...}
Response status: 400
Response data: {error: "Invalid loan preferences"}
Error from API: Invalid loan preferences
```

---

## Complete Testing Checklist

- [ ] **Database Connection** (already verified)
  - Visit: `http://localhost:3000/api/test-db`
  - Should show: `success: true`

- [ ] **Email Configuration**
  - Visit: `http://localhost:3000/api/test-email?email=youremail@example.com`
  - Check response for errors or success

- [ ] **Lending Pool Form (Desktop)**
  - Go to: `http://localhost:3000/lending-pool`
  - Fill form → Submit → See success message

- [ ] **Lending Pool Form (Mobile)**
  - Simulate mobile or use phone
  - Fill form → Submit → See success message on mobile layout

- [ ] **Investor Network Form (Desktop)**
  - Go to: `http://localhost:3000/investor-network`
  - Select sectors → Fill form → Submit → See success message

- [ ] **Investor Network Form (Mobile)**
  - Simulate mobile or use phone
  - Select sectors → Fill form → Submit → See success message on mobile layout

- [ ] **Email Delivery**
  - After successful form submission, check your email inbox
  - Should receive welcome email from no-reply@abzcapital.co.ke
  - Check spam folder if not in inbox

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Button stays greyed out even after selecting sectors | Refresh page (F5), ensure JavaScript is enabled |
| Form submits but no success message | Check console for errors, verify API is responding |
| No error message shown when submission fails | Check console tab for actual error details |
| Email test endpoint shows error | See "Email Not Sending" section above |
| Form fields not accepting input | Check for console errors related to rendering |

---

## Next Steps

1. **Test email sending**: Visit `/api/test-email` endpoint
2. **Fix any email errors**: Update `.env.local` or Resend configuration
3. **Test forms on mobile**: Check both lending pool and investor network forms
4. **Verify success messages**: Confirm notifications appear after submission
5. **Check email delivery**: Verify welcome emails are received

Once all tests pass, your investor registration system should be fully functional!
