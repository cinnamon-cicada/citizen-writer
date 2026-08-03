import type { Metadata } from "next";
import { Crimson_Pro, Special_Elite } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = "https://citizenwriter.firebaseapp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Citizen Writer",
    template: "%s — Citizen Writer",
  },
  description:
    "Reflective personal essays on craft, place, and paying attention — written by hand, mostly.",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Citizen Writer",
    description:
      "Reflective personal essays on craft, place, and paying attention — written by hand, mostly.",
    url: siteUrl,
    siteName: "Citizen Writer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonPro.variable} ${specialElite.variable}`}>
      <body className="min-h-full">
        <div id="app-root">
          <Header />
          <main className="mx-auto max-w-2xl px-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
