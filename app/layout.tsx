/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Header } from "@/components/header";
import { SITE_CONFIG, generateMetadata, generateStructuredData } from "@/lib/metadata";
import Script from "next/script";
import { OpenPanelComponent } from '@openpanel/nextjs';

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

export const metadata: Metadata = generateMetadata({
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  path: '/',
  type: 'website'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData('WebSite', {})
  const personData = generateStructuredData('Person', {})

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, personData])
          }}
        />
        <Script defer data-domain="kylemccracken.com" src="https://plausible.io/js/script.js" />
      </head>
      <body className={cn('text-base antialiased bg-background text-foreground font-geist', geistSans.className)}>
        <Providers>
        <OpenPanelComponent
        clientId="b05d7fab-3fe3-49fb-b8d1-eef85371fd41"
        trackScreenViews={true}
        cdnUrl="https://observtools-openpanel-46fc73-5-161-176-124.traefik.me"
        trackAttributes={true}
        trackOutgoingLinks={true}
        // If you have a user id, you can pass it here to identify the user
        // profileId={'123'}
      />
        <Header />
        <div className="container mx-auto h-[52px] sm:h-16 sm:border-x" />
            <main className="divide-y sm:border-b">
          {children}
          </main>
          </Providers>
      </body>
    </html>
  );
}
