import { SITE } from "@/lib/site-config";
import { SITE_URL } from "@/lib/seo";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE.brandName,
  legalName: SITE.legalName,
  url: SITE_URL,
  email: SITE.email,
  telephone: SITE.phone,
  description:
    "Canberra-based digital agency specialising in custom websites, e-commerce, web applications, mobile apps, SEO, and branding for Australian businesses.",
  image: `${SITE_URL}/services/custom-website-design.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.suburb,
    addressRegion: "ACT",
    postalCode: SITE.address.postcode,
    addressCountry: "AU",
  },
  areaServed: [
    { "@type": "City", name: "Canberra" },
    { "@type": "State", name: "Australian Capital Territory" },
    { "@type": "Country", name: "Australia" },
  ],
  priceRange: "$$",
  currenciesAccepted: "AUD",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phone,
    email: SITE.email,
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: ["English"],
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE.brandName,
  url: SITE_URL,
  description:
    "Digital agency in Canberra, Australia — websites, apps, SEO, and branding that perform.",
  inLanguage: "en-AU",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE.brandName,
  url: SITE_URL,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.suburb,
    addressRegion: "ACT",
    postalCode: SITE.address.postcode,
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -35.249,
    longitude: 149.137,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
};

export function GlobalStructuredData() {
  return (
    <>
      <JsonLdScript data={organizationSchema} />
      <JsonLdScript data={websiteSchema} />
      <JsonLdScript data={localBusinessSchema} />
    </>
  );
}

const SERVICE_NAMES = [
  "Custom Website Design",
  "E-Commerce Website",
  "Web Application Development",
  "Mobile App Development",
  "Search Engine Optimisation",
  "Google & Meta Ads Management",
  "Branding & Identity Design",
  "UI/UX Design",
  "CMS Integration & Setup",
  "Website Maintenance & Support",
];

export function ServicesStructuredData() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hyper Nest Digital Services",
    description: "Digital services offered by Hyper Nest to Australian businesses.",
    numberOfItems: SERVICE_NAMES.length,
    itemListElement: SERVICE_NAMES.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      url: `${SITE_URL}/services`,
    })),
  };

  return <JsonLdScript data={itemListSchema} />;
}

export function ContactStructuredData() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Hyper Nest",
    url: `${SITE_URL}/contact`,
    description: "Get in touch with Hyper Nest for a free discovery call.",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };

  return <JsonLdScript data={contactPageSchema} />;
}
