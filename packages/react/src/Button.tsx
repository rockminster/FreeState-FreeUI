import React from "react";
import { clsx } from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";

  /**
   * The size of the button
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;

  /**
   * Loading state for the button
   */
  loading?: boolean;

  /**
   * Icon to display before the button text
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display after the button text
   */
  endIcon?: React.ReactNode;
}

/**
 * Button component with WCAG AA compliance and multiple variants
 *
 * Features:
 * - Semantic HTML button element
 * - Keyboard navigation support
 * - Screen reader compatible
 * - Focus management
 * - Loading states
 * - Icon support
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      fullWidth = false,
      loading = false,
      startIcon,
      endIcon,
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonClass = clsx(
      "freeui-button",
      `freeui-button--${variant}`,
      `freeui-button--${size}`,
      {
        "freeui-button--disabled": disabled,
        "freeui-button--loading": loading,
        "freeui-button--full-width": fullWidth,
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={buttonClass}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className="freeui-button__spinner" aria-hidden="true" />
        )}
        {!loading && startIcon && (
          <span className="freeui-button__start-icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children && <span className="freeui-button__text">{children}</span>}
        {!loading && endIcon && (
          <span className="freeui-button__end-icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
