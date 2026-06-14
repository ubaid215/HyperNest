import type { Metadata } from "next";
import AmbientEffects from "@/components/ui/AmbientEffects";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import { ServicesStructuredData } from "@/components/seo/StructuredData";
import { PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = PAGE_SEO.services;

export default function ServicesPage() {
  return (
    <>
      <ServicesStructuredData />
      <AmbientEffects />
      <ServicesPageContent />
    </>
  );
}
