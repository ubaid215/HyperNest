"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { TESTIMONIALS } from "@/lib/home-data";
import {
  MOTION_EASE,
  fadeUp,
  scaleIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
} from "@/lib/motion-variants";

const TRUST_CITIES = ["Canberra", "Sydney", "Melbourne"];

const headerContainer = staggerContainer(0.1);
const bentoContainer = staggerContainer(0.12, 0.08);
const cardContentContainer = staggerContainer(0.08, 0.12);
const starContainer = staggerContainer(0.06, 0.2);
const pillContainer = staggerContainer(0.08, 0.15);

const starItem = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.35, ease: MOTION_EASE },
  },
};

const trustStrip = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: MOTION_EASE },
  },
};

const pillItem = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: MOTION_EASE },
  },
};

function StarRating({ inView = false }: { inView?: boolean }) {
  const stars = (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span key={i} variants={starItem} aria-hidden="true">
          <Star size={14} strokeWidth={0} fill="currentColor" />
        </motion.span>
      ))}
    </>
  );

  if (inView) {
    return (
      <motion.div
        className="testimonial-stars"
        variants={starContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label="5 out of 5 stars"
      >
        {stars}
      </motion.div>
    );
  }

  return (
    <motion.div className="testimonial-stars" variants={starContainer} aria-label="5 out of 5 stars">
      {stars}
    </motion.div>
  );
}

function TestimonialAuthor({
  initials,
  name,
  role,
  location,
}: {
  initials: string;
  name: string;
  role: string;
  location: string;
}) {
  return (
    <motion.div className="testimonial-author" variants={fadeUp}>
      <div className="testimonial-avatar">{initials}</div>
      <div className="testimonial-author-meta">
        <p className="testimonial-author-name">{name}</p>
        <p className="testimonial-author-role">
          {role} · {location}
        </p>
      </div>
    </motion.div>
  );
}

function TestimonialCardContent({
  quote,
  large,
  author,
}: {
  quote: string;
  large?: boolean;
  author: (typeof TESTIMONIALS)[number];
}) {
  return (
    <motion.div className="testimonial-bento-content" variants={cardContentContainer}>
      <StarRating />
      <motion.blockquote
        className={`testimonial-bento-quote${large ? " testimonial-bento-quote-lg" : ""}`}
        variants={fadeUp}
      >
        &ldquo;{quote}&rdquo;
      </motion.blockquote>
      <TestimonialAuthor {...author} />
    </motion.div>
  );
}

export default function Testimonials() {
  const [featured, ...supporting] = TESTIMONIALS;

  return (
    <AnimatedSection id="work" className="testimonials-section" blurReveal>
      <div className="container">
        <motion.header
          className="testimonials-header"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span className="label-tag" variants={fadeUp}>
            Client Results
          </motion.span>
          <motion.h2 className="display-md text-balance" variants={fadeUp}>
            What Our Clients Say
          </motion.h2>
          <motion.p className="testimonials-header-desc" variants={fadeUp}>
            Real results from Australian businesses we&apos;ve helped grow online.
          </motion.p>
        </motion.header>

        <motion.div
          className="testimonials-bento-shell"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="testimonials-bento-grid"
            variants={bentoContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.article
              className="testimonial-bento testimonial-bento-featured"
              variants={slideFromLeft}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <TestimonialCardContent quote={featured.quote} large author={featured} />
            </motion.article>

            {supporting.map((t) => (
              <motion.article
                key={t.name}
                className="testimonial-bento testimonial-bento-compact"
                variants={slideFromRight}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <TestimonialCardContent quote={t.quote} author={t} />
              </motion.article>
            ))}

            <motion.div
              className="testimonial-bento testimonial-bento-trust"
              variants={trustStrip}
              whileHover={{ y: -2, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="testimonial-trust-score"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: MOTION_EASE, delay: 0.1 }}
              >
                <motion.span
                  className="testimonial-trust-value"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: MOTION_EASE, delay: 0.15 }}
                >
                  5.0
                </motion.span>
                <StarRating inView />
              </motion.div>

              <motion.p
                className="testimonial-trust-copy"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: MOTION_EASE, delay: 0.2 }}
              >
                Trusted by ambitious Australian businesses across retail, SaaS, and startups.
              </motion.p>

              <motion.div
                className="testimonial-trust-locations"
                variants={pillContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                aria-label="Client locations"
              >
                {TRUST_CITIES.map((city) => (
                  <motion.span key={city} className="testimonial-trust-pill" variants={pillItem}>
                    {city}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
