"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/home-data";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <AnimatedSection id="process" className="process-section">
      <div className="container" ref={sectionRef}>
        <SectionHeading label="Our Process" title="How We Work" />

        <div className="process-track" role="list">
          <div className="process-line" aria-hidden="true">
            <motion.span
              className="process-line-fill"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {PROCESS_STEPS.map((step, i) => {
            const isActive = i === active;
            const isPast = i < active;

            return (
              <motion.article
                key={step.step}
                role="listitem"
                className={`process-step${isActive ? " is-active" : ""}${isPast ? " is-past" : ""}`}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.12 + i * 0.1,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
              >
                <div className="process-node-wrap">
                  <span className="process-node-ring" aria-hidden="true" />
                  <span className="process-node">
                    <span className="process-node-num">{step.step}</span>
                  </span>
                </div>

                <div className="process-step-body">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
