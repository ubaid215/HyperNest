"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  blurReveal?: boolean;
  /** Allow horizontal overflow (e.g. carousels) */
  allowOverflow?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
  blurReveal = false,
  allowOverflow = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section ${allowOverflow ? "section-overflow-visible" : ""} ${className}`.trim()}
      initial={{
        opacity: 0,
        y: 32,
        filter: blurReveal ? "blur(10px)" : "blur(0px)",
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 32, filter: blurReveal ? "blur(10px)" : "blur(0px)" }
      }
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
