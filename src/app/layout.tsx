import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import { LangProvider } from "@/lib/i18n/LangContext";

const siteUrl = "https://ak-perfume.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AK Perfumes | عطور أصيلة — Define Yourself",
    template: "%s | AK Perfumes",
  },
  description: "روائح فاخرة مستوحاة من أشهر دور العطور العالمية. اكتشف مجموعتنا من العطور الأردنية الأصيلة. Luxury fragrances inspired by the world's finest perfume houses.",
  keywords: ["عطور", "عطور أردنية", "عطور فاخرة", "AK Perfumes", "perfume jordan", "luxury fragrance", "عود", "مسك", "عطر"],
  authors: [{ name: "AK Perfumes" }],
  creator: "AK Perfumes",
  publisher: "AK Perfumes",

  openGraph: {
    type: "website",
    locale: "ar_JO",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "AK Perfumes",
    title: "AK Perfumes | عطور أصيلة — Define Yourself",
    description: "روائح فاخرة مستوحاة من أشهر دور العطور العالمية. اكتشف مجموعتنا من العطور الأردنية الأصيلة.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AK Perfumes — Define Yourself",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AK Perfumes | عطور أصيلة",
    description: "روائح فاخرة مستوحاة من أشهر دور العطور العالمية.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <CartDrawer />
        </LangProvider>
      </body>
    </html>
  );
}