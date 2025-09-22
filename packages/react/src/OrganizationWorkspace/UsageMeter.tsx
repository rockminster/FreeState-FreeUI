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
  ({ label, usage, limit, unit = "", variant, className, ...props }, ref) => {
    // Handle zero limit as special case for accessibility and UX
    const isZeroLimit = limit === 0;
    const percentage = isZeroLimit
      ? usage > 0
        ? 100
        : 0 // Show 100% if there's usage with zero limit (over quota)
      : Math.min((usage / limit) * 100, 100);

    // Auto-determine variant based on usage if not provided
    const calculatedVariant =
      variant ||
      (() => {
        if (isZeroLimit && usage > 0) return "danger"; // Over quota
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

    // ARIA attributes that maintain semantic consistency
    const ariaValueNow = isZeroLimit ? Math.min(usage, 1) : usage;
    const ariaValueMax = isZeroLimit ? 1 : limit;
    const ariaLabel =
      isZeroLimit && usage > 0
        ? `${label}: ${usage} ${unit} used (over quota - no limit set)`
        : `${label}: ${usage} of ${limit} ${unit} used (${percentage.toFixed(1)}%)`;

    return (
      <div ref={ref} className={meterClass} {...props}>
        <div className="freeui-usage-meter__header">
          <span className="freeui-usage-meter__label">{label}</span>
          <span className="freeui-usage-meter__numbers">
            {formatNumber(usage)} /{" "}
            {isZeroLimit ? "No limit" : formatNumber(limit)} {unit}
          </span>
        </div>
        <div className="freeui-usage-meter__track">
          <div
            className="freeui-usage-meter__fill"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={ariaValueNow}
            aria-valuemin={0}
            aria-valuemax={ariaValueMax}
            aria-label={ariaLabel}
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
