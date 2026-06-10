import type { Metadata } from "next";
import AmbientEffects from "@/components/ui/AmbientEffects";
import LegalPageContent from "@/components/legal/LegalPageContent";
import { TERMS_OF_SERVICE } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Terms of Service — Hyper Nest",
  description:
    "Terms and conditions for using the Hyper Nest website and engaging our digital services.",
};

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
