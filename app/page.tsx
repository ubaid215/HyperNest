import type { Metadata } from "next";
import AmbientEffects from "@/components/ui/AmbientEffects";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import WhyUs from "@/components/home/WhyUs";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";
import { PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = PAGE_SEO.home;

export default function Home() {
  return (
    <>
      <AmbientEffects />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <CtaSection />
    </>
  );
}
