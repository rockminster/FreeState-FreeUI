import React from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import type { OrganizationCardProps } from "./types";
import { PlanBadge } from "./PlanBadge";
import { UsageMeter } from "./UsageMeter";

/**
 * OrganizationCard component displays organization details with plan management
 *
 * Features:
 * - Organization information and description
 * - Plan badge with current subscription level
 * - Usage meters for key metrics (workspaces, users, storage, API requests)
 * - Action buttons for upgrade, settings, and workspace management
 * - Accessible with proper ARIA labels and semantic structure
 * - Responsive design using design tokens
 */
export const OrganizationCard = React.forwardRef<HTMLDivElement, OrganizationCardProps>(
  (
    {
      organization,
      onUpgrade,
      onSettings,
      onViewWorkspaces,
      className,
      ...props
    },
    ref
  ) => {
    const cardClass = clsx("freeui-organization-card", className);

    const formatDate = (isoString: string) => {
      return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const canUpgrade = organization.plan !== "enterprise";

    return (
      <Card ref={ref} className={cardClass} shadow="md" padding="lg" {...props}>
        {/* Header */}
        <div className="freeui-organization-card__header">
          <div className="freeui-organization-card__title-section">
            <h3 className="freeui-organization-card__name">{organization.name}</h3>
            <PlanBadge plan={organization.plan} />
          </div>
          <div className="freeui-organization-card__actions">
            {onSettings && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSettings}
                aria-label={`Settings for ${organization.name}`}
              >
                Settings
              </Button>
            )}
            {canUpgrade && onUpgrade && (
              <Button
                variant="primary"
                size="sm"
                onClick={onUpgrade}
                aria-label={`Upgrade plan for ${organization.name}`}
              >
                Upgrade
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        {organization.description && (
          <p className="freeui-organization-card__description">
            {organization.description}
          </p>
        )}

        {/* Usage Metrics */}
        <div className="freeui-organization-card__usage">
          <h4 className="freeui-organization-card__usage-title">Current Usage</h4>
          <div className="freeui-organization-card__usage-grid">
            <UsageMeter
              label="Workspaces"
              usage={organization.usage.workspaces}
              limit={organization.limits.workspaces}
            />
            <UsageMeter
              label="Users"
              usage={organization.usage.users}
              limit={organization.limits.users}
            />
            <UsageMeter
              label="Storage"
              usage={organization.usage.storage}
              limit={organization.limits.storage}
              unit="GB"
            />
            <UsageMeter
              label="API Requests"
              usage={organization.usage.apiRequests}
              limit={organization.limits.apiRequests}
              unit="/ month"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="freeui-organization-card__footer">
          <div className="freeui-organization-card__meta">
            <span className="freeui-organization-card__owner">
              Owner: {organization.owner.name}
            </span>
            <span className="freeui-organization-card__created">
              Created {formatDate(organization.createdAt)}
            </span>
          </div>
          {onViewWorkspaces && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onViewWorkspaces}
              aria-label={`View workspaces in ${organization.name}`}
            >
              View Workspaces
            </Button>
          )}
        </div>
      </Card>
    );
  }
);

OrganizationCard.displayName = "OrganizationCard";