"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import SideRays from "@/components/ui/SideRays";
import GridBackgroundDemo from "@/components/ui/grid-background-demo";
import FogReveal from "@/components/ui/FogReveal";
import { getMotionProfile } from "@/lib/motion-prefs";

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
  const [showRays, setShowRays] = useState(false);
  const [raysLite, setRaysLite] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const ticker = [...SERVICES, ...SERVICES];

  useLayoutEffect(() => {
    const section = ref.current;
    const badge = badgeRef.current;
    const ctas = ctaRef.current;
    if (!section || !badge || !ctas) return;

    const { reduced, lite, useWebGL } = getMotionProfile();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (reduced) {
        gsap.set([badge, ...ctas.children], { opacity: 1, y: 0, clearProps: "filter" });
        const words = section.querySelectorAll("[data-fog-word]");
        if (words.length) gsap.set(words, { opacity: 1, y: 0, clearProps: "filter" });
        return;
      }

      const badgeBlur = lite ? "blur(0px)" : "blur(10px)";
      const wordBlur = lite ? "blur(0px)" : "blur(14px)";
      const subBlur = lite ? "blur(0px)" : "blur(12px)";
      const ctaBlur = lite ? "blur(0px)" : "blur(8px)";

      tl.fromTo(
        badge,
        { opacity: 0, filter: badgeBlur, y: lite ? 8 : 12 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: lite ? 0.45 : 0.7 },
      );

      const headlineWords = section.querySelectorAll("[data-hero-headline] [data-fog-word]");
      if (headlineWords.length) {
        tl.fromTo(
          headlineWords,
          { opacity: 0, filter: wordBlur, y: lite ? 10 : 14 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: lite ? 0.55 : 0.85,
            stagger: lite ? 0.04 : 0.07,
          },
          lite ? "-=0.2" : "-=0.15",
        );
      }

      const subWords = section.querySelectorAll("[data-hero-sub] [data-fog-word]");
      if (subWords.length) {
        tl.fromTo(
          subWords,
          { opacity: 0, filter: subBlur, y: lite ? 8 : 10 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: lite ? 0.5 : 0.75,
            stagger: lite ? 0.02 : 0.035,
          },
          lite ? "-=0.3" : "-=0.35",
        );
      }

      tl.fromTo(
        ctas.children,
        { opacity: 0, filter: ctaBlur, y: lite ? 10 : 14 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: lite ? 0.45 : 0.65,
          stagger: lite ? 0.08 : 0.12,
        },
        lite ? "-=0.15" : "-=0.2",
      );
    }, ref);

    let rayIdleId: number | undefined;
    let rayTimeoutId: ReturnType<typeof setTimeout> | undefined;

    if (useWebGL) {
      const enableRays = () => {
        setRaysLite(lite);
        setShowRays(true);
      };
      if ("requestIdleCallback" in window) {
        rayIdleId = window.requestIdleCallback(enableRays, { timeout: 800 });
      } else {
        rayTimeoutId = setTimeout(enableRays, 400);
      }
    }

    return () => {
      ctx.revert();
      if (rayIdleId !== undefined) window.cancelIdleCallback(rayIdleId);
      if (rayTimeoutId !== undefined) clearTimeout(rayTimeoutId);
    };
  }, []);

  return (
    <section ref={ref} className="hero bg-mesh hero-centered" style={{ overflow: "hidden" }}>
      <div className="hero-bg-gradient" />
      <GridBackgroundDemo />

      {showRays && (
        <div className="absolute inset-0 z-[1]" aria-hidden="true">
          <div className="absolute inset-0">
            <SideRays
              speed={1.2}
              rayColor1="#0e4d8a"
              rayColor2="#7ab8f5"
              intensity={raysLite ? 1.2 : 1.6}
              spread={2.0}
              origin="top-left"
              tilt={6}
              saturation={1.1}
              blend={0.6}
              falloff={1.9}
              opacity={raysLite ? 0.45 : 0.65}
            />
          </div>
          {!raysLite && (
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
          )}
        </div>
      )}

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
          <FogReveal text={HEADLINE} animate={false} />
        </h1>

        <div data-hero-sub className="hero-subheadline body-lg text-muted mx-auto">
          <FogReveal
            text={SUBHEADLINE}
            as="p"
            className="body-lg text-muted"
            animate={false}
          />
        </div>

        <div ref={ctaRef} className="hero-ctas hero-ctas-entrance flex flex-wrap justify-center gap-4">
          <MagneticButton href="/contact" featured>
            Start Your Project
          </MagneticButton>
          <MagneticButton href="/services" className="btn btn-outline" featured>
            Explore Our Services
          </MagneticButton>
        </div>
      </motion.div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {ticker.map((service, i) => (
            <span key={i} className="hero-ticker-item">
              {service}
              <span className="hero-ticker-dot" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
