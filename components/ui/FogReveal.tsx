"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FogRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  timeline?: gsap.core.Timeline;
  position?: string | number;
  /** When false, only renders word spans for an external GSAP timeline */
  animate?: boolean;
  /** Lighter entrance — opacity + y only (no blur filter) */
  lite?: boolean;
}

export default function FogReveal({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.06,
  timeline,
  position = 0,
  animate = true,
  lite = false,
}: FogRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (!animate) return;

    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-fog-word]");
    if (!targets.length) return;

    const from = lite
      ? { opacity: 0, y: 10 }
      : { opacity: 0, filter: "blur(14px)", y: 14 };
    const to = lite
      ? { opacity: 1, y: 0, duration: 0.65, stagger, ease: "power2.out" }
      : {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.85,
          stagger,
          ease: "power2.out",
        };

    if (timeline) {
      timeline.fromTo(targets, from, to, position);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, from, to);
    }, el);

    return () => ctx.revert();
  }, [text, stagger, timeline, position, animate, lite]);

  const hiddenStyle = lite
    ? { opacity: 0 }
    : { opacity: 0, filter: "blur(14px)" };

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-fog-word
          className="inline-block will-change-[transform,opacity,filter]"
          style={{
            marginRight: "0.28em",
            marginBottom: "0.06em",
            ...(animate ? {} : hiddenStyle),
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
