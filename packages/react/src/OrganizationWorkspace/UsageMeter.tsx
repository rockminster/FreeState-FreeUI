import React from "react";
import { clsx } from "clsx";
import type { UsageMeterProps } from "./types";

/**
 * UsageMeter component displays usage vs limits with visual progress indicator
 *
 * Features:
 * - Visual progress bar with percentage calculation
 * - Color-coded variants (default, warning, danger)
 * - Accessible with ARIA labels and proper contrast
 * - Shows actual usage numbers and limits
 * - Automatically calculates warning/danger states based on usage percentage
 */
export const UsageMeter = React.forwardRef<HTMLDivElement, UsageMeterProps>(
  (
    {
      label,
      usage,
      limit,
      unit = "",
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = limit > 0 ? Math.min((usage / limit) * 100, 100) : 0;
    
    // Auto-determine variant based on usage if not provided
    const calculatedVariant = variant || (() => {
      if (percentage >= 90) return "danger";
      if (percentage >= 75) return "warning";
      return "default";
    })();

    const meterClass = clsx(
      "freeui-usage-meter",
      `freeui-usage-meter--${calculatedVariant}`,
      className
    );

    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
      }
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
      }
      return num.toString();
    };

    return (
      <div ref={ref} className={meterClass} {...props}>
        <div className="freeui-usage-meter__header">
          <span className="freeui-usage-meter__label">{label}</span>
          <span className="freeui-usage-meter__numbers">
            {formatNumber(usage)} / {formatNumber(limit)} {unit}
          </span>
        </div>
        <div className="freeui-usage-meter__track">
          <div
            className="freeui-usage-meter__fill"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={usage}
            aria-valuemin={0}
            aria-valuemax={limit}
            aria-label={`${label}: ${usage} of ${limit} ${unit} used (${percentage.toFixed(1)}%)`}
          />
        </div>
        <div className="freeui-usage-meter__percentage">
          {percentage.toFixed(1)}%
        </div>
      </div>
    );
  }
);

UsageMeter.displayName = "UsageMeter";