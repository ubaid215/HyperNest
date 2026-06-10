export interface Service {
  /** Path under /public — e.g. /services/custom-website-design.jpg */
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  price: string;
}

export interface WhyUsItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
}

// Add images to public/services/ using the filenames below.
export const SERVICES: Service[] = [
  {
    image: "/services/custom-website-design.jpg",
    imageAlt: "Custom website design project preview",
    title: "Custom Website Design",
    description:
      "We design websites that stop the scroll. Every pixel is crafted with purpose — clean, modern, and built to convert visitors into customers.",
    price: "Starting from AUD $2,500",
  },
  {
    image: "/services/ecommerce-website.jpg",
    imageAlt: "E-commerce website storefront preview",
    title: "E-Commerce Website",
    description:
      "Sell more with a store that works. We build powerful online stores on Shopify, WooCommerce, or fully custom stacks — optimised for conversions from day one.",
    price: "Starting from AUD $4,500",
  },
  {
    image: "/services/web-application.jpg",
    imageAlt: "Web application dashboard interface",
    title: "Web Application Development",
    description:
      "Got a complex idea? We engineer it. From internal tools to full SaaS platforms, we build web applications that are scalable, secure, and built for the long run.",
    price: "Starting from AUD $8,000",
  },
  {
    image: "/services/mobile-app.jpg",
    imageAlt: "Mobile app screens on device mockup",
    title: "Mobile App Development",
    description:
      "Your customers are on their phones. We build native and cross-platform apps for iOS and Android that deliver seamless, engaging experiences your users will love.",
    price: "Starting from AUD $10,000",
  },
  {
    image: "/services/seo.jpg",
    imageAlt: "Search engine optimisation analytics growth",
    title: "Search Engine Optimisation",
    description:
      "Rank higher. Get found faster. Our data-driven SEO strategies put your business in front of the right people at the right time — consistently.",
    price: "Starting from AUD $800/mo",
  },
  {
    image: "/services/paid-ads.jpg",
    imageAlt: "Google and Meta paid advertising campaign",
    title: "Google & Meta Ads Management",
    description:
      "Stop wasting ad spend. We run laser-targeted paid campaigns that bring in qualified leads and measurable ROI — not just clicks.",
    price: "Starting from AUD $600/mo",
  },
  {
    image: "/services/branding.jpg",
    imageAlt: "Brand identity design system showcase",
    title: "Branding & Identity Design",
    description:
      "Your brand is your first impression. We craft bold, memorable identities that communicate who you are and why you are the only choice.",
    price: "Starting from AUD $1,800",
  },
  {
    image: "/services/ui-ux-design.jpg",
    imageAlt: "UI and UX design wireframes and prototypes",
    title: "UI/UX Design",
    description:
      "Great design is invisible — it just works. We research, wireframe, and design interfaces that feel effortless for your users and powerful for your business.",
    price: "Starting from AUD $3,000",
  },
  {
    image: "/services/cms-integration.jpg",
    imageAlt: "Content management system integration",
    title: "CMS Integration & Setup",
    description:
      "Take control of your content. We integrate easy-to-use CMS platforms so your team can update pages, blogs, and media without touching a single line of code.",
    price: "Starting from AUD $1,200",
  },
  {
    image: "/services/maintenance-support.jpg",
    imageAlt: "Website maintenance and ongoing support",
    title: "Website Maintenance & Support",
    description:
      "We stay in your corner long after launch. Fast support, regular updates, security monitoring — so you never have to worry about your website again.",
    price: "Starting from AUD $250/mo",
  },
];

export const WHY_US: WhyUsItem[] = [
  {
    title: "Strategy Before Screens",
    description:
      "Great digital experiences start with business clarity, not design trends. Before a single wireframe is created, we dive deep into your goals, audience, market position, and growth objectives to ensure every decision serves a measurable purpose.",
  },
  {
    title: "Transparent Process, Predictable Investment",
    description:
      "No hidden costs. No unexpected scope changes. From day one, you'll receive clear deliverables, defined timelines, and transparent pricing so you always know exactly where your project stands and what you're investing in.",
  },
  {
    title: "Reliable Delivery Without Compromise",
    description:
      "Deadlines matter. Our streamlined workflow, structured milestones, and proactive communication ensure projects move forward efficiently and launch on schedule—while maintaining the highest standards of design and development quality.",
  },
  {
    title: "Engineered for Growth",
    description:
      "Every website we build is designed to do more than look impressive. From lightning-fast performance and technical SEO to conversion-focused user experiences, every element is crafted to attract, engage, and convert your ideal customers.",
  },
  {
    title: "Senior-Level Expertise, Every Step",
    description:
      "You work directly with experienced strategists, designers, and developers who understand what it takes to build modern digital products. No unnecessary layers, no handoffs—just focused expertise dedicated to your success.",
  },
  {
    title: "Long-Term Partnership, Not Just a Project",
    description:
      "We believe exceptional results come from lasting relationships. Beyond launch day, we remain a trusted digital partner, helping you refine, optimize, and scale your online presence as your business evolves.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We learn your business, your goals, and your audience inside out before writing a single line of code or design.",
  },
  {
    step: "02",
    title: "Strategy & Planning",
    description:
      "We map out the full project — sitemap, tech stack, timeline, and deliverables — so there are zero surprises along the way.",
  },
  {
    step: "03",
    title: "Design & Build",
    description:
      "Our designers and developers work in sync to bring your project to life with precision and creativity.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description:
      "We don't disappear after launch. We monitor, optimise, and support your digital product as your business grows.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Hyper Nest completely transformed our online presence. Our website enquiries doubled within 60 days of launch.",
    name: "Sarah M.",
    role: "Retail Business Owner",
    location: "Melbourne",
    initials: "SM",
  },
  {
    quote:
      "Professional, fast, and genuinely invested in our success. The team at Hyper Nest feels like an extension of our own.",
    name: "James T.",
    role: "SaaS Founder",
    location: "Sydney",
    initials: "JT",
  },
  {
    quote:
      "Our mobile app was delivered on time and on budget. The quality exceeded everything we expected.",
    name: "Priya K.",
    role: "Startup Co-Founder",
    location: "Brisbane",
    initials: "PK",
  },
];

