import React from "react";
import { clsx } from "clsx";
import { Button } from "../Button";

export interface ExportOption {
  /**
   * Option value
   */
  value: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
}

export interface ExportMenuProps {
  /**
   * Available export options
   */
  options: ExportOption[];

  /**
   * Callback when an option is selected
   */
  onExport: (value: string) => void;

  /**
   * Whether the export is in progress
   */
  loading?: boolean;

  /**
   * Custom trigger button
   */
  trigger?: React.ReactNode;

  /**
   * Menu placement
   */
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}

/**
 * ExportMenu component for selecting export formats
 *
 * Features:
 * - Dropdown menu with export options
 * - Support for descriptions and disabled states
 * - Loading state support
 * - Customizable trigger
 * - Accessible keyboard navigation
 */
export const ExportMenu = React.forwardRef<HTMLDivElement, ExportMenuProps>(
  (
    {
      options,
      onExport,
      loading = false,
      trigger,
      placement = "bottom-start",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!loading) {
          setIsOpen(!isOpen);
        }
      }
    };

    const handleOptionClick = (value: string, disabled?: boolean) => {
      if (!disabled && !loading) {
        onExport(value);
        setIsOpen(false);
      }
    };

    return (
      <div ref={ref} className="freeui-export-menu" role="group" {...props}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={menuRef}
          className="freeui-export-menu__container"
          onKeyDown={handleKeyDown}
        >
          {trigger ? (
            <div
              onClick={() => !loading && setIsOpen(!isOpen)}
              onKeyDown={handleTriggerKeyDown}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-haspopup="menu"
            >
              {trigger}
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              disabled={loading}
              aria-expanded={isOpen}
              aria-haspopup="menu"
            >
              {loading ? "Exporting..." : "Export"}
            </Button>
          )}

          {isOpen && (
            <div
              className={clsx(
                "freeui-export-menu__dropdown",
                `freeui-export-menu__dropdown--${placement}`
              )}
              role="menu"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={clsx("freeui-export-menu__option", {
                    "freeui-export-menu__option--disabled":
                      option.disabled || loading,
                  })}
                  disabled={option.disabled || loading}
                  onClick={() =>
                    handleOptionClick(option.value, option.disabled)
                  }
                  role="menuitem"
                >
                  <div className="freeui-export-menu__option-content">
                    <div className="freeui-export-menu__option-label">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="freeui-export-menu__option-description">
                        {option.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ExportMenu.displayName = "ExportMenu";

export interface ExportButtonProps {
  /**
   * Export format or action
   */
  format: string;

  /**
   * Callback when export is triggered
   */
  onExport: () => void;

  /**
   * Whether the export is in progress
   */
  loading?: boolean;

  /**
   * Button variant
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";

  /**
   * Button size
   */
  size?: "sm" | "md" | "lg";

  /**
   * Custom label (defaults to "Export {format}")
   */
  label?: string;

  /**
   * Icon to display
   */
  icon?: React.ReactNode;
}

/**
 * ExportButton component for single export actions
 *
 * Features:
 * - Simple export button for single format
 * - Loading state support
 * - Customizable appearance
 * - Accessible button implementation
 */
export const ExportButton = React.forwardRef<
  HTMLButtonElement,
  ExportButtonProps
>(
  (
    {
      format,
      onExport,
      loading = false,
      variant = "outline",
      size = "md",
      label,
      icon,
      ...props
    },
    ref
  ) => {
    const buttonLabel = label || `Export ${format.toUpperCase()}`;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={onExport}
        disabled={loading}
        startIcon={icon}
        {...props}
      >
        {loading ? "Exporting..." : buttonLabel}
      </Button>
    );
  }
);

ExportButton.displayName = "ExportButton";
