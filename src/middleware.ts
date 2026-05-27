import { auth } from "@/auth";

export const middleware = auth((req: any) => {
  // Investor routes require investor role
  if (req.nextUrl.pathname.startsWith("/investor")) {
    if (!req.auth?.user) {
      return Response.redirect(new URL("/investor/login", req.url));
    }
    const userRole = (req.auth.user as any).role;
    if (userRole !== "investor" && userRole !== "admin") {
      return Response.redirect(new URL("/", req.url));
    }
  }

  // Admin routes require admin role
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!req.auth?.user || (req.auth.user as any).role !== "admin") {
      return Response.redirect(new URL("/admin/login", req.url));
    }
  }
});

export const config = {
  matcher: ["/admin/:path*", "/investor/:path*", "/api/investor/:path*"],
};
