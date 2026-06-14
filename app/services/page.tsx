import type { Metadata } from "next";
import AmbientEffects from "@/components/ui/AmbientEffects";
import ServicesPageContent from "@/components/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services — Hyper Nest",
  description:
    "Explore Hyper Nest's full range of digital services — custom websites, e-commerce, web apps, mobile apps, SEO, paid ads, branding, UI/UX, CMS, and ongoing support.",
};

export default function ServicesPage() {
  return (
    <>
      <AmbientEffects />
      <ServicesPageContent />
    </>
  );
}
