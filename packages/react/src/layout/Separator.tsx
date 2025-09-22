import React from "react";
import { clsx } from "clsx";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * The visual style of the separator
   */
  variant?: "solid" | "dashed" | "dotted";

  /**
   * The spacing around the separator
   */
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * The orientation of the separator
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * Separator component for dividing content sections
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Multiple visual styles
 * - Configurable spacing using design tokens
 * - Semantic HTML with ARIA support
 * - Accessible by default
 */
export const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  (
    {
      variant = "solid",
      margin = "md",
      orientation = "horizontal",
      className,
      ...props
    },
    ref
  ) => {
    const separatorClass = clsx(
      "freeui-separator",
      `freeui-separator--${variant}`,
      `freeui-separator--margin-${margin}`,
      `freeui-separator--${orientation}`,
      className
    );

    return (
      <hr
        ref={ref}
        className={separatorClass}
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
