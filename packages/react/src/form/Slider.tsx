import React from "react";
import { clsx } from "clsx";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * The size of the slider
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the slider is in an error state
   */
  error?: boolean;

  /**
   * The label text for the slider
   */
  label?: string;

  /**
   * Additional description text
   */
  description?: string;

  /**
   * Show the current value
   */
  showValue?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ size = "md", error = false, label, description, showValue = false, className, ...props }, ref) => {
    const sliderId = props.id || `slider-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={clsx("freeui-slider-wrapper", className)}>
        {label && (
          <div className="freeui-slider-header">
            <label htmlFor={sliderId} className="freeui-slider-label">
              {label}
            </label>
            {showValue && (
              <span className="freeui-slider-value">{props.value || props.defaultValue || 0}</span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          id={sliderId}
          className={clsx(
            "freeui-slider",
            `freeui-slider--size-${size}`,
            {
              "freeui-slider--error": error,
            }
          )}
          aria-describedby={description ? `${sliderId}-description` : undefined}
          {...props}
        />
        {description && (
          <div id={`${sliderId}-description`} className="freeui-slider-description">
            {description}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";