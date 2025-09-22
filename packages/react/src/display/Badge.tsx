import React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual variant of the badge
   */
  variant?: "default" | "success" | "warning" | "danger" | "info" | "neutral";

  /**
   * The size of the badge
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the badge should have a filled background
   */
  filled?: boolean;
}

/**
 * Badge component for status indicators and labels
 *
 * Features:
 * - Semantic color variants for different states
 * - Multiple sizes for different contexts
 * - Filled and outlined styles
 * - Accessible with proper color contrast
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      filled = false,
      className,
      ...props
    },
    ref
  ) => {
    const badgeClass = clsx(
      "freeui-badge",
      `freeui-badge--${variant}`,
      `freeui-badge--size-${size}`,
      {
        "freeui-badge--filled": filled,
        "freeui-badge--outlined": !filled,
      },
      className
    );

    return (
      <span
        ref={ref}
        className={badgeClass}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";