"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitParagraphsIntoLines } from "@/lib/split-text-lines";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_PARAGRAPHS = [
  "Hyper Nest exists to help ambitious businesses turn their digital presence into a measurable growth asset. We combine strategy, design, development, and automation to create experiences that not only look exceptional but also drive engagement, generate leads, and increase conversions. Every project is built with performance, scalability, and user experience at its core, ensuring that brands can compete confidently in an increasingly digital world.",
  "From startups launching their first product to established companies ready to accelerate growth, we partner closely with our clients to solve complex challenges, uncover new opportunities, and build solutions that deliver lasting impact. Our approach blends creative thinking with technical precision, resulting in websites, applications, and digital systems that are fast, intuitive, and purpose-driven. We believe great digital products should do more than exist online—they should attract attention, build trust, and create momentum for sustainable business growth.",
];

const LINE_DURATION = 1;
const LINE_STAGGER = 0.92;

function getScrollDistance(lineCount: number) {
  const viewport = window.innerHeight;
  const mobile = window.innerWidth < 768;
  const base = mobile ? viewport * 1.4 : viewport * 1.75;
  const perLine = mobile ? viewport * 0.14 : viewport * 0.16;
  return base + lineCount * perLine;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const textContainer = textRef.current;
    if (!section || !pin || !textContainer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let rafId = 0;
    let cancelled = false;
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx?.revert();

      const width = textContainer.clientWidth;
      if (!width) return false;

      const lines = splitParagraphsIntoLines(textContainer, ABOUT_PARAGRAPHS);
      if (!lines.length) return false;

      if (prefersReducedMotion) {
        lines.forEach((line) => line.style.setProperty("--reveal", "100"));
        return true;
      }

      const scrollDistance = getScrollDistance(lines.length);

      ctx = gsap.context(() => {
        lines.forEach((line) => line.style.setProperty("--reveal", "0"));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pin,
            scrub: true,
            start: "top top",
            end: `+=${scrollDistance}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        lines.forEach((line, index) => {
          tl.to(
            line,
            {
              "--reveal": 100,
              ease: "none",
              duration: LINE_DURATION,
            },
            index * LINE_STAGGER,
          );
        });
      }, section);

      return true;
    };

    const init = () => {
      if (cancelled) return;

      if (!setup()) {
        rafId = requestAnimationFrame(init);
        return;
      }

      ScrollTrigger.refresh();
    };

    init();

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (setup()) {
          ScrollTrigger.refresh();
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-story section-alt"
      aria-labelledby="about-story-label"
    >
      <div ref={pinRef} className="about-story-pin">
        <div className="about-story-stage container">
          <p id="about-story-label" className="label-tag about-story-label">
            About Hyper Nest
          </p>

          {/* Lines are injected by splitParagraphsIntoLines — keep empty so React does not overwrite them */}
          <div
            ref={textRef}
            className="about-story-text"
            role="article"
            aria-label={ABOUT_PARAGRAPHS.join(" ")}
          />
        </div>
      </div>
    </section>
  );
}
