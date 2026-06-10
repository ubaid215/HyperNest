"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function HorizontalScroll({
  children,
  className = "",
  ariaLabel = "Scrollable content",
}: HorizontalScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const start = useRef({ x: 0, scroll: 0 });

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.button !== 0) return;
    setDragging(true);
    start.current = { x: e.clientX, scroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !trackRef.current) return;
    const dx = e.clientX - start.current.x;
    trackRef.current.scrollLeft = start.current.scroll - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setDragging(false);
    trackRef.current.style.cursor = "";
    trackRef.current.style.userSelect = "";
    try {
      trackRef.current.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <div
      ref={trackRef}
      className={`horizontal-scroll ${className}`}
      role="region"
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <div className="horizontal-scroll-inner">{children}</div>
    </div>
  );
}
