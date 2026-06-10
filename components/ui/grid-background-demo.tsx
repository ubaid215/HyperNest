import { cn } from "@/lib/utils";

interface GridBackgroundDemoProps {
  className?: string;
}

export default function GridBackgroundDemo({ className }: GridBackgroundDemoProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0", className)}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]",
        )}
      />
      <div className="absolute inset-0 bg-bg [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}
