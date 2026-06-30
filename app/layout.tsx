import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { SITE } from "@/lib/constants";
import SocialMediaRail from "@/components/SocialMediaRail";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Mobiz Car Rental | Premium Car Rental Mauritius",
    template: "%s | Mobiz Car Rental Mauritius",
  },
  description:
    "Book premium car rental in Mauritius with economy cars, SUVs, 7-seaters, luxury vehicles, airport transfers, WhatsApp support and secure payment options.",
  keywords: [
    "car rental Mauritius",
    "rent a car Mauritius",
    "airport car rental Mauritius",
    "SUV rental Mauritius",
    "luxury car rental Mauritius",
    "7-seater rental Mauritius",
    "Mauritius car booking",
    "PayPal car rental Mauritius",
    "MCB car rental Mauritius",
  ],
  authors: [{ name: SITE.name }],
  applicationName: SITE.name,
  openGraph: {
    title: "Mobiz Car Rental | Premium Car Rental Mauritius",
    description:
      "Book premium car rental in Mauritius — economy, SUV, 7-seater, luxury and airport transfers with WhatsApp support and secure payment options.",
    type: "website",
    locale: "en_MU",
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobiz Car Rental | Premium Car Rental Mauritius",
    description:
      "Premium car rental in Mauritius with WhatsApp support and secure payment options.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col bg-white text-ink antialiased">
        <Header />
        <SocialMediaRail />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
