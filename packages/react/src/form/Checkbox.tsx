import React from "react";
import { clsx } from "clsx";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /**
   * The size of the checkbox
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the checkbox is in an error state
   */
  error?: boolean;

  /**
   * The label text for the checkbox
   */
  label?: string;

  /**
   * Additional description text
   */
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { size = "md", error = false, label, description, className, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = props.id || `checkbox-${generatedId}`;

    return (
      <div className={clsx("freeui-checkbox-wrapper", className)}>
        <div className="freeui-checkbox-container">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={clsx(
              "freeui-checkbox",
              `freeui-checkbox--size-${size}`,
              {
                "freeui-checkbox--error": error,
              }
            )}
            aria-describedby={
              description ? `${checkboxId}-description` : undefined
            }
            {...props}
          />
          {label && (
            <label htmlFor={checkboxId} className="freeui-checkbox-label">
              {label}
            </label>
          )}
        </div>
        {description && (
          <div
            id={`${checkboxId}-description`}
            className="freeui-checkbox-description"
          >
            {description}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
