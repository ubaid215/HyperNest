import type { Metadata } from "next";
import AmbientEffects from "@/components/ui/AmbientEffects";
import LegalPageContent from "@/components/legal/LegalPageContent";
import { PRIVACY_POLICY } from "@/lib/legal-data";
import { PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = PAGE_SEO.privacy;

export default function PrivacyPage() {
  return (
    <>
      <AmbientEffects />
      <LegalPageContent
        data={PRIVACY_POLICY}
        sibling={{ label: "Terms of Service", href: "/terms" }}
      />
    </>
  );
}
