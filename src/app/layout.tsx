import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abzcapital.co.ke"),
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
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
