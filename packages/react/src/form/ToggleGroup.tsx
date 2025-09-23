import React from "react";
import { clsx } from "clsx";

export interface ToggleGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The options for the toggle group
   */
  options: ToggleGroupOption[];

  /**
   * The currently selected values (for multi-select)
   */
  value?: string[];

  /**
   * The currently selected value (for single-select)
   */
  singleValue?: string;

  /**
   * Whether multiple options can be selected
   */
  multiple?: boolean;

  /**
   * The size of the toggle group
   */
  size?: "sm" | "md" | "lg";

  /**
   * The visual variant
   */
  variant?: "default" | "outline";

  /**
   * Whether the toggle group is disabled
   */
  disabled?: boolean;

  /**
   * Callback fired when the selection changes
   */
  onChange?: (value: string[] | string) => void;

  /**
   * Label for the toggle group
   */
  label?: string;
}

/**
 * ToggleGroup component for selecting multiple options
 *
 * Features:
 * - Single or multi-select modes
 * - Native keyboard navigation support (Enter/Space via button)
 * - Accessible with proper ARIA attributes
 * - Multiple sizes and variants
 * - Compositional design for metric selection
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      options,
      value = [],
      singleValue,
      multiple = false,
      size = "md",
      variant = "default",
      disabled = false,
      onChange,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const activeValue = multiple ? value : singleValue ? [singleValue] : [];

    const handleToggle = (optionValue: string) => {
      if (disabled) return;

      if (multiple) {
        const newValue = activeValue.includes(optionValue)
          ? activeValue.filter((v) => v !== optionValue)
          : [...activeValue, optionValue];
        onChange?.(newValue);
      } else {
        const newValue = activeValue.includes(optionValue) ? "" : optionValue;
        onChange?.(newValue);
      }
    };

    return (
      <div
        ref={ref}
        className={clsx("freeui-toggle-group-wrapper", className)}
        {...props}
      >
        {label && (
          <div className="freeui-toggle-group-label" id={`${props.id}-label`}>
            {label}
          </div>
        )}
        <div
          className={clsx(
            "freeui-toggle-group",
            `freeui-toggle-group--size-${size}`,
            `freeui-toggle-group--variant-${variant}`,
            {
              "freeui-toggle-group--disabled": disabled,
            }
          )}
          role="group"
          aria-labelledby={label ? `${props.id}-label` : undefined}
        >
          {options.map((option) => {
            const isActive = activeValue.includes(option.value);
            const isDisabled = disabled || option.disabled;

            return (
              <button
                key={option.value}
                type="button"
                className={clsx(
                  "freeui-toggle-group-option",
                  {
                    "freeui-toggle-group-option--active": isActive,
                    "freeui-toggle-group-option--disabled": isDisabled,
                  }
                )}
                disabled={isDisabled}
                onClick={() => handleToggle(option.value)}
                aria-pressed={isActive}
                aria-disabled={isDisabled}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";