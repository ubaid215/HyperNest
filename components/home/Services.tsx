"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { configureGsap } from "@/lib/gsap-setup";
import {
  getMotionProfile,
  getScrollTriggerScrub,
} from "@/lib/motion-prefs";
import { HOME_SERVICES } from "@/lib/services-data";
import ServiceVisual from "@/components/home/ServiceVisual";

const BG_FROM = "#FAFAF8";
const BG_TO = "#0c1220";

const VISUAL_GRADIENTS = [
  "linear-gradient(135deg, #0f3f6b 0%, #1a5f9c 55%, #2c9b8c 100%)",
  "linear-gradient(135deg, #141420 0%, #1a5f9c 50%, #00a8c0 100%)",
  "linear-gradient(135deg, #0f2548 0%, #1a5f9c 60%, #2c9b8c 100%)",
  "linear-gradient(135deg, #0c1220 0%, #0f3f6b 45%, #1a5f9c 100%)",
];

const PANEL_SHADOW =
  "0 32px 72px rgba(0, 0, 0, 0.28), 0 12px 32px rgba(0, 0, 0, 0.14)";

function getTimings(mobile: boolean, lite: boolean) {
  if (mobile) {
    return {
      introDuration: 0.5,
      cardDuration: 0.58,
      cardEnter: 0.18,
      cardExit: 0.15,
      partStagger: 0.015,
      headerDelay: 0.08,
    };
  }
  if (lite) {
    return {
      introDuration: 0.62,
      cardDuration: 0.72,
      cardEnter: 0.22,
      cardExit: 0.18,
      partStagger: 0.02,
      headerDelay: 0.1,
    };
  }
  return {
    introDuration: 0.75,
    cardDuration: 0.85,
    cardEnter: 0.26,
    cardExit: 0.22,
    partStagger: 0.03,
    headerDelay: 0.12,
  };
}

function getScrollDistance(serviceCount: number, lite: boolean) {
  const vh = window.innerHeight;
  const mobile = window.innerWidth < 768;
  const intro = mobile ? vh * 0.22 : lite ? vh * 0.32 : vh * 0.4;
  const perCard = mobile ? vh * 0.36 : lite ? vh * 0.48 : vh * 0.52;
  return intro + perCard * serviceCount;
}

function bindImageRefresh(stage: HTMLElement, refresh: () => void) {
  const images = stage.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) return;
    img.addEventListener("load", refresh, { once: true });
    img.addEventListener("error", refresh, { once: true });
  });
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    configureGsap();

    const section = sectionRef.current;
    const pin = pinRef.current;
    const bg = bgRef.current;
    const grid = gridRef.current;
    const header = headerRef.current;
    const stage = stageRef.current;
    if (!section || !pin || !bg || !grid || !header || !stage) return;

    const profile = getMotionProfile();
    const scrub = getScrollTriggerScrub(profile);

    const cards = gsap.utils.toArray<HTMLElement>(".service-slide", stage);
    if (!cards.length) return;

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let ctx: gsap.Context | undefined;

    const refresh = () => ScrollTrigger.refresh();

    const setup = () => {
      ctx?.revert();

      if (profile.reduced) {
        gsap.set([bg, grid, header, ...cards], { clearProps: "all" });
        gsap.set(bg, { backgroundColor: BG_TO });
        gsap.set(grid, { opacity: 0.3 });
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
        cards.forEach((card) => {
          card.style.position = "relative";
          card.style.pointerEvents = "auto";
          const parts = card.querySelectorAll<HTMLElement>("[data-service-part]");
          gsap.set(parts, { autoAlpha: 1, y: 0, clearProps: "filter" });
        });
        stage.style.position = "relative";
        stage.style.height = "auto";
        return;
      }

      const isMobile = window.innerWidth < 768;
      const useParallax = !profile.lite && !isMobile;
      const timings = getTimings(isMobile, profile.lite);
      const scrollDistance = getScrollDistance(cards.length, profile.lite);

      ctx = gsap.context(() => {
        gsap.set(bg, { backgroundColor: BG_FROM });
        gsap.set(grid, { opacity: 0, y: 0 });
        gsap.set(header, { autoAlpha: 0, y: 20 });

        gsap.set(cards, {
          autoAlpha: 0,
          y: isMobile ? 32 : 48,
          scale: isMobile ? 0.98 : 0.96,
        });

        cards.forEach((card, index) => {
          card.style.pointerEvents = "none";
          card.style.zIndex = String(index + 1);
          const parts = card.querySelectorAll<HTMLElement>("[data-service-part]");
          gsap.set(parts, { autoAlpha: 0, y: isMobile ? 10 : 14 });
          const panel = card.querySelector<HTMLElement>(".service-slide-panel");
          if (panel) panel.style.boxShadow = PANEL_SHADOW;
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pin,
            scrub,
            start: "top top",
            end: `+=${scrollDistance}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        tl.to(
          bg,
          { backgroundColor: BG_TO, duration: timings.introDuration, ease: "none" },
          0,
        );
        tl.to(
          grid,
          { opacity: 0.32, duration: timings.introDuration, ease: "none" },
          0,
        );
        tl.to(
          grid,
          {
            y: useParallax ? -32 : 0,
            duration: timings.introDuration + cards.length * timings.cardDuration,
            ease: "none",
          },
          0,
        );
        tl.to(
          header,
          {
            autoAlpha: 1,
            y: 0,
            duration: timings.introDuration * 0.55,
            ease: "none",
          },
          timings.introDuration * timings.headerDelay,
        );

        cards.forEach((card, index) => {
          const start = timings.introDuration + index * timings.cardDuration;
          const visual = card.querySelector<HTMLElement>(".service-slide-visual");
          const panel = card.querySelector<HTMLElement>(".service-slide-panel");
          const parts = card.querySelectorAll<HTMLElement>("[data-service-part]");

          tl.set(card, { zIndex: 100 + index, pointerEvents: "auto" }, start);

          tl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: timings.cardEnter,
              ease: "none",
            },
            start,
          );

          if (panel && useParallax) {
            tl.fromTo(
              panel,
              { y: 28 },
              { y: 0, duration: timings.cardEnter, ease: "none" },
              start,
            );
          }

          parts.forEach((part, partIndex) => {
            tl.fromTo(
              part,
              { autoAlpha: 0, y: isMobile ? 10 : 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: timings.cardEnter * 0.65,
                ease: "none",
              },
              start + partIndex * timings.partStagger,
            );
          });

          if (visual && useParallax) {
            tl.fromTo(
              visual,
              { scale: 0.97, y: 18 },
              { scale: 1, y: 0, duration: timings.cardEnter, ease: "none" },
              start,
            );
            tl.to(
              visual,
              { y: -20, duration: timings.cardDuration, ease: "none" },
              start,
            );
          }

          if (index < cards.length - 1) {
            const exitStart = start + timings.cardDuration - timings.cardExit;

            tl.to(
              card,
              {
                autoAlpha: 0,
                y: isMobile ? -20 : -32,
                scale: isMobile ? 0.97 : 0.95,
                duration: timings.cardExit,
                ease: "none",
              },
              exitStart,
            );

            if (panel && useParallax) {
              tl.to(
                panel,
                { y: -16, duration: timings.cardExit, ease: "none" },
                exitStart,
              );
            }

            tl.set(
              card,
              { pointerEvents: "none", zIndex: index + 1 },
              exitStart + timings.cardExit,
            );
          }
        });
      }, section);
    };

    setup();
    bindImageRefresh(stage, refresh);
    document.fonts.ready.then(refresh).catch(() => {});

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
        bindImageRefresh(stage, refresh);
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", refresh);
      ctx?.revert();
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-scroll">
      <div ref={bgRef} className="services-scroll-bg" aria-hidden="true" />
      <div ref={gridRef} className="services-scroll-grid" aria-hidden="true">
        <div className="services-scroll-grid-lines" />
        <div className="services-scroll-grid-mask" />
      </div>

      <div ref={pinRef} className="services-scroll-pin">
        <div className="services-scroll-inner container">
          <div ref={headerRef} className="services-scroll-header section-heading section-heading-center">
            <span className="label-tag services-scroll-label">What We Do</span>
            <h2 className="display-md text-balance">Craft. Build. Grow.</h2>
            <p className="body-lg section-heading-sub text-balance">
              Five core disciplines. One uncompromising standard.
            </p>
          </div>

          <div ref={stageRef} className="services-scroll-stage">
            {HOME_SERVICES.map((service, index) => {
              const imageLeft = index % 2 === 0;

              return (
                <article
                  key={service.title}
                  className="service-slide"
                  aria-label={service.title}
                >
                  <div className="service-slide-panel">
                    <div
                      className={`service-slide-inner ${imageLeft ? "service-slide-inner--image-left" : "service-slide-inner--image-right"}`}
                    >
                      <ServiceVisual
                        src={service.image}
                        alt={service.imageAlt}
                        gradient={VISUAL_GRADIENTS[index % VISUAL_GRADIENTS.length]}
                      />

                      <div className="service-slide-content">
                        <span className="service-card-index" data-service-part>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="service-card-title" data-service-part>
                          {service.title}
                        </h3>
                        <p className="service-card-desc text-pretty" data-service-part>
                          {service.description}
                        </p>
                        <p className="service-card-price" data-service-part>
                          {service.price}
                        </p>
                        <Link
                          href="/contact"
                          className="btn btn-primary services-scroll-cta"
                          data-service-part
                        >
                          Start a Conversation
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="services-scroll-footer">
            <Link href="/services" className="btn btn-outline services-scroll-view-all">
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
