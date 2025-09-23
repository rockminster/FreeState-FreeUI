import React from "react";
import { clsx } from "clsx";

export interface FilterFieldProps {
  /**
   * Field label
   */
  label: string;
  
  /**
   * Field content (input, select, etc.)
   */
  children: React.ReactNode;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
}

/**
 * FilterField component for individual filter inputs
 */
export const FilterField = React.forwardRef<HTMLDivElement, FilterFieldProps>(
  ({ label, children, required = false, ...props }, ref) => {
    const generatedId = React.useId();
    const fieldId = `filter-field-${generatedId}`;

    // Clone children to add the id for label association
    const childrenWithId = React.isValidElement(children) 
      ? React.cloneElement(children as React.ReactElement, { 
          id: fieldId,
          'aria-required': required ? 'true' : undefined,
          ...((children as React.ReactElement).props || {})
        })
      : children;

    return (
      <div ref={ref} className="freeui-filter-field" {...props}>
        <label className="freeui-filter-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="freeui-filter-field__required">*</span>}
        </label>
        <div className="freeui-filter-field__control">{childrenWithId}</div>
      </div>
    );
  }
);

FilterField.displayName = "FilterField";

export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group title
   */
  title?: string;
  
  /**
   * Filter fields
   */
  children: React.ReactNode;
  
  /**
   * Whether the group is collapsible
   */
  collapsible?: boolean;
  
  /**
   * Whether the group is initially collapsed
   */
  defaultCollapsed?: boolean;
}

/**
 * FilterGroup component for organizing related filters
 */
export const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  ({ 
    title, 
    children, 
    collapsible = false, 
    defaultCollapsed = false, 
    className, 
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-filter-group",
          {
            "freeui-filter-group--collapsible": collapsible,
            "freeui-filter-group--collapsed": isCollapsed,
          },
          className
        )}
        {...props}
      >
        {title && (
          <div className="freeui-filter-group__header">
            {collapsible ? (
              <button
                type="button"
                className="freeui-filter-group__toggle"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-expanded={!isCollapsed}
              >
                <span className="freeui-filter-group__toggle-icon" />
                <span className="freeui-filter-group__title">{title}</span>
              </button>
            ) : (
              <h3 className="freeui-filter-group__title">{title}</h3>
            )}
          </div>
        )}
        {(!collapsible || !isCollapsed) && (
          <div className="freeui-filter-group__content">{children}</div>
        )}
      </div>
    );
  }
);

FilterGroup.displayName = "FilterGroup";

export interface FilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Panel title
   */
  title?: string;
  
  /**
   * Filter groups and fields
   */
  children: React.ReactNode;
  
  /**
   * Action buttons (Apply, Clear, etc.)
   */
  actions?: React.ReactNode;
  
  /**
   * Whether to show a border
   */
  bordered?: boolean;
}

/**
 * FilterPanel component for containing and organizing filters
 * 
 * Features:
 * - Organized structure for filter UI
 * - Support for grouping filters
 * - Action area for buttons
 * - Accessible form structure
 * - Composable with any form controls
 */
export const FilterPanel = React.forwardRef<HTMLDivElement, FilterPanelProps>(
  ({ title, children, actions, bordered = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-filter-panel",
          {
            "freeui-filter-panel--bordered": bordered,
          },
          className
        )}
        {...props}
      >
        {title && (
          <div className="freeui-filter-panel__header">
            <h2 className="freeui-filter-panel__title">{title}</h2>
          </div>
        )}
        <div className="freeui-filter-panel__content">{children}</div>
        {actions && (
          <div className="freeui-filter-panel__actions">{actions}</div>
        )}
      </div>
    );
  }
);

FilterPanel.displayName = "FilterPanel";