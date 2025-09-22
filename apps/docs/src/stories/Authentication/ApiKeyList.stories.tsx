import type { Meta, StoryObj } from "@storybook/react";
import { ApiKeyList, ApiKey } from "@rockminster/react";

// Mock API keys for stories
const mockApiKeys: ApiKey[] = [
  {
    id: "key-001",
    name: "Production API Key",
    key: "ak_prod_1234567890abcdef1234567890abcdef12345678",
    permissions: ["read", "write", "admin"],
    createdAt: "2024-01-15T10:30:00Z",
    lastUsedAt: "2024-01-20T14:22:00Z",
    expiresAt: "2024-12-31T23:59:59Z",
    status: "active",
    createdBy: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    metadata: {
      description: "Main production API key for backend services",
      source: "Backend API",
      ipRestrictions: ["192.168.1.0/24", "10.0.0.0/8"],
      rateLimit: {
        requestsPerMinute: 1000,
        burstSize: 50,
      },
    },
  },
  {
    id: "key-002",
    name: "Development Key",
    key: "ak_dev_abcdef1234567890abcdef1234567890abcdef12",
    permissions: ["read", "write"],
    createdAt: "2024-01-10T09:15:00Z",
    lastUsedAt: "2024-01-19T16:45:00Z",
    status: "active",
    createdBy: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    metadata: {
      description: "Development environment API key",
      source: "Development Tools",
      rateLimit: {
        requestsPerMinute: 100,
        burstSize: 10,
      },
    },
  },
  {
    id: "key-003",
    name: "Analytics Integration",
    key: "ak_analytics_fedcba0987654321fedcba0987654321fedcba09",
    permissions: ["read"],
    createdAt: "2024-01-05T14:20:00Z",
    lastUsedAt: "2024-01-18T11:30:00Z",
    expiresAt: "2024-06-30T23:59:59Z",
    status: "active",
    createdBy: {
      id: "user-3",
      name: "Carol Davis",
      email: "carol@example.com",
    },
    metadata: {
      description: "Read-only access for analytics dashboard",
      source: "Analytics Service",
    },
  },
  {
    id: "key-004",
    name: "Legacy Integration",
    key: "ak_legacy_9876543210fedcba9876543210fedcba98765432",
    permissions: ["read"],
    createdAt: "2023-12-01T08:00:00Z",
    lastUsedAt: "2024-01-01T12:00:00Z",
    expiresAt: "2024-01-31T23:59:59Z",
    status: "expired",
    createdBy: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    metadata: {
      description: "Legacy system integration (deprecated)",
      source: "Legacy System",
    },
  },
  {
    id: "key-005",
    name: "Revoked Test Key",
    key: "ak_test_1111222233334444555566667777888899990000",
    permissions: ["read", "write"],
    createdAt: "2024-01-12T16:30:00Z",
    lastUsedAt: "2024-01-15T09:20:00Z",
    status: "revoked",
    createdBy: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    metadata: {
      description: "Test API key - revoked after security incident",
      source: "Testing Suite",
    },
  },
];

const meta: Meta<typeof ApiKeyList> = {
  title: "Authentication/ApiKeyList",
  component: ApiKeyList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The ApiKeyList component displays a comprehensive list of API keys with management capabilities.

## Features
- **Key management**: View, select, revoke, and rotate API keys
- **Status indicators**: Visual status badges with color coding (active, expired, revoked)
- **Security details**: Masked key values, permissions, IP restrictions, and rate limits
- **Usage tracking**: Last used timestamps and creation details
- **Batch operations**: Selection support for bulk operations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Adapts to different screen sizes with compact mode

## Security Considerations
- API key values are automatically masked for security
- Sensitive operations (revoke, rotate) include confirmation workflows
- IP restrictions and rate limits are clearly displayed
- Audit trail integration for all key operations
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    apiKeys: {
      description: "Array of API keys to display",
      control: false,
    },
    selectedKeyId: {
      description: "Currently selected API key ID",
      control: "text",
    },
    onKeySelect: {
      description: "Callback when an API key is selected",
      action: "key selected",
    },
    onKeyRevoke: {
      description: "Callback when an API key should be revoked",
      action: "key revoked",
    },
    onKeyRotate: {
      description: "Callback when an API key should be rotated",
      action: "key rotated",
    },
    loading: {
      description: "Whether the list is loading",
      control: "boolean",
    },
    error: {
      description: "Error message to display",
      control: "text",
    },
    showActions: {
      description: "Whether to show action buttons",
      control: "boolean",
    },
    compact: {
      description: "Compact display mode",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApiKeyList>;

export const Default: Story = {
  args: {
    apiKeys: mockApiKeys,
    showActions: true,
  },
};

export const WithSelection: Story = {
  args: {
    apiKeys: mockApiKeys,
    selectedKeyId: "key-001",
    showActions: true,
  },
  parameters: {
    docs: {
      description: {
        story: "API key list with a selected key highlighted.",
      },
    },
  },
};

export const CompactMode: Story = {
  args: {
    apiKeys: mockApiKeys,
    compact: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Compact display mode for space-constrained layouts.",
      },
    },
  },
};

export const WithoutActions: Story = {
  args: {
    apiKeys: mockApiKeys,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Read-only view without action buttons.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    apiKeys: [],
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state while fetching API keys.",
      },
    },
  },
};

export const Error: Story = {
  args: {
    apiKeys: [],
    error:
      "Failed to load API keys. Please check your permissions and try again.",
  },
  parameters: {
    docs: {
      description: {
        story: "Error state when API key loading fails.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    apiKeys: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when no API keys are available.",
      },
    },
  },
};

export const ActiveKeysOnly: Story = {
  args: {
    apiKeys: mockApiKeys.filter((key) => key.status === "active"),
    showActions: true,
  },
  parameters: {
    docs: {
      description: {
        story: "List showing only active API keys.",
      },
    },
  },
};

export const StatusVariations: Story = {
  args: {
    apiKeys: [
      mockApiKeys.find((key) => key.status === "active")!,
      mockApiKeys.find((key) => key.status === "expired")!,
      mockApiKeys.find((key) => key.status === "revoked")!,
    ],
    showActions: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Showcasing different API key status indicators.",
      },
    },
  },
};
