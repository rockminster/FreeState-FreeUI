import React from "react";
import { clsx } from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The shadow level for the card
   */
  shadow?: "none" | "sm" | "md";
  
  /**
   * The padding level for the card
   */
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Card component with surface background and composable design
 * 
 * Features:
 * - Surface background using design tokens
 * - Configurable padding levels
 * - Optional shadow levels (sm, md)
 * - Fully composable with children
 * - Accessible by default
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      shadow = "sm",
      padding = "md",
      className,
      ...props
    },
    ref
  ) => {
    const cardClass = clsx(
      "freeui-card",
      `freeui-card--shadow-${shadow}`,
      `freeui-card--padding-${padding}`,
      className
    );

    return (
      <div
        ref={ref}
        className={cardClass}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";