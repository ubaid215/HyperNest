"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MagneticButton from "@/components/ui/MagneticButton";
import {
  MOTION_EASE,
  fadeUp,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
} from "@/lib/motion-variants";

const CTA_BENEFITS = [
  "Free 30-minute discovery call — no obligation",
  "Clear scope, timeline, and pricing before we start",
  "Senior strategists, designers, and developers on every project",
];

const copyContainer = staggerContainer(0.09);
const benefitsContainer = staggerContainer(0.1, 0.25);
const actionsContainer = staggerContainer(0.12, 0.2);
const metricsContainer = staggerContainer(0.1, 0.35);

const benefitItem = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: MOTION_EASE },
  },
};

const metricItem = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: MOTION_EASE },
  },
};

export default function CtaSection() {
  return (
    <AnimatedSection className="cta-lumos-section" blurReveal>
      <div className="container">
        <motion.div
          className="cta-lumos-shell"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="cta-lumos-grid">
            <motion.div
              className="cta-lumos-copy"
              variants={copyContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.span className="label-tag" variants={slideFromLeft}>
                Start Your Project
              </motion.span>
              <motion.h2 className="cta-lumos-title" variants={slideFromLeft}>
                Turn Your Digital Vision Into Measurable Growth
              </motion.h2>
              <motion.p className="cta-lumos-desc" variants={fadeUp}>
                Whether you&apos;re launching a new product or scaling an established brand,
                Hyper Nest partners with ambitious Australian businesses to design, build, and
                optimise digital experiences that attract customers and drive real revenue.
              </motion.p>

              <motion.ul
                className="cta-lumos-benefits"
                variants={benefitsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {CTA_BENEFITS.map((benefit) => (
                  <motion.li key={benefit} className="cta-lumos-benefit" variants={benefitItem}>
                    <motion.span
                      className="cta-lumos-benefit-icon"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 420, damping: 18 }}
                      aria-hidden="true"
                    >
                      <Check size={14} strokeWidth={2.5} />
                    </motion.span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="cta-lumos-actions"
              variants={actionsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div className="cta-lumos-buttons" variants={slideFromRight}>
                <MagneticButton
                  href="/contact"
                  className="btn btn-primary btn-lg cta-lumos-btn-primary"
                  featured
                >
                  Book a Free Discovery Call
                  <span className="cta-lumos-arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </MagneticButton>
                <MagneticButton href="/contact" className="btn btn-outline btn-lg" featured>
                  Send Us a Message
                </MagneticButton>
              </motion.div>

              <motion.p className="cta-lumos-note" variants={fadeUp}>
                Response within 24 hours · Based in Australia
              </motion.p>

              <motion.div
                className="cta-lumos-metrics"
                variants={metricsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                aria-label="Company highlights"
              >
                <motion.div className="cta-lumos-metric" variants={metricItem}>
                  <span className="cta-lumos-metric-value">50+</span>
                  <span className="cta-lumos-metric-label">Projects delivered</span>
                </motion.div>
                <motion.div className="cta-lumos-metric" variants={metricItem}>
                  <span className="cta-lumos-metric-value">5.0</span>
                  <span className="cta-lumos-metric-label">Client satisfaction</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="cta-lumos-border-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.85, ease: MOTION_EASE, delay: 0.25 }}
            style={{ transformOrigin: "left center" }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
