import type { Meta, StoryObj } from "@storybook/react";
import { AuditTrail, AuditLogEntry } from "@rockminster/react";

// Mock audit log entries
const mockAuditEntries: AuditLogEntry[] = [
  {
    id: "audit-001",
    operation: "create",
    versionId: "v1.3.0-abc123",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    timestamp: "2024-01-15T10:30:00Z",
    description: "Created version 1.3.0 with user authentication features",
    metadata: {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ipAddress: "192.168.1.100",
    },
  },
  {
    id: "audit-002",
    operation: "view",
    versionId: "v1.3.0-abc123",
    user: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    timestamp: "2024-01-15T11:45:00Z",
    description: "Viewed version 1.3.0 for review",
  },
  {
    id: "audit-003",
    operation: "diff",
    versionId: "v1.3.0-abc123",
    user: {
      id: "user-3",
      name: "Carol Davis",
      email: "carol@example.com",
    },
    timestamp: "2024-01-15T14:20:00Z",
    description: "Compared versions 1.2.0 and 1.3.0",
    metadata: {
      compareVersions: ["v1.2.0-ghi789", "v1.3.0-abc123"],
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  },
  {
    id: "audit-004",
    operation: "update",
    versionId: "v1.2.1-def456",
    user: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    timestamp: "2024-01-10T14:20:00Z",
    description: "Updated version 1.2.1 with bug fixes",
    metadata: {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ipAddress: "192.168.1.101",
    },
  },
  {
    id: "audit-005",
    operation: "rollback",
    versionId: "v1.2.0-ghi789",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    timestamp: "2024-01-09T16:30:00Z",
    description: "Rolled back to version 1.2.0 due to critical issues in 1.2.1",
    metadata: {
      rollbackTo: "v1.2.0-ghi789",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ipAddress: "192.168.1.100",
    },
  },
  {
    id: "audit-006",
    operation: "view",
    versionId: "v1.2.0-ghi789",
    user: {
      id: "user-3",
      name: "Carol Davis",
      email: "carol@example.com",
    },
    timestamp: "2024-01-05T09:15:00Z",
    description: "Viewed version 1.2.0 after creation",
  },
  {
    id: "audit-007",
    operation: "create",
    versionId: "v1.2.0-ghi789",
    user: {
      id: "user-3",
      name: "Carol Davis",
      email: "carol@example.com",
    },
    timestamp: "2024-01-05T09:15:00Z",
    description: "Created version 1.2.0 with UI redesign",
    metadata: {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      ipAddress: "192.168.1.102",
    },
  },
  {
    id: "audit-008",
    operation: "delete",
    versionId: "v1.1.5-old123",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    timestamp: "2024-01-03T12:00:00Z",
    description: "Deleted deprecated version 1.1.5",
    metadata: {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ipAddress: "192.168.1.100",
    },
  },
];

const meta: Meta<typeof AuditTrail> = {
  title: "StateVersion/AuditTrail",
  component: AuditTrail,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The AuditTrail component displays a chronological timeline of operations performed on state versions,
providing transparency and accountability for state management actions.

## Features
- **Timeline view**: Chronological display of operations with visual timeline
- **Operation types**: Support for create, update, rollback, delete, view, and diff operations
- **User information**: Display of user details and timestamps for each operation
- **Expandable details**: Additional metadata for operations when available
- **Date grouping**: Optional grouping of entries by date for better organization
- **Load more**: Pagination support for large audit logs
- **Accessible**: Full keyboard navigation and screen reader support
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    entries: {
      description: "Array of audit log entries to display",
      control: false,
    },
    loading: {
      description: "Whether audit trail is loading",
      control: "boolean",
    },
    error: {
      description: "Error message to display",
      control: "text",
    },
    maxEntries: {
      description: "Maximum number of entries to show initially",
      control: "number",
    },
    groupByDate: {
      description: "Whether to group entries by date",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuditTrail>;

export const Default: Story = {
  args: {
    entries: mockAuditEntries,
  },
};

export const WithoutDateGrouping: Story = {
  args: {
    entries: mockAuditEntries,
    groupByDate: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Audit trail without date grouping for a simpler timeline view.",
      },
    },
  },
};

export const LimitedEntries: Story = {
  args: {
    entries: mockAuditEntries,
    maxEntries: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Audit trail with limited initial entries and load more functionality.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    entries: [],
    loading: true,
  },
};

export const Error: Story = {
  args: {
    entries: [],
    error:
      "Failed to load audit trail. Please check your permissions and try again.",
  },
};

export const Empty: Story = {
  args: {
    entries: [],
  },
};

export const SingleEntry: Story = {
  args: {
    entries: [mockAuditEntries[0]],
  },
  parameters: {
    docs: {
      description: {
        story: "Audit trail with a single entry showing detailed metadata.",
      },
    },
  },
};

export const OperationTypes: Story = {
  args: {
    entries: [
      {
        id: "create-demo",
        operation: "create",
        versionId: "v1.0.0",
        user: { id: "user-1", name: "Developer" },
        timestamp: "2024-01-01T10:00:00Z",
        description: "Created new version",
      },
      {
        id: "update-demo",
        operation: "update",
        versionId: "v1.0.1",
        user: { id: "user-2", name: "Maintainer" },
        timestamp: "2024-01-02T10:00:00Z",
        description: "Updated existing version",
      },
      {
        id: "rollback-demo",
        operation: "rollback",
        versionId: "v1.0.0",
        user: { id: "user-3", name: "Admin" },
        timestamp: "2024-01-03T10:00:00Z",
        description: "Rolled back to previous version",
        metadata: { rollbackTo: "v1.0.0" },
      },
      {
        id: "delete-demo",
        operation: "delete",
        versionId: "v0.9.0",
        user: { id: "user-1", name: "Developer" },
        timestamp: "2024-01-04T10:00:00Z",
        description: "Deleted deprecated version",
      },
      {
        id: "view-demo",
        operation: "view",
        versionId: "v1.0.1",
        user: { id: "user-4", name: "Reviewer" },
        timestamp: "2024-01-05T10:00:00Z",
        description: "Viewed version for review",
      },
      {
        id: "diff-demo",
        operation: "diff",
        versionId: "v1.0.1",
        user: { id: "user-5", name: "Analyst" },
        timestamp: "2024-01-06T10:00:00Z",
        description: "Compared versions",
        metadata: { compareVersions: ["v1.0.0", "v1.0.1"] },
      },
    ],
    groupByDate: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of all operation types with their respective icons and colors.",
      },
    },
  },
};
