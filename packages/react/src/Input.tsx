import React from "react";
import { clsx } from "clsx";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The visual style variant of the input
   */
  variant?: "outline" | "subtle";
  
  /**
   * The size of the input
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Whether the input has an error state
   */
  error?: boolean;
}

/**
 * Input component with WCAG AA compliance and multiple variants
 * 
 * Features:
 * - Semantic HTML input element
 * - Keyboard navigation support
 * - Screen reader compatible
 * - Focus management
 * - Error states
 * - Multiple sizes and variants
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "md",
      error = false,
      className,
      type = "text",
      disabled,
      ...props
    },
    ref
  ) => {
    const inputClass = clsx(
      "freeui-input",
      `freeui-input--${variant}`,
      `freeui-input--${size}`,
      {
        "freeui-input--disabled": disabled,
        "freeui-input--error": error,
      },
      className
    );

    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={inputClass}
        aria-invalid={error}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";