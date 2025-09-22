import type { Meta, StoryObj } from "@storybook/react";
import { VersionViewer, StateVersion } from "@rockminster/react";

// Mock version data
const mockVersion: StateVersion = {
  id: "v1.3.0-abc123",
  version: "1.3.0",
  description: "Added user authentication and profile management features with enhanced security",
  createdAt: "2024-01-15T10:30:00Z",
  author: {
    id: "user-1",
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  content: {
    users: {
      count: 150,
      activeUsers: 120,
      features: ["auth", "profiles", "settings", "notifications"],
      permissions: {
        admin: ["read", "write", "delete"],
        user: ["read", "write"],
        guest: ["read"],
      },
    },
    config: {
      theme: "dark",
      notifications: {
        email: true,
        push: false,
        sms: true,
      },
      security: {
        twoFactor: true,
        sessionTimeout: 3600,
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: true,
          requireNumbers: true,
        },
      },
    },
    api: {
      endpoints: [
        "/api/users",
        "/api/auth",
        "/api/profiles",
        "/api/settings",
      ],
      rateLimit: {
        requestsPerMinute: 100,
        burstSize: 20,
      },
    },
  },
  checksum: "sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
  size: 2048,
  tags: ["stable", "auth", "security"],
};

const meta: Meta<typeof VersionViewer> = {
  title: "StateVersion/VersionViewer",
  component: VersionViewer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The VersionViewer component displays detailed information about a specific state version, 
including metadata, content preview, and formatting options.

## Features
- **Version details**: Display comprehensive version metadata
- **Content viewing**: Toggle between formatted and raw JSON views
- **Copy functionality**: Copy version content to clipboard
- **Loading states**: Proper feedback during data fetching
- **Accessible**: Full keyboard navigation and screen reader support
- **Responsive**: Adapts to different screen sizes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    version: {
      description: "Version object to display",
      control: false,
    },
    viewMode: {
      description: "Content display mode",
      control: { type: "select" },
      options: ["formatted", "raw"],
    },
    loading: {
      description: "Whether content is loading",
      control: "boolean",
    },
    error: {
      description: "Error message to display",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof VersionViewer>;

export const Default: Story = {
  args: {
    version: mockVersion,
  },
};

export const RawView: Story = {
  args: {
    version: mockVersion,
    viewMode: "raw",
  },
  parameters: {
    docs: {
      description: {
        story: "Version viewer displaying content in raw JSON format.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    version: mockVersion,
    loading: true,
  },
};

export const Error: Story = {
  args: {
    version: mockVersion,
    error: "Failed to load version content. Please try again.",
  },
};

export const MinimalVersion: Story = {
  args: {
    version: {
      id: "v1.0.0-simple",
      version: "1.0.0",
      description: "Initial version",
      createdAt: "2023-12-01T12:00:00Z",
      author: {
        id: "user-1",
        name: "Developer",
      },
      content: {
        message: "Hello, World!",
      },
      checksum: "sha256:simple",
      size: 64,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Version viewer with minimal version data (no tags, no email).",
      },
    },
  },
};

export const LargeContent: Story = {
  args: {
    version: {
      ...mockVersion,
      content: {
        ...mockVersion.content,
        largeDataSet: Array.from({ length: 100 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
          data: Array.from({ length: 10 }, (_, j) => `value-${i}-${j}`),
        })),
      },
      size: 50000,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Version viewer with large content to test scrolling and performance.",
      },
    },
  },
};