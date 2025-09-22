import React from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import type { VersionListProps, StateVersion } from "./types";

/**
 * VersionList component for browsing state versions
 *
 * Features:
 * - List of versions with metadata (timestamp, author, description)
 * - Selectable versions with visual feedback
 * - Loading and error states
 * - Compact mode for space-constrained layouts
 * - Accessible with keyboard navigation
 */
export const VersionList = React.forwardRef<HTMLDivElement, VersionListProps>(
  (
    {
      versions,
      selectedVersionId,
      onVersionSelect,
      loading = false,
      error,
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
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

    const formatSize = (bytes: number) => {
      const units = ["B", "KB", "MB", "GB"];
      let size = bytes;
      let unitIndex = 0;

      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }

      return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
    };

    const handleVersionClick = (version: StateVersion) => {
      if (onVersionSelect) {
        onVersionSelect(version);
      }
    };

    const handleKeyDown = (
      event: React.KeyboardEvent,
      version: StateVersion
    ) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleVersionClick(version);
      }
    };

    const containerClass = clsx(
      "freeui-version-list",
      {
        "freeui-version-list--compact": compact,
        "freeui-version-list--loading": loading,
      },
      className
    );

    if (error) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-version-list__error">
            <div className="freeui-version-list__error-icon" aria-hidden="true">
              ⚠️
            </div>
            <div className="freeui-version-list__error-message">{error}</div>
          </div>
        </Card>
      );
    }

    if (loading) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-version-list__loading">
            <div className="freeui-version-list__loading-spinner" aria-hidden="true" />
            <div className="freeui-version-list__loading-text">Loading versions...</div>
          </div>
        </Card>
      );
    }

    if (versions.length === 0) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-version-list__empty">
            <div className="freeui-version-list__empty-icon" aria-hidden="true">
              📋
            </div>
            <div className="freeui-version-list__empty-message">
              No versions available
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={containerClass} {...props}>
        <div className="freeui-version-list__header">
          <h3 className="freeui-version-list__title">State Versions</h3>
          <div className="freeui-version-list__count">
            {versions.length} version{versions.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="freeui-version-list__items" role="list">
          {versions.map((version) => {
            const isSelected = selectedVersionId === version.id;
            const itemClass = clsx(
              "freeui-version-list__item",
              {
                "freeui-version-list__item--selected": isSelected,
                "freeui-version-list__item--compact": compact,
              }
            );

            return (
              <button
                key={version.id}
                className={itemClass}
                type="button"
                onClick={() => handleVersionClick(version)}
                onKeyDown={(e) => handleKeyDown(e, version)}
                aria-describedby={`version-${version.id}-description`}
                aria-pressed={isSelected}
              >
                <div className="freeui-version-list__item-header">
                  <div className="freeui-version-list__item-version">
                    v{version.version}
                  </div>
                  <div className="freeui-version-list__item-date">
                    {formatDate(version.createdAt)}
                  </div>
                </div>
                
                {!compact && (
                  <div
                    id={`version-${version.id}-description`}
                    className="freeui-version-list__item-description"
                  >
                    {version.description}
                  </div>
                )}

                <div className="freeui-version-list__item-meta">
                  <div className="freeui-version-list__item-author">
                    by {version.author.name}
                  </div>
                  <div className="freeui-version-list__item-size">
                    {formatSize(version.size)}
                  </div>
                </div>

                {version.tags && version.tags.length > 0 && (
                  <div className="freeui-version-list__item-tags">
                    {version.tags.map((tag) => (
                      <span
                        key={tag}
                        className="freeui-version-list__item-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {isSelected && (
                  <div className="freeui-version-list__item-selected-indicator" aria-hidden="true">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>
    );
  }
);

VersionList.displayName = "VersionList";