import React from "react";
import { clsx } from "clsx";

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /**
   * The size of the radio button
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the radio button is in an error state
   */
  error?: boolean;

  /**
   * The label text for the radio button
   */
  label?: string;

  /**
   * Additional description text
   */
  description?: string;
}

/**
 * RadioButton component for single selection from multiple options
 *
 * Features:
 * - Semantic HTML radio input
 * - Keyboard navigation support (Arrow keys, Space)
 * - Screen reader compatible
 * - Focus management
 * - Multiple sizes
 * - Error states
 * - Compositional design
 *
 * Usage:
 * Group RadioButton components with the same `name` prop for proper radio behavior
 */
export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { size = "md", error = false, label, description, className, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const radioId = props.id || `radio-${generatedId}`;

    return (
      <div className={clsx("freeui-radio-wrapper", className)}>
        <div className="freeui-radio-container">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={clsx("freeui-radio", `freeui-radio--size-${size}`, {
              "freeui-radio--error": error,
            })}
            aria-describedby={
              description ? `${radioId}-description` : undefined
            }
            {...props}
          />
          {label && (
            <label htmlFor={radioId} className="freeui-radio-label">
              {label}
            </label>
          )}
        </div>
        {description && (
          <div
            id={`${radioId}-description`}
            className="freeui-radio-description"
          >
            {description}
          </div>
        )}
      </div>
    );
  }
);

RadioButton.displayName = "RadioButton";

export interface RadioGroupProps {
  /**
   * The name for the radio group (required for proper radio behavior)
   */
  name: string;

  /**
   * The children radio buttons
   */
  children: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * The direction of the radio group layout
   */
  direction?: "row" | "column";

  /**
   * Gap between radio buttons
   */
  gap?: "sm" | "md" | "lg";
}

/**
 * RadioGroup component to group related RadioButton components
 *
 * Provides proper semantic grouping and layout for radio buttons
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, children, className, direction = "column", gap = "md" }, ref) => {
    // Inject the name prop into all RadioButton children
    const childrenWithName = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === RadioButton) {
        return React.cloneElement(child, { name, ...child.props });
      }
      return child;
    });

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={clsx(
          "freeui-radio-group",
          `freeui-radio-group--direction-${direction}`,
          `freeui-radio-group--gap-${gap}`,
          className
        )}
      >
        {childrenWithName}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
