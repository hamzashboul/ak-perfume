import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن العلامة",
  description: "تعرّف على قصة AK Perfumes — علامة أردنية ولدت من شغف حقيقي بعالم العطور. نجمع بين أرقى المكونات العالمية وروح الأردن الأصيلة.",
  openGraph: {
    title: "عن العلامة | AK Perfumes",
    description: "تعرّف على قصة AK Perfumes — علامة أردنية ولدت من شغف حقيقي بعالم العطور.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}