"use client";

import Image from "next/image";
import { useState } from "react";

interface ServiceVisualProps {
  src: string;
  alt: string;
  gradient: string;
}

export default function ServiceVisual({ src, alt, gradient }: ServiceVisualProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="service-slide-visual">
      <div
        className="service-slide-visual-bg"
        style={{ background: gradient }}
        aria-hidden="true"
      />

      {hasError ? (
        <p className="service-slide-visual-fallback">{alt}</p>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 42vw"
          className="service-slide-image"
          onError={() => setHasError(true)}
        />
      )}

      <div className="service-slide-visual-glass" aria-hidden="true" />
    </div>
  );
}
