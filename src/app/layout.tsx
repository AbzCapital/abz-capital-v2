import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/layout/BottomNav";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abzcapital.co.ke"),
  title: {
    default: "ABZ Capital — Unlocking Potential, Securing Futures",
    template: "%s · ABZ Capital",
  },
  description:
    "Structured financing, investment, and insurance solutions for individuals, SMEs and institutions across emerging markets.",
  keywords: [
    "logbook loans Kenya",
    "SME financing",
    "asset-backed lending",
    "performance bonds",
    "WIBA insurance",
    "ABZ Capital",
    "Nairobi finance",
  ],
  openGraph: {
    title: "ABZ Capital — Unlocking Potential, Securing Futures",
    description:
      "Structured financing, investment, and insurance solutions for individuals, SMEs and institutions.",
    type: "website",
    locale: "en_KE",
    siteName: "ABZ Capital",
    url: "https://www.abzcapital.co.ke",
    images: [
      {
        url: "https://www.abzcapital.co.ke/logo.svg",
        width: 360,
        height: 360,
        alt: "ABZ Capital Logo",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Favicon Links */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1800ad" />

        {/* Schema.org Organization Structured Data for SEO */}
        <OrganizationSchema />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground pb-16 lg:pb-0">
        <TooltipProvider>
          <SessionProvider>
            {children}
            <BottomNav />
          </SessionProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
