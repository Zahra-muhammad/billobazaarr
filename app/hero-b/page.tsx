import type { Metadata } from "next";
import { Intro } from "@/components/lab/Intro";
import { HeroB } from "@/components/lab/HeroB";

// TEMPORARY hero direction for review. Delete once a direction is chosen.
export const metadata: Metadata = { title: "Hero B · Billo Bazaar lab", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main>
      <Intro />
      <HeroB />
    </main>
  );
}
