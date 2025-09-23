import React from "react";
import { clsx } from "clsx";

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the timeline item
   */
  children: React.ReactNode;

  /**
   * Icon or visual indicator for the timeline item
   */
  icon?: React.ReactNode;

  /**
   * Whether this is the last item in the timeline
   */
  isLast?: boolean;

  /**
   * Visual variant for different item types
   */
  variant?: "default" | "success" | "warning" | "error" | "info";
}

/**
 * TimelineItem component for displaying chronological events
 *
 * Features:
 * - Visual timeline connector line
 * - Customizable icon/indicator
 * - Semantic color variants
 * - Accessible structure
 * - Composable with any content
 */
export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      children,
      icon,
      isLast = false,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-timeline-item",
          `freeui-timeline-item--${variant}`,
          {
            "freeui-timeline-item--last": isLast,
          },
          className
        )}
        {...props}
      >
        <div className="freeui-timeline-item__indicator">
          <div className="freeui-timeline-item__icon">
            {icon || <div className="freeui-timeline-item__default-icon" />}
          </div>
          {!isLast && <div className="freeui-timeline-item__line" />}
        </div>
        <div className="freeui-timeline-item__content">{children}</div>
      </div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Timeline items
   */
  children: React.ReactNode;

  /**
   * Orientation of the timeline
   */
  orientation?: "vertical" | "horizontal";
}

/**
 * Timeline container component for displaying chronological content
 *
 * Features:
 * - Vertical and horizontal orientations
 * - Accessible timeline structure
 * - Composable with TimelineItem components
 * - Responsive design
 */
export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, orientation = "vertical", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-timeline",
          `freeui-timeline--${orientation}`,
          className
        )}
        role="feed"
        aria-label="Timeline"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Timeline.displayName = "Timeline";
