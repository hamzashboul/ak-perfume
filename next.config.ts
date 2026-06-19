import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ['nufrblbqhosxywjlsbgb.supabase.co'],
  },
};

export default nextConfig;