import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import { LangProvider } from "@/lib/i18n/LangContext";

export const metadata: Metadata = {
  title: "AK Perfume | عطور أصيلة",
  description: "روائح فاخرة مستوحاة من أشهر دور العطور العالمية. Define Yourself.",
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