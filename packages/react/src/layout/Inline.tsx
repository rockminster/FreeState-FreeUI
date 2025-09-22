import React from "react";
import { clsx } from "clsx";

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The spacing between inline items
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * The alignment of inline items along the main axis
   */
  justify?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";

  /**
   * The alignment of inline items along the cross axis
   */
  align?: "start" | "center" | "end" | "baseline" | "stretch";

  /**
   * Whether to wrap items when they overflow
   */
  wrap?: boolean;
}

/**
 * Inline component for horizontal layout of elements
 *
 * Features:
 * - Configurable spacing using design tokens
 * - Flexible alignment and justification options
 * - Optional wrapping behavior
 * - Semantic HTML with proper accessibility
 * - Fully composable with any children
 */
export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      children,
      gap = "md",
      justify = "start",
      align = "center",
      wrap = false,
      className,
      ...props
    },
    ref
  ) => {
    const inlineClass = clsx(
      "freeui-inline",
      `freeui-inline--gap-${gap}`,
      `freeui-inline--justify-${justify}`,
      `freeui-inline--align-${align}`,
      {
        "freeui-inline--wrap": wrap,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={inlineClass}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Inline.displayName = "Inline";