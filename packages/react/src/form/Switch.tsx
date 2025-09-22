import React from "react";
import { clsx } from "clsx";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /**
   * The size of the switch
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the switch is in an error state
   */
  error?: boolean;

  /**
   * The label text for the switch
   */
  label?: string;

  /**
   * Additional description text
   */
  description?: string;

  /**
   * Position of the label relative to the switch
   */
  labelPosition?: "start" | "end";
}

/**
 * Switch component for boolean toggles with WCAG AA compliance
 *
 * Features:
 * - Semantic HTML with proper ARIA attributes
 * - Keyboard navigation support (Space to toggle)
 * - Screen reader compatible
 * - Focus management
 * - Multiple sizes
 * - Error states
 * - Compositional design
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = "md",
      error = false,
      label,
      description,
      labelPosition = "end",
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = props.id || `switch-${generatedId}`;

    const switchTrack = (
      <span className="freeui-switch-track">
        <span className="freeui-switch-thumb" />
      </span>
    );

    // If we have a label, create a single label containing both track and text
    if (label) {
      const labelContent =
        labelPosition === "start" ? [label, switchTrack] : [switchTrack, label];

      return (
        <div className={clsx("freeui-switch-wrapper", className)}>
          <label htmlFor={switchId} className="freeui-switch-field">
            <input
              ref={ref}
              type="checkbox"
              role="switch"
              id={switchId}
              className={clsx("freeui-switch", `freeui-switch--size-${size}`, {
                "freeui-switch--error": error,
              })}
              aria-describedby={
                description ? `${switchId}-description` : undefined
              }
              {...props}
            />
            {labelContent.map((item, index) => (
              <span
                key={index}
                className={
                  typeof item === "string" ? "freeui-switch-label" : undefined
                }
              >
                {item}
              </span>
            ))}
          </label>
          {description && (
            <div
              id={`${switchId}-description`}
              className="freeui-switch-description"
            >
              {description}
            </div>
          )}
        </div>
      );
    }

    // If no label, use a label with screen reader text for accessibility
    return (
      <div className={clsx("freeui-switch-wrapper", className)}>
        <label htmlFor={switchId} className="freeui-switch-field">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={switchId}
            className={clsx("freeui-switch", `freeui-switch--size-${size}`, {
              "freeui-switch--error": error,
            })}
            aria-describedby={
              description ? `${switchId}-description` : undefined
            }
            {...props}
          />
          {switchTrack}
          <span className="sr-only">Toggle switch</span>
        </label>
        {description && (
          <div
            id={`${switchId}-description`}
            className="freeui-switch-description"
          >
            {description}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
