import React from "react";
import { clsx } from "clsx";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The alert variant/severity
   */
  variant?: "info" | "success" | "warning" | "danger";

  /**
   * The title of the alert
   */
  title?: string;

  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;

  /**
   * Callback fired when the alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * The size of the alert
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional icon element to display
   */
  icon?: React.ReactNode;
}

/**
 * Alert component for displaying important messages and notifications
 *
 * Features:
 * - Multiple severity levels with appropriate styling
 * - Dismissible functionality
 * - Accessible with proper ARIA attributes
 * - Support for custom icons
 * - Compositional design for dashboard notifications
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      title,
      dismissible = false,
      onDismiss,
      size = "md",
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const handleDismiss = () => {
      onDismiss?.();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleDismiss();
      }
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-alert",
          `freeui-alert--variant-${variant}`,
          `freeui-alert--size-${size}`,
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <div className="freeui-alert-content">
          {icon && <div className="freeui-alert-icon">{icon}</div>}
          <div className="freeui-alert-body">
            {title && <div className="freeui-alert-title">{title}</div>}
            {children && <div className="freeui-alert-message">{children}</div>}
          </div>
        </div>
        {dismissible && (
          <button
            type="button"
            className="freeui-alert-dismiss"
            onClick={handleDismiss}
            onKeyDown={handleKeyDown}
            aria-label="Dismiss alert"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";