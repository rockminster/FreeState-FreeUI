import React from "react";
import { clsx } from "clsx";
import type { PlanBadgeProps } from "./types";

/**
 * PlanBadge component displays the plan type with appropriate styling
 *
 * Features:
 * - Visual distinction between plan types (Free, Pro, Enterprise)
 * - Semantic colors using design tokens
 * - Accessible by default with proper contrast
 * - Compact design suitable for cards and lists
 */
export const PlanBadge = React.forwardRef<HTMLSpanElement, PlanBadgeProps>(
  ({ plan, className, ...props }, ref) => {
    const badgeClass = clsx(
      "freeui-plan-badge",
      `freeui-plan-badge--${plan}`,
      className
    );

    const planLabel = {
      free: "Free",
      pro: "Pro",
      enterprise: "Enterprise",
    }[plan];

    return (
      <span ref={ref} className={badgeClass} {...props}>
        {planLabel}
      </span>
    );
  }
);

PlanBadge.displayName = "PlanBadge";
