import React from "react";
import { clsx } from "clsx";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The spacing between stack items
   */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * The alignment of stack items along the cross axis
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Whether to wrap items when they overflow
   */
  wrap?: boolean;
}

/**
 * Stack component for vertical layout of elements
 *
 * Features:
 * - Configurable spacing using design tokens
 * - Flexible alignment options
 * - Optional wrapping behavior
 * - Semantic HTML with proper accessibility
 * - Fully composable with any children
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      gap = "md",
      align = "stretch",
      wrap = false,
      className,
      ...props
    },
    ref
  ) => {
    const stackClass = clsx(
      "freeui-stack",
      `freeui-stack--gap-${gap}`,
      `freeui-stack--align-${align}`,
      {
        "freeui-stack--wrap": wrap,
      },
      className
    );

    return (
      <div ref={ref} className={stackClass} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";
