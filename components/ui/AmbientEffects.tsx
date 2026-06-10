"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function AmbientEffects() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      className="cursor-glow pointer-events-none hidden md:block"
      style={{ x: springX, y: springY }}
    />
  );
}
