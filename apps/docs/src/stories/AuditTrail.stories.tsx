import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { 
  AuditTrail, 
  AuditFilter, 
  AuditExport,
  Stack,
  Inline,
  Heading,
  Button,
  Card
} from "@rockminster/react";
import type { 
  AuditEntry, 
  AuditFilterState, 
  AuditEventType 
} from "@rockminster/react";

const meta: Meta<typeof AuditTrail> = {
  title: "Audit & Compliance/AuditTrail",
  component: AuditTrail,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The AuditTrail component provides a comprehensive interface for browsing audit logs, 
including state changes, permission changes, API key events, and more. It supports 
filtering by user, workspace, or time, and provides export functionality for compliance.

## Features

- **Timeline View**: Visual timeline of audit events grouped by date
- **Event Filtering**: Filter by user, workspace, event type, date range, and search
- **Export Options**: Export audit trails in CSV, JSON, or PDF formats
- **Compliance Support**: Special compliance mode with data integrity verification
- **Expandable Details**: Click to view detailed event information
- **Loading States**: Proper loading and error states
- **Accessibility**: Full keyboard navigation and screen reader support

## Event Types

- State Changes: Terraform state modifications
- Permission Changes: User or role permission updates  
- API Key Events: API key creation, rotation, or deletion
- Authentication: Login and logout events
- Access Control: Workspace and resource access events
- System Errors: Error conditions and failures
        `,
      },
    },
  },
  argTypes: {
    entries: {
      description: "Array of audit log entries to display",
    },
    title: {
      description: "Title for the audit trail section",
      control: "text",
    },
    loading: {
      description: "Show loading state",
      control: "boolean",
    },
    error: {
      description: "Error message to display",
      control: "text",
    },
    hasMoreEntries: {
      description: "Whether there are more entries to load",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuditTrail>;

// Mock audit data with comprehensive examples
const mockAuditEntries: AuditEntry[] = [
  {
    id: "audit-001",
    timestamp: "2024-01-15T14:30:00Z",
    type: "state_change",
    operation: "State Update",
    description: "Updated Terraform state for production environment",
    user: "sarah.chen@company.com",
    workspace: "production",
    resource: "aws_instance.web_server",
    severity: "success",
    ipAddress: "192.168.1.100",
    userAgent: "terraform/1.5.0",
    details: {
      stateVersion: "v1.2.3",
      resourcesAdded: 2,
      resourcesChanged: 1,
      resourcesDestroyed: 0,
      planHash: "abc123def456",
    },
  },
  {
    id: "audit-002", 
    timestamp: "2024-01-15T13:45:00Z",
    type: "permission_change",
    operation: "Role Assignment",
    description: "Added admin role to user for development workspace",
    user: "admin@company.com",
    workspace: "development",
    severity: "info",
    ipAddress: "10.0.1.50",
    details: {
      targetUser: "john.doe@company.com",
      roleAdded: "workspace-admin",
      previousRoles: ["workspace-viewer"],
      newRoles: ["workspace-viewer", "workspace-admin"],
    },
  },
  {
    id: "audit-003",
    timestamp: "2024-01-15T12:15:00Z", 
    type: "api_key_event",
    operation: "API Key Rotation",
    description: "Rotated API key for CI/CD automation",
    user: "system@company.com",
    workspace: "production",
    severity: "warning",
    ipAddress: "192.168.2.10",
    details: {
      keyId: "ak_prod_12345",
      rotationReason: "scheduled_rotation",
      oldKeyExpiry: "2024-01-20T00:00:00Z",
      newKeyExpiry: "2024-04-20T00:00:00Z",
    },
  },
  {
    id: "audit-004",
    timestamp: "2024-01-15T11:30:00Z",
    type: "login",
    operation: "User Login",
    description: "Successful login from new device",
    user: "mike.wilson@company.com", 
    severity: "success",
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    details: {
      loginMethod: "sso",
      deviceFingerprint: "fp_abc123",
      newDevice: true,
      location: "San Francisco, CA",
    },
  },
  {
    id: "audit-005",
    timestamp: "2024-01-15T10:20:00Z",
    type: "system_error", 
    operation: "State Lock Failure",
    description: "Failed to acquire state lock due to timeout",
    user: "automated-system",
    workspace: "staging",
    severity: "error",
    details: {
      errorCode: "LOCK_TIMEOUT",
      lockDuration: "300s",
      lastLockHolder: "sarah.chen@company.com",
      retryAttempts: 3,
    },
  },
  {
    id: "audit-006",
    timestamp: "2024-01-14T16:45:00Z",
    type: "workspace_access",
    operation: "Workspace Access",
    description: "Accessed sensitive production workspace",
    user: "senior.admin@company.com",
    workspace: "production",
    severity: "info", 
    ipAddress: "192.168.1.200",
    details: {
      accessReason: "incident_response",
      approvalTicket: "INC-2024-001",
      sessionDuration: "45m",
    },
  },
  {
    id: "audit-007",
    timestamp: "2024-01-14T15:30:00Z",
    type: "permission_change",
    operation: "Permission Revocation",
    description: "Removed access permissions for departing employee", 
    user: "hr.admin@company.com",
    workspace: "all",
    severity: "warning",
    details: {
      targetUser: "former.employee@company.com",
      rolesRemoved: ["workspace-admin", "state-writer"],
      accessRevocationDate: "2024-01-14T15:30:00Z",
      offboardingTicket: "HR-2024-045",
    },
  },
  {
    id: "audit-008",
    timestamp: "2024-01-14T14:15:00Z",
    type: "resource_access",
    operation: "Sensitive Resource Access",
    description: "Accessed production database configuration",
    user: "dba.admin@company.com", 
    workspace: "production",
    resource: "aws_rds_instance.primary_db",
    severity: "warning",
    ipAddress: "10.10.1.100",
    details: {
      resourceType: "database",
      accessType: "configuration_view",
      dataClassification: "sensitive",
      approvalRequired: true,
      approver: "security.team@company.com",
    },
  },
];

// Filtered entries for different scenarios
const recentEntries = mockAuditEntries.slice(0, 4);
const errorEntries = mockAuditEntries.filter(entry => entry.severity === "error");
const permissionEntries = mockAuditEntries.filter(entry => entry.type === "permission_change");

export const Default: Story = {
  args: {
    entries: recentEntries,
    title: "Recent Audit Activity",
  },
};

export const Loading: Story = {
  args: {
    entries: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    entries: [],
    loading: false,
  },
};

export const Error: Story = {
  args: {
    entries: [],
    error: "Failed to load audit trail. Please check your connection and try again.",
  },
};

export const FullAuditTrail: Story = {
  args: {
    entries: mockAuditEntries,
    title: "Complete Audit Trail",
    hasMoreEntries: true,
    onLoadMore: () => console.log("Loading more entries..."),
  },
};

export const SecurityEvents: Story = {
  args: {
    entries: mockAuditEntries.filter(entry => 
      ["login", "logout", "permission_change", "system_error"].includes(entry.type)
    ),
    title: "Security & Access Events",
  },
};

// Interactive demo with filtering and export
export const InteractiveAuditDemo: Story = {
  render: () => {
    const [filteredEntries, setFilteredEntries] = useState<AuditEntry[]>(mockAuditEntries);
    const [filters, setFilters] = useState<AuditFilterState>({});
    const [isLoading, setIsLoading] = useState(false);

    const applyFilters = (newFilters: AuditFilterState) => {
      setFilters(newFilters);
      setIsLoading(true);
      
      // Simulate filtering delay
      setTimeout(() => {
        let filtered = [...mockAuditEntries];

        if (newFilters.user) {
          filtered = filtered.filter(entry => 
            entry.user.toLowerCase().includes(newFilters.user!.toLowerCase())
          );
        }

        if (newFilters.workspace) {
          filtered = filtered.filter(entry => 
            entry.workspace?.toLowerCase().includes(newFilters.workspace!.toLowerCase())
          );
        }

        if (newFilters.eventType) {
          filtered = filtered.filter(entry => entry.type === newFilters.eventType);
        }

        if (newFilters.searchQuery) {
          const query = newFilters.searchQuery.toLowerCase();
          filtered = filtered.filter(entry => 
            entry.operation.toLowerCase().includes(query) ||
            entry.description.toLowerCase().includes(query)
          );
        }

        if (newFilters.dateFrom) {
          const fromDate = new Date(newFilters.dateFrom);
          filtered = filtered.filter(entry => new Date(entry.timestamp) >= fromDate);
        }

        if (newFilters.dateTo) {
          const toDate = new Date(newFilters.dateTo);
          toDate.setHours(23, 59, 59, 999); // End of day
          filtered = filtered.filter(entry => new Date(entry.timestamp) <= toDate);
        }

        setFilteredEntries(filtered);
        setIsLoading(false);
      }, 500);
    };

    const clearFilters = () => {
      setFilters({});
      setFilteredEntries(mockAuditEntries);
    };

    const handleExport = () => {
      console.log("Exporting audit trail...", { entries: filteredEntries.length, filters });
      alert(`Would export ${filteredEntries.length} audit entries`);
    };

    return (
      <div style={{ 
        padding: "24px", 
        backgroundColor: "var(--freeui-color-neutral-50)",
        minHeight: "100vh"
      }}>
        <Stack gap="xl">
          {/* Header */}
          <Card padding="lg">
            <Inline justify="space-between" align="center">
              <Stack gap="xs">
                <Heading level={1} size="lg">
                  Audit & Compliance Dashboard
                </Heading>
                <p style={{ 
                  margin: 0, 
                  color: "var(--freeui-color-neutral-600)",
                  fontSize: "var(--freeui-font-size-sm)"
                }}>
                  Monitor system activity, track changes, and maintain compliance with comprehensive audit logging
                </p>
              </Stack>
              <Button variant="primary" onClick={handleExport}>
                Export Report
              </Button>
            </Inline>
          </Card>

          {/* Filter Controls */}
          <AuditFilter
            filters={filters}
            onFiltersChange={applyFilters}
            onClearFilters={clearFilters}
            onExport={handleExport}
            loading={isLoading}
          />

          {/* Export Options */}
          <AuditExport
            entries={filteredEntries}
            loading={isLoading}
          />

          {/* Audit Trail */}
          <AuditTrail
            entries={filteredEntries}
            title={`Audit Trail ${filters && Object.keys(filters).length > 0 ? '(Filtered)' : ''}`}
            loading={isLoading}
            hasMoreEntries={filteredEntries.length >= 8}
            onLoadMore={() => {
              console.log("Loading more entries...");
              alert("In a real application, this would load more audit entries");
            }}
          />
        </Stack>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
This interactive demo showcases the complete audit and compliance workflow:

1. **Filtering**: Use the filter controls to narrow down audit entries by user, workspace, event type, date range, or search query
2. **Real-time Updates**: Filters are applied with simulated loading states
3. **Export**: Export filtered results in various formats for compliance reporting
4. **Timeline View**: Browse audit events in chronological order with expandable details
5. **Load More**: Pagination support for large audit trails

Try filtering by:
- User: "sarah.chen" or "admin"
- Workspace: "production" or "development" 
- Event Type: Select from the dropdown
- Date Range: Filter to specific time periods
- Search: "State" or "API key" or "login"
        `,
      },
    },
  },
};

export const ComplianceReporting: Story = {
  render: () => (
    <div style={{ 
      padding: "24px", 
      backgroundColor: "var(--freeui-color-neutral-50)" 
    }}>
      <Stack gap="lg">
        <Card padding="lg" style={{ backgroundColor: "var(--freeui-color-semantic-info-50)" }}>
          <Stack gap="md">
            <Heading level={2} size="md">
              🔒 Compliance & Audit Reporting
            </Heading>
            <p style={{ margin: 0, color: "var(--freeui-color-neutral-700)" }}>
              This demonstrates audit trail capabilities for regulatory compliance, 
              including SOC 2, HIPAA, and other security frameworks.
            </p>
            <Inline gap="sm">
              <Button variant="primary" size="sm">Generate SOC 2 Report</Button>
              <Button variant="outline" size="sm">HIPAA Audit Trail</Button>
              <Button variant="outline" size="sm">Access Review</Button>
            </Inline>
          </Stack>
        </Card>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "24px" 
        }}>
          <Card padding="lg">
            <Stack gap="md">
              <Heading level={3} size="sm">Critical Events</Heading>
              <AuditTrail
                entries={mockAuditEntries.filter(entry => 
                  ["error", "warning"].includes(entry.severity)
                )}
                title=""
              />
            </Stack>
          </Card>

          <Card padding="lg">
            <Stack gap="md">
              <Heading level={3} size="sm">Permission Changes</Heading>
              <AuditTrail
                entries={permissionEntries}
                title=""
              />
            </Stack>
          </Card>
        </div>

        <AuditExport
          entries={mockAuditEntries}
        />
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Compliance reporting example showing how audit trails support regulatory requirements:

- **Critical Events**: Security incidents and system errors
- **Permission Changes**: User access modifications for compliance tracking
- **Export Options**: Generate reports in formats required by auditors
- **Data Integrity**: Compliance mode with verification checksums
        `,
      },
    },
  },
};