import React, { useState } from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import type { VersionDiffProps, DiffChunk } from "./types";

/**
 * VersionDiff component for comparing state versions
 *
 * Features:
 * - Side-by-side and unified diff layouts
 * - Syntax highlighting for JSON content
 * - Line numbers for easy reference
 * - Additions, deletions, and modifications highlighting
 * - Loading and error states
 * - Accessible with proper ARIA labels
 */
export const VersionDiff = React.forwardRef<HTMLDivElement, VersionDiffProps>(
  (
    {
      diffData,
      layout = "side-by-side",
      showLineNumbers = true,
      loading = false,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const [currentLayout, setCurrentLayout] = useState(layout);

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

    const formatContent = (content: unknown) => {
      return JSON.stringify(content, null, 2);
    };

    const renderDiffChunk = (chunk: DiffChunk, index: number) => {
      const chunkClass = clsx(
        "freeui-version-diff__chunk",
        `freeui-version-diff__chunk--${chunk.type}`
      );

      const prefix = {
        addition: "+",
        deletion: "-",
        modification: "~",
      }[chunk.type];

      return (
        <div key={index} className={chunkClass}>
          <div className="freeui-version-diff__chunk-header">
            <span
              className="freeui-version-diff__chunk-prefix"
              aria-label={`${chunk.type} at ${chunk.path}`}
            >
              {prefix}
            </span>
            <span className="freeui-version-diff__chunk-path">
              {chunk.path}
            </span>
            {chunk.lineNumber && showLineNumbers && (
              <span className="freeui-version-diff__chunk-line">
                Line {chunk.lineNumber}
              </span>
            )}
          </div>

          {chunk.type === "deletion" && (
            <div className="freeui-version-diff__chunk-content freeui-version-diff__chunk-content--old">
              <code>{JSON.stringify(chunk.oldValue, null, 2)}</code>
            </div>
          )}

          {chunk.type === "addition" && (
            <div className="freeui-version-diff__chunk-content freeui-version-diff__chunk-content--new">
              <code>{JSON.stringify(chunk.newValue, null, 2)}</code>
            </div>
          )}

          {chunk.type === "modification" && (
            <>
              <div className="freeui-version-diff__chunk-content freeui-version-diff__chunk-content--old">
                <div className="freeui-version-diff__chunk-label">Before:</div>
                <code>{JSON.stringify(chunk.oldValue, null, 2)}</code>
              </div>
              <div className="freeui-version-diff__chunk-content freeui-version-diff__chunk-content--new">
                <div className="freeui-version-diff__chunk-label">After:</div>
                <code>{JSON.stringify(chunk.newValue, null, 2)}</code>
              </div>
            </>
          )}
        </div>
      );
    };

    const renderSideBySide = () => {
      const sourceContent = formatContent(diffData.sourceVersion.content);
      const targetContent = formatContent(diffData.targetVersion.content);

      return (
        <div className="freeui-version-diff__side-by-side">
          <div className="freeui-version-diff__side">
            <div className="freeui-version-diff__side-header">
              <h4 className="freeui-version-diff__side-title">
                v{diffData.sourceVersion.version}
              </h4>
              <div className="freeui-version-diff__side-meta">
                {formatDate(diffData.sourceVersion.createdAt)}
              </div>
            </div>
            <pre className="freeui-version-diff__side-content">
              <code>{sourceContent}</code>
            </pre>
          </div>

          <div className="freeui-version-diff__side">
            <div className="freeui-version-diff__side-header">
              <h4 className="freeui-version-diff__side-title">
                v{diffData.targetVersion.version}
              </h4>
              <div className="freeui-version-diff__side-meta">
                {formatDate(diffData.targetVersion.createdAt)}
              </div>
            </div>
            <pre className="freeui-version-diff__side-content">
              <code>{targetContent}</code>
            </pre>
          </div>
        </div>
      );
    };

    const renderUnified = () => {
      const allChunks = [
        ...diffData.diff.deletions,
        ...diffData.diff.additions,
        ...diffData.diff.modifications,
      ].sort((a, b) => {
        // Sort by path first, then by line number
        if (a.path !== b.path) {
          return a.path.localeCompare(b.path);
        }
        return (a.lineNumber || 0) - (b.lineNumber || 0);
      });

      return (
        <div className="freeui-version-diff__unified">
          <div className="freeui-version-diff__unified-header">
            <div className="freeui-version-diff__unified-versions">
              <span className="freeui-version-diff__unified-version freeui-version-diff__unified-version--source">
                v{diffData.sourceVersion.version}
              </span>
              <span className="freeui-version-diff__unified-arrow">→</span>
              <span className="freeui-version-diff__unified-version freeui-version-diff__unified-version--target">
                v{diffData.targetVersion.version}
              </span>
            </div>
          </div>

          <div className="freeui-version-diff__chunks">
            {allChunks.map(renderDiffChunk)}
          </div>
        </div>
      );
    };

    const containerClass = clsx(
      "freeui-version-diff",
      {
        "freeui-version-diff--loading": loading,
        "freeui-version-diff--side-by-side": currentLayout === "side-by-side",
        "freeui-version-diff--unified": currentLayout === "unified",
      },
      className
    );

    const diffStats = {
      additions: diffData.diff.additions.length,
      deletions: diffData.diff.deletions.length,
      modifications: diffData.diff.modifications.length,
    };

    if (error) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-version-diff__error">
            <div className="freeui-version-diff__error-icon" aria-hidden="true">
              ⚠️
            </div>
            <div className="freeui-version-diff__error-message">{error}</div>
          </div>
        </Card>
      );
    }

    if (loading) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-version-diff__loading">
            <div
              className="freeui-version-diff__loading-spinner"
              aria-hidden="true"
            />
            <div className="freeui-version-diff__loading-text">
              Calculating diff...
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={containerClass} {...props}>
        <div className="freeui-version-diff__header">
          <div className="freeui-version-diff__title">
            <h3 className="freeui-version-diff__heading">Version Diff</h3>
            <div className="freeui-version-diff__stats">
              <span className="freeui-version-diff__stat freeui-version-diff__stat--additions">
                +{diffStats.additions}
              </span>
              <span className="freeui-version-diff__stat freeui-version-diff__stat--deletions">
                -{diffStats.deletions}
              </span>
              <span className="freeui-version-diff__stat freeui-version-diff__stat--modifications">
                ~{diffStats.modifications}
              </span>
            </div>
          </div>

          <div className="freeui-version-diff__actions">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setCurrentLayout(
                  currentLayout === "side-by-side" ? "unified" : "side-by-side"
                )
              }
              aria-label={`Switch to ${currentLayout === "side-by-side" ? "unified" : "side-by-side"} layout`}
            >
              {currentLayout === "side-by-side" ? "Unified" : "Side-by-side"}
            </Button>
          </div>
        </div>

        <div className="freeui-version-diff__content">
          {currentLayout === "side-by-side"
            ? renderSideBySide()
            : renderUnified()}
        </div>
      </Card>
    );
  }
);

VersionDiff.displayName = "VersionDiff";
