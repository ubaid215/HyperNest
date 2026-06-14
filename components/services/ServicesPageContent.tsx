"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Calendar, Check, Layers, Sparkles } from "lucide-react";
import GridBackgroundDemo from "@/components/ui/grid-background-demo";
import SideRays from "@/components/ui/SideRays";
import { SERVICE_DETAILS } from "@/lib/services-data";
import type { ServiceDetail } from "@/lib/services-data";
import { MOTION_EASE, fadeUp, staggerContainer } from "@/lib/motion-variants";
import { getMotionProfile } from "@/lib/motion-prefs";
import ServiceVisual from "@/components/home/ServiceVisual";

const VISUAL_GRADIENTS = [
  "linear-gradient(135deg, #0f3f6b 0%, #1a5f9c 55%, #2c9b8c 100%)",
  "linear-gradient(135deg, #141420 0%, #1a5f9c 50%, #00a8c0 100%)",
  "linear-gradient(135deg, #0f2548 0%, #1a5f9c 60%, #2c9b8c 100%)",
  "linear-gradient(135deg, #0c1220 0%, #0f3f6b 45%, #1a5f9c 100%)",
];

const HERO_STATS = [
  { icon: Layers, label: "10 specialist disciplines" },
  { icon: Sparkles, label: "Transparent AUD pricing" },
  { icon: Calendar, label: "Free discovery call" },
];

const heroEntrance = (delay: number) => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: MOTION_EASE, delay },
  },
});

const deliverableStagger = staggerContainer(0.04, 0.15);

const deliverableItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: MOTION_EASE },
  },
};

interface ServiceCardProps {
  service: ServiceDetail;
  index: number;
  reducedMotion: boolean;
}

