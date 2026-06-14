/** Shared motion / performance profile for GSAP, Lenis, and UI animations */

export interface MotionProfile {
  reduced: boolean;
  lite: boolean;
  /** ScrollTrigger scrub smoothing (seconds). false = instant */
  scrub: number | false;
  /** Use blur in entrance animations */
  useBlur: boolean;
  /** Cap continuous WebGL / heavy effects */
  useWebGL: boolean;
  /** GSAP lagSmoothing threshold ms (~30fps) */
  lagSmoothingMs: number;
}

function isLiteDevice(): boolean {
  if (typeof window === "undefined") return false;

  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData === true;

  return mobile || lowCores || saveData;
}

export function getMotionProfile(): MotionProfile {
  if (typeof window === "undefined") {
    return {
      reduced: false,
      lite: false,
      scrub: 0.6,
      useBlur: true,
      useWebGL: true,
      lagSmoothingMs: 33,
    };
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lite = isLiteDevice();

  if (reduced) {
    return {
      reduced: true,
      lite: true,
      scrub: false,
      useBlur: false,
      useWebGL: false,
      lagSmoothingMs: 0,
    };
  }

  const mobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  return {
    reduced: false,
    lite,
    scrub: mobile ? 0.28 : lite ? 0.45 : 0.55,
    useBlur: !lite,
    useWebGL: !lite,
    lagSmoothingMs: mobile ? 50 : 33,
  };
}

/** Standard ScrollTrigger options derived from motion profile */
export function getScrollTriggerScrub(profile: MotionProfile): number | boolean {
  if (profile.scrub === false) return false;
  return profile.scrub;
}
