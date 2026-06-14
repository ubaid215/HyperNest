import Image from "next/image";
import { SITE } from "@/lib/site-config";

const LOGOS = {
  default: {
    src: "/hypernest-logo.png",
    width: 876,
    height: 197,
  },
  footer: {
    src: "/hypernest-footer-logo.png",
    width: 876,
    height: 197,
  },
} as const;

interface BrandLogoProps {
  /** Display height in pixels */
  height?: number;
  className?: string;
  priority?: boolean;
  variant?: keyof typeof LOGOS;
}

export default function BrandLogo({
  height = 32,
  className = "",
  priority = false,
  variant = "default",
}: BrandLogoProps) {
  const logo = LOGOS[variant];
  const width = Math.round((logo.width / logo.height) * height);

  return (
    <Image
      src={logo.src}
      alt={`${SITE.brandName} logo`}
      width={width}
      height={height}
      className={`brand-logo ${className}`.trim()}
      priority={priority}
    />
  );
}
