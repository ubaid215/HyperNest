import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMotionProfile } from "@/lib/motion-prefs";

let configured = false;

/** One-time GSAP / ScrollTrigger tuning for scroll performance */
export function configureGsap(): void {
  if (configured || typeof window === "undefined") return;
  configured = true;

  gsap.registerPlugin(ScrollTrigger);

  const profile = getMotionProfile();

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  if (profile.reduced) {
    gsap.ticker.lagSmoothing(0);
    return;
  }

  // Allow frame drops down to ~30fps without compounding lag
  gsap.ticker.lagSmoothing(500, profile.lagSmoothingMs);
}
