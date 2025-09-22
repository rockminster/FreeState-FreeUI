import React from "react";
import { clsx } from "clsx";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The heading level for semantic structure
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The visual size (independent of semantic level)
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

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
}

/**
 * Heading component for consistent semantic and visual hierarchy
 *
 * Features:
 * - Semantic heading levels (h1-h6)
 * - Visual size independent of semantic level
 * - Design system typography scale
 * - Semantic color variants
 * - Text truncation support
 * - Accessibility-first approach
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      level = 2,
      size = "lg",
      weight = "semibold",
      color = "default",
      truncate = false,
      className,
      ...props
    },
    ref
  ) => {
    const headingClass = clsx(
      "freeui-heading",
      `freeui-heading--size-${size}`,
      `freeui-heading--weight-${weight}`,
      `freeui-heading--color-${color}`,
      {
        "freeui-heading--truncate": truncate,
      },
      className
    );

    const headingTagMap = {
      1: "h1",
      2: "h2",
      3: "h3",
      4: "h4",
      5: "h5",
      6: "h6",
    } as const;
    const Component = headingTagMap[level];

    return React.createElement(
      Component,
      {
        ref,
        className: headingClass,
        ...props,
      },
      children
    );
  }
);

Heading.displayName = "Heading";
