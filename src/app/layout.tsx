import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

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
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}