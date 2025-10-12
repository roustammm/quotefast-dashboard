import { Metadata, Viewport } from "next";
import "../styles/globals.css";
import "../styles/base.css";
import "../styles/components.css";
import "../styles/utilities.css";
import { AppProviders } from "./components/AppProviders";

export const metadata: Metadata = {
  title: {
    default: "QuoteFast - Automatiseer je Bedrijfsprocessen met AI",
    template: "%s | QuoteFast"
  },
  description: "Modern SaaS platform voor offertes, facturen, CRM en workflows. Automatiseer je werk en groei sneller met AI-powered tools. Bespaar tijd en verhoog je productiviteit.",
  keywords: ["saas", "offertes", "facturen", "crm", "automatisatie", "workflows", "ai", "bedrijfssoftware", "business automation"],
  authors: [{ name: "QuoteFast Team" }],
  creator: "QuoteFast",
  publisher: "QuoteFast",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "QuoteFast - Modern SaaS Platform voor Bedrijfsautomatisering",
    description: "Automatiseer je bedrijfsprocessen met AI. Van offertes tot facturen, alles in één platform.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: "QuoteFast",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteFast - Automatiseer je Bedrijf",
    description: "Modern SaaS platform voor offertes, facturen en workflows",
    creator: "@quotefest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="antialiased">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
