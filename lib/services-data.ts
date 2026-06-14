import type { Service } from "./home-data";

export interface ServiceDetail extends Service {
  slug: string;
  tagline: string;
  overview: string;
  deliverables: string[];
  idealFor: string;
  approach: string;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    image: "/services/custom-website-design.jpg",
    imageAlt: "Custom website design project preview",
    title: "Custom Website Design",
    slug: "custom-website-design",
    tagline: "Bespoke websites engineered to convert",
    description:
      "We design websites that stop the scroll. Every pixel is crafted with purpose — clean, modern, and built to convert visitors into customers.",
    price: "Starting from AUD $2,500",
    overview:
      "Your website is often the first impression a potential customer has of your business. We build custom websites from the ground up — no templates, no shortcuts. Every layout, interaction, and content block is designed around your brand, your audience, and your conversion goals. From responsive design and accessibility compliance to CMS integration and performance optimisation, we deliver a site that looks exceptional and performs under pressure.",
    deliverables: [
      "Discovery workshop & competitive audit",
      "Wireframes and high-fidelity UI design",
      "Fully responsive, mobile-first build",
      "CMS setup with editor training",
      "On-page SEO foundations",
      "Performance & accessibility testing",
      "Launch support & 30-day post-launch care",
    ],
    idealFor:
      "Service businesses, professional firms, and growing brands that need a distinctive online presence — not another generic template.",
    approach:
      "We start with strategy, not screens. After understanding your goals and audience, we design in iterative sprints with your feedback at every milestone. You see real progress weekly, not a surprise reveal at the end.",
  },
  {
    image: "/services/ecommerce-website.jpg",
    imageAlt: "E-commerce website storefront preview",
    title: "E-Commerce Website",
    slug: "ecommerce-website",
    tagline: "Online stores built to sell",
    description:
      "Sell more with a store that works. We build powerful online stores on Shopify, WooCommerce, or fully custom stacks — optimised for conversions from day one.",
    price: "Starting from AUD $4,500",
    overview:
      "An e-commerce store is a revenue engine — and it needs to be treated that way. We design and develop online stores that guide customers smoothly from discovery to checkout, with optimised product pages, streamlined cart flows, and integrated payment gateways. Whether you are launching your first product line or migrating from a legacy platform, we build stores that scale with your catalogue and your ambitions.",
    deliverables: [
      "Platform recommendation & architecture planning",
      "Custom storefront design aligned to your brand",
      "Product catalogue & collection setup",
      "Payment gateway & shipping integration",
      "Abandoned cart & email automation hooks",
      "Analytics & conversion tracking setup",
      "Staff training & operations documentation",
    ],
    idealFor:
      "Retailers, DTC brands, wholesalers, and businesses ready to sell products or subscriptions online with a professional, conversion-focused experience.",
    approach:
      "We map your entire customer journey before writing a line of code — from how products are discovered to how orders are fulfilled. Every design decision is tested against one question: does this make it easier to buy?",
  },
  {
    image: "/services/web-application.jpg",
    imageAlt: "Web application dashboard interface",
    title: "Web Application Development",
    slug: "web-application-development",
    tagline: "Complex ideas, engineered to scale",
    description:
      "Got a complex idea? We engineer it. From internal tools to full SaaS platforms, we build web applications that are scalable, secure, and built for the long run.",
    price: "Starting from AUD $8,000",
    overview:
      "When off-the-shelf software does not fit, custom web applications do. We engineer robust platforms — internal dashboards, client portals, SaaS products, and workflow automation tools — using modern frameworks and cloud-native architecture. Security, scalability, and maintainability are baked in from day one, so your application grows with your business rather than holding it back.",
    deliverables: [
      "Technical discovery & system architecture",
      "UX research & interactive prototyping",
      "Full-stack development (frontend + API + database)",
      "Authentication, roles & permissions",
      "Third-party API integrations",
      "Automated testing & QA",
      "Deployment, monitoring & documentation",
    ],
    idealFor:
      "Startups building MVPs, enterprises replacing legacy systems, and teams that need bespoke tools to automate operations or deliver digital products to customers.",
    approach:
      "We work in agile sprints with clear milestones and demo sessions. You get working software early, feedback loops stay tight, and scope stays transparent throughout the build.",
  },
  {
    image: "/services/mobile-app.jpg",
    imageAlt: "Mobile app screens on device mockup",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    tagline: "Native-quality experiences on every device",
    description:
      "Your customers are on their phones. We build native and cross-platform apps for iOS and Android that deliver seamless, engaging experiences your users will love.",
    price: "Starting from AUD $10,000",
    overview:
      "Mobile is where your customers live — and a great app keeps them coming back. We design and develop iOS and Android applications with intuitive interfaces, smooth performance, and the backend infrastructure to support them. From consumer-facing apps to field-service tools and membership platforms, we handle the full stack so you launch with confidence.",
    deliverables: [
      "Platform strategy (native vs cross-platform)",
      "UI/UX design for iOS & Android guidelines",
      "Frontend development with offline capability",
      "Backend API & database architecture",
      "Push notifications & deep linking",
      "App Store & Google Play submission support",
      "Post-launch analytics & iteration roadmap",
    ],
    idealFor:
      "Businesses that need a dedicated mobile channel — whether to serve customers, empower field teams, or deliver a subscription-based digital product.",
    approach:
      "We prototype early and test on real devices throughout development. Performance, battery efficiency, and App Store compliance are non-negotiable checkpoints before every release.",
  },
  {
    image: "/services/seo.jpg",
    imageAlt: "Search engine optimisation analytics growth",
    title: "Search Engine Optimisation",
    slug: "search-engine-optimisation",
    tagline: "Rank higher, get found faster",
    description:
      "Rank higher. Get found faster. Our data-driven SEO strategies put your business in front of the right people at the right time — consistently.",
    price: "Starting from AUD $800/mo",
    overview:
      "Organic search is the highest-ROI channel for most businesses — but only when done strategically. We audit your technical foundation, research the keywords your customers actually search, and build content and link strategies that compound over time. No black-hat tricks, no vanity metrics. Just transparent reporting and steady growth in qualified traffic.",
    deliverables: [
      "Full technical SEO audit & remediation plan",
      "Keyword research & content gap analysis",
      "On-page optimisation across priority pages",
      "Content strategy & brief production",
      "Local SEO setup (Google Business Profile)",
      "Monthly performance reporting & recommendations",
      "Competitor tracking & opportunity alerts",
    ],
    idealFor:
      "Businesses investing in long-term inbound growth — especially service providers, e-commerce brands, and companies in competitive local or national markets.",
    approach:
      "SEO is a marathon, not a sprint. We set realistic 90-day milestones, report on leading indicators weekly, and adjust strategy based on what the data tells us — not guesswork.",
  },
  {
    image: "/services/paid-ads.jpg",
    imageAlt: "Google and Meta paid advertising campaign",
    title: "Google & Meta Ads Management",
    slug: "google-meta-ads",
    tagline: "Paid campaigns that deliver measurable ROI",
    description:
      "Stop wasting ad spend. We run laser-targeted paid campaigns that bring in qualified leads and measurable ROI — not just clicks.",
    price: "Starting from AUD $600/mo",
    overview:
      "Paid advertising should pay for itself — and then some. We manage Google Ads and Meta (Facebook & Instagram) campaigns with rigorous audience targeting, compelling ad creative, and conversion tracking that ties every dollar spent to real business outcomes. From lead generation to e-commerce retargeting, we optimise continuously so your cost per acquisition keeps improving.",
    deliverables: [
      "Account audit or fresh campaign architecture",
      "Audience research & segmentation",
      "Ad copy & creative direction",
      "Conversion tracking & pixel setup",
      "A/B testing & bid strategy optimisation",
      "Landing page recommendations",
      "Monthly ROI reporting with clear action items",
    ],
    idealFor:
      "Businesses ready to accelerate lead flow or sales with a managed ad budget — especially those who have tried DIY ads and want expert optimisation.",
    approach:
      "We start small, prove ROI, then scale. Every campaign has defined KPIs before a single dollar is spent, and we review performance weekly to cut waste and double down on what works.",
  },
  {
    image: "/services/branding.jpg",
    imageAlt: "Brand identity design system showcase",
    title: "Branding & Identity Design",
    slug: "branding-identity-design",
    tagline: "Memorable brands that command attention",
    description:
      "Your brand is your first impression. We craft bold, memorable identities that communicate who you are and why you are the only choice.",
    price: "Starting from AUD $1,800",
    overview:
      "A strong brand is more than a logo — it is the entire visual and verbal language your business speaks. We develop comprehensive brand identities including logo systems, colour palettes, typography, tone of voice, and brand guidelines that keep your team and partners aligned. Whether you are launching fresh or refreshing a tired identity, we create brands that stand out and stay consistent.",
    deliverables: [
      "Brand strategy workshop & positioning",
      "Logo design with primary & secondary marks",
      "Colour palette & typography system",
      "Brand guidelines document (PDF)",
      "Business card, letterhead & email signature templates",
      "Social media profile & cover assets",
      "Optional brand photography art direction",
    ],
    idealFor:
      "New businesses establishing their identity, rebranding companies entering new markets, and teams that need a cohesive visual system across web, print, and social.",
    approach:
      "We explore multiple creative directions before refining the winner. You are involved in every round of feedback, and the final deliverable is a system — not just a single file.",
  },
  {
    image: "/services/ui-ux-design.jpg",
    imageAlt: "UI and UX design wireframes and prototypes",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    tagline: "Interfaces that feel effortless",
    description:
      "Great design is invisible — it just works. We research, wireframe, and design interfaces that feel effortless for your users and powerful for your business.",
    price: "Starting from AUD $3,000",
    overview:
      "User experience is the difference between a product people love and one they abandon. We conduct user research, map journeys, wireframe flows, and design polished interfaces that reduce friction and increase engagement. Our design process produces developer-ready Figma files with component libraries, so handoff is seamless and builds stay on spec.",
    deliverables: [
      "User research & persona development",
      "Information architecture & user flows",
      "Low-fidelity wireframes",
      "High-fidelity UI design in Figma",
      "Interactive prototype for user testing",
      "Component library & design system",
      "Developer handoff with annotations",
    ],
    idealFor:
      "Teams building new digital products, redesigning existing apps or websites, or needing expert UX input before committing to development.",
    approach:
      "We validate assumptions with real users early. Wireframes come before pixels, and every screen is designed against a specific user task — not aesthetics alone.",
  },
  {
    image: "/services/cms-integration.jpg",
    imageAlt: "Content management system integration",
    title: "CMS Integration & Setup",
    slug: "cms-integration-setup",
    tagline: "Content control without the complexity",
    description:
      "Take control of your content. We integrate easy-to-use CMS platforms so your team can update pages, blogs, and media without touching a single line of code.",
    price: "Starting from AUD $1,200",
    overview:
      "You should not need a developer every time you publish a blog post or update a team page. We integrate and configure content management systems — WordPress, Sanity, Contentful, Strapi, or headless setups — tailored to your team's technical comfort level. Custom content types, media libraries, and editorial workflows are set up so your team can manage content independently from day one.",
    deliverables: [
      "CMS platform recommendation",
      "Content model & field architecture",
      "Template & component integration",
      "Media library & asset management setup",
      "Editorial workflow configuration",
      "Team training session (live + recorded)",
      "Migration of existing content (if applicable)",
    ],
    idealFor:
      "Marketing teams, content-heavy businesses, and organisations that need non-technical staff to manage website content confidently and frequently.",
    approach:
      "We design the CMS around how your team actually works — not how the platform defaults. Training is hands-on, and we stay available for the first month of independent editing.",
  },
  {
    image: "/services/maintenance-support.jpg",
    imageAlt: "Website maintenance and ongoing support",
    title: "Website Maintenance & Support",
    slug: "website-maintenance-support",
    tagline: "Peace of mind after launch",
    description:
      "We stay in your corner long after launch. Fast support, regular updates, security monitoring — so you never have to worry about your website again.",
    price: "Starting from AUD $250/mo",
    overview:
      "A website is a living asset — it needs updates, security patches, and occasional fixes. Our maintenance plans keep your site fast, secure, and up to date without you lifting a finger. From plugin updates and uptime monitoring to priority support tickets and monthly performance reports, we handle the technical overhead so you can focus on your business.",
    deliverables: [
      "Monthly platform & plugin updates",
      "Security monitoring & malware scanning",
      "Daily automated backups with restore capability",
      "Uptime monitoring with instant alerts",
      "Priority email support (24-hour response)",
      "Monthly performance & health report",
      "Minor content updates included (up to 2 hrs/mo)",
    ],
    idealFor:
      "Business owners and marketing teams who want reliable, proactive website care without hiring in-house technical staff.",
    approach:
      "We treat your site like our own. Updates happen on a schedule, issues are caught before they become outages, and you get a human response — not a ticket queue — when something needs attention.",
  },
];

/** First five services shown on the homepage parallax showcase */
export const HOME_SERVICES = SERVICE_DETAILS.slice(0, 5);

/** All services for listings */
export const ALL_SERVICES = SERVICE_DETAILS;
