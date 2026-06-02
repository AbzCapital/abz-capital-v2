# XML Sitemap Implementation

## Overview

This project includes a **production-ready dynamic XML sitemap** that automatically discovers all public routes and generates a valid sitemap at `/sitemap.xml`.

The sitemap is automatically generated at build time and served at:
```
https://www.abzcapital.co.ke/sitemap.xml
```

## Implementation Details

### Files Created

1. **`src/app/sitemap.ts`** - Dynamic sitemap generator (route handler)
2. **`public/robots.txt`** - Robot directives with sitemap reference

### How It Works

The sitemap generator (`src/app/sitemap.ts`):

1. **Automatically discovers routes** by scanning the `src/app` directory for `page.tsx` files
2. **Filters out protected pages**:
   - Admin routes: `/admin/*`
   - Investor routes: `/investor/*`
   - API routes: `/api/*`
   - Dynamic routes with parameters: `/[id]`, etc.

3. **Assigns priorities** based on route importance:
   - Home (`/`) - 1.0
   - Main product pages - 0.9
   - Specific investment pages - 0.8
   - Legal/info pages - 0.7
   - Other pages - 0.6

4. **Sets change frequencies** appropriately:
   - Investment/product pages - `weekly`
   - General pages - `monthly`
   - Legal pages - `yearly`

5. **Returns valid XML** with:
   - Proper XML schema: `http://www.sitemaps.org/schemas/sitemap/0.9`
   - `<url>` entries with `<loc>`, `<lastModified>`, `<changeFrequency>`, `<priority>`
   - Automatic `lastModified` dates

## Public Routes Included

The following routes are automatically included in the sitemap:

```
✓ / (home)
✓ /products
✓ /invest
✓ /investor-network
✓ /lending-pool
✓ /funding
✓ /fundraise
✓ /about
✓ /contact
✓ /alert
✓ /simulator
✓ /terms
✓ /privacy
✓ /risk-disclosure
✓ /cookies
```

### Routes Excluded

These routes are **NOT** included (as they're protected or administrative):

```
✗ /admin/* (admin dashboard, protected)
✗ /investor/* (investor dashboard, protected)
✗ /investor/kyc (KYC forms)
✗ /investor/dashboard
✗ /investor/login
✗ /api/* (API routes, not for search engines)
✗ /auth/* (authentication routes)
✗ /[dynamic-routes]/* (parameterized routes)
```

## Robots.txt

The `public/robots.txt` file:
- Allows search engine crawlers
- Blocks crawling of admin, investor, and API routes
- References the sitemap location
- Follows standard robots.txt conventions

## Production Behavior

### At Build Time
- Next.js automatically generates the sitemap route handler
- Routes are discovered from the file system
- Sitemap is ready to serve without additional configuration

### At Request Time
- When a request comes to `/sitemap.xml`:
  - The sitemap generator scans the `src/app` directory
  - Routes are discovered and filtered
  - XML is generated and returned with proper headers
  - Content-Type: `application/xml`

### Caching
- Next.js caches the sitemap response based on ISR/revalidation settings
- The sitemap is revalidated on-demand or at build time
- Use `revalidate` in the sitemap handler to control cache duration

## Testing the Sitemap

### Local Development
```bash
npm run dev
# Visit: http://localhost:3000/sitemap.xml
```

Expected output: Valid XML with all public routes

### Production
```
curl https://www.abzcapital.co.ke/sitemap.xml
```

### Validation Tools
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Google Search Console (submit sitemap)
- Bing Webmaster Tools (submit sitemap)

## Adding New Routes

When you add a new public page:

1. **Create** `src/app/(marketing)/my-page/page.tsx`
2. **The sitemap automatically discovers it** - no manual updates needed
3. **It will be included** in the next sitemap generation
4. **Priority can be customized** by editing `getPriorityForRoute()` function

### Example: Adding a New Product Page

```typescript
// src/app/(marketing)/new-product/page.tsx
export const metadata: Metadata = {
  title: "New Product - ABZ Capital",
};

export default function NewProductPage() {
  return <div>New product page</div>;
}
```

Result: `/new-product` is automatically added to the sitemap on next request/build.

## Modifying the Sitemap

### Change Route Priority

Edit `getPriorityForRoute()` in `src/app/sitemap.ts`:

```typescript
function getPriorityForRoute(path: string): number {
  if (path === "/my-important-page") return 0.95;
  // ... rest of function
}
```

### Change Frequency for a Route

Edit `getChangeFrequency()` in `src/app/sitemap.ts`:

```typescript
function getChangeFrequency(path: string): string {
  if (path === "/investment-opportunities") return "daily";
  // ... rest of function
}
```

### Exclude Additional Routes

Edit `EXCLUDED_PATTERNS` in `src/app/sitemap.ts`:

```typescript
const EXCLUDED_PATTERNS = [
  /^\/(admin|investor|api|auth)/,
  /\/\(protected\)/,
  /\/\[/,
  /\/my-hidden-page/, // Add this line
];
```

### Add Manual Routes

Edit `MANUAL_ROUTES` in `src/app/sitemap.ts`:

```typescript
const MANUAL_ROUTES = [
  { url: "/", priority: 1.0 },
  { url: "/special-promo", priority: 0.9 }, // Add this line
];
```

## SEO Benefits

✅ Helps search engines discover all your pages
✅ Improves crawl efficiency for large sites
✅ Indicates page priority and update frequency
✅ Required for Google Search Console
✅ Improves organic search visibility
✅ Automatically stays current as routes change

## Deployment Checklist

- [x] Sitemap route handler created (`src/app/sitemap.ts`)
- [x] Robots.txt created (`public/robots.txt`)
- [x] Routes automatically discovered
- [x] Protected routes excluded
- [x] Priorities assigned
- [x] Change frequencies set
- [x] Valid XML schema
- [x] Production URL configured

## Troubleshooting

### Sitemap Returns 404
- Check that `src/app/sitemap.ts` exists
- Verify Next.js version is 13+ (App Router)
- Rebuild: `npm run build`

### Routes Missing from Sitemap
- Check route is in `src/app/(marketing)/*/page.tsx`
- Verify it's not matching `EXCLUDED_PATTERNS`
- Check it's not under `/admin` or `/investor`
- Check route doesn't have dynamic parameters `[id]`

### XML Validation Errors
- Verify all URLs are properly formatted
- Check special characters are XML-encoded
- Ensure all entries have required fields

## Next Steps

1. Submit sitemap to Google Search Console: https://search.google.com/search-console
2. Submit sitemap to Bing Webmaster Tools: https://www.bing.com/webmasters
3. Monitor indexation in search console
4. Track organic search traffic improvements

## References

- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/sitemap)
- [Sitemap XML Schema](https://www.sitemaps.org/)
- [Google Search Central - Sitemaps](https://developers.google.com/search/docs/advanced/sitemaps/overview)
