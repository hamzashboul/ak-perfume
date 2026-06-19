import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق AK Perfumes عبر واتساب أو إنستقرام. نحن هنا للإجابة على استفساراتك وتلقي طلباتك.",
  openGraph: {
    title: "تواصل معنا | AK Perfumes",
    description: "تواصل مع فريق AK Perfumes عبر واتساب أو إنستقرام.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}