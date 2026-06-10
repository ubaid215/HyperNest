"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/home-data";
import ServiceVisual from "@/components/home/ServiceVisual";

gsap.registerPlugin(ScrollTrigger);

const BG_FROM = "#FAFAF8";
const BG_TO = "#0c1220";
const INTRO_DURATION = 0.9;
const CARD_DURATION = 1;
const CARD_ENTER = 0.28;
const CARD_EXIT = 0.24;

const VISUAL_GRADIENTS = [
  "linear-gradient(135deg, #0f3f6b 0%, #1a5f9c 55%, #2c9b8c 100%)",
  "linear-gradient(135deg, #141420 0%, #1a5f9c 50%, #00a8c0 100%)",
  "linear-gradient(135deg, #0f2548 0%, #1a5f9c 60%, #2c9b8c 100%)",
  "linear-gradient(135deg, #0c1220 0%, #0f3f6b 45%, #1a5f9c 100%)",
];

function getScrollDistance(serviceCount: number) {
  const vh = window.innerHeight;
  const mobile = window.innerWidth < 768;
  const intro = mobile ? vh * 0.55 : vh * 0.65;
  const perCard = mobile ? vh * 0.72 : vh * 0.82;
  return intro + perCard * serviceCount;
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const bg = bgRef.current;
    const grid = gridRef.current;
    const header = headerRef.current;
    const stage = stageRef.current;
    if (!section || !pin || !bg || !grid || !header || !stage) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = gsap.utils.toArray<HTMLElement>(".service-slide", stage);
    if (!cards.length) return;

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx?.revert();

      if (prefersReducedMotion) {
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

      const scrollDistance = getScrollDistance(cards.length);
      const isMobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        gsap.set(bg, { backgroundColor: BG_FROM });
        gsap.set(grid, { opacity: 0, y: 0 });
        gsap.set(header, { autoAlpha: 0, y: 24 });
        const panels = cards.map(
          (card) => card.querySelector<HTMLElement>(".service-slide-panel"),
        );

        gsap.set(cards, {
          autoAlpha: 0,
          y: 56,
          scale: 0.95,
        });
        gsap.set(panels, {
          boxShadow: "0 32px 72px rgba(0, 0, 0, 0.28), 0 12px 32px rgba(0, 0, 0, 0.14)",
        });
        cards.forEach((card, index) => {
          card.style.pointerEvents = "none";
          card.style.zIndex = String(index + 1);
          const parts = card.querySelectorAll<HTMLElement>("[data-service-part]");
          gsap.set(parts, { autoAlpha: 0, y: 18 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pin,
            scrub: true,
            start: "top top",
            end: `+=${scrollDistance}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // markers: true,
          },
        });

        tl.to(
          bg,
          { backgroundColor: BG_TO, duration: INTRO_DURATION, ease: "none" },
          0,
        );
        tl.to(
          grid,
          { opacity: 0.32, duration: INTRO_DURATION, ease: "none" },
          0,
        );
        tl.to(
          grid,
          { y: -40, duration: INTRO_DURATION + cards.length * CARD_DURATION, ease: "none" },
          0,
        );
        tl.to(
          header,
          { autoAlpha: 1, y: 0, duration: INTRO_DURATION * 0.65, ease: "none" },
          INTRO_DURATION * 0.15,
        );

        cards.forEach((card, index) => {
          const start = INTRO_DURATION + index * CARD_DURATION;
          const visual = card.querySelector<HTMLElement>(".service-slide-visual");
          const panel = card.querySelector<HTMLElement>(".service-slide-panel");
          const parts = card.querySelectorAll<HTMLElement>("[data-service-part]");

          tl.add(() => {
            card.style.zIndex = String(100 + index);
          }, start);

          tl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: CARD_ENTER,
              ease: "none",
            },
            start,
          );

          if (panel) {
            tl.fromTo(
              panel,
              {
                y: isMobile ? 0 : 36,
                boxShadow:
                  "0 40px 88px rgba(0, 0, 0, 0.32), 0 16px 40px rgba(0, 0, 0, 0.18)",
              },
              {
                y: 0,
                boxShadow:
                  "0 32px 72px rgba(0, 0, 0, 0.28), 0 12px 32px rgba(0, 0, 0, 0.14)",
                duration: CARD_ENTER,
                ease: "none",
              },
              start,
            );
          }

          tl.add(() => {
            card.style.pointerEvents = "auto";
          }, start);

          parts.forEach((part, partIndex) => {
            tl.fromTo(
              part,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: CARD_ENTER * 0.75,
                ease: "none",
              },
              start + partIndex * 0.04,
            );
          });

          if (visual) {
            tl.fromTo(
              visual,
              { scale: isMobile ? 1 : 0.96, y: isMobile ? 0 : 24 },
              { scale: 1, y: 0, duration: CARD_ENTER, ease: "none" },
              start,
            );
            if (!isMobile) {
              tl.to(
                visual,
                { y: -28, duration: CARD_DURATION, ease: "none" },
                start,
              );
            }
          }

          const content = card.querySelector<HTMLElement>(".service-slide-content");
          if (content && !isMobile) {
            tl.to(
              content,
              { y: -12, duration: CARD_DURATION, ease: "none" },
              start,
            );
          }

          if (index < cards.length - 1) {
            const exitStart = start + CARD_DURATION - CARD_EXIT;
            tl.to(
              card,
              {
                autoAlpha: 0,
                y: -40,
                scale: 0.94,
                duration: CARD_EXIT,
                ease: "none",
              },
              exitStart,
            );

            if (panel) {
              tl.to(
                panel,
                {
                  y: -24,
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                  duration: CARD_EXIT,
                  ease: "none",
                },
                exitStart,
              );
            }

            tl.add(() => {
              card.style.pointerEvents = "none";
              card.style.zIndex = String(index + 1);
            }, exitStart + CARD_EXIT);
          }
        });
      }, section);
    };

    setup();

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
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
              Ten disciplines. One uncompromising standard.
            </p>
          </div>

          <div ref={stageRef} className="services-scroll-stage">
            {SERVICES.map((service, index) => {
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
        </div>
      </div>
    </section>
  );
}
