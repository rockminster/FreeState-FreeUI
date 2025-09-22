import type { Meta, StoryObj } from "@storybook/react";
import { AuthenticationAudit, AuthEvent } from "@rockminster/react";

// Mock authentication events for stories
const mockAuthEvents: AuthEvent[] = [
  {
    id: "event-001",
    type: "api_key_created",
    timestamp: "2024-01-20T14:30:00Z",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    resourceId: "key-001",
    resourceType: "api_key",
    details: {
      description:
        "Created new API key 'Production API Key' with admin permissions",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ipAddress: "192.168.1.100",
      success: true,
      metadata: {
        keyName: "Production API Key",
        permissions: ["read", "write", "admin"],
        ipRestrictions: ["192.168.1.0/24"],
      },
    },
  },
  {
    id: "event-002",
    type: "login_success",
    timestamp: "2024-01-20T13:45:00Z",
    user: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    resourceType: "user_session",
    details: {
      description: "Successful login from development environment",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      ipAddress: "10.0.1.45",
      success: true,
      metadata: {
        sessionId: "sess_abc123def456",
        loginMethod: "password",
      },
    },
  },
  {
    id: "event-003",
    type: "api_key_used",
    timestamp: "2024-01-20T13:22:00Z",
    user: {
      id: "system",
      name: "System",
    },
    resourceId: "key-002",
    resourceType: "api_key",
    details: {
      description: "API key used for GET /api/users endpoint",
      userAgent: "ApiClient/1.0",
      ipAddress: "203.0.113.42",
      success: true,
      metadata: {
        endpoint: "/api/users",
        method: "GET",
        responseCode: 200,
        requestId: "req_xyz789",
      },
    },
  },
  {
    id: "event-004",
    type: "jwt_issued",
    timestamp: "2024-01-20T12:15:00Z",
    user: {
      id: "user-3",
      name: "Carol Davis",
      email: "carol@example.com",
    },
    resourceId: "jwt-001",
    resourceType: "jwt_token",
    details: {
      description: "Issued new JWT access token",
      userAgent: "Dashboard/2.1.0",
      ipAddress: "198.51.100.33",
      success: true,
      metadata: {
        tokenType: "access",
        scopes: ["read", "write", "profile"],
        expiresIn: 3600,
      },
    },
  },
  {
    id: "event-005",
    type: "login_failure",
    timestamp: "2024-01-20T11:30:00Z",
    user: {
      id: "unknown",
      name: "Unknown User",
    },
    details: {
      description: "Failed login attempt with invalid credentials",
      userAgent: "curl/7.68.0",
      ipAddress: "198.51.100.999",
      success: false,
      error: "Invalid username or password",
      metadata: {
        attemptedUsername: "admin",
        failureReason: "invalid_credentials",
      },
    },
  },
  {
    id: "event-006",
    type: "api_key_revoked",
    timestamp: "2024-01-20T10:45:00Z",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    resourceId: "key-003",
    resourceType: "api_key",
    details: {
      description:
        "Revoked API key 'Legacy Integration' due to security policy",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ipAddress: "192.168.1.100",
      success: true,
      metadata: {
        keyName: "Legacy Integration",
        revocationReason: "security_policy_violation",
        lastUsed: "2024-01-15T09:20:00Z",
      },
    },
  },
  {
    id: "event-007",
    type: "permission_denied",
    timestamp: "2024-01-20T09:30:00Z",
    user: {
      id: "user-4",
      name: "David Wilson",
      email: "david@example.com",
    },
    resourceId: "key-004",
    resourceType: "api_key",
    details: {
      description:
        "Access denied for DELETE /api/users/123 - insufficient permissions",
      userAgent: "ApiClient/1.0",
      ipAddress: "203.0.113.55",
      success: false,
      error: "Insufficient permissions for this operation",
      metadata: {
        requestedEndpoint: "/api/users/123",
        requestedMethod: "DELETE",
        requiredPermission: "admin",
        userPermissions: ["read", "write"],
      },
    },
  },
  {
    id: "event-008",
    type: "api_key_rotated",
    timestamp: "2024-01-19T16:20:00Z",
    user: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    resourceId: "key-005",
    resourceType: "api_key",
    details: {
      description: "Rotated API key 'Development Key' - new key generated",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      ipAddress: "10.0.1.45",
      success: true,
      metadata: {
        keyName: "Development Key",
        oldKeyId: "key-005-old",
        newKeyId: "key-005-new",
        rotationReason: "scheduled_rotation",
      },
    },
  },
  {
    id: "event-009",
    type: "jwt_revoked",
    timestamp: "2024-01-19T14:10:00Z",
    user: {
      id: "user-3",
      name: "Carol Davis",
      email: "carol@example.com",
    },
    resourceId: "jwt-002",
    resourceType: "jwt_token",
    details: {
      description: "Manually revoked JWT token due to suspicious activity",
      userAgent: "Dashboard/2.1.0",
      ipAddress: "198.51.100.33",
      success: true,
      metadata: {
        tokenType: "access",
        revocationReason: "suspicious_activity",
        detectedAnomaly: "unusual_location",
      },
    },
  },
  {
    id: "event-010",
    type: "logout",
    timestamp: "2024-01-19T12:00:00Z",
    user: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    resourceType: "user_session",
    details: {
      description: "User logged out successfully",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      ipAddress: "10.0.1.45",
      success: true,
      metadata: {
        sessionId: "sess_abc123def456",
        sessionDuration: 7200,
      },
    },
  },
];

