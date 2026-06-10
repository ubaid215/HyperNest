"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`section-heading ${align === "center" ? "section-heading-center" : "section-heading-left"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && <span className="label-tag">{label}</span>}
      <h2 className="display-md text-balance">{title}</h2>
      {subtitle && <p className="body-lg section-heading-sub text-balance">{subtitle}</p>}
    </motion.div>
  );
}
