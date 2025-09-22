import React from "react";
import { clsx } from "clsx";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The text size following design system scale
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * The text weight
   */
  weight?: "normal" | "medium" | "semibold" | "bold";

  /**
   * The text color using semantic naming
   */
  color?: "default" | "subdued" | "success" | "warning" | "danger" | "accent";

  /**
   * Whether text should be truncated with ellipsis
   */
  truncate?: boolean;

  /**
   * Custom element type to render
   */
  as?: "span" | "p" | "div" | "code";
}

/**
 * Text component for consistent typography
 *
 * Features:
 * - Design system typography scale
 * - Semantic color variants
 * - Text truncation support
 * - Flexible HTML element rendering
 * - Full composability with children
 */
export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      children,
      size = "md",
      weight = "normal",
      color = "default",
      truncate = false,
      as = "span",
      className,
      ...props
    },
    ref
  ) => {
    const textClass = clsx(
      "freeui-text",
      `freeui-text--size-${size}`,
      `freeui-text--weight-${weight}`,
      `freeui-text--color-${color}`,
      {
        "freeui-text--truncate": truncate,
      },
      className
    );

    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={textClass}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";