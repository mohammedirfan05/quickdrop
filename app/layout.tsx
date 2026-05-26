import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codesharepro.vercel.app"),

  title: {
    template: "%s | CodeSharePro",
    default: "CodeSharePro — Instant Code & Text Sharing",
  },

  description:
    "Share code snippets, configs, and text instantly with a 6-character code. No signup, no clutter — just paste, share, and retrieve. Free developer tool with syntax highlighting and auto-expiry.",

  applicationName: "CodeSharePro",

  keywords: [
    "code sharing",
    "snippet sharing",
    "online clipboard",
    "pastebin alternative",
    "text sharing tool",
    "developer tool",
    "instant paste",
    "temporary paste",
    "code snippet tool",
    "share code online",
    "clipboard sharing",
    "snippet manager",
    "quick share",
    "config sharing",
    "code transfer",
    "developer utility",
    "paste tool",
    "code exchange",
    "syntax highlighting",
    "ephemeral paste",
  ],

  authors: [{ name: "CodeSharePro" }],
  creator: "CodeSharePro",
  publisher: "CodeSharePro",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "CodeSharePro — Instant Code & Text Sharing",
    description:
      "Paste code, configs, or text — get a 6-character code to share instantly. No signup. Auto-expiring snippets with syntax highlighting.",
    url: "https://codesharepro.vercel.app",
    siteName: "CodeSharePro",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CodeSharePro — Paste. Share. Done.",
    description:
      "Share code snippets instantly with a 6-character code. No signup, no clutter. Free developer tool.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased app-body`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
