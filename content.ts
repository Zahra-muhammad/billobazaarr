/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BILLO BAZAAR · SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every word and every image on the site lives in this file.
 *
 *  • Edit text inside `en` below. Wrap words in *asterisks* to set them in the
 *    italic accent style (e.g. "to fashion *entrepreneurs.*").
 *  • Swap photos in the `images` map. Each one has a note describing the kind
 *    of photo that belongs there. To use your own photo, drop it into
 *    /public/images and change the path, e.g. heroMain: "/images/hero-main.jpg".
 *  • Urdu: fill in the `ur` object (same shape as `en`). Anything you leave out
 *    falls back to English, so you can translate one section at a time.
 *    See README.md → "Adding Urdu" for the routing step.
 *  • Urdu accent words (labels like خواب) are worth a quick check by a native
 *    reader before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Locale = "en" | "ur";
export const locales: Locale[] = ["en", "ur"];
export const defaultLocale: Locale = "en";
export const localeDir: Record<Locale, "ltr" | "rtl"> = { en: "ltr", ur: "rtl" };

/** Placeholder helper for Unsplash photos. Replace with "/images/…" paths later. */
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

/* ═══════════════════════════════════════════════════════════════════════════
 *  IMAGES
 * ═══════════════════════════════════════════════════════════════════════════ */
export const images = {
  // HERO · main, tall portrait (approx. 4:5). Hero campaign shot: models in
  // contemporary desi wear, rich colour, editorial lighting. This is the first
  // image people see, so use your strongest photo.
  // (The hero placeholders live in /public/images/placeholder so the first
  // screen loads from your own domain. Just replace the files or the paths.)
  heroMain: "/images/placeholder/hero-main.jpg",
  // HERO · second, portrait (approx. 3:4). Modern menswear (e.g. an
  // embroidered kurta) in lighter colours: a fresh contrast to the main image.
  heroSecond: "/images/placeholder/hero-second.jpg",
  // HERO · small inset, portrait. Streetwear / youth culture: a student-made
  // piece, a hand-painted jacket, something with personality.
  heroThird: "/images/placeholder/hero-third.jpg",
  // HERO · tiny oval inside the headline. Textile or embroidery close-up.
  heroInline: "/images/placeholder/hero-inline.jpg",

  // VISION · detail, portrait. Close-up of embroidery, block print or fabric.
  visionDetail: unsplash("1680034976848-d9fe95466aba"),
  // VISION · portrait. A designer or model in a modern shalwar kameez / suit.
  visionPortrait: unsplash("1773439878338-c61b0fe9ed48"),

  // WHAT WE DO · 01 Institutional Collaboration. Landscape: students or
  // faculty working together in a design studio or classroom.
  pillarInstitutes: unsplash("1753162658547-f017a4d84541"),
  // WHAT WE DO · 02 Brand Launch. Portrait: a garment label, swing tag,
  // packaging or a first lookbook.
  pillarBrand: unsplash("1698932646779-916299619ad2"),
  // WHAT WE DO · 03 Manufacturing Support. Portrait: a garment factory or
  // stitching unit, ideally in Pakistan.
  pillarManufacturing: unsplash("1768746350424-ee28a364dcf5"),
  // WHAT WE DO · 04 Marketplace. Portrait: a shop or bazaar stall full of
  // clothes / fabric (or a screenshot of the Billo Bazaar shop later).
  pillarMarketplace: unsplash("1649579858003-486f5a789f34"),
  // WHAT WE DO · 05 Marketing & Advertising. Portrait: a photoshoot, behind
  // the scenes, a campaign being made.
  pillarMarketing: unsplash("1641236210747-48bc43e4517f"),
  // WHAT WE DO · 06 Physical Exhibitions. Portrait: a runway or exhibition
  // floor with an audience.
  pillarExhibitions: unsplash("1543728069-a3f97c5a2f32"),
  // WHAT WE DO · 07 Investment Opportunities. Landscape: a meeting, a pitch,
  // a handshake. Warm and human rather than corporate if possible.
  pillarInvestment: unsplash("1686771416282-3888ddaf249b"),

  // JOURNEY · six small "sticker" photos, roughly square or 4:5.
  journeySketchbook: unsplash("1557777586-f6682739fcf3"), // fashion sketches / sketchbook
  journeyBrand: unsplash("1571907483091-fbe746bee132"), // labels, tags, logo
  journeyFactory: unsplash("1772351721253-1008627c8c50"), // machines, thread, production
  journeyBazaar: unsplash("1771098206724-8cf3018e2d90"), // market stall, shop, product
  journeyRunway: unsplash("1762430815537-e140755eedf9"), // runway / exhibition
  journeyInvestors: unsplash("1758520144427-ddb02ac74e9d"), // meeting / handshake

  // ON THE GROUND · portrait. A Pakistani street: Anarkali, Saddar,
  // Liberty Market, a textile market. Real photos from the founder's trip
  // would be ideal here.
  groundStreet: unsplash("1624812449802-99c34cb56654"),

  // WHO IT'S FOR · three card images, landscape (4:3).
  audienceStudents: unsplash("1689044611227-3267fabaf76a"), // young designer / student
  audienceInstitutes: unsplash("1680835099030-9c7532f744f1"), // institute studio or campus
  audiencePartners: unsplash("1741176505800-caaa3a52631a"), // factory floor / makers

  // EXHIBITIONS · full-bleed, landscape (16:9 or wider). A runway or
  // exhibition with plenty of dark space for the headline.
  exhibitions: unsplash("1733322992706-1210ca79f4df"),
} as const;

