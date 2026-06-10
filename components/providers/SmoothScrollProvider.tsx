"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { configureGsap } from "@/lib/gsap-setup";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Configures GSAP ScrollTrigger and refreshes on load/fonts.
 * Uses native browser scroll (Lenis removed — it was breaking layout/scroll).
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    configureGsap();

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh).catch(() => {});

    // Refresh after pinned sections initialise (useLayoutEffect in children)
    const t1 = requestAnimationFrame(refresh);
    const t2 = window.setTimeout(refresh, 100);
    const t3 = window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("load", refresh);
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return children;
}
