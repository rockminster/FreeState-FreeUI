/**
 * TypeScript types for Organization and Workspace Management components
 */

export type PlanType = "free" | "pro" | "enterprise";

export type UserRole = "admin" | "contributor" | "read-only";

export interface PlanLimits {
  workspaces: number;
  users: number;
  storage: number; // in GB
  apiRequests: number; // per month
}

export interface PlanUsage {
  workspaces: number;
  users: number;
  storage: number; // in GB
  apiRequests: number; // current month
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  plan: PlanType;
  limits: PlanLimits;
  usage: PlanUsage;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  members: WorkspaceMember[];
  owner: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationCardProps {
  organization: Organization;
  onUpgrade?: () => void;
  onSettings?: () => void;
  onViewWorkspaces?: () => void;
  className?: string;
}

export interface WorkspaceCardProps {
  workspace: Workspace;
  currentUserId?: string;
  onManageMembers?: () => void;
  onSettings?: () => void;
  onLeave?: () => void;
  className?: string;
}

export interface PlanBadgeProps {
  plan: PlanType;
  className?: string;
}

export interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
  className?: string;
}

export interface UsageMeterProps {
  label: string;
  usage: number;
  limit: number;
  unit?: string;
  variant?: "default" | "warning" | "danger";
  className?: string;
}
