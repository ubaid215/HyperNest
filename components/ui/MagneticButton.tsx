"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  featured?: boolean;
}

export default function MagneticButton({
  href,
  className = "btn btn-primary",
  children,
  onClick,
  featured = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ display: "inline-block", x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        className={`${className}${featured ? " btn-featured" : ""}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.span>
  );
}
