import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/source-serif-4/600.css";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SITE_URL, personal } from "@/data/personal";

const description =
  "Corporate Finance and FP&A portfolio of Rohin Dillibabu, MiM student at ESSCA Paris: an Airbus DCF and comparable-company valuation and a Starbucks driver-based three-statement forecast.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rohin Dillibabu | Corporate Finance, FP&A & Valuation",
    template: "%s | Rohin Dillibabu",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Rohin Dillibabu",
    title: "Rohin Dillibabu | Corporate Finance, FP&A & Valuation",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rohin Dillibabu — finance portfolio" }],
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  authors: [{ name: personal.name }],
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: SITE_URL,
  email: `mailto:${personal.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "ESSCA School of Management" },
    { "@type": "CollegeOrUniversity", name: "Madras Christian College" },
  ],
  sameAs: [personal.linkedinHref],
  knowsAbout: ["FP&A", "Financial modelling", "DCF valuation", "Comparable company analysis", "Scenario analysis"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
