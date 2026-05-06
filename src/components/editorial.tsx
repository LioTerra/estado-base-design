import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial typography primitives — single source of truth for the
 * project's reading scale. Use these instead of repeating max-w / leading /
 * font-serif classes across pages.
 *
 *  - <Hero />     : page-level title (h1), wide measure (max-w-3xl)
 *  - <Title />    : section title (h2/h3), wide measure (max-w-3xl)
 *  - <Lede />     : opening paragraph under a title, slightly larger
 *  - <Prose />    : body copy block, ~60ch reading measure
 *
 * All components accept `align` ("left" | "center", default "left") and
 * forward `className` so callers can tweak spacing without redefining type.
 */

type Align = "left" | "center";

const alignClass: Record<Align, string> = {
  left: "",
  center: "text-center mx-auto",
};

export function Hero({
  as: Tag = "h1",
  align = "center",
  className,
  children,
}: {
  as?: ElementType;
  align?: Align;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-serif text-[44px] sm:text-[58px] lg:text-[76px] leading-[1.05] tracking-tight text-foreground max-w-3xl",
        alignClass[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Title({
  as: Tag = "h2",
  align = "center",
  className,
  children,
}: {
  as?: ElementType;
  align?: Align;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight text-foreground max-w-3xl",
        alignClass[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Lede({
  align = "center",
  italic = false,
  className,
  children,
}: {
  align?: Align;
  italic?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[18px] md:text-[20px] leading-[1.7] text-muted-foreground max-w-[60ch]",
        italic && "font-serif italic",
        alignClass[align],
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Prose({
  as: Tag = "div",
  align = "left",
  className,
  children,
}: {
  as?: ElementType;
  align?: Align;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "space-y-6 text-[17px] md:text-[18px] leading-[1.8] text-muted-foreground max-w-[60ch]",
        alignClass[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Small uppercase label rendered above a Title. Centered with hairline
 * accents on both sides by default.
 */
export function Eyebrow({
  align = "center",
  className,
  children,
}: {
  align?: Align;
  className?: string;
  children: ReactNode;
}) {
  const layout =
    align === "center"
      ? "inline-flex items-center gap-3 mx-auto"
      : "flex items-center gap-3";
  return (
    <div
      className={cn(
        "text-xs uppercase tracking-[0.2em] text-accent",
        layout,
        className,
      )}
    >
      <span aria-hidden className="inline-block h-px w-6 bg-accent" />
      {children}
      {align === "center" && (
        <span aria-hidden className="inline-block h-px w-6 bg-accent" />
      )}
    </div>
  );
}