import React from "react";
import { clsx } from "clsx";
import { Card } from "../Card";
import { Button } from "../Button";
import type { WorkspaceCardProps } from "./types";

/**
 * WorkspaceCard component displays workspace details with member management
 *
 * Features:
 * - Workspace information and description
 * - Member list with roles and permissions
 * - Role-based action buttons (manage members, settings, leave)
 * - Member count and role distribution
 * - Accessible with proper ARIA labels and semantic structure
 * - Permission-aware UI based on current user role
 */
export const WorkspaceCard = React.forwardRef<
  HTMLDivElement,
  WorkspaceCardProps
>(
  (
    {
      workspace,
      currentUserId,
      onManageMembers,
      onSettings,
      onLeave,
      className,
      ...props
    },
    ref
  ) => {
    const cardClass = clsx("freeui-workspace-card", className);

    const formatDate = (isoString: string) => {
      return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const currentUserMember = workspace.members.find(
      (member) => member.id === currentUserId
    );

    const isOwner = workspace.owner.id === currentUserId;
    const isAdmin = currentUserMember?.role === "admin" || isOwner;
    const canManageMembers = isAdmin;
    const canLeave = !isOwner && currentUserId;

    // Role distribution counts
    const roleCounts = workspace.members.reduce(
      (acc, member) => {
        acc[member.role] = (acc[member.role] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const getRoleLabel = (role: string) => {
      switch (role) {
        case "admin":
          return "Admin";
        case "contributor":
          return "Contributor";
        case "read-only":
          return "Read Only";
        default:
          return role;
      }
    };

    return (
      <Card ref={ref} className={cardClass} shadow="md" padding="lg" {...props}>
        {/* Header */}
        <div className="freeui-workspace-card__header">
          <div className="freeui-workspace-card__title-section">
            <h3 className="freeui-workspace-card__name">{workspace.name}</h3>
            <span className="freeui-workspace-card__member-count">
              {workspace.members.length} member
              {workspace.members.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="freeui-workspace-card__actions">
            {canManageMembers && onManageMembers && (
              <Button
                variant="outline"
                size="sm"
                onClick={onManageMembers}
                aria-label={`Manage members in ${workspace.name}`}
              >
                Manage Members
              </Button>
            )}
            {isAdmin && onSettings && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSettings}
                aria-label={`Settings for ${workspace.name}`}
              >
                Settings
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        {workspace.description && (
          <p className="freeui-workspace-card__description">
            {workspace.description}
          </p>
        )}

        {/* Member Summary */}
        <div className="freeui-workspace-card__members">
          <h4 className="freeui-workspace-card__members-title">
            Members & Roles
          </h4>
          <div className="freeui-workspace-card__role-distribution">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="freeui-workspace-card__role-stat">
                <span className="freeui-workspace-card__role-count">
                  {count}
                </span>
                <span className="freeui-workspace-card__role-name">
                  {getRoleLabel(role)}
                </span>
              </div>
            ))}
          </div>

          {/* Recent Members Preview */}
          <div className="freeui-workspace-card__recent-members">
            <h5 className="freeui-workspace-card__recent-title">
              Recent Members
            </h5>
            <div className="freeui-workspace-card__member-list">
              {workspace.members.slice(0, 3).map((member) => (
                <div key={member.id} className="freeui-workspace-card__member">
                  <div className="freeui-workspace-card__member-info">
                    <span className="freeui-workspace-card__member-name">
                      {member.name}
                      {member.id === workspace.owner.id && (
                        <span className="freeui-workspace-card__owner-badge">
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="freeui-workspace-card__member-role">
                      {getRoleLabel(member.role)}
                    </span>
                  </div>
                </div>
              ))}
              {workspace.members.length > 3 && (
                <div className="freeui-workspace-card__more-members">
                  +{workspace.members.length - 3} more
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="freeui-workspace-card__footer">
          <div className="freeui-workspace-card__meta">
            <span className="freeui-workspace-card__owner">
              Owner: {workspace.owner.name}
            </span>
            <span className="freeui-workspace-card__created">
              Created {formatDate(workspace.createdAt)}
            </span>
          </div>
          {canLeave && onLeave && (
            <Button
              variant="outline"
              size="sm"
              onClick={onLeave}
              aria-label={`Leave ${workspace.name}`}
            >
              Leave Workspace
            </Button>
          )}
        </div>
      </Card>
    );
  }
);

WorkspaceCard.displayName = "WorkspaceCard";
