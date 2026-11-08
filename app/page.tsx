import { Site } from "@/components/Site";
import { getContent } from "@/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://billobazaar.com";

export default function Home() {
  const t = getContent("en");
  // Structured data so search engines understand who Billo Bazaar is.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t.meta.siteName,
    url: siteUrl,
    description: t.meta.description,
    areaServed: "PK",
    // Profiles only (skips WhatsApp and bare placeholder domains).
    sameAs: t.footer.socials
      .map((s) => s.href)
      .filter((h) => h.startsWith("https://") && !h.includes("wa.me") && new URL(h).pathname.length > 1),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Site locale="en" />
    </>
  );
}
