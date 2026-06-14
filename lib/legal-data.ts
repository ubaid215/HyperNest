export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPageData {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalPageData = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description:
    "How Hyper Nest collects, uses, and protects your personal information when you visit our website or engage our services.",
  lastUpdated: "10 June 2026",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      paragraphs: [
        "Hyper Nest Pty Ltd (\"Hyper Nest\", \"we\", \"us\", or \"our\") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit hypernest.com.au or otherwise interact with us.",
        "By using our website or submitting information through our contact forms, you agree to the practices described in this policy. If you do not agree, please discontinue use of our website.",
      ],
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      paragraphs: [
        "We may collect the following types of information depending on how you interact with us:",
      ],
      list: [
        "Contact details — name, email address, phone number, company name, and message content submitted via our contact form.",
        "Technical data — IP address, browser type, device information, referring URLs, and general usage data collected through cookies or similar technologies.",
        "Project-related information — business requirements, budgets, timelines, and other details you voluntarily provide during discovery or project engagement.",
        "Communications — records of correspondence when you email us or communicate through approved channels.",
      ],
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      paragraphs: [
        "We use personal information for legitimate business purposes, including:",
      ],
      list: [
        "Responding to enquiries and scheduling discovery calls.",
        "Preparing proposals, quotes, and project scopes.",
        "Delivering digital products and services you have engaged us to provide.",
        "Improving our website, user experience, and service offerings.",
        "Sending service-related updates where you have opted in or where permitted by law.",
        "Complying with legal obligations and protecting our rights.",
      ],
    },
    {
      id: "cookies",
      title: "4. Cookies & Analytics",
      paragraphs: [
        "Our website may use cookies and similar technologies to remember preferences, analyse traffic, and improve performance. You can control cookies through your browser settings. Disabling cookies may affect certain site features.",
        "If analytics tools (such as Google Analytics) are enabled, they may collect aggregated, non-identifying usage data. We configure such tools to minimise personal data collection where possible.",
      ],
    },
    {
      id: "third-parties",
      title: "5. Third-Party Services",
      paragraphs: [
        "We may share information with trusted third-party providers who assist us in operating our website, hosting infrastructure, email delivery, analytics, or project tooling. These providers are permitted to use your information only as necessary to perform services on our behalf and are expected to maintain appropriate security standards.",
        "We do not sell your personal information to third parties.",
      ],
    },
    {
      id: "security",
      title: "6. Data Storage & Security",
      paragraphs: [
        "We take reasonable technical and organisational measures to protect personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
        "We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.",
      ],
    },
    {
      id: "your-rights",
      title: "7. Your Rights",
      paragraphs: [
        "Depending on your location, you may have rights to access, correct, update, or delete personal information we hold about you, or to object to certain processing activities.",
        "Australian residents may contact us to request access to or correction of personal information under the Privacy Act 1988 (Cth). We will respond to legitimate requests within a reasonable timeframe.",
      ],
    },
    {
      id: "contact",
      title: "8. Contact Us",
      paragraphs: [
        "If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:",
        "Hyper Nest Pty Ltd · Email: office@hypernest.com.au · 2 / 74 Katherine Ave, Amaroo, ACT 2914, Australia",
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalPageData = {
  eyebrow: "Legal",
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of the Hyper Nest website and our digital product and marketing services.",
  lastUpdated: "10 June 2026",
  sections: [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      paragraphs: [
        "These Terms of Service (\"Terms\") constitute a binding agreement between you and Hyper Nest Pty Ltd (\"Hyper Nest\", \"we\", \"us\", or \"our\") regarding your access to our website and use of our services.",
        "By accessing hypernest.com.au, submitting an enquiry, or engaging us for a project, you confirm that you have read, understood, and agree to these Terms. If you are entering into an agreement on behalf of a company, you represent that you have authority to bind that organisation.",
      ],
    },
    {
      id: "services",
      title: "2. Services Description",
      paragraphs: [
        "Hyper Nest provides digital strategy, design, development, and marketing services including but not limited to website design, e-commerce builds, web applications, mobile apps, SEO, paid advertising management, branding, and ongoing support.",
        "Specific deliverables, timelines, fees, and scope are defined in a separate proposal, statement of work, or service agreement. Where a signed project agreement conflicts with these Terms, the signed agreement prevails for that project.",
      ],
    },
    {
      id: "client-responsibilities",
      title: "3. Client Responsibilities",
      paragraphs: [
        "To enable successful delivery, clients agree to:",
      ],
      list: [
        "Provide timely feedback, content, assets, and approvals within agreed review windows.",
        "Ensure supplied materials do not infringe third-party intellectual property rights.",
        "Designate a primary point of contact with authority to make project decisions.",
        "Provide accurate business information required for strategy, compliance, or technical implementation.",
        "Maintain confidentiality of any credentials, staging links, or internal documentation we share.",
      ],
    },
    {
      id: "intellectual-property",
      title: "4. Intellectual Property",
      paragraphs: [
        "Unless otherwise agreed in writing, upon full payment of applicable fees, clients receive ownership or a licence to use final deliverables created specifically for their project. Hyper Nest retains ownership of pre-existing tools, frameworks, methodologies, and general know-how used in delivery.",
        "We may display completed work in our portfolio, case studies, and marketing materials unless a confidentiality arrangement states otherwise. Clients may request removal of portfolio usage in writing.",
        "Third-party assets (fonts, stock imagery, plugins, licensed software) remain subject to their respective licence terms.",
      ],
    },
    {
      id: "payment",
      title: "5. Payment Terms",
      paragraphs: [
        "Fees are quoted in Australian Dollars (AUD) unless stated otherwise. Project fees are typically invoiced according to milestones defined in the proposal — commonly a deposit to commence work, progress payments at agreed stages, and a final payment before launch or handover.",
        "Invoices are due within fourteen (14) days unless a different term is specified. Late payments may incur suspension of work and reasonable recovery costs where permitted by law.",
        "Ongoing retainer or maintenance services are billed monthly in advance unless otherwise agreed.",
      ],
    },
    {
      id: "timelines",
      title: "6. Project Timelines & Revisions",
      paragraphs: [
        "Timelines provided are estimates based on scope, client responsiveness, and third-party dependencies. Delays caused by late feedback, scope changes, or unavailable content may extend delivery dates without penalty to Hyper Nest.",
        "Each project includes a defined number of revision rounds as specified in the proposal. Additional revisions or scope changes may be quoted separately.",
      ],
    },
    {
      id: "liability",
      title: "7. Limitation of Liability",
      paragraphs: [
        "To the maximum extent permitted by Australian law, Hyper Nest is not liable for indirect, incidental, special, or consequential damages arising from use of our website or services, including loss of profits, data, or business opportunities.",
        "Our total liability for any claim relating to a specific project is limited to the fees paid by the client for that project in the twelve (12) months preceding the claim, except where liability cannot be limited by law (including under the Australian Consumer Law).",
        "We do not guarantee specific business outcomes such as search rankings, conversion rates, or revenue growth, though we apply industry best practices in our work.",
      ],
    },
    {
      id: "termination",
      title: "8. Termination",
      paragraphs: [
        "Either party may terminate a project engagement in accordance with the signed agreement. If no separate agreement exists, either party may terminate on written notice if the other materially breaches these Terms and fails to remedy the breach within fourteen (14) days.",
        "Upon termination, the client is responsible for fees owing for work completed to date and any non-cancellable third-party costs incurred on their behalf.",
      ],
    },
    {
      id: "governing-law",
      title: "9. Governing Law",
      paragraphs: [
        "These Terms are governed by the laws of Australia. You agree to submit to the exclusive jurisdiction of the courts in the State of Victoria, Australia, for disputes arising from these Terms or use of our website, subject to any non-excludable rights you may have under applicable consumer protection legislation.",
      ],
    },
    {
      id: "contact",
      title: "10. Contact",
      paragraphs: [
        "For questions about these Terms, please contact:",
        "Hyper Nest Pty Ltd · Email: office@hypernest.com.au · 2 / 74 Katherine Ave, Amaroo, ACT 2914, Australia",
      ],
    },
  ],
};
