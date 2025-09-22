import React, { useState } from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import type { ApiKeyListProps, ApiKey } from "./types";

/**
 * ApiKeyList component for displaying and managing API keys
 *
 * Features:
 * - List view of API keys with metadata (name, permissions, status, last used)
 * - Selectable keys with visual feedback
 * - Action buttons for revoke and rotate operations
 * - Status indicators with color coding
 * - Last used timestamp display
 * - Loading and error states
 * - Compact mode for space-constrained layouts
 * - Accessible with keyboard navigation and screen readers
 */
export const ApiKeyList = React.forwardRef<HTMLDivElement, ApiKeyListProps>(
  (
    {
      apiKeys,
      selectedKeyId,
      onKeySelect,
      onKeyRevoke,
      onKeyRotate,
      loading = false,
      error,
      showActions = true,
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
    const [loadingActions, setLoadingActions] = useState<Set<string>>(
      new Set()
    );

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

    const formatRelativeTime = (isoString: string) => {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
      } else {
        return "Just now";
      }
    };

    const getStatusColor = (status: ApiKey["status"]) => {
      switch (status) {
        case "active":
          return "success";
        case "expired":
          return "warning";
        case "revoked":
        case "suspended":
          return "danger";
        default:
          return "neutral";
      }
    };

    const maskApiKey = (key: string) => {
      if (key.length <= 8) return key;
      return `${key.slice(0, 4)}...${key.slice(-4)}`;
    };

    const handleKeyClick = (apiKey: ApiKey) => {
      if (onKeySelect) {
        onKeySelect(apiKey);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent, apiKey: ApiKey) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleKeyClick(apiKey);
      }
    };

    const handleRevoke = async (apiKey: ApiKey) => {
      if (!onKeyRevoke) return;

      setLoadingActions((prev) => new Set(prev).add(`revoke-${apiKey.id}`));
      try {
        const result = onKeyRevoke(apiKey);
        // Handle both sync and async callbacks
        if (result && typeof result.then === "function") {
          await result;
        }
      } finally {
        setLoadingActions((prev) => {
          const next = new Set(prev);
          next.delete(`revoke-${apiKey.id}`);
          return next;
        });
      }
    };

    const handleRotate = async (apiKey: ApiKey) => {
      if (!onKeyRotate) return;

      setLoadingActions((prev) => new Set(prev).add(`rotate-${apiKey.id}`));
      try {
        const result = onKeyRotate(apiKey);
        // Handle both sync and async callbacks
        if (result && typeof result.then === "function") {
          await result;
        }
      } finally {
        setLoadingActions((prev) => {
          const next = new Set(prev);
          next.delete(`rotate-${apiKey.id}`);
          return next;
        });
      }
    };

    const containerClass = clsx(
      "freeui-api-key-list",
      {
        "freeui-api-key-list--compact": compact,
        "freeui-api-key-list--loading": loading,
      },
      className
    );

    if (loading) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-api-key-list__loading">
            <div
              className="freeui-api-key-list__loading-spinner"
              aria-hidden="true"
            />
            <div className="freeui-api-key-list__loading-text">
              Loading API keys...
            </div>
          </div>
        </Card>
      );
    }

    if (error) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-api-key-list__error">
            <div className="freeui-api-key-list__error-message">{error}</div>
          </div>
        </Card>
      );
    }

    if (apiKeys.length === 0) {
      return (
        <Card ref={ref} className={containerClass} {...props}>
          <div className="freeui-api-key-list__empty">
            <div className="freeui-api-key-list__empty-message">
              No API keys found. Create your first API key to get started.
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={containerClass} {...props}>
        <div className="freeui-api-key-list__header">
          <h3 className="freeui-api-key-list__title">API Keys</h3>
          <div className="freeui-api-key-list__count">
            {apiKeys.length} key{apiKeys.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="freeui-api-key-list__items" role="list">
          {apiKeys.map((apiKey) => {
            const isSelected = selectedKeyId === apiKey.id;
            const isRevoked =
              apiKey.status === "revoked" || apiKey.status === "suspended";

            const itemClass = clsx("freeui-api-key-list__item", {
              "freeui-api-key-list__item--selected": isSelected,
              "freeui-api-key-list__item--revoked": isRevoked,
              "freeui-api-key-list__item--compact": compact,
            });

            return (
              <div
                key={apiKey.id}
                className={itemClass}
                role="button"
                tabIndex={0}
                onClick={() => handleKeyClick(apiKey)}
                onKeyDown={(e) => handleKeyDown(e, apiKey)}
                aria-describedby={`api-key-${apiKey.id}-description`}
                aria-pressed={isSelected}
              >
                <div className="freeui-api-key-list__item-header">
                  <div className="freeui-api-key-list__item-name">
                    {apiKey.name}
                  </div>
                  <div
                    className={`freeui-api-key-list__item-status freeui-api-key-list__item-status--${getStatusColor(apiKey.status)}`}
                  >
                    {apiKey.status}
                  </div>
                </div>

                {!compact && (
                  <div
                    id={`api-key-${apiKey.id}-description`}
                    className="freeui-api-key-list__item-description"
                  >
                    {apiKey.metadata?.description || "No description provided"}
                  </div>
                )}

                <div className="freeui-api-key-list__item-details">
                  <div className="freeui-api-key-list__item-key">
                    <code>{maskApiKey(apiKey.key)}</code>
                  </div>

                  {!compact && (
                    <div className="freeui-api-key-list__item-permissions">
                      <span className="freeui-api-key-list__item-permissions-label">
                        Permissions:
                      </span>
                      <div className="freeui-api-key-list__item-permissions-list">
                        {apiKey.permissions.slice(0, 3).map((permission) => (
                          <span
                            key={permission}
                            className="freeui-api-key-list__item-permission"
                          >
                            {permission}
                          </span>
                        ))}
                        {apiKey.permissions.length > 3 && (
                          <span className="freeui-api-key-list__item-permission-more">
                            +{apiKey.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="freeui-api-key-list__item-meta">
                  <div className="freeui-api-key-list__item-created">
                    Created {formatDate(apiKey.createdAt)} by{" "}
                    {apiKey.createdBy.name}
                  </div>

                  {apiKey.lastUsedAt && (
                    <div className="freeui-api-key-list__item-last-used">
                      Last used {formatRelativeTime(apiKey.lastUsedAt)}
                    </div>
                  )}

                  {apiKey.expiresAt && (
                    <div className="freeui-api-key-list__item-expires">
                      Expires {formatDate(apiKey.expiresAt)}
                    </div>
                  )}
                </div>

                {showActions && !isRevoked && (
                  <div className="freeui-api-key-list__item-actions">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRotate(apiKey);
                      }}
                      disabled={loadingActions.has(`rotate-${apiKey.id}`)}
                      loading={loadingActions.has(`rotate-${apiKey.id}`)}
                    >
                      Rotate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRevoke(apiKey);
                      }}
                      disabled={loadingActions.has(`revoke-${apiKey.id}`)}
                      loading={loadingActions.has(`revoke-${apiKey.id}`)}
                    >
                      Revoke
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
);

ApiKeyList.displayName = "ApiKeyList";
