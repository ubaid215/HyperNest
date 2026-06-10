import type { Metadata } from "next";
import AmbientEffects from "@/components/ui/AmbientEffects";
import LegalPageContent from "@/components/legal/LegalPageContent";
import { PRIVACY_POLICY } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Privacy Policy — Hyper Nest",
  description:
    "Learn how Hyper Nest collects, uses, and protects your personal information.",
};

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
