"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  label: string;
  display?: string;
}

export default function CountUp({ value, suffix = "", label, display }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView || display) return;
    const controls = animate(count, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [isInView, value, count, display]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 py-2">
      <div className="stat-number">
        {display ? (
          <span>{display}</span>
        ) : (
          <>
            <motion.span>{rounded}</motion.span>
            {suffix}
          </>
        )}
      </div>
      <p className="stat-label text-pretty">{label}</p>
    </div>
  );
}
