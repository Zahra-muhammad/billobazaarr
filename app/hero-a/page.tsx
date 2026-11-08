import type { Metadata } from "next";
import { Intro } from "@/components/lab/Intro";
import { HeroA } from "@/components/lab/HeroA";

// TEMPORARY hero direction for review. Delete once a direction is chosen.
export const metadata: Metadata = { title: "Hero A · Billo Bazaar lab", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main>
      <Intro />
      <HeroA />
    </main>
  );
}