const meta: Meta<typeof AuthenticationAudit> = {
  title: "Authentication/AuthenticationAudit",
  component: AuthenticationAudit,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The AuthenticationAudit component displays a comprehensive timeline of authentication events with advanced filtering capabilities.

## Features
- **Event timeline**: Chronological display of authentication events with visual indicators
- **Event filtering**: Filter by event type, user, and date range
- **Event types**: Support for API key operations, JWT operations, login events, and permission checks
- **Success/failure indicators**: Visual distinction between successful and failed operations
- **Expandable details**: Additional metadata and context for each event
- **Date grouping**: Optional grouping of events by date for better organization
- **Load more**: Pagination support for large audit logs
- **Security context**: IP addresses, user agents, and other security-relevant information
- **Accessibility**: Full keyboard navigation and screen reader support

## Event Types
- **API Key Events**: Creation, revocation, rotation, and usage
- **JWT Events**: Issuance, refresh, and revocation
- **Authentication Events**: Login success/failure and logout
- **Authorization Events**: Permission grants and denials
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    events: {
      description: "Array of authentication events to display",
      control: false,
    },
    eventTypeFilter: {
      description: "Filter by event type",
      control: "object",
    },
    userFilter: {
      description: "Filter by user name",
      control: "text",
    },
    dateRange: {
      description: "Filter by date range",
      control: "object",
    },
    loading: {
      description: "Whether audit log is loading",
      control: "boolean",
    },
    error: {
      description: "Error message to display",
      control: "text",
    },
    maxEvents: {
      description: "Maximum number of events to show initially",
      control: "number",
    },
    groupByDate: {
      description: "Whether to group events by date",
      control: "boolean",
    },
    onFilterChange: {
      description: "Callback when filters change",
      action: "filter changed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthenticationAudit>;

export const Default: Story = {
  args: {
    events: mockAuthEvents,
    groupByDate: true,
  },
};

export const WithoutDateGrouping: Story = {
  args: {
    events: mockAuthEvents,
    groupByDate: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Authentication audit without date grouping for a flat timeline view.",
      },
    },
  },
};

export const FilteredByEventType: Story = {
  args: {
    events: mockAuthEvents,
    eventTypeFilter: ["api_key_created", "api_key_revoked", "api_key_rotated"],
    groupByDate: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Audit log filtered to show only API key management events.",
      },
    },
  },
};

export const LoginEvents: Story = {
  args: {
    events: mockAuthEvents.filter(
      (event) =>
        event.type === "login_success" ||
        event.type === "login_failure" ||
        event.type === "logout"
    ),
    groupByDate: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Audit log showing only authentication events (login/logout).",
      },
    },
  },
};

export const SecurityEvents: Story = {
  args: {
    events: mockAuthEvents.filter(
      (event) =>
        event.type === "login_failure" ||
        event.type === "permission_denied" ||
        event.type === "api_key_revoked" ||
        event.type === "jwt_revoked"
    ),
    groupByDate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Audit log filtered to show security-relevant events and failures.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    events: [],
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state while fetching authentication events.",
      },
    },
  },
};

export const Error: Story = {
  args: {
    events: [],
    error:
      "Failed to load authentication audit log. Please check your permissions and try again.",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state when audit log loading fails.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state when no authentication events match the current filters.",
      },
    },
  },
};

export const LimitedEvents: Story = {
  args: {
    events: mockAuthEvents,
    maxEvents: 3,
    groupByDate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Audit log with limited initial display showing load more functionality.",
      },
    },
  },
};

export const FailureEvents: Story = {
  args: {
    events: mockAuthEvents.filter((event) => !event.details.success),
    groupByDate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Audit log showing only failed authentication and authorization attempts.",
      },
    },
  },
};
