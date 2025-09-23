import React from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Card } from "../Card";
import { Stack } from "../layout/Stack";
import { Inline } from "../layout/Inline";
import type { AuditEventType } from "./AuditTrail";

export interface AuditFilterState {
  user?: string;
  workspace?: string;
  eventType?: AuditEventType;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}

export interface AuditFilterProps {
  filters: AuditFilterState;
  onFiltersChange: (filters: AuditFilterState) => void;
  onClearFilters: () => void;
  onExport?: () => void;
  loading?: boolean;
  className?: string;
}

const EVENT_TYPE_OPTIONS: Array<{ value: AuditEventType; label: string }> = [
  { value: "state_change", label: "State Changes" },
  { value: "permission_change", label: "Permission Changes" },
  { value: "api_key_event", label: "API Key Events" },
  { value: "login", label: "Login Events" },
  { value: "logout", label: "Logout Events" },
  { value: "workspace_access", label: "Workspace Access" },
  { value: "resource_access", label: "Resource Access" },
  { value: "system_error", label: "System Errors" },
];

export function AuditFilter({
  filters,
  onFiltersChange,
  onClearFilters,
  onExport,
  loading = false,
  className = ""
}: AuditFilterProps) {
  const updateFilter = (key: keyof AuditFilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== ""
  );

  return (
    <Card padding="lg" className={className}>
      <Stack gap="md">
        <Inline justify="space-between" align="center">
          <h3 style={{ margin: 0, fontSize: "var(--freeui-font-size-lg)", fontWeight: "var(--freeui-font-weight-semibold)" }}>
            Filter Audit Trail
          </h3>
          <Inline gap="sm">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                disabled={loading}
              >
                Clear Filters
              </Button>
            )}
            {onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                disabled={loading}
              >
                Export
              </Button>
            )}
          </Inline>
        </Inline>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "var(--freeui-spacing-4)" 
        }}>
          <Input
            type="text"
            placeholder="Search operations..."
            value={filters.searchQuery || ""}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
            disabled={loading}
          />

          <Input
            type="text"
            placeholder="Filter by user..."
            value={filters.user || ""}
            onChange={(e) => updateFilter("user", e.target.value)}
            disabled={loading}
          />

          <Input
            type="text"
            placeholder="Filter by workspace..."
            value={filters.workspace || ""}
            onChange={(e) => updateFilter("workspace", e.target.value)}
            disabled={loading}
          />

          <select
            value={filters.eventType || ""}
            onChange={(e) => updateFilter("eventType", e.target.value)}
            disabled={loading}
            style={{
              padding: "var(--freeui-spacing-2) var(--freeui-spacing-3)",
              border: "1px solid var(--freeui-color-neutral-300)",
              borderRadius: "var(--freeui-border-radius-md)",
              fontSize: "var(--freeui-font-size-sm)",
              backgroundColor: "var(--freeui-color-white)",
              color: "var(--freeui-color-neutral-900)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1
            }}
          >
            <option value="">All Event Types</option>
            {EVENT_TYPE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Inline gap="md">
          <div style={{ flex: 1 }}>
            <label 
              htmlFor="date-from-input"
              style={{ 
                display: "block", 
                fontSize: "var(--freeui-font-size-sm)", 
                fontWeight: "var(--freeui-font-weight-medium)",
                marginBottom: "var(--freeui-spacing-1)",
                color: "var(--freeui-color-neutral-700)"
              }}
            >
              From Date
            </label>
            <Input
              id="date-from-input"
              type="date"
              value={filters.dateFrom || ""}
              onChange={(e) => updateFilter("dateFrom", e.target.value)}
              disabled={loading}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label 
              htmlFor="date-to-input"
              style={{ 
                display: "block", 
                fontSize: "var(--freeui-font-size-sm)", 
                fontWeight: "var(--freeui-font-weight-medium)",
                marginBottom: "var(--freeui-spacing-1)",
                color: "var(--freeui-color-neutral-700)"
              }}
            >
              To Date
            </label>
            <Input
              id="date-to-input"
              type="date"
              value={filters.dateTo || ""}
              onChange={(e) => updateFilter("dateTo", e.target.value)}
              disabled={loading}
            />
          </div>
        </Inline>

        {hasActiveFilters && (
          <div style={{
            padding: "var(--freeui-spacing-3)",
            backgroundColor: "var(--freeui-color-semantic-info-50)",
            border: "1px solid var(--freeui-color-semantic-info-200)",
            borderRadius: "var(--freeui-border-radius-md)",
            fontSize: "var(--freeui-font-size-sm)",
            color: "var(--freeui-color-semantic-info-700)"
          }}>
            <strong>Active Filters:</strong>{" "}
            {Object.entries(filters)
              .filter(([, value]) => value !== undefined && value !== "")
              .map(([key, value]) => {
                if (key === "eventType") {
                  const option = EVENT_TYPE_OPTIONS.find(opt => opt.value === value);
                  return `${key}: ${option?.label || value}`;
                }
                return `${key}: ${value}`;
              })
              .join(", ")}
          </div>
        )}
      </Stack>
    </Card>
  );
}