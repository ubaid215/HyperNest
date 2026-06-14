"use client";

import { useState, useEffect, useLayoutEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import HamburgerMenuOverlay, { type MenuItem } from "@/components/ui/hamburger-menu-overlay";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
];

const HASH_SECTION_IDS = ["about", "process", "work", "services"];

const DESKTOP_MIN_WIDTH = 768;

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clipOrigin, setClipOrigin] = useState({ x: "calc(100vw - 1.5rem)", y: "36px" });
  const [activeSection, setActiveSection] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = normalizePath(usePathname());
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setIsScrolled(y > 60));

  const updateClipOrigin = useCallback(() => {
    const toggle = toggleRef.current;
    if (!toggle) return;
    const rect = toggle.getBoundingClientRect();
    setClipOrigin({
      x: `${rect.left + rect.width / 2}px`,
      y: `${rect.top + rect.height / 2}px`,
    });
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia(`(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`);

    const handleChange = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
      if (mobile) updateClipOrigin();
    };

    handleChange();
    mq.addEventListener("change", handleChange);
    window.addEventListener("resize", updateClipOrigin);

    return () => {
      mq.removeEventListener("change", handleChange);
      window.removeEventListener("resize", updateClipOrigin);
    };
  }, [updateClipOrigin]);

  useEffect(() => {
    if (menuOpen) updateClipOrigin();
  }, [menuOpen, isScrolled, updateClipOrigin]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observers: IntersectionObserver[] = [];

    HASH_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/services") {
        return pathname === "/services" || (pathname === "/" && activeSection === "services");
      }

      if (href === "/contact") {
        return pathname === "/contact";
      }

      if (href.startsWith("/#")) {
        if (pathname !== "/") return false;
        const id = href.split("#")[1];
        return activeSection === id;
      }

      return pathname === href;
    },
    [pathname, activeSection],
  );

  const navigate = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        const id = href.split("#")[1];
        const el = document.getElementById(id);

        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        window.location.assign(href);
        return;
      }

      router.push(href);
    },
    [router],
  );

  const mobileMenuItems = useMemo<MenuItem[]>(
    () => [
      ...NAV_LINKS.map((link) => ({
        label: link.label,
        onClick: () => navigate(link.href),
        active: isActive(link.href),
      })),
      {
        label: "Get a Free Quote",
        onClick: () => navigate("/contact"),
        active: pathname === "/contact",
      },
    ],
    [navigate, isActive, pathname],
  );

  return (
    <>
      <header className={`navbar ${isScrolled ? "navbar-blur" : ""} ${menuOpen ? "navbar-menu-open" : ""}`}>
        <div className="navbar-blur-layer" aria-hidden="true" />
        <div className="navbar-inner container flex-between" style={{ paddingBlock: 0 }}>
          <Link href="/" className="flex items-center gap-2" aria-label="Hyper Nest — home">
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="logo-dot" aria-hidden="true" />
              <span className="logo-text">
                Hyper<span className="text-primary">Nest</span>
              </span>
            </motion.span>
          </Link>

          <nav className="navbar-desktop-nav" aria-label="Primary navigation">
            <ul className="flex items-center gap-8 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-desktop-cta">
            <Link href="/contact" className="btn btn-primary btn-sm">
              Get a Free Quote
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="hamburger navbar-toggle navbar-mobile-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navigation-menu"
          >
            {menuOpen ? (
              <X size={20} strokeWidth={2} className="navbar-toggle-icon" aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={2} className="navbar-toggle-icon" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div className="navbar-mobile-overlay">
        <HamburgerMenuOverlay
          items={mobileMenuItems}
          showButton={false}
          isOpen={menuOpen && isMobile}
          onOpenChange={setMenuOpen}
          clipOriginX={clipOrigin.x}
          clipOriginY={clipOrigin.y}
          fontSize="lg"
          menuAlignment="center"
          animationDuration={0.95}
          staggerDelay={0.08}
          enableBlur
          ariaLabel="Mobile navigation"
        />
      </div>
    </>
  );
}
