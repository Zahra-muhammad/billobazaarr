import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // One-page site, mostly first-time visitors: inline the (small) Tailwind CSS
    // so the first paint doesn't wait on a stylesheet request.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Placeholder photos come from Unsplash. Remove once real photos are in /public/images.
    remotePatterns: [new URL("https://images.unsplash.com/**")],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
