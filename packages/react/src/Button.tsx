import React from "react";
import { colors, spacing, borderRadius, shadows, typography } from "@freeui/tokens";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

const getButtonStyles = (variant: ButtonProps["variant"], size: ButtonProps["size"]) => {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    fontFamily: typography.fontFamily.sans.join(", "),
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    border: "1px solid transparent",
    borderRadius: borderRadius.md,
    cursor: "pointer",
    transition: "all 150ms ease-in-out",
    textDecoration: "none",
    userSelect: "none" as const,
    outline: "none",
    position: "relative" as const,
  };

  // Size-specific styles
  const sizeStyles = {
    sm: {
      fontSize: typography.fontSize.sm,
      padding: `${spacing[2]} ${spacing[3]}`,
      minHeight: "2rem",
    },
    md: {
      fontSize: typography.fontSize.base,
      padding: `${spacing[3]} ${spacing[4]}`,
      minHeight: "2.5rem",
    },
    lg: {
      fontSize: typography.fontSize.lg,
      padding: `${spacing[4]} ${spacing[6]}`,
      minHeight: "3rem",
    },
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: colors.brand[500],
      color: colors.white,
      borderColor: colors.brand[500],
      boxShadow: shadows.sm,
      ":hover": {
        backgroundColor: colors.brand[600],
        borderColor: colors.brand[600],
        boxShadow: shadows.md,
      },
      ":focus-visible": {
        outline: `2px solid ${colors.brand[500]}`,
        outlineOffset: "2px",
      },
      ":active": {
        backgroundColor: colors.brand[700],
        borderColor: colors.brand[700],
        transform: "translateY(1px)",
      },
      ":disabled": {
        backgroundColor: colors.neutral[300],
        borderColor: colors.neutral[300],
        color: colors.neutral[500],
        cursor: "not-allowed",
        boxShadow: "none",
        transform: "none",
      },
    },
    secondary: {
      backgroundColor: colors.neutral[100],
      color: colors.neutral[800],
      borderColor: colors.neutral[200],
      ":hover": {
        backgroundColor: colors.neutral[200],
        borderColor: colors.neutral[300],
      },
      ":focus-visible": {
        outline: `2px solid ${colors.brand[500]}`,
        outlineOffset: "2px",
      },
      ":active": {
        backgroundColor: colors.neutral[300],
        transform: "translateY(1px)",
      },
      ":disabled": {
        backgroundColor: colors.neutral[100],
        borderColor: colors.neutral[200],
        color: colors.neutral[400],
        cursor: "not-allowed",
        transform: "none",
      },
    },
    outline: {
      backgroundColor: "transparent",
      color: colors.brand[600],
      borderColor: colors.brand[300],
      ":hover": {
        backgroundColor: colors.brand[50],
        borderColor: colors.brand[400],
      },
      ":focus-visible": {
        outline: `2px solid ${colors.brand[500]}`,
        outlineOffset: "2px",
      },
      ":active": {
        backgroundColor: colors.brand[100],
        transform: "translateY(1px)",
      },
      ":disabled": {
        backgroundColor: "transparent",
        borderColor: colors.neutral[200],
        color: colors.neutral[400],
        cursor: "not-allowed",
        transform: "none",
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: colors.brand[600],
      borderColor: "transparent",
      ":hover": {
        backgroundColor: colors.brand[50],
      },
      ":focus-visible": {
        outline: `2px solid ${colors.brand[500]}`,
        outlineOffset: "2px",
      },
      ":active": {
        backgroundColor: colors.brand[100],
        transform: "translateY(1px)",
      },
      ":disabled": {
        backgroundColor: "transparent",
        color: colors.neutral[400],
        cursor: "not-allowed",
        transform: "none",
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size || "md"],
    ...variantStyles[variant || "primary"],
  };
};

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
      style,
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonStyles = getButtonStyles(variant, size);
    
    const combinedStyles = {
      ...buttonStyles,
      ...(fullWidth && { width: "100%" }),
      ...(disabled && buttonStyles[":disabled"]),
      ...style,
    };

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
        style={combinedStyles}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span
            className="freeui-button__spinner"
            aria-hidden="true"
            style={{
              width: "1em",
              height: "1em",
              border: "2px solid currentColor",
              borderRightColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        )}
        {!loading && startIcon && (
          <span className="freeui-button__start-icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children && (
          <span className="freeui-button__text">{children}</span>
        )}
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