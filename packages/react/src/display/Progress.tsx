import React from "react";
import { clsx } from "clsx";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The current value (0-100)
   */
  value: number;

  /**
   * The maximum value (default: 100)
   */
  max?: number;

  /**
   * The size of the progress bar
   */
  size?: "sm" | "md" | "lg";

  /**
   * The visual variant
   */
  variant?: "default" | "success" | "warning" | "danger";

  /**
   * Whether to show the value as text
   */
  showValue?: boolean;

  /**
   * Custom label for the progress
   */
  label?: string;

  /**
   * Whether the progress is indeterminate (loading)
   */
  indeterminate?: boolean;
}

/**
 * Progress component for displaying completion status and metrics
 *
 * Features:
 * - WCAG AA compliant with proper ARIA attributes
 * - Multiple sizes and variants
 * - Support for determinate and indeterminate states
 * - Customizable labels and value display
 * - Compositional design for use in dashboards
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size = "md",
      variant = "default",
      showValue = false,
      label,
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = indeterminate
      ? 0
      : Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={clsx("freeui-progress-wrapper", className)}
        {...props}
      >
        {label && (
          <div className="freeui-progress-header">
            <span className="freeui-progress-label">{label}</span>
            {showValue && !indeterminate && (
              <span className="freeui-progress-value">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={clsx(
            "freeui-progress",
            `freeui-progress--size-${size}`,
            `freeui-progress--variant-${variant}`,
            {
              "freeui-progress--indeterminate": indeterminate,
            }
          )}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          <div
            className="freeui-progress-bar"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
        {showValue && !label && !indeterminate && (
          <span className="freeui-progress-value">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";
