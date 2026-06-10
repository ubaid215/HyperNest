import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import AmbientEffects from "@/components/ui/AmbientEffects";

export const metadata: Metadata = {
  title: "Contact — Hyper Nest",
  description:
    "Get in touch with Hyper Nest. Book a free discovery call or send us a message about your next digital project.",
};

export default function ContactPage() {
  return (
    <>
      <AmbientEffects />
      <ContactContent />
    </>
  );
}