function ServiceCard({ service, index, reducedMotion }: ServiceCardProps) {
  const imageLeft = index % 2 === 0;
  const fromX = imageLeft ? -28 : 28;

  return (
    <motion.article
      id={service.slug}
      className="services-page-card"
      initial={reducedMotion ? false : { opacity: 0, y: 36, x: fromX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: MOTION_EASE, delay: reducedMotion ? 0 : 0.05 }}
    >
      <motion.div
        className={`services-page-card-inner ${imageLeft ? "services-page-card-inner--image-left" : "services-page-card-inner--image-right"}`}
        whileHover={reducedMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.3, ease: MOTION_EASE }}
      >
        <motion.div
          className="services-page-card-visual-wrap"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: MOTION_EASE, delay: 0.1 }}
        >
          <ServiceVisual
            src={service.image}
            alt={service.imageAlt}
            gradient={VISUAL_GRADIENTS[index % VISUAL_GRADIENTS.length]}
          />
        </motion.div>

        <div className="services-page-card-content">
          <motion.span
            className="service-card-index"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: MOTION_EASE, delay: 0.15 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          <motion.p
            className="services-page-tagline"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: MOTION_EASE, delay: 0.18 }}
          >
            {service.tagline}
          </motion.p>

          <motion.h2
            className="services-page-card-title"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: MOTION_EASE, delay: 0.2 }}
          >
            {service.title}
          </motion.h2>

          <motion.p
            className="services-page-overview"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: MOTION_EASE, delay: 0.24 }}
          >
            {service.overview}
          </motion.p>

          <div className="services-page-meta">
            <div className="services-page-block">
              <h3 className="services-page-block-title">What&apos;s included</h3>
              <motion.ul
                className="services-page-deliverables"
                variants={deliverableStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {service.deliverables.map((item) => (
                  <motion.li key={item} variants={deliverableItem}>
                    <Check size={14} aria-hidden="true" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              className="services-page-block"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: MOTION_EASE, delay: 0.1 }}
            >
              <h3 className="services-page-block-title">Ideal for</h3>
              <p className="services-page-ideal">{service.idealFor}</p>
            </motion.div>

            <motion.div
              className="services-page-block"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: MOTION_EASE, delay: 0.15 }}
            >
              <h3 className="services-page-block-title">Our approach</h3>
              <p className="services-page-approach">{service.approach}</p>
            </motion.div>
          </div>

          <motion.div
            className="services-page-card-footer"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: MOTION_EASE, delay: 0.2 }}
          >
            <span className="service-card-price">{service.price}</span>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact" className="btn btn-primary">
                Get a Quote
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ServicesPageContent() {
  const [showRays, setShowRays] = useState(false);
  const [raysLite, setRaysLite] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setHeroReady(true);

    const { reduced, lite, useWebGL } = getMotionProfile();
    if (!useWebGL || reduced) return;

    const enableRays = () => {
      setRaysLite(lite);
      setShowRays(true);
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enableRays, { timeout: 800 });
      return () => window.cancelIdleCallback(id);
    }

    const timeoutId = setTimeout(enableRays, 400);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <section className="services-page-hero" aria-labelledby="services-page-title">
        <div className="hero-bg-gradient" />
        <GridBackgroundDemo />

        {showRays && (
          <div className="services-page-hero-fx" aria-hidden="true">
            <SideRays
              speed={1.2}
              rayColor1="#0e4d8a"
              rayColor2="#7ab8f5"
              intensity={raysLite ? 1.2 : 1.4}
              spread={2.0}
              origin="top-left"
              tilt={6}
              saturation={1.1}
              blend={0.6}
              falloff={1.9}
              opacity={raysLite ? 0.45 : 0.5}
            />
            {!raysLite && (
              <SideRays
                speed={1.2}
                rayColor1="#0e4d8a"
                rayColor2="#7ab8f5"
                intensity={1.4}
                spread={2.0}
                origin="top-right"
                tilt={-6}
                saturation={1.1}
                blend={0.6}
                falloff={1.9}
                opacity={0.5}
              />
            )}
          </div>
        )}

        <div className={`container services-page-hero-inner ${heroReady ? "is-ready" : ""}`}>
          <motion.span
            className="label-tag services-page-hero-eyebrow hero-entrance-item"
            variants={heroEntrance(0)}
            initial="hidden"
            animate={heroReady ? "visible" : "hidden"}
          >
            Our Services
          </motion.span>

          <motion.h1
            id="services-page-title"
            className="services-page-hero-title hero-entrance-item"
            variants={heroEntrance(0.05)}
            initial="hidden"
            animate={heroReady ? "visible" : "hidden"}
          >
            Everything you need to <span className="text-primary">grow online</span>
          </motion.h1>

          <motion.p
            className="services-page-hero-desc hero-entrance-item"
            variants={heroEntrance(0.1)}
            initial="hidden"
            animate={heroReady ? "visible" : "hidden"}
          >
            From first impression to long-term growth — ten disciplines, one team, and a
            standard of work we refuse to compromise on.
          </motion.p>

          <motion.ul
            className="services-page-hero-stats hero-entrance-item"
            variants={heroEntrance(0.16)}
            initial="hidden"
            animate={heroReady ? "visible" : "hidden"}
          >
            {HERO_STATS.map(({ icon: Icon, label }) => (
              <li key={label} className="services-page-hero-stat">
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="services-page-hero-actions hero-entrance-item"
            variants={heroEntrance(0.22)}
            initial="hidden"
            animate={heroReady ? "visible" : "hidden"}
          >
            <Link href="/contact" className="btn btn-primary">
              Get a Free Quote
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="#custom-website-design" className="btn btn-outline">
              Browse Services
            </a>
          </motion.div>
        </div>
      </section>

      <section className="services-page-list">
        <div className="container">
          <motion.div
            className="services-page-intro"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <span className="label-tag">Full Catalogue</span>
            <h2 className="display-sm text-balance">Every service, in full detail</h2>
            <p className="body-md text-muted">
              Scroll through our complete offering — deliverables, ideal clients, and how we
              work on every engagement.
            </p>
          </motion.div>

          <div className="services-page-grid">
            {SERVICE_DETAILS.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                reducedMotion={!!reducedMotion}
              />
            ))}
          </div>

          <motion.div
            className="services-page-cta"
            initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: MOTION_EASE }}
          >
            <h2 className="display-sm text-balance">Not sure where to start?</h2>
            <p className="body-md text-muted">
              Book a free discovery call and we&apos;ll help you find the right service for
              your goals — no obligation, no pressure.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Book a Free Discovery Call
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