export type ImageRef = { src: string; alt: string };

/* ═══════════════════════════════════════════════════════════════════════════
 *  ENGLISH
 * ═══════════════════════════════════════════════════════════════════════════ */
const en = {
  meta: {
    // TODO: set NEXT_PUBLIC_SITE_URL in Vercel once the domain is live.
    siteName: "Billo Bazaar",
    title: "Billo Bazaar | From fashion students to fashion entrepreneurs",
    description:
      "Billo Bazaar helps Pakistan's next generation of designers launch, make and sell their own fashion brands. A launchpad and network that partners with fashion institutes.",
  },

  nav: {
    skip: "Skip to content",
    homeLabel: "back to top", // read by screen readers after the wordmark
    links: [
      { label: "Vision", href: "#vision" },
      { label: "What We Do", href: "#what-we-do" },
      { label: "Journey", href: "#journey" },
      { label: "Partner", href: "#partner" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Partner With Us", href: "#contact" },
    menuOpen: "Menu",
    menuClose: "Close",
    menuNote: "From student, to brand, to bazaar.",
  },

  brand: {
    wordmark: ["billo", "bazaar"], // shown as one lowercase word: billobazaar
    urdu: "بِلّو بازار",
  },

  hero: {
    eyebrow: "Billo Bazaar · A launchpad for Pakistani fashion",
    // Each array item is one segment. The inline image appears after `beforeImage`.
    headline: {
      beforeImage: "From fashion students",
      afterImage: "to fashion *entrepreneurs.*",
    },
    sub: "Billo Bazaar helps Pakistan's next generation of designers launch, make, and sell their own brands.",
    primaryCta: { label: "Join as a Designer", href: "#contact", role: "student" as const },
    secondaryCta: { label: "Partner With Us", href: "#contact" },
    badge: "From student · To brand · To bazaar · ",
    badgeUrdu: "بازار",
    scroll: "Scroll",
    images: {
      main: { src: images.heroMain, alt: "Two models in embroidered shawls and jewellery reclining against a carved wooden screen" },
      second: { src: images.heroSecond, alt: "A man in a mint embroidered kurta and sunglasses leaning against a tree branch" },
      third: { src: images.heroThird, alt: "A model walking down a city street in a hand-painted jacket and graphic trousers" },
      inline: { src: images.heroInline, alt: "" }, // decorative
    },
  },

  marquee: {
    items: ["From Student", "To Brand", "To Bazaar"],
    srText: "From student, to brand, to bazaar.",
  },

  vision: {
    index: "01",
    label: "Vision",
    urdu: "خواب",
    statement:
      "Our vision is to help turn fashion students into *successful fashion entrepreneurs.*",
    // Shown as: "A [school, struck out] launchpad and a network."
    notSchool: { before: "A", struck: "school", after: "launchpad and a network." },
    body: "Billo Bazaar is not an academy, and we don't teach courses. We partner with the fashion institutes where students already learn, then stay with them after graduation: through manufacturing, retail, exhibitions and investment.",
    note: "The bridge between the final-year show and the first sale.",
    images: {
      detail: { src: images.visionDetail, alt: "Close-up of colourful hand embroidery on cream cloth" },
      portrait: { src: images.visionPortrait, alt: "A woman in a grey embroidered suit and black dupatta, seated in a styled room" },
    },
  },

  whatWeDo: {
    index: "02",
    label: "What We Do",
    urdu: "کاروبار",
    heading: "Seven ways we turn a collection into a *company.*",
    intro:
      "Everything a young designer needs after the final-year show, joined up in one network.",
    pillars: [
      {
        title: "Institutional Collaboration",
        line: "We partner with fashion design universities and institutes to meet talent where it already learns.",
        image: { src: images.pillarInstitutes, alt: "Fashion designers discussing plans around a table in a studio" },
      },
      {
        title: "Brand Launch",
        line: "We help students establish and launch their own fashion brands, from the name to the first drop.",
        image: { src: images.pillarBrand, alt: "A blank white swing tag hanging from red fabric" },
      },
      {
        title: "Manufacturing Support",
        line: "We connect designers with reliable factories and manufacturers who can make their work well.",
        image: { src: images.pillarManufacturing, alt: "Tailors working at sewing machines in a busy workshop" },
      },
      {
        title: "Marketplace",
        line: "We onboard their brands onto Billo Bazaar, so customers can find them and buy from them.",
        image: { src: images.pillarMarketplace, alt: "A shop stacked floor to ceiling with colourful cloth and scarves" },
      },
      {
        title: "Marketing & Advertising",
        line: "We promote their brands and products to reach the customers they were made for.",
        image: { src: images.pillarMarketing, alt: "A photographer shooting a model in a lit studio" },
      },
      {
        title: "Physical Exhibitions",
        line: "We bring their collections to fashion exhibitions in major cities across Pakistan.",
        image: { src: images.pillarExhibitions, alt: "Models walking a runway past a seated audience at a fashion show" },
      },
      {
        title: "Investment Opportunities",
        line: "We connect the most promising brands with potential investors who can help them grow.",
        image: { src: images.pillarInvestment, alt: "Two people shaking hands across a table after a meeting" },
      },
    ],
  },

  journey: {
    index: "03",
    label: "The Journey",
    urdu: "سفر",
    heading: "From sketchbook to investors, *one stitch at a time.*",
    intro: "Every brand on Billo Bazaar follows the same thread. Scroll to follow it.",
    stepLabel: "Step",
    steps: [
      {
        word: "Sketchbook",
        urdu: "خاکہ",
        line: "It starts as an idea on paper, in a studio or a hostel room.",
        image: { src: images.journeySketchbook, alt: "Fashion illustration sketches on paper" },
      },
      {
        word: "Brand",
        urdu: "برانڈ",
        line: "We help you name it, shape it and stand behind it.",
        image: { src: images.journeyBrand, alt: "Blank garment swing tags" },
      },
      {
        word: "Factory",
        urdu: "کارخانہ",
        line: "We match you with makers who can produce it properly.",
        image: { src: images.journeyFactory, alt: "An industrial embroidery machine with rows of thread spools" },
      },
      {
        word: "Bazaar",
        urdu: "بازار",
        line: "Your brand goes live on Billo Bazaar, ready to sell.",
        image: { src: images.journeyBazaar, alt: "Stacks of patterned fabric in a market" },
      },
      {
        word: "Runway",
        urdu: "ریمپ",
        line: "Your collection shows at our exhibitions across Pakistan.",
        image: { src: images.journeyRunway, alt: "A model on a runway with the audience watching" },
      },
      {
        word: "Investors",
        urdu: "سرمایہ کار",
        line: "Strong brands meet the people who can help them scale.",
        image: { src: images.journeyInvestors, alt: "Two women shaking hands across a desk" },
      },
    ],
    end: "And then, the next sketchbook.",
  },

  ground: {
    index: "04",
    label: "On The Ground",
    urdu: "پاکستان",
    heading: "On the ground in *Pakistan.*",
    intro:
      "Billo Bazaar is being built in person, not from a distance. Our founder is visiting Pakistan's fashion cities to meet the people who will make it work.",
    citiesLabel: "Cities on the route",
    cities: [
      { name: "Lahore", urdu: "لاہور", coords: "31.52° N, 74.36° E" },
      { name: "Karachi", urdu: "کراچی", coords: "24.86° N, 67.00° E" },
      { name: "Islamabad", urdu: "اسلام آباد", coords: "33.68° N, 73.05° E" },
      { name: "Faisalabad", urdu: "فیصل آباد", coords: "31.45° N, 73.14° E" },
    ],
    pointsLabel: "What the visit is for",
    points: [
      { title: "Institutions", text: "Meeting fashion institutions to explore partnerships." },
      { title: "Industry", text: "Connecting with manufacturers and industry professionals." },
      { title: "Network", text: "Building the initial network of makers, mentors and partners." },
      { title: "Talent", text: "Finding young fashion entrepreneurs to support." },
    ],
    image: {
      src: images.groundStreet,
      alt: "A busy street in Pakistan with market stalls, overhead wires and a minaret in the distance",
    },
    caption: "Street scene, Pakistan",
  },

  audience: {
    index: "05",
    label: "Who It's For",
    urdu: "ہنر",
    heading: "Built for the people who make *fashion happen.*",
    cards: [
      {
        title: "Fashion Students & Graduates",
        body: "You have the talent and the portfolio. We help you turn them into a brand people can buy.",
        points: ["Brand launch support", "Introductions to manufacturers", "A place on the marketplace"],
        cta: "Join as a Designer",
        role: "student" as const,
        image: { src: images.audienceStudents, alt: "A young man in streetwear leaning against a painted mural" },
      },
      {
        title: "Institutes & Universities",
        body: "Partner with us to give your students a clear path from graduation to a business of their own.",
        points: ["Partnership programmes", "Industry links for your students", "Exhibition opportunities"],
        cta: "Partner With Us",
        role: "institute" as const,
        image: { src: images.audienceInstitutes, alt: "A design studio with dress forms and sewing machines" },
      },
      {
        title: "Manufacturers & Investors",
        body: "Meet Pakistan's next generation of fashion brands early, and grow alongside them.",
        points: ["Early access to emerging brands", "Production partnerships", "Investment conversations"],
        cta: "Get Involved",
        role: "manufacturer" as const,
        image: { src: images.audiencePartners, alt: "Rows of workers sewing in a large garment factory" },
      },
    ],
  },

  exhibitions: {
    index: "06",
    label: "Exhibitions",
    urdu: "نمائش",
    heading: "Coming to a city *near you.*",
    body: "Billo Bazaar exhibitions will bring new Pakistani labels to major cities across the country. Be the first to hear the dates.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    button: "Get notified",
    sending: "Adding you…",
    success: "You're on the list. We'll email you as soon as dates are announced.",
    invalid: "Please enter a valid email address.",
    image: { src: images.exhibitions, alt: "Models in pink and red walking a darkened runway" },
  },

  contact: {
    index: "07",
    label: "Contact",
    urdu: "رابطہ",
    heading: "Let's build the bazaar *together.*",
    intro:
      "Whether you're a student with a collection, an institute, a manufacturer or an investor, tell us a little about yourself and we'll be in touch.",
    directLabel: "Or reach us directly",
    // TODO: replace these placeholders with the real WhatsApp number, Instagram handle and email.
    direct: [
      { label: "WhatsApp", value: "+92 300 0000000", href: "https://wa.me/923000000000" },
      { label: "Instagram", value: "@billobazaar", href: "https://instagram.com/billobazaar" },
      { label: "Email", value: "hello@billobazaar.com", href: "mailto:hello@billobazaar.com" },
    ],
    form: {
      name: "Your name",
      namePlaceholder: "Ayesha Khan",
      email: "Email address",
      emailPlaceholder: "you@example.com",
      role: "I am a…",
      roles: [
        { value: "student", label: "Student" },
        { value: "institute", label: "Institute" },
        { value: "manufacturer", label: "Manufacturer" },
        { value: "investor", label: "Investor" },
        { value: "other", label: "Other" },
      ],
      message: "Message",
      messagePlaceholder: "Tell us what you're working on, or how you'd like to work together.",
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you. Your message is with us and we'll reply soon.",
      successAgain: "Send another message",
      errors: {
        name: "Please tell us your name.",
        email: "Please enter a valid email address.",
        role: "Please choose the option that fits you best.",
        message: "Please add a short message (at least 10 characters).",
        generic: "Something went wrong. Please try again, or message us on WhatsApp.",
      },
    },
  },

  footer: {
    tagline: "From student, to brand, to *bazaar.*",
    exploreLabel: "Explore",
    followLabel: "Follow",
    // TODO: replace with the real social links.
    socials: [
      { label: "Instagram", href: "https://instagram.com/billobazaar" },
      { label: "WhatsApp", href: "https://wa.me/923000000000" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
    ],
    backToTop: "Back to top",
    copyright: "© 2026 Billo Bazaar",
    note: "A launchpad for Pakistan's next generation of fashion designers.",
  },
};

export type Content = typeof en;
export type Role = "student" | "institute" | "manufacturer" | "investor" | "other";

/* ═══════════════════════════════════════════════════════════════════════════
 *  URDU (optional, fill in gradually; missing keys fall back to English)
 * ═══════════════════════════════════════════════════════════════════════════ */
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const ur: DeepPartial<Content> = {
  // Example:
  // hero: { sub: "بِلّو بازار پاکستان کے نئے ڈیزائنرز کو اپنا برانڈ شروع کرنے میں مدد دیتا ہے۔" },
};

const dictionaries: { en: Content; ur: DeepPartial<Content> } = { en, ur };

/* ═══════════════════════════════════════════════════════════════════════════
 *  Lookup (you shouldn't need to edit below this line)
 * ═══════════════════════════════════════════════════════════════════════════ */
function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function merge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : (override as T));
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    out[key] = merge((base as Record<string, unknown>)[key], override[key]);
  }
  return out as T;
}

export function getContent(locale: Locale = defaultLocale): Content {
  if (locale === "en") return dictionaries.en;
  return merge(dictionaries.en, dictionaries[locale]);
}
