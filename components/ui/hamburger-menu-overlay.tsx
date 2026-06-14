"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface HamburgerMenuOverlayProps {
  items: MenuItem[];
  buttonTop?: string;
  buttonLeft?: string;
  buttonSize?: "sm" | "md" | "lg";
  buttonColor?: string;
  overlayBackground?: string;
  textColor?: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  fontFamily?: string;
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  animationDuration?: number;
  staggerDelay?: number;
  menuAlignment?: "left" | "center" | "right";
  className?: string;
  buttonClassName?: string;
  menuItemClassName?: string;
  keepOpenOnItemClick?: boolean;
  customButton?: React.ReactNode;
  ariaLabel?: string;
  onOpen?: () => void;
  onClose?: () => void;
  menuDirection?: "vertical" | "horizontal";
  enableBlur?: boolean;
  zIndex?: number;
  /** Hide built-in floating button — use an external navbar toggle */
  showButton?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Clip-path circle origin (centre of toggle button) */
  clipOriginX?: string;
  clipOriginY?: string;
}

export function HamburgerMenuOverlay({
  items = [],
  buttonTop = "36px",
  buttonLeft = "calc(100vw - 1.5rem)",
  buttonSize = "sm",
  buttonColor = "#ffffff",
  overlayBackground = "linear-gradient(165deg, #0f3f6b 0%, #141420 52%, #0c1220 100%)",
  textColor = "#ffffff",
  fontSize = "lg",
  fontFamily = '"Plus Jakarta Sans", "Inter", sans-serif',
  fontWeight = "semibold",
  animationDuration = 0.95,
  staggerDelay = 0.08,
  menuAlignment = "left",
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  menuDirection = "vertical",
  enableBlur = true,
  zIndex = 250,
  showButton = true,
  isOpen: controlledOpen,
  onOpenChange,
  clipOriginX,
  clipOriginY,
}: HamburgerMenuOverlayProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const originX = clipOriginX ?? buttonLeft;
  const originY = clipOriginY ?? buttonTop;
  const navRef = useRef<HTMLDivElement>(null);
  const scrollLockY = useRef(0);
  const uid = useId().replace(/:/g, "");
  const scopeClass = `hamburger-scope-${uid}`;
  const isCentered = menuAlignment === "center";

  const buttonSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const fontSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
  };

  const setOpen = (open: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(open);
    onOpenChange?.(open);
    if (open) onOpen?.();
    else onClose?.();
  };

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    const runAction = () => {
      item.onClick?.();

      if (item.href && !item.onClick) {
        window.location.href = item.href;
      }
    };

    if (!keepOpenOnItemClick) {
      setOpen(false);
      // Run after body scroll-lock is released (see useEffect below)
      window.setTimeout(runAction, 50);
      return;
    }

    runAction();
  };

  useEffect(() => {
    if (isOpen) {
      scrollLockY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollLockY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const y = scrollLockY.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, y);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div className={cn("hamburger-menu-root fixed inset-0 z-[250] pointer-events-none", className)}>
      <style>
        {`
          .${scopeClass} .hamburger-overlay {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: ${overlayBackground};
            z-index: ${zIndex};
            clip-path: circle(0px at ${originX} ${originY});
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            ${enableBlur ? "backdrop-filter: blur(12px);" : ""}
            pointer-events: none;
          }

          .${scopeClass} .hamburger-overlay.open {
            clip-path: circle(150% at ${originX} ${originY});
            pointer-events: auto;
          }

          .${scopeClass} .hamburger-button {
            position: fixed;
            left: ${buttonLeft};
            top: ${buttonTop};
            transform: translate(-50%, -50%);
            border-radius: var(--radius-md, 8px);
            z-index: ${zIndex + 1};
            background: ${buttonColor};
            border: 1px solid var(--color-border, #e2e2e8);
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            pointer-events: auto;
            box-shadow: var(--shadow-xs, 0 1px 2px rgba(20, 20, 32, 0.06));
          }

          .${scopeClass} .hamburger-button:hover {
            transform: translate(-50%, -50%) scale(1.04);
            border-color: var(--color-primary, #1a5f9c);
            box-shadow: var(--glow-sm, 0 0 0 3px rgba(26, 95, 156, 0.15));
          }

          .${scopeClass} .hamburger-button:focus-visible {
            outline: 2px solid var(--color-primary, #1a5f9c);
            outline-offset: 2px;
          }

          .${scopeClass} .menu-items {
            width: 100%;
            max-width: 28rem;
            padding-inline: clamp(1.5rem, 6vw, 3rem);
            font-family: ${fontFamily};
            list-style: none;
            margin: 0;
            ${menuDirection === "horizontal" ? "display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;" : ""}
            ${menuAlignment === "center" ? "text-align: center; margin-inline: auto;" : ""}
            ${menuAlignment === "right" ? "text-align: right; margin-left: auto;" : ""}
          }

          .${scopeClass} .menu-item {
            position: relative;
            list-style: none;
            padding: 0.65rem 0;
            cursor: pointer;
            transform: ${isCentered ? "translateY(24px)" : "translateX(-40px)"};
            opacity: 0;
            transition: transform 0.35s ease, opacity 0.35s ease;
            font-weight: ${fontWeight};
            color: ${textColor};
            ${menuDirection === "horizontal" ? "display: inline-block; margin: 0 1rem;" : ""}
          }

          .${scopeClass} .menu-item.visible {
            transform: translate(0, 0);
            opacity: 1;
          }

          .${scopeClass} .menu-item::before {
            content: "";
            position: absolute;
            ${isCentered ? "left: 50%; bottom: 0; transform: translateX(-50%) scaleX(0);" : "left: -1.25rem; top: 50%; transform: translateY(-50%) scaleX(0);"}
            transform-origin: ${isCentered ? "center" : "left center"};
            width: 0.55rem;
            height: 0.55rem;
            border-radius: 9999px;
            background: var(--color-primary, #1a5f9c);
            opacity: 0;
            transition: transform 0.25s ease, opacity 0.25s ease;
            pointer-events: none;
          }

          .${scopeClass} .menu-item:hover::before,
          .${scopeClass} .menu-item:focus-visible::before {
            opacity: 1;
            transform: ${isCentered ? "translateX(-50%) scaleX(1)" : "translateY(-50%) scaleX(1)"};
          }

          .${scopeClass} .menu-item.active::before {
            opacity: 1;
            transform: ${isCentered ? "translateX(-50%) scaleX(1)" : "translateY(-50%) scaleX(1)"};
          }

          .${scopeClass} .menu-item.active span {
            opacity: 1;
            color: #ffffff;
          }

          .${scopeClass} .menu-item span {
            opacity: 0.82;
            transition: opacity 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: ${isCentered ? "center" : "flex-start"};
            gap: 0.5rem;
          }

          .${scopeClass} .menu-item:hover span,
          .${scopeClass} .menu-item:focus-visible span {
            opacity: 1;
          }

          .${scopeClass} .menu-item:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.35);
            outline-offset: 4px;
            border-radius: 4px;
          }

          .${scopeClass} .menu-cta-note {
            margin-top: 2rem;
            font-family: var(--font-mono, monospace);
            font-size: 0.7rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            text-align: center;
            color: rgba(255, 255, 255, 0.45);
          }
        `}
      </style>

      <div className={scopeClass}>
        <div
          ref={navRef}
          id="navigation-menu"
          className={cn("hamburger-overlay flex-col", isOpen && "open")}
          aria-hidden={!isOpen}
        >
          <ul
            className={cn(
              "menu-items",
              menuDirection === "horizontal" && "flex flex-wrap",
            )}
          >
            {items.map((item, index) => (
              <li
                key={`${item.label}-${index}`}
                className={cn(
                  "menu-item",
                  fontSizes[fontSize],
                  isOpen && "visible",
                  item.active && "active",
                  menuItemClassName,
                )}
                style={{
                  transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s",
                }}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick(item);
                  }
                }}
                tabIndex={isOpen ? 0 : -1}
                role="button"
                aria-label={`Navigate to ${item.label}`}
              >
                <span>
                  {item.icon && <span className="menu-icon">{item.icon}</span>}
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="menu-cta-note menu-items visible" style={{ transitionDelay: `${items.length * staggerDelay}s` }}>
            Response within 24 hours · Australia
          </p>
        </div>

        {showButton && (
          <button
            type="button"
            className={cn("hamburger-button", buttonSizes[buttonSize], buttonClassName)}
            onClick={toggleMenu}
            aria-label={ariaLabel}
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
          >
            {customButton || (
              <div className="relative flex h-full w-full items-center justify-center">
                <Menu
                  className={cn(
                    "absolute transition-all duration-300",
                    isOpen ? "scale-0 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100",
                  )}
                  size={buttonSize === "sm" ? 18 : buttonSize === "md" ? 20 : 24}
                  color="var(--color-ink, #141420)"
                  aria-hidden="true"
                />
                <X
                  className={cn(
                    "absolute transition-all duration-300",
                    isOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-45 opacity-0",
                  )}
                  size={buttonSize === "sm" ? 18 : buttonSize === "md" ? 20 : 24}
                  color="var(--color-ink, #141420)"
                  aria-hidden="true"
                />
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default HamburgerMenuOverlay;
