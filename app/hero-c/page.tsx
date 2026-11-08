import type { Metadata } from "next";
import { Intro } from "@/components/lab/Intro";
import { HeroC } from "@/components/lab/HeroC";

// TEMPORARY hero direction for review. Delete once a direction is chosen.
export const metadata: Metadata = { title: "Hero C · Billo Bazaar lab", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main>
      <Intro />
      <HeroC />
    </main>
  );
}
