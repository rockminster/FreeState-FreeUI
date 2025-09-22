import React from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import type { AuthTokenStatusProps, ApiKey, JwtToken } from "./types";

/**
 * AuthTokenStatus component for displaying token status and metadata
 *
 * Features:
 * - Token status indicator with color coding
 * - Token metadata display (expiration, permissions, last used)
 * - Masked token value display
 * - Action buttons for token management
 * - Detailed and compact view modes
 * - Accessibility with proper ARIA labels
 * - Support for both API keys and JWT tokens
 */
export const AuthTokenStatus = React.forwardRef<HTMLDivElement, AuthTokenStatusProps>(
  (
    {
      token,
      tokenType,
      detailed = false,
      onAction,
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

    const getStatusColor = (status: string) => {
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

    const maskToken = (tokenValue: string) => {
      if (tokenValue.length <= 12) return tokenValue;
      return `${tokenValue.slice(0, 6)}...${tokenValue.slice(-6)}`;
    };

    const isExpiringSoon = (expiresAt: string) => {
      const expiration = new Date(expiresAt);
      const now = new Date();
      const diffMs = expiration.getTime() - now.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays < 7 && diffDays > 0; // Expires within 7 days
    };

    const isExpired = (expiresAt: string) => {
      const expiration = new Date(expiresAt);
      const now = new Date();
      return expiration.getTime() < now.getTime();
    };

    const handleAction = (action: "revoke" | "refresh" | "details") => {
      if (onAction) {
        onAction(action);
      }
    };

    const containerClass = clsx(
      "freeui-auth-token-status",
      `freeui-auth-token-status--${tokenType}`,
      {
        "freeui-auth-token-status--detailed": detailed,
        [`freeui-auth-token-status--${getStatusColor(token.status)}`]: true,
      },
      className
    );

    // Helper functions to get expiration information based on token type
    const getExpirationDate = (): string | null => {
      if (tokenType === "api_key") {
        return (token as ApiKey).expiresAt || null;
      } else {
        return (token as JwtToken).expiresAt;
      }
    };

    const expirationDate = getExpirationDate();
    const expirationWarning = expirationDate ? isExpiringSoon(expirationDate) : false;
    const tokenExpired = expirationDate ? isExpired(expirationDate) : false;

    return (
      <Card
        ref={ref}
        className={containerClass}
        {...props}
      >
        <div className="freeui-auth-token-status__header">
          <div className="freeui-auth-token-status__title">
            <h4 className="freeui-auth-token-status__name">
              {tokenType === "api_key" ? (token as ApiKey).name : `${(token as JwtToken).type} Token`}
            </h4>
            <div className={`freeui-auth-token-status__status freeui-auth-token-status__status--${getStatusColor(token.status)}`}>
              {token.status}
            </div>
          </div>
          
          {(expirationWarning || tokenExpired) && (
            <div className={`freeui-auth-token-status__warning ${tokenExpired ? 'freeui-auth-token-status__warning--expired' : 'freeui-auth-token-status__warning--expiring'}`}>
              {tokenExpired ? '⚠️ Expired' : '⚠️ Expires soon'}
            </div>
          )}
        </div>

        <div className="freeui-auth-token-status__token">
          <label className="freeui-auth-token-status__token-label">
            {tokenType === "api_key" ? "API Key" : "Token"}:
          </label>
          <code className="freeui-auth-token-status__token-value">
            {maskToken(tokenType === "api_key" ? (token as ApiKey).key : (token as JwtToken).token)}
          </code>
        </div>

        {detailed && (
          <div className="freeui-auth-token-status__details">
            {tokenType === "api_key" && (
              <>
                <div className="freeui-auth-token-status__detail">
                  <span className="freeui-auth-token-status__detail-label">Permissions:</span>
                  <div className="freeui-auth-token-status__permissions">
                    {(token as ApiKey).permissions.map((permission) => (
                      <span
                        key={permission}
                        className="freeui-auth-token-status__permission"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
                
                {(token as ApiKey).metadata?.description && (
                  <div className="freeui-auth-token-status__detail">
                    <span className="freeui-auth-token-status__detail-label">Description:</span>
                    <span className="freeui-auth-token-status__detail-value">
                      {(token as ApiKey).metadata!.description}
                    </span>
                  </div>
                )}

                {(token as ApiKey).lastUsedAt && (
                  <div className="freeui-auth-token-status__detail">
                    <span className="freeui-auth-token-status__detail-label">Last Used:</span>
                    <span className="freeui-auth-token-status__detail-value">
                      {formatRelativeTime((token as ApiKey).lastUsedAt!)} ({formatDate((token as ApiKey).lastUsedAt!)})
                    </span>
                  </div>
                )}

                {(token as ApiKey).expiresAt && (
                  <div className="freeui-auth-token-status__detail">
                    <span className="freeui-auth-token-status__detail-label">Expires:</span>
                    <span className="freeui-auth-token-status__detail-value">
                      {formatDate((token as ApiKey).expiresAt!)}
                    </span>
                  </div>
                )}

                {(token as ApiKey).metadata?.ipRestrictions && (token as ApiKey).metadata!.ipRestrictions!.length > 0 && (
                  <div className="freeui-auth-token-status__detail">
                    <span className="freeui-auth-token-status__detail-label">IP Restrictions:</span>
                    <div className="freeui-auth-token-status__ip-restrictions">
                      {(token as ApiKey).metadata!.ipRestrictions!.map((ip, index) => (
                        <code key={index} className="freeui-auth-token-status__ip-restriction">
                          {ip}
                        </code>
                      ))}
                    </div>
                  </div>
                )}

                {(token as ApiKey).metadata?.rateLimit && (
                  <div className="freeui-auth-token-status__detail">
                    <span className="freeui-auth-token-status__detail-label">Rate Limit:</span>
                    <span className="freeui-auth-token-status__detail-value">
                      {(token as ApiKey).metadata!.rateLimit!.requestsPerMinute} req/min 
                      (burst: {(token as ApiKey).metadata!.rateLimit!.burstSize})
                    </span>
                  </div>
                )}
              </>
            )}

            {tokenType === "jwt" && (
              <>
                <div className="freeui-auth-token-status__detail">
                  <span className="freeui-auth-token-status__detail-label">Subject:</span>
                  <span className="freeui-auth-token-status__detail-value">
                    {(token as JwtToken).subject}
                  </span>
                </div>

                <div className="freeui-auth-token-status__detail">
                  <span className="freeui-auth-token-status__detail-label">Issuer:</span>
                  <span className="freeui-auth-token-status__detail-value">
                    {(token as JwtToken).issuer}
                  </span>
                </div>

                <div className="freeui-auth-token-status__detail">
                  <span className="freeui-auth-token-status__detail-label">Audience:</span>
                  <span className="freeui-auth-token-status__detail-value">
                    {(token as JwtToken).audience.join(", ")}
                  </span>
                </div>

                <div className="freeui-auth-token-status__detail">
                  <span className="freeui-auth-token-status__detail-label">Scopes:</span>
                  <div className="freeui-auth-token-status__scopes">
                    {(token as JwtToken).scopes.map((scope) => (
                      <span
                        key={scope}
                        className="freeui-auth-token-status__scope"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="freeui-auth-token-status__detail">
                  <span className="freeui-auth-token-status__detail-label">Issued:</span>
                  <span className="freeui-auth-token-status__detail-value">
                    {formatDate((token as JwtToken).issuedAt)}
                  </span>
                </div>

                <div className="freeui-auth-token-status__detail">
                  <span className="freeui-auth-token-status__detail-label">Expires:</span>
                  <span className="freeui-auth-token-status__detail-value">
                    {formatDate((token as JwtToken).expiresAt)}
                  </span>
                </div>
              </>
            )}

            <div className="freeui-auth-token-status__detail">
              <span className="freeui-auth-token-status__detail-label">Created:</span>
              <span className="freeui-auth-token-status__detail-value">
                {formatDate(tokenType === "api_key" ? (token as ApiKey).createdAt : (token as JwtToken).issuedAt)} by{" "}
                {tokenType === "api_key" ? (token as ApiKey).createdBy.name : (token as JwtToken).subject}
              </span>
            </div>
          </div>
        )}

        {onAction && token.status === "active" && (
          <div className="freeui-auth-token-status__actions">
            {tokenType === "jwt" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction("refresh")}
              >
                Refresh
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction("details")}
            >
              Details
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction("revoke")}
            >
              Revoke
            </Button>
          </div>
        )}
      </Card>
    );
  }
);

AuthTokenStatus.displayName = "AuthTokenStatus";