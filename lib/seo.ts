import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

/** Public site URL — set NEXT_PUBLIC_SITE_URL in production */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hypernest.com.au";

export const SEO = {
  siteName: SITE.brandName,
  locale: "en_AU",
  language: "en-AU",
  country: "Australia",
  region: "AU-ACT",
  defaultTitle: "Hyper Nest | Digital Agency Canberra & Australia",
  defaultDescription:
    "Hyper Nest is a Canberra-based digital agency delivering custom websites, e-commerce, web apps, mobile apps, SEO, and branding for Australian businesses. Free discovery call.",
  keywords: [
    "digital agency Canberra",
    "web design Australia",
    "website development ACT",
    "e-commerce development Australia",
    "SEO services Australia",
    "mobile app development Canberra",
    "Hyper Nest",
    "web design Amaroo",
    "Australian digital agency",
  ],
} as const;

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const allKeywords = [...new Set([...keywords, ...SEO.keywords])];

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: SEO.locale,
      url,
      siteName: SEO.siteName,
      title,
      description,
      countryName: SEO.country,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    other: {
      "geo.region": SEO.region,
      "geo.placename": SITE.address.suburb,
      "geo.position": "-35.168;149.134",
      ICBM: "-35.168, 149.134",
      "content-language": SEO.language,
    },
  };
}

export const PAGE_SEO = {
  home: buildPageMetadata({
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    path: "/",
    keywords: [
      "custom website design Canberra",
      "digital products Australia",
      "web development company ACT",
    ],
  }),
  services: buildPageMetadata({
    title: "Digital Services Canberra & Australia | Hyper Nest",
    description:
      "Full-service digital agency in Canberra: custom websites, e-commerce, web apps, mobile apps, SEO, Google Ads, branding, UI/UX, and ongoing support for Australian businesses.",
    path: "/services",
    keywords: [
      "web design services Canberra",
      "e-commerce website Australia",
      "SEO agency ACT",
      "branding agency Australia",
      "UI UX design Canberra",
    ],
  }),
  contact: buildPageMetadata({
    title: "Contact Hyper Nest | Free Discovery Call Canberra",
    description:
      "Contact Hyper Nest in Amaroo, ACT. Call +61 405 799 239 or email office@hypernest.com.au for a free discovery call about your next website, app, or digital project.",
    path: "/contact",
    keywords: [
      "contact web designer Canberra",
      "get a quote website Australia",
      "digital agency Amaroo",
    ],
  }),
  privacy: buildPageMetadata({
    title: "Privacy Policy | Hyper Nest Australia",
    description:
      "How Hyper Nest Pty Ltd collects, uses, and protects your personal information under Australian privacy law. Based in Canberra, ACT.",
    path: "/privacy",
    keywords: ["privacy policy Australia", "Hyper Nest privacy"],
  }),
  terms: buildPageMetadata({
    title: "Terms of Service | Hyper Nest Australia",
    description:
      "Terms and conditions for using the Hyper Nest website and engaging our digital design and development services in Australia.",
    path: "/terms",
    keywords: ["terms of service Australia", "Hyper Nest terms"],
  }),
} as const;

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.defaultTitle,
    template: "%s | Hyper Nest",
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.brandName,
  publisher: SITE.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-AU": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: SITE_URL,
    siteName: SEO.siteName,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    countryName: SEO.country,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  other: {
    "geo.region": SEO.region,
    "geo.placename": SITE.address.suburb,
    "content-language": SEO.language,
  },
};
