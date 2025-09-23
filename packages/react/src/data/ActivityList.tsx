import React from "react";
import { clsx } from "clsx";

export interface ActivityItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Primary title/action of the activity
   */
  title: string;
  
  /**
   * Description or details of the activity
   */
  description?: string;
  
  /**
   * Timestamp of the activity
   */
  timestamp?: string;
  
  /**
   * User or actor who performed the activity
   */
  actor?: string;
  
  /**
   * Visual indicator (icon, avatar, etc.)
   */
  indicator?: React.ReactNode;
  
  /**
   * Activity status/type
   */
  status?: "default" | "success" | "warning" | "error" | "info";
  
  /**
   * Additional metadata or badges
   */
  metadata?: React.ReactNode;
  
  /**
   * Whether the item is clickable
   */
  clickable?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * ActivityItem component for displaying individual activities or events
 * 
 * Features:
 * - Flexible content structure (title, description, timestamp, actor)
 * - Visual status indicators
 * - Customizable indicator (icon, avatar, etc.)
 * - Metadata support for badges or additional info
 * - Clickable variant for interactive items
 * - Accessible structure with proper semantics
 */
export const ActivityItem = React.forwardRef<HTMLDivElement, ActivityItemProps>(
  ({ 
    title, 
    description, 
    timestamp, 
    actor, 
    indicator, 
    status = "default", 
    metadata,
    clickable = false,
    onClick,
    className, 
    ...props 
  }, ref) => {
    if (clickable) {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          className={clsx(
            "freeui-activity-item",
            `freeui-activity-item--${status}`,
            "freeui-activity-item--clickable",
            className
          )}
          onClick={onClick}
          type="button"
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {indicator && (
            <div className="freeui-activity-item__indicator">
              {indicator}
            </div>
          )}
          
          <div className="freeui-activity-item__content">
            <div className="freeui-activity-item__header">
              <div className="freeui-activity-item__main">
                <h3 className="freeui-activity-item__title">{title}</h3>
                {description && (
                  <p className="freeui-activity-item__description">{description}</p>
                )}
              </div>
              
              <div className="freeui-activity-item__meta">
                {actor && (
                  <div className="freeui-activity-item__actor">{actor}</div>
                )}
                {timestamp && (
                  <time className="freeui-activity-item__timestamp">{timestamp}</time>
                )}
              </div>
            </div>
            
            {metadata && (
              <div className="freeui-activity-item__metadata">{metadata}</div>
            )}
          </div>
        </button>
      );
    }
    
    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-activity-item",
          `freeui-activity-item--${status}`,
          className
        )}
        {...props}
      >
        {indicator && (
          <div className="freeui-activity-item__indicator">
            {indicator}
          </div>
        )}
        
        <div className="freeui-activity-item__content">
          <div className="freeui-activity-item__header">
            <div className="freeui-activity-item__main">
              <h3 className="freeui-activity-item__title">{title}</h3>
              {description && (
                <p className="freeui-activity-item__description">{description}</p>
              )}
            </div>
            
            <div className="freeui-activity-item__meta">
              {actor && (
                <div className="freeui-activity-item__actor">{actor}</div>
              )}
              {timestamp && (
                <time className="freeui-activity-item__timestamp">{timestamp}</time>
              )}
            </div>
          </div>
          
          {metadata && (
            <div className="freeui-activity-item__metadata">{metadata}</div>
          )}
        </div>
      </div>
    );
  }
);

ActivityItem.displayName = "ActivityItem";

export interface ActivityListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Activity items
   */
  children: React.ReactNode;
  
  /**
   * Whether to show dividers between items
   */
  dividers?: boolean;
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Empty state content
   */
  emptyState?: React.ReactNode;
  
  /**
   * Error state content
   */
  errorState?: React.ReactNode;
}

/**
 * ActivityList component for displaying a list of activities
 * 
 * Features:
 * - Container for ActivityItem components
 * - Optional dividers between items
 * - Loading, empty, and error states
 * - Accessible list structure
 * - Responsive design
 */
export const ActivityList = React.forwardRef<HTMLDivElement, ActivityListProps>(
  ({ 
    children, 
    dividers = false, 
    loading = false, 
    emptyState, 
    errorState, 
    className, 
    ...props 
  }, ref) => {
    if (loading) {
      return (
        <div 
          ref={ref} 
          className={clsx("freeui-activity-list", "freeui-activity-list--loading", className)}
          {...props}
        >
          <div className="freeui-activity-list__loading">
            <div className="freeui-activity-list__spinner" />
            <p>Loading activities...</p>
          </div>
        </div>
      );
    }
    
    if (errorState) {
      return (
        <div 
          ref={ref} 
          className={clsx("freeui-activity-list", "freeui-activity-list--error", className)}
          {...props}
        >
          <div className="freeui-activity-list__error">
            {errorState}
          </div>
        </div>
      );
    }
    
    if (!children && emptyState) {
      return (
        <div 
          ref={ref} 
          className={clsx("freeui-activity-list", "freeui-activity-list--empty", className)}
          {...props}
        >
          <div className="freeui-activity-list__empty">
            {emptyState}
          </div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-activity-list",
          {
            "freeui-activity-list--dividers": dividers,
          },
          className
        )}
        role="list"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ActivityList.displayName = "ActivityList";