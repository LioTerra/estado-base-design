import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial container — single source of truth for horizontal rhythm.
 * Always: px-6 md:px-10, mx-auto, with a configurable max width.
 */
export function Container({
  as: Tag = "div",
  size = "3xl",
  className,
  children,
}: {
  as?: ElementType;
  size?: "prose" | "2xl" | "3xl" | "4xl" | "6xl";
  className?: string;
  children: ReactNode;
}) {
  const max = {
    // ~60ch — editorial reading measure for body copy
    prose: "max-w-[60ch]",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
  }[size];

  return (
    <Tag className={cn("mx-auto w-full px-6 md:px-10", max, className)}>
      {children}
    </Tag>
  );
}