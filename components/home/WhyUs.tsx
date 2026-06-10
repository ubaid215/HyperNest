"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_US } from "@/lib/home-data";

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const item = WHY_US[active];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;

    const activeBtn = navRef.current?.querySelector<HTMLButtonElement>(
      ".why-us-nav-item.is-active",
    );
    activeBtn?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(index);
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => (i + 1) % WHY_US.length);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i - 1 + WHY_US.length) % WHY_US.length);
      }
    },
    [],
  );

  return (
    <AnimatedSection className="section-alt why-us-section">
      <div className="container">
        <SectionHeading
          label="Why Choose Hyper Nest"
          title="Why Australian Businesses Trust Hyper Nest"
        />

        <div className="why-us-shell">
          <nav ref={navRef} className="why-us-nav" aria-label="Why choose us">
            {WHY_US.map((entry, i) => {
              const isActive = i === active;
              return (
                <button
                  key={entry.title}
                  type="button"
                  className={`why-us-nav-item${isActive ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e: PointerEvent<HTMLButtonElement>) => {
                    if (e.pointerType === "mouse") setActive(i);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  aria-pressed={isActive}
                >
                  <span className="why-us-nav-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="why-us-nav-title">{entry.title}</span>
                  <span className="why-us-nav-bar" aria-hidden="true" />
                </button>
              );
            })}
          </nav>

          <div className="why-us-panel">
            <div className="why-us-panel-glow" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.article
                key={active}
                className="why-us-panel-inner"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="why-us-panel-index">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <h3 className="why-us-panel-title">{item.title}</h3>
                <p className="why-us-panel-desc">{item.description}</p>
              </motion.article>
            </AnimatePresence>

            <div className="why-us-progress" aria-hidden="true">
              {WHY_US.map((_, i) => (
                <span
                  key={i}
                  className={`why-us-progress-dot${i === active ? " is-active" : ""}${i < active ? " is-past" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
