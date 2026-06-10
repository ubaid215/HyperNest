"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import GridBackgroundDemo from "@/components/ui/grid-background-demo";
import SideRays from "@/components/ui/SideRays";
import MagneticButton from "@/components/ui/MagneticButton";

const SERVICE_OPTIONS = [
  "Custom Website Design",
  "E-Commerce Website",
  "Web Application Development",
  "Mobile App Development",
  "Search Engine Optimisation",
  "Google & Meta Ads Management",
  "Branding & Identity Design",
  "UI/UX Design",
  "Other",
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

const LOCATIONS = ["Melbourne", "Sydney", "Brisbane"];

const HERO_STATS = [
  { icon: Clock, label: "Response within 24 hours" },
  { icon: MapPin, label: "Based in Australia" },
  { icon: Calendar, label: "Free discovery call" },
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <div className="hero-bg-gradient" />
        <GridBackgroundDemo />

        <div className="contact-hero-fx" aria-hidden="true">
          <SideRays
            speed={1.2}
            rayColor1="#0e4d8a"
            rayColor2="#7ab8f5"
            intensity={1.4}
            spread={2.0}
            origin="top-left"
            tilt={6}
            saturation={1.1}
            blend={0.6}
            falloff={1.9}
            opacity={0.5}
          />
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
        </div>

        <div className="container contact-hero-inner">
          <motion.span
            className="label-tag contact-hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Get in Touch
          </motion.span>

          <motion.h1
            id="contact-hero-title"
            className="contact-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            Let&apos;s Start Your <span className="text-primary">Next Project</span>
          </motion.h1>

          <motion.p
            className="contact-hero-desc"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            Tell us about your goals. We respond within 24 hours — no hard sell, just an
            honest conversation about how we can help you grow.
          </motion.p>

          <ul className="contact-hero-stats">
            {HERO_STATS.map(({ icon: Icon, label }) => (
              <li key={label} className="contact-hero-stat">
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <motion.div
            className="contact-shell"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-grid">
              <div className="contact-form-panel">
                <div className="contact-panel-head">
                  <span className="label-tag">Send a Message</span>
                  <h2 className="contact-panel-title">Share your project details</h2>
                  <p className="contact-panel-desc">
                    Fill in the form and our team will review your brief and get back to you
                    with clear next steps.
                  </p>
                </div>

                {submitted ? (
                  <div className="contact-success">
                    <div className="contact-success-icon" aria-hidden="true">
                      <Check size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="contact-success-title">Message sent successfully</h3>
                    <p className="contact-success-desc">
                      Thanks for reaching out. We&apos;ll review your project and respond
                      within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="contact-form-row">
                      <div className="contact-field">
                        <label htmlFor="name" className="form-label">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="input"
                          placeholder="Jane Smith"
                          required
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="input"
                          placeholder="jane@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="company" className="form-label">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="input"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="service" className="form-label">
                        Service Interested In
                      </label>
                      <select id="service" name="service" className="input" defaultValue="">
                        <option value="" disabled>
                          Select a service
                        </option>
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="message" className="form-label">
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="input textarea"
                        placeholder="Tell us about your project, timeline, and goals..."
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-featured contact-submit">
                      Send Message
                      <Send size={18} aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>

              <aside className="contact-aside">
                <div className="contact-info-card">
                  <h3 className="contact-info-title">Contact Information</h3>
                  <ul className="contact-info-list">
                    <li>
                      <a href="mailto:hello@hypernest.com.au" className="contact-info-item">
                        <span className="contact-info-icon" aria-hidden="true">
                          <Mail size={18} />
                        </span>
                        <span className="contact-info-body">
                          <span className="contact-info-label">Email</span>
                          <span className="contact-info-value">hello@hypernest.com.au</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="tel:+61290000000" className="contact-info-item">
                        <span className="contact-info-icon" aria-hidden="true">
                          <Phone size={18} />
                        </span>
                        <span className="contact-info-body">
                          <span className="contact-info-label">Phone</span>
                          <span className="contact-info-value">+61 (0)2 9000 0000</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="contact-info-item">
                        <span className="contact-info-icon" aria-hidden="true">
                          <MapPin size={18} />
                        </span>
                        <span className="contact-info-body">
                          <span className="contact-info-label">Locations</span>
                          <span className="contact-location-pills">
                            {LOCATIONS.map((city) => (
                              <span key={city} className="contact-location-pill">
                                {city}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="contact-book-card">
                  <span className="contact-book-badge">
                    <span className="badge-dot" aria-hidden="true" />
                    Prefer a conversation?
                  </span>
                  <h3 className="contact-book-title">Book a free discovery call</h3>
                  <p className="contact-book-desc">
                    Walk through your goals with a senior strategist — no obligation, no
                    pressure.
                  </p>
                  <MagneticButton
                    href="mailto:hello@hypernest.com.au?subject=Discovery%20Call%20Request"
                    className="btn btn-outline btn-lg contact-book-btn"
                    featured
                  >
                    Schedule a Call
                    <ArrowRight size={18} aria-hidden="true" />
                  </MagneticButton>
                </div>

                <div className="contact-social-card">
                  <h3 className="contact-info-title">Follow Us</h3>
                  <div className="contact-social-links">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-social-link"
                      >
                        {social.label}
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <div className="contact-shell-accent" aria-hidden="true" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
