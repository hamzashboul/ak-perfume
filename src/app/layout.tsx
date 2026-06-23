import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { LangProvider } from "@/lib/i18n/LangContext";

// ... metadata ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </LangProvider>
      </body>
    </html>
  );
}