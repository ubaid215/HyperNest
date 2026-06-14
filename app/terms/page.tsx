import type { Metadata } from "next";
import AmbientEffects from "@/components/ui/AmbientEffects";
import LegalPageContent from "@/components/legal/LegalPageContent";
import { TERMS_OF_SERVICE } from "@/lib/legal-data";
import { PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = PAGE_SEO.terms;

export default function TermsPage() {
  return (
    <>
      <AmbientEffects />
      <LegalPageContent
        data={TERMS_OF_SERVICE}
        sibling={{ label: "Privacy Policy", href: "/privacy" }}
      />
    </>
  );
}
