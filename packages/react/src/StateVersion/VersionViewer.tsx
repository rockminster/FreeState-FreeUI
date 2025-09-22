import React, { useState } from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import type { VersionViewerProps } from "./types";

/**
 * VersionViewer component for displaying state version details
 *
 * Features:
 * - Display version metadata and content
 * - Toggle between formatted and raw JSON view
 * - Syntax highlighting for JSON content
 * - Copy to clipboard functionality
 * - Loading and error states
 * - Accessible with proper ARIA labels
 */
export const VersionViewer = React.forwardRef<HTMLDivElement, VersionViewerProps>(
  (
    {
      version,
      viewMode = "formatted",
      loading = false,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const [currentViewMode, setCurrentViewMode] = useState(viewMode);
    const [copySuccess, setCopySuccess] = useState(false);

    const formatDate = (isoString: string) => {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
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

    const formatContent = (content: unknown, mode: "formatted" | "raw") => {
      if (mode === "raw") {
        return JSON.stringify(content, null, 0);
      }
      return JSON.stringify(content, null, 2);
    };

    const handleCopyToClipboard = async () => {
      try {
        const content = formatContent(version.content, currentViewMode);
        await navigator.clipboard.writeText(content);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    };

    const containerClass = clsx(
      "freeui-version-viewer",
      {
        "freeui-version-viewer--loading": loading,
      },
      className
    );

    if (error) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-version-viewer__error">
            <div className="freeui-version-viewer__error-icon" aria-hidden="true">
              ⚠️
            </div>
            <div className="freeui-version-viewer__error-message">{error}</div>
          </div>
        </Card>
      );
    }

    if (loading) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-version-viewer__loading">
            <div className="freeui-version-viewer__loading-spinner" aria-hidden="true" />
            <div className="freeui-version-viewer__loading-text">Loading version...</div>
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={containerClass} {...props}>
        <div className="freeui-version-viewer__header">
          <div className="freeui-version-viewer__title">
            <h3 className="freeui-version-viewer__version">
              Version {version.version}
            </h3>
            <div className="freeui-version-viewer__id">
              ID: {version.id}
            </div>
          </div>
          <div className="freeui-version-viewer__actions">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentViewMode(currentViewMode === "formatted" ? "raw" : "formatted")}
              aria-label={`Switch to ${currentViewMode === "formatted" ? "raw" : "formatted"} view`}
            >
              {currentViewMode === "formatted" ? "Raw" : "Formatted"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyToClipboard}
              aria-label="Copy content to clipboard"
            >
              {copySuccess ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="freeui-version-viewer__metadata">
          <div className="freeui-version-viewer__metadata-item">
            <span className="freeui-version-viewer__metadata-label">Description:</span>
            <span className="freeui-version-viewer__metadata-value">
              {version.description}
            </span>
          </div>
          
          <div className="freeui-version-viewer__metadata-item">
            <span className="freeui-version-viewer__metadata-label">Created:</span>
            <span className="freeui-version-viewer__metadata-value">
              {formatDate(version.createdAt)}
            </span>
          </div>
          
          <div className="freeui-version-viewer__metadata-item">
            <span className="freeui-version-viewer__metadata-label">Author:</span>
            <span className="freeui-version-viewer__metadata-value">
              {version.author.name}
              {version.author.email && (
                <span className="freeui-version-viewer__author-email">
                  ({version.author.email})
                </span>
              )}
            </span>
          </div>
          
          <div className="freeui-version-viewer__metadata-item">
            <span className="freeui-version-viewer__metadata-label">Size:</span>
            <span className="freeui-version-viewer__metadata-value">
              {formatSize(version.size)}
            </span>
          </div>
          
          <div className="freeui-version-viewer__metadata-item">
            <span className="freeui-version-viewer__metadata-label">Checksum:</span>
            <span className="freeui-version-viewer__metadata-value freeui-version-viewer__checksum">
              {version.checksum}
            </span>
          </div>

          {version.tags && version.tags.length > 0 && (
            <div className="freeui-version-viewer__metadata-item">
              <span className="freeui-version-viewer__metadata-label">Tags:</span>
              <div className="freeui-version-viewer__tags">
                {version.tags.map((tag) => (
                  <span
                    key={tag}
                    className="freeui-version-viewer__tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="freeui-version-viewer__content">
          <div className="freeui-version-viewer__content-header">
            <h4 className="freeui-version-viewer__content-title">
              State Content ({currentViewMode})
            </h4>
          </div>
          <pre className="freeui-version-viewer__content-code">
            <code>
              {formatContent(version.content, currentViewMode)}
            </code>
          </pre>
        </div>
      </Card>
    );
  }
);

VersionViewer.displayName = "VersionViewer";