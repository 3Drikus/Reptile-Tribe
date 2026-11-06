import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Palatino", "serif"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  fallback: ["Source Sans Pro", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Reptile Tribe — proposal preview",
  description:
    "Proposal preview for Reptile Tribe. Species, prices, photos, and contact details on this page are not confirmed.",
  openGraph: {
    title: "Reptile Tribe — proposal preview",
    description:
      "Proposal preview for Reptile Tribe. Species, prices, photos, and contact details on this page are not confirmed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${sourceSans.variable} font-sans antialiased`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
