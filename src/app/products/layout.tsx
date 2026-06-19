import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المجموعة الكاملة",
  description: "تصفح مجموعة AK Perfumes الكاملة من العطور الفاخرة المستوحاة من أشهر دور العطور العالمية. أكثر من 50 عطراً فاخراً بانتظارك.",
  openGraph: {
    title: "المجموعة الكاملة | AK Perfumes",
    description: "تصفح مجموعة AK Perfumes الكاملة من العطور الفاخرة المستوحاة من أشهر دور العطور العالمية.",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}