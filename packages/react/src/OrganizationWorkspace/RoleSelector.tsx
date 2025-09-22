import React from "react";
import { clsx } from "clsx";
import type { RoleSelectorProps, UserRole } from "./types";

/**
 * RoleSelector component for selecting user roles with permission levels
 *
 * Features:
 * - Dropdown selector for user roles (admin, contributor, read-only)
 * - Clear role descriptions for each permission level
 * - Accessible with proper ARIA attributes
 * - Disabled state support
 * - Keyboard navigation support
 */
export const RoleSelector = React.forwardRef<HTMLSelectElement, RoleSelectorProps>(
  ({ value, onChange, disabled = false, className, ...props }, ref) => {
    const selectorClass = clsx(
      "freeui-role-selector",
      {
        "freeui-role-selector--disabled": disabled,
      },
      className
    );

    const roles: Array<{ value: UserRole; label: string; description: string }> = [
      {
        value: "admin",
        label: "Admin",
        description: "Full access to manage workspace and members",
      },
      {
        value: "contributor",
        label: "Contributor", 
        description: "Can create and edit content",
      },
      {
        value: "read-only",
        label: "Read Only",
        description: "Can view content only",
      },
    ];

    return (
      <div className={selectorClass}>
        <select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value as UserRole)}
          disabled={disabled}
          className="freeui-role-selector__select"
          aria-label="Select user role"
          {...props}
        >
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        
        {/* Role description */}
        <div className="freeui-role-selector__description">
          {roles.find(role => role.value === value)?.description}
        </div>
      </div>
    );
  }
);

RoleSelector.displayName = "RoleSelector";