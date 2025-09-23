import React from "react";
import { clsx } from "clsx";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The orientation of the timeline
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The visual style of the timeline
   */
  variant?: "solid" | "dashed" | "dotted";

  /**
   * The thickness of the timeline
   */
  thickness?: "thin" | "normal" | "thick";

  /**
   * The spacing around the timeline
   */
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * Timeline primitive component for creating visual timeline lines
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Multiple visual styles (solid, dashed, dotted)
 * - Configurable thickness and spacing
 * - Pure primitive - composable with other layout components
 * - Design token-based styling
 *
 * Use with Stack, Inline, and absolute positioning to create complex timeline layouts.
 */
export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      orientation = "vertical",
      variant = "solid",
      thickness = "normal",
      margin = "none",
      className,
      ...props
    },
    ref
  ) => {
    const timelineClass = clsx(
      "freeui-timeline",
      `freeui-timeline--${orientation}`,
      `freeui-timeline--${variant}`,
      `freeui-timeline--${thickness}`,
      `freeui-timeline--margin-${margin}`,
      className
    );

    return (
      <div
        ref={ref}
        className={timelineClass}
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Timeline.displayName = "Timeline";
