import React from "react";
import { clsx } from "clsx";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /**
   * The size of the select
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the select is in an error state
   */
  error?: boolean;

  /**
   * The label text for the select
   */
  label?: string;

  /**
   * Additional description text
   */
  description?: string;

  /**
   * Options for the select
   */
  options: SelectOption[];

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
}

/**
 * Select component for choosing from a list of options
 *
 * Features:
 * - Semantic HTML with proper accessibility
 * - Keyboard navigation support
 * - Screen reader compatible
 * - Multiple sizes
 * - Error states
 * - Compositional design
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = "md",
      error = false,
      label,
      description,
      options,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = props.id || `select-${generatedId}`;

    const selectElement = (
      <select
        ref={ref}
        id={selectId}
        className={clsx(
          "freeui-select",
          `freeui-select--size-${size}`,
          {
            "freeui-select--error": error,
          },
          className
        )}
        aria-describedby={description ? `${selectId}-description` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );

    if (label) {
      return (
        <div className="freeui-select-wrapper">
          <label htmlFor={selectId} className="freeui-select-label">
            {label}
          </label>
          {selectElement}
          {description && (
            <div
              id={`${selectId}-description`}
              className="freeui-select-description"
            >
              {description}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="freeui-select-wrapper">
        {selectElement}
        {description && (
          <div
            id={`${selectId}-description`}
            className="freeui-select-description"
          >
            {description}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";