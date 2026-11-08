"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Unsplash placeholders are resized by Unsplash's own CDN (fast, and it doesn't
 * use up Vercel's image-optimisation quota). Your own photos in /public/images
 * go through the normal Next.js optimiser automatically.
 */
const unsplashLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
};

type ImgProps = Omit<ImageProps, "loader"> & {
  /** Apply the warm, slightly desaturated grade. */
  grade?: boolean;
};

export function Img({ src, grade = true, className, alt, ...props }: ImgProps) {
  const isUnsplash = typeof src === "string" && src.startsWith("https://images.unsplash.com/");
  return (
    <Image
      src={src}
      alt={alt}
      loader={isUnsplash ? unsplashLoader : undefined}
      className={cn("object-cover", grade && "grade", className)}
      {...props}
    />
  );
}
