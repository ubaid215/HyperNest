import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import AmbientEffects from "@/components/ui/AmbientEffects";
import { ContactStructuredData } from "@/components/seo/StructuredData";
import { PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = PAGE_SEO.contact;

export default function ContactPage() {
  return (
    <>
      <ContactStructuredData />
      <AmbientEffects />
      <ContactContent />
    </>
  );
}
