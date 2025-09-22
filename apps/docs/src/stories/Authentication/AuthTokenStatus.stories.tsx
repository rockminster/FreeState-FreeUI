import type { Meta, StoryObj } from "@storybook/react";
import { AuthTokenStatus, ApiKey, JwtToken } from "@rockminster/react";

// Mock API key for stories
const mockApiKey: ApiKey = {
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
};

const mockExpiredApiKey: ApiKey = {
  ...mockApiKey,
  id: "key-002",
  name: "Expired Test Key",
  key: "ak_test_abcdef1234567890abcdef1234567890abcdef12",
  status: "expired",
  expiresAt: "2024-01-01T23:59:59Z",
  lastUsedAt: "2023-12-30T09:15:00Z",
};

const mockRevokedApiKey: ApiKey = {
  ...mockApiKey,
  id: "key-003",
  name: "Revoked Security Key",
  key: "ak_sec_fedcba0987654321fedcba0987654321fedcba09",
  status: "revoked",
  lastUsedAt: "2024-01-18T16:45:00Z",
};

const mockExpiringSoonApiKey: ApiKey = {
  ...mockApiKey,
  id: "key-004",
  name: "Expiring Soon Key",
  key: "ak_temp_9876543210fedcba9876543210fedcba98765432",
  expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
};

// Mock JWT token for stories
const mockJwtToken: JwtToken = {
  id: "jwt-001",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  type: "access",
  subject: "user-123",
  issuer: "https://api.example.com",
  audience: ["api.example.com", "dashboard.example.com"],
  issuedAt: "2024-01-20T10:30:00Z",
  expiresAt: "2024-01-20T11:30:00Z",
  status: "active",
  scopes: ["read", "write", "profile"],
  claims: {
    role: "admin",
    department: "engineering",
    permissions: ["read", "write", "admin"],
  },
};

const mockExpiredJwtToken: JwtToken = {
  ...mockJwtToken,
  id: "jwt-002",
  status: "expired",
  expiresAt: "2024-01-19T10:30:00Z",
};

const meta: Meta<typeof AuthTokenStatus> = {
  title: "Authentication/AuthTokenStatus",
  component: AuthTokenStatus,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The AuthTokenStatus component displays comprehensive status information for authentication tokens, supporting both API keys and JWT tokens.

## Features
- **Status indicators**: Visual status badges with color coding
- **Token metadata**: Permissions, expiration, last used, and creation details
- **Security information**: IP restrictions, rate limits, and token claims
- **Expiration warnings**: Visual alerts for expired or expiring tokens
- **Masked values**: Secure display of sensitive token values
- **Action buttons**: Context-aware actions for token management
- **Detailed view**: Expandable detailed information mode
- **Accessibility**: Full keyboard navigation and screen reader support

## Token Types
- **API Keys**: Long-lived tokens with permission scopes and security settings
- **JWT Tokens**: Short-lived tokens with claims and audience information
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    token: {
      description: "Token object to display (API key or JWT)",
      control: false,
    },
    tokenType: {
      description: "Type of token for proper display",
      control: { type: "select" },
      options: ["api_key", "jwt"],
    },
    detailed: {
      description: "Whether to show detailed information",
      control: "boolean",
    },
    onAction: {
      description: "Callback for token actions",
      action: "token action",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthTokenStatus>;

export const ApiKeyActive: Story = {
  args: {
    token: mockApiKey,
    tokenType: "api_key",
    detailed: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Active API key with basic status information.",
      },
    },
  },
};

export const ApiKeyDetailed: Story = {
  args: {
    token: mockApiKey,
    tokenType: "api_key",
    detailed: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active API key with detailed information including permissions, IP restrictions, and rate limits.",
      },
    },
  },
};

export const ApiKeyExpired: Story = {
  args: {
    token: mockExpiredApiKey,
    tokenType: "api_key",
    detailed: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Expired API key showing expiration warning.",
      },
    },
  },
};

export const ApiKeyRevoked: Story = {
  args: {
    token: mockRevokedApiKey,
    tokenType: "api_key",
    detailed: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Revoked API key with disabled actions.",
      },
    },
  },
};

export const ApiKeyExpiringSoon: Story = {
  args: {
    token: mockExpiringSoonApiKey,
    tokenType: "api_key",
    detailed: true,
  },
  parameters: {
    docs: {
      description: {
        story: "API key expiring soon with warning indicator.",
      },
    },
  },
};

export const JwtTokenActive: Story = {
  args: {
    token: mockJwtToken,
    tokenType: "jwt",
    detailed: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Active JWT token with basic status information.",
      },
    },
  },
};

export const JwtTokenDetailed: Story = {
  args: {
    token: mockJwtToken,
    tokenType: "jwt",
    detailed: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active JWT token with detailed information including claims, scopes, and metadata.",
      },
    },
  },
};

export const JwtTokenExpired: Story = {
  args: {
    token: mockExpiredJwtToken,
    tokenType: "jwt",
    detailed: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Expired JWT token showing expiration status.",
      },
    },
  },
};

export const WithActions: Story = {
  args: {
    token: mockApiKey,
    tokenType: "api_key",
    detailed: true,
    onAction: (action: string) => {
      console.log(`Token action: ${action}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Token status with action buttons for management operations.",
      },
    },
  },
};

export const JwtWithActions: Story = {
  args: {
    token: mockJwtToken,
    tokenType: "jwt",
    detailed: true,
    onAction: (action: string) => {
      console.log(`JWT action: ${action}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "JWT token with action buttons including refresh capability.",
      },
    },
  },
};
