"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import SideRays from "@/components/ui/SideRays";
import GridBackgroundDemo from "@/components/ui/grid-background-demo";
import FogReveal from "@/components/ui/FogReveal";

const SERVICES = [
  "Web Design",
  "Mobile Apps",
  "SEO & Growth",
  "Brand Identity",
  "UI / UX",
  "E-Commerce",
  "Performance Marketing",
  "Conversion Optimisation",
];

const HEADLINE = "Where Strategy, Design & Technology Converge";
const SUBHEADLINE =
  "Hyper Nest partners with forward-thinking businesses to create digital products that drive revenue, strengthen brands, and accelerate growth.";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const ticker = [...SERVICES, ...SERVICES];

  useEffect(() => {
    const badge = badgeRef.current;
    const ctas = ctaRef.current;
    if (!badge || !ctas) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        badge,
        { opacity: 0, filter: "blur(10px)", y: 12 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.7 },
      );

      const headlineWords = ref.current?.querySelectorAll("[data-hero-headline] [data-fog-word]");
      if (headlineWords?.length) {
        tl.fromTo(
          headlineWords,
          { opacity: 0, filter: "blur(14px)", y: 14 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.85, stagger: 0.07 },
          "-=0.15",
        );
      }

      const subWords = ref.current?.querySelectorAll("[data-hero-sub] [data-fog-word]");
      if (subWords?.length) {
        tl.fromTo(
          subWords,
          { opacity: 0, filter: "blur(12px)", y: 10 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.75, stagger: 0.035 },
          "-=0.35",
        );
      }

      tl.fromTo(
        ctas.children,
        { opacity: 0, filter: "blur(8px)", y: 14 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.65, stagger: 0.12 },
        "-=0.2",
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hero bg-mesh hero-centered" style={{ overflow: "hidden" }}>
      <div className="hero-bg-gradient" />
      <GridBackgroundDemo />

      <div className="absolute inset-0 z-[1]" aria-hidden="true">
        <div className="absolute inset-0">
          <SideRays
            speed={1.2}
            rayColor1="#0e4d8a"
            rayColor2="#7ab8f5"
            intensity={1.6}
            spread={2.0}
            origin="top-left"
            tilt={6}
            saturation={1.1}
            blend={0.6}
            falloff={1.9}
            opacity={0.65}
          />
        </div>
        <div className="absolute inset-0">
          <SideRays
            speed={1.2}
            rayColor1="#0e4d8a"
            rayColor2="#7ab8f5"
            intensity={1.6}
            spread={2.0}
            origin="top-right"
            tilt={-6}
            saturation={1.1}
            blend={0.6}
            falloff={1.9}
            opacity={0.65}
          />
        </div>
      </div>

      <motion.div
        className="container relative z-10 flex flex-col items-center text-center"
        style={{ opacity, y }}
      >
        <div ref={badgeRef} className="mb-8 opacity-0">
          <span className="badge badge-primary">
            <span className="badge-dot" />
            Australian Digital Agency
          </span>
        </div>

        <h1
          data-hero-headline
          className="hero-headline display-lg text-balance mx-auto"
        >
          <span className="hero-headline-desktop">
            <FogReveal text={HEADLINE} animate={false} />
          </span>
          <span className="hero-headline-mobile">
            <span className="hero-headline-line">
              <FogReveal text="Where Strategy," animate={false} />
            </span>
            <span className="hero-headline-line">
              <FogReveal text="Design & Technology" animate={false} />
            </span>
            <span className="hero-headline-line">
              <FogReveal text="Converge" animate={false} />
            </span>
          </span>
        </h1>

        <div data-hero-sub className="hero-subheadline body-lg text-muted mx-auto">
          <FogReveal text={SUBHEADLINE} as="p" className="body-lg text-muted" animate={false} />
        </div>

        <div ref={ctaRef} className="hero-ctas flex flex-wrap justify-center gap-4">
          <MagneticButton href="/contact" featured>
            Start Your Project
          </MagneticButton>
          <MagneticButton href="/#services" className="btn btn-outline" featured>
            Explore Our Services
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          borderTop: "1px solid rgba(20, 20, 32, 0.08)",
          background: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          overflow: "hidden",
          padding: "0.7rem 0",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            gap: "0 3rem",
            width: "max-content",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {ticker.map((service, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-ink-muted)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "3rem",
              }}
            >
              {service}
              <span style={{ color: "var(--color-primary)", fontSize: "0.5rem", opacity: 0.5 }}>
                ◆
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
