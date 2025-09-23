import React from "react";
import { clsx } from "clsx";

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The status level
   */
  status: "healthy" | "warning" | "critical" | "unknown" | "loading";

  /**
   * The size of the indicator
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether to show as a pulse animation for loading/active states
   */
  pulse?: boolean;

  /**
   * Optional label text
   */
  label?: string;

  /**
   * Whether to show the status as text alongside the indicator
   */
  showStatus?: boolean;

  /**
   * Custom status text (overrides default status text)
   */
  statusText?: string;
}

/**
 * StatusIndicator component for showing system health and alert status
 *
 * Features:
 * - Clear visual status communication
 * - Multiple sizes
 * - Pulse animation for active states
 * - Accessible with proper ARIA attributes
 * - Compositional design for dashboards
 */
export const StatusIndicator = React.forwardRef<
  HTMLDivElement,
  StatusIndicatorProps
>(
  (
    {
      status,
      size = "md",
      pulse = false,
      label,
      showStatus = false,
      statusText,
      className,
      ...props
    },
    ref
  ) => {
    const getDefaultStatusText = (status: string) => {
      switch (status) {
        case "healthy":
          return "Healthy";
        case "warning":
          return "Warning";
        case "critical":
          return "Critical";
        case "unknown":
          return "Unknown";
        case "loading":
          return "Loading";
        default:
          return status;
      }
    };

    const displayStatus = statusText || getDefaultStatusText(status);

    return (
      <div
        ref={ref}
        className={clsx("freeui-status-indicator-wrapper", className)}
        {...props}
      >
        <div
          className={clsx(
            "freeui-status-indicator",
            `freeui-status-indicator--status-${status}`,
            `freeui-status-indicator--size-${size}`,
            {
              "freeui-status-indicator--pulse": pulse || status === "loading",
            }
          )}
          role="status"
          aria-label={`Status: ${displayStatus}`}
        />
        {label && (
          <span className="freeui-status-indicator-label">{label}</span>
        )}
        {showStatus && (
          <span className="freeui-status-indicator-text">{displayStatus}</span>
        )}
      </div>
    );
  }
);

StatusIndicator.displayName = "StatusIndicator";
