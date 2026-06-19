import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/client";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: product } = await supabase
    .from("products")
    .select("name_ar, name_en, desc_ar, desc_en, inspired")
    .eq("slug", params.slug)
    .single();

  if (!product) {
    return { title: "المنتج غير موجود" };
  }

  return {
    title: product.name_ar,
    description: product.desc_ar || product.inspired || "عطر فاخر من AK Perfumes",
    openGraph: {
      title: `${product.name_ar} | AK Perfumes`,
      description: product.desc_ar || product.inspired || "عطر فاخر من AK Perfumes",
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}