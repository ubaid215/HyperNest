"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import {
  fadeUp,
  slideFromLeft,
  staggerContainer,
} from "@/lib/motion-variants";
import { SITE } from "@/lib/site-config";

interface FooterLink {
  label: string;
  href: string;
}

const SERVICE_LINKS: FooterLink[] = [
  { label: "Custom Website Design", href: "/services#custom-website-design" },
  { label: "E-Commerce Development", href: "/services#ecommerce-website" },
  { label: "Web Application Dev", href: "/services#web-application-development" },
  { label: "Mobile App Development", href: "/services#mobile-app-development" },
  { label: "SEO & Digital Marketing", href: "/services#search-engine-optimisation" },
  { label: "View All Services", href: "/services" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About Us", href: "/#about" },
  { label: "Our Process", href: "/#process" },
  { label: "Our Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/contact" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

const heroStagger = staggerContainer(0.1);
const gridStagger = staggerContainer(0.08, 0.05);
const linkStagger = staggerContainer(0.05, 0.1);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-mega" role="contentinfo">
      <div className="footer-mega-panel">
        <div className="footer-mega-ambient" aria-hidden="true">
          <span className="footer-mega-glow footer-mega-glow-a" />
          <span className="footer-mega-glow footer-mega-glow-b" />
          <span className="footer-mega-grid-bg" />
        </div>

        <div className="container footer-mega-inner">
          {/* Section 1 — CTA */}
          <motion.div
            className="footer-mega-hero"
            variants={heroStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div className="footer-mega-hero-copy" variants={slideFromLeft}>
              <span className="footer-mega-eyebrow">Work With {SITE.brandName}</span>
              <h2 className="footer-mega-hero-title">
                Let&apos;s build something extraordinary together.
              </h2>
              <p className="footer-mega-hero-desc">
                From strategy to launch, we partner with ambitious brands to create digital
                experiences that perform — and keep growing long after go-live.
              </p>
            </motion.div>

            <motion.div className="footer-mega-hero-actions" variants={fadeUp}>
              <Link href="/contact" className="btn btn-primary btn-lg footer-mega-btn">
                Book a Free Discovery Call
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg footer-mega-btn footer-mega-btn-ghost">
                Send a Message
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <span className="footer-mega-response">
                <span className="footer-mega-response-dot" aria-hidden="true" />
                Response within 24 hours
              </span>
            </motion.div>
          </motion.div>

          {/* Section 2 — Links grid (desktop: 4-col, mobile: 2-col) */}
          <motion.div
            className="footer-mega-grid"
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div className="footer-mega-brand footer-mega-brand--desktop" variants={fadeUp}>
              <Link href="/" className="footer-mega-logo" aria-label={`${SITE.brandName} — home`}>
                <BrandLogo height={34} variant="footer" className="brand-logo--footer" />
              </Link>
              <p className="footer-mega-tagline">{SITE.tagline}</p>
              <div className="footer-mega-social" role="list" aria-label="Social media">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-mega-social-link"
                    role="listitem"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.nav className="footer-mega-col" variants={fadeUp} aria-label="Services">
              <h3 className="footer-mega-col-title">Services</h3>
              <motion.ul className="footer-mega-links" variants={linkStagger}>
                {SERVICE_LINKS.map((link) => (
                  <motion.li key={link.label} variants={fadeUp}>
                    <Link href={link.href} className="footer-mega-link">
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>

            <motion.nav className="footer-mega-col" variants={fadeUp} aria-label="Company">
              <h3 className="footer-mega-col-title">Company</h3>
              <motion.ul className="footer-mega-links" variants={linkStagger}>
                {COMPANY_LINKS.map((link) => (
                  <motion.li key={link.label} variants={fadeUp}>
                    <Link href={link.href} className="footer-mega-link">
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>

            <motion.div className="footer-mega-col footer-mega-contact footer-mega-contact--desktop" variants={fadeUp}>
              <h3 className="footer-mega-col-title">Get in Touch</h3>
              <ul className="footer-mega-contact-list">
                <li>
                  <a href={SITE.emailHref} className="footer-mega-contact-item">
                    <Mail size={16} aria-hidden="true" />
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a href={SITE.phoneHref} className="footer-mega-contact-item">
                    <Phone size={16} aria-hidden="true" />
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li className="footer-mega-contact-locations">
                  <MapPin size={16} aria-hidden="true" />
                  <address className="footer-mega-address">
                    {SITE.address.full}
                  </address>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="footer-mega-display-wrap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <p className="footer-mega-display">
            <span className="footer-mega-display-word">Hyper</span>
            <span className="footer-mega-display-word">Nest</span>
          </p>
        </motion.div>

        {/* Section 3 — Bottom bar */}
        <div className="container footer-mega-bottom">
          <p className="footer-mega-copyright">
            © {currentYear} {SITE.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className="footer-mega-legal">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-mega-legal-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="footer-mega-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to top
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
