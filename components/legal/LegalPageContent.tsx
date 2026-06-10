"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  FileText,
  MapPin,
  Shield,
} from "lucide-react";
import GridBackgroundDemo from "@/components/ui/grid-background-demo";
import SideRays from "@/components/ui/SideRays";
import type { LegalPageData } from "@/lib/legal-data";

interface LegalPageContentProps {
  data: LegalPageData;
  sibling?: { label: string; href: string };
}

const DOC_LINKS = [
  { label: "Privacy Policy", href: "/privacy", icon: Shield },
  { label: "Terms of Service", href: "/terms", icon: FileText },
];

export default function LegalPageContent({ data, sibling }: LegalPageContentProps) {
  const pathname = usePathname();

  return (
    <>
      <section className="legal-hero" aria-labelledby="legal-page-title">
        <div className="hero-bg-gradient" aria-hidden="true" />
        <GridBackgroundDemo />

        <div className="legal-hero-fx" aria-hidden="true">
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

        <div className="container legal-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className="legal-back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Home
            </Link>
          </motion.div>

          <motion.span
            className="label-tag legal-hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
          >
            {data.eyebrow}
          </motion.span>

          <motion.h1
            id="legal-page-title"
            className="legal-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {data.title}
          </motion.h1>

          <motion.p
            className="legal-hero-desc"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            {data.description}
          </motion.p>

          <motion.ul
            className="legal-hero-meta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <li className="legal-hero-meta-item">
              <Calendar size={15} aria-hidden="true" />
              <span>Updated {data.lastUpdated}</span>
            </li>
            <li className="legal-hero-meta-item">
              <MapPin size={15} aria-hidden="true" />
              <span>Australia</span>
            </li>
          </motion.ul>

          <motion.nav
            className="legal-doc-nav"
            aria-label="Legal documents"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
          >
            {DOC_LINKS.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`legal-doc-nav-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </motion.nav>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="container">
          <motion.div
            className="legal-shell"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="legal-shell-grid">
              <aside className="legal-sidebar">
                <div className="legal-sidebar-card">
                  <p className="legal-sidebar-label">On this page</p>
                  <nav aria-label="Table of contents">
                    <ol className="legal-toc-list">
                      {data.sections.map((section) => (
                        <li key={section.id}>
                          <a href={`#${section.id}`} className="legal-toc-link">
                            <span className="legal-toc-num">
                              {section.title.match(/^\d+/)?.[0] ?? "•"}
                            </span>
                            <span className="legal-toc-text">
                              {section.title.replace(/^\d+\.\s*/, "")}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>

                {sibling && (
                  <div className="legal-sidebar-card legal-sidebar-cta">
                    <p className="legal-sidebar-cta-label">Related document</p>
                    <Link href={sibling.href} className="legal-sidebar-cta-link">
                      {sibling.label}
                    </Link>
                  </div>
                )}
              </aside>

              <article className="legal-article" aria-label={`${data.title} content`}>
                {data.sections.map((section, index) => {
                  const sectionNum = section.title.match(/^\d+/)?.[0] ?? String(index + 1);

                  return (
                    <section
                      key={section.id}
                      id={section.id}
                      className="legal-block"
                      aria-labelledby={`${section.id}-heading`}
                    >
                      <div className="legal-block-head">
                        <span className="legal-block-num" aria-hidden="true">
                          {sectionNum}
                        </span>
                        <h2 id={`${section.id}-heading`} className="legal-block-title">
                          {section.title.replace(/^\d+\.\s*/, "")}
                        </h2>
                      </div>

                      <div className="legal-block-body">
                        {section.paragraphs.map((paragraph, i) => (
                          <p key={`${section.id}-p-${i}`} className="legal-block-text">
                            {paragraph}
                          </p>
                        ))}

                        {section.list && (
                          <ul className="legal-block-list">
                            {section.list.map((item, i) => (
                              <li key={`${section.id}-li-${i}`}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </section>
                  );
                })}

                <footer className="legal-article-footer">
                  <p>
                    Questions about this document?{" "}
                    <Link href="/contact" className="legal-inline-link">
                      Contact our team
                    </Link>
                    .
                  </p>
                </footer>
              </article>
            </div>

            <div className="legal-shell-accent" aria-hidden="true" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
