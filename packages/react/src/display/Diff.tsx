import React from "react";
import { clsx } from "clsx";

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber?: number;
}

export interface DiffProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of diff lines to display
   */
  lines: DiffLine[];

  /**
   * Whether to show line numbers
   */
  showLineNumbers?: boolean;

  /**
   * The size of the diff display
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether to enable syntax highlighting
   */
  syntax?: boolean;

  /**
   * Optional title for the diff
   */
  title?: string;
}

export const Diff = React.forwardRef<HTMLDivElement, DiffProps>(
  ({ lines, showLineNumbers = true, size = "md", syntax = false, title, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "freeui-diff",
          `freeui-diff--size-${size}`,
          {
            "freeui-diff--syntax": syntax,
          },
          className
        )}
        {...props}
      >
        {title && (
          <div className="freeui-diff-title">
            {title}
          </div>
        )}
        <div className="freeui-diff-content">
          {lines.map((line, index) => (
            <div
              key={index}
              className={clsx(
                "freeui-diff-line",
                `freeui-diff-line--${line.type}`
              )}
            >
              {showLineNumbers && (
                <span className="freeui-diff-line-number">
                  {line.lineNumber || index + 1}
                </span>
              )}
              <span className="freeui-diff-line-indicator">
                {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
              </span>
              <span className="freeui-diff-line-content">
                {line.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Diff.displayName = "Diff";