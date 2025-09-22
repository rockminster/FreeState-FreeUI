import React, { useState } from "react";
import { clsx } from "clsx";
import { Button } from "../Button";
import type { RollbackButtonProps } from "./types";

/**
 * RollbackButton component for version rollback operations
 *
 * Features:
 * - Confirmation dialog before rollback
 * - Loading state during operation
 * - Version comparison display
 * - Accessible with proper ARIA labels
 * - Customizable size and variant
 */
export const RollbackButton = React.forwardRef<HTMLButtonElement, RollbackButtonProps>(
  (
    {
      targetVersion,
      currentVersion,
      onRollback,
      loading = false,
      disabled = false,
      size = "md",
      variant = "outline",
      className,
      ...props
    },
    ref
  ) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const formatDate = (isoString: string) => {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    };

    const handleRollbackClick = () => {
      if (showConfirmation) {
        // If confirmation is already shown, proceed with rollback
        onRollback(targetVersion.id);
        setShowConfirmation(false);
      } else {
        // Show confirmation first
        setShowConfirmation(true);
      }
    };

    const handleCancel = () => {
      setShowConfirmation(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Escape" && showConfirmation) {
        handleCancel();
      }
    };

    const buttonClass = clsx(
      "freeui-rollback-button",
      {
        "freeui-rollback-button--confirmation": showConfirmation,
      },
      className
    );

    if (showConfirmation) {
      return (
        <dialog 
          className="freeui-rollback-confirmation"
          open
          onKeyDown={handleKeyDown}
          aria-labelledby="rollback-confirmation-title"
          aria-describedby="rollback-confirmation-description"
        >
          <div className="freeui-rollback-confirmation__content">
            <div className="freeui-rollback-confirmation__header">
              <h4 
                id="rollback-confirmation-title"
                className="freeui-rollback-confirmation__title"
              >
                Confirm Rollback
              </h4>
            </div>
            
            <div 
              id="rollback-confirmation-description"
              className="freeui-rollback-confirmation__body"
            >
              <p className="freeui-rollback-confirmation__message">
                Are you sure you want to rollback to version {targetVersion.version}?
                This action cannot be undone.
              </p>
              
              <div className="freeui-rollback-confirmation__comparison">
                <div className="freeui-rollback-confirmation__version freeui-rollback-confirmation__version--current">
                  <div className="freeui-rollback-confirmation__version-label">
                    Current Version
                  </div>
                  <div className="freeui-rollback-confirmation__version-number">
                    v{currentVersion.version}
                  </div>
                  <div className="freeui-rollback-confirmation__version-date">
                    {formatDate(currentVersion.createdAt)}
                  </div>
                  <div className="freeui-rollback-confirmation__version-author">
                    by {currentVersion.author.name}
                  </div>
                </div>
                
                <div className="freeui-rollback-confirmation__arrow" aria-hidden="true">
                  ↩️
                </div>
                
                <div className="freeui-rollback-confirmation__version freeui-rollback-confirmation__version--target">
                  <div className="freeui-rollback-confirmation__version-label">
                    Rollback To
                  </div>
                  <div className="freeui-rollback-confirmation__version-number">
                    v{targetVersion.version}
                  </div>
                  <div className="freeui-rollback-confirmation__version-date">
                    {formatDate(targetVersion.createdAt)}
                  </div>
                  <div className="freeui-rollback-confirmation__version-author">
                    by {targetVersion.author.name}
                  </div>
                </div>
              </div>
              
              {targetVersion.description && (
                <div className="freeui-rollback-confirmation__description">
                  <div className="freeui-rollback-confirmation__description-label">
                    Target Version Description:
                  </div>
                  <div className="freeui-rollback-confirmation__description-text">
                    {targetVersion.description}
                  </div>
                </div>
              )}
            </div>
            
            <div className="freeui-rollback-confirmation__actions">
              <Button
                variant="outline"
                size={size}
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                size={size}
                onClick={handleRollbackClick}
                loading={loading}
                disabled={disabled}
                startIcon="↩️"
              >
                {loading ? "Rolling back..." : "Confirm Rollback"}
              </Button>
            </div>
          </div>
        </dialog>
      );
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={handleRollbackClick}
        loading={loading}
        disabled={disabled}
        className={buttonClass}
        startIcon="↩️"
        aria-describedby="rollback-button-description"
        {...props}
      >
        Rollback to v{targetVersion.version}
        <div 
          id="rollback-button-description" 
          className="freeui-sr-only"
        >
          Rollback to version {targetVersion.version} created on {formatDate(targetVersion.createdAt)} by {targetVersion.author.name}
        </div>
      </Button>
    );
  }
);

RollbackButton.displayName = "RollbackButton";