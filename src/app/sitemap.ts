import { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join, relative } from "path";

/**
 * Dynamically discovers ALL public routes from the app directory
 * and generates a production-ready XML sitemap with proper route discovery
 */

interface RouteEntry {
  path: string;
  priority: number;
}

/**
 * Extract route path from file system path
 * Handles route groups (parentheses), dynamic segments, and nested directories
 */
function extractRoutePath(filePath: string, appDir: string): string | null {
  // Get relative path from app directory
  const relativePath = relative(appDir, filePath);

  // Split into parts
  const parts = relativePath.split(/[\\/]/);

  // Remove "page.tsx" or "page.jsx" at the end
  if (!parts[parts.length - 1].startsWith("page.")) {
    return null;
  }
  parts.pop();

  // Process each part to build the route
  const routeParts: string[] = [];

  for (const part of parts) {
    // Skip hidden directories and layout files
    if (part.startsWith(".") || part.startsWith("_")) {
      continue;
    }

    // Route groups (parentheses) don't contribute to the URL
    if (part.startsWith("(") && part.endsWith(")")) {
      continue;
    }

    // Dynamic segments with brackets - exclude these from sitemap
    if (part.startsWith("[") && part.endsWith("]")) {
      return null;
    }

    // Add regular path segments
    routeParts.push(part);
  }

  // Build final route
  const routePath = routeParts.length > 0 ? "/" + routeParts.join("/") : "/";

  return routePath;
}

/**
 * Recursively find all page files in the app directory
 */
function findAllPageFiles(dir: string, pageFiles: string[] = []): string[] {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      // Skip hidden directories and node_modules
      if (entry.name.startsWith(".") || entry.name === "node_modules") {
        continue;
      }

      if (entry.isDirectory()) {
        // Recursively search all directories (including route groups)
        findAllPageFiles(fullPath, pageFiles);
      } else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
        // Found a page file
        pageFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return pageFiles;
}

/**
 * Check if a route should be excluded from sitemap
 */
function shouldExcludeRoute(routePath: string): boolean {
  // Exclude admin routes
  if (routePath.startsWith("/admin")) {
    return true;
  }

  // Exclude protected investor routes (but not public /invest pages)
  if (routePath.startsWith("/investor")) {
    return true;
  }

  // Exclude API routes
  if (routePath.startsWith("/api")) {
    return true;
  }

  // Exclude auth routes
  if (routePath.startsWith("/auth")) {
    return true;
  }

  return false;
}

/**
 * Determine priority for a route based on its importance
 */
function getPriorityForRoute(path: string): number {
  // Home page
  if (path === "/") return 1.0;

  // Main product/service pages
  const mainPages = [
    "/products",
    "/invest",
    "/funding",
    "/fundraise",
    "/about",
    "/contact",
  ];
  if (mainPages.includes(path)) {
    return 0.9;
  }

  // Investment-related pages
  if (
    path.includes("/invest") ||
    path.includes("/lending") ||
    path.includes("/investor-network") ||
    path.includes("/lending-pool")
  ) {
    return 0.85;
  }

  // Legal/informational pages
  const legalPages = [
    "/terms",
    "/privacy",
    "/risk-disclosure",
    "/cookies",
  ];
  if (legalPages.includes(path)) {
    return 0.7;
  }

  // Other informational pages
  if (path.includes("/alert") || path.includes("/simulator")) {
    return 0.65;
  }

  // Default priority for other pages
  return 0.6;
}

/**
 * Determine change frequency for a route
 */
function getChangeFrequency(path: string): string {
  // Frequently updated pages
  if (
    path === "/invest" ||
    path === "/funding" ||
    path === "/fundraise" ||
    path === "/products" ||
    path.includes("/invest") ||
    path.includes("/lending") ||
    path.includes("/investor-network")
  ) {
    return "weekly";
  }

  // Monthly updates
  if (
    path === "/about" ||
    path === "/contact" ||
    path === "/alert" ||
    path === "/simulator"
  ) {
    return "monthly";
  }

  // Static legal pages
  if (
    path.includes("/terms") ||
    path.includes("/privacy") ||
    path.includes("/risk-disclosure") ||
    path.includes("/cookies")
  ) {
    return "yearly";
  }

  // Default
  return "monthly";
}

/**
 * Generate the sitemap with all public routes
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = join(process.cwd(), "src", "app");

  // Find all page files
  const pageFiles = findAllPageFiles(appDir);

  // Convert page files to routes
  const discoveredRoutes: RouteEntry[] = pageFiles
    .map((filePath) => {
      const routePath = extractRoutePath(filePath, appDir);
      return routePath
        ? {
            path: routePath,
            priority: getPriorityForRoute(routePath),
          }
        : null;
    })
    .filter(
      (route): route is RouteEntry =>
        route !== null && !shouldExcludeRoute(route.path)
    );

  // Ensure home page is included
  const allRoutes = discoveredRoutes.length > 0
    ? discoveredRoutes
    : [{ path: "/", priority: 1.0 }];

  // Remove duplicates and sort
  const uniqueRoutes = Array.from(
    new Map(allRoutes.map((item) => [item.path, item])).values()
  ).sort((a, b) => a.path.localeCompare(b.path));

  // Log discovered routes for debugging (remove in production if needed)
  console.log(
    `[Sitemap] Discovered ${uniqueRoutes.length} public routes`,
    uniqueRoutes.map((r) => r.path)
  );

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
