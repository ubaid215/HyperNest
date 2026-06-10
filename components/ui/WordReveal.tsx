"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  playOnMount?: boolean;
}

export default function WordReveal({
  text,
  className = "",
  playOnMount = false,
}: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldPlay = playOnMount || isInView;
  const words = text.split(" ");

  return (
    <p ref={ref} className={className || "body-lg"} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.32em", marginBottom: "0.04em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={shouldPlay ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              delay: (playOnMount ? 0.35 : 0) + i * 0.028,
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
