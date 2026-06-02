import { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";

/**
 * Dynamically discovers all public routes from the app directory
 * and generates a production-ready XML sitemap
 */

// Routes to exclude from the sitemap (protected pages, admin, etc.)
const EXCLUDED_PATTERNS = [
  /^\/(admin|investor|api|auth)/,
  /\/\(protected\)/,
  /\/\[/,
];

// Manual overrides for important routes that might not be in /app structure
const MANUAL_ROUTES = [
  { path: "/", priority: 1.0 },
];

interface RouteEntry {
  path: string;
  priority: number;
}

/**
 * Recursively find all page.tsx routes in the app directory
 */
function findPageRoutes(
  dir: string,
  basePath: string = "",
  routes: RouteEntry[] = []
): RouteEntry[] {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      // Skip certain directories and patterns
      if (
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name.startsWith("(") ||
        entry.name === "[" ||
        entry.name.startsWith("_")
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        // Recursively search subdirectories
        const newBasePath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`;
        findPageRoutes(fullPath, newBasePath, routes);
      } else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
        // Found a page file - extract the route
        const routePath = basePath || "/";

        // Skip excluded patterns
        const shouldExclude = EXCLUDED_PATTERNS.some((pattern) =>
          pattern.test(routePath)
        );

        if (!shouldExclude) {
          routes.push({
            path: routePath,
            priority: getPriorityForRoute(routePath),
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return routes;
}

/**
 * Determine priority for a route based on its importance
 */
function getPriorityForRoute(path: string): number {
  // Home page gets highest priority
  if (path === "/") return 1.0;

  // Main product/service pages
  if (["/products", "/invest", "/funding", "/about", "/contact"].includes(path)) {
    return 0.9;
  }

  // Legal/informational pages
  if (["/terms", "/privacy", "/risk-disclosure", "/cookies"].includes(path)) {
    return 0.7;
  }

  // Specific investment/product pages
  if (path.includes("/invest") || path.includes("/lending") || path.includes("/investor")) {
    return 0.8;
  }

  // Other pages
  return 0.6;
}

/**
 * Get the last modified date for a file
 */
function getLastModDate(filePath: string): string {
  try {
    const stats = statSync(filePath);
    return new Date(stats.mtime).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

/**
 * Generate the sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = join(process.cwd(), "src/app");
  const routes = findPageRoutes(appDir);

  // Combine manual routes with discovered routes
  const allRoutes = [
    ...MANUAL_ROUTES,
    ...routes.filter((route) => route.path !== "/"), // Avoid duplicates
  ];

  // Remove duplicate routes and sort
  const uniqueRoutes = Array.from(
    new Map(allRoutes.map((item) => [item.path, item])).values()
  ).sort((a, b) => a.path.localeCompare(b.path));

  // Generate sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = uniqueRoutes.map((route) => ({
    url: `https://www.abzcapital.co.ke${route.path === "/" ? "" : route.path}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: getChangeFrequency(route.path) as
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never",
    priority: route.priority,
  }));

  return sitemapEntries;
}

/**
 * Determine change frequency for a route
 */
function getChangeFrequency(path: string): string {
  // Frequently updated pages
  if (["/invest", "/funding", "/products"].includes(path)) {
    return "weekly";
  }

  // Less frequently updated
  if (["/about", "/contact"].includes(path)) {
    return "monthly";
  }

  // Static legal pages
  if (["/terms", "/privacy", "/risk-disclosure", "/cookies"].includes(path)) {
    return "yearly";
  }

  // Default
  return "monthly";
}
