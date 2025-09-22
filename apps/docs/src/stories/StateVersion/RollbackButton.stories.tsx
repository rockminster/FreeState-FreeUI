import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RollbackButton, StateVersion } from "@rockminster/react";

// Mock version data
const currentVersion: StateVersion = {
  id: "v1.3.0-abc123",
  version: "1.3.0",
  description: "Added user authentication and profile management features",
  createdAt: "2024-01-15T10:30:00Z",
  author: {
    id: "user-1",
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  content: {
    users: { count: 150, features: ["auth", "profiles"] },
    config: { theme: "dark", notifications: true },
  },
  checksum: "sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  size: 2048,
  tags: ["stable", "auth"],
};

const targetVersion: StateVersion = {
  id: "v1.2.0-ghi789",
  version: "1.2.0",
  description: "Major UI redesign with improved accessibility",
  createdAt: "2024-01-05T09:15:00Z",
  author: {
    id: "user-3",
    name: "Carol Davis",
    email: "carol@example.com",
  },
  content: {
    users: { count: 100, features: ["basic"] },
    config: { theme: "light", notifications: false },
  },
  checksum: "sha256:c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
  size: 1920,
  tags: ["major", "ui"],
};

const meta: Meta<typeof RollbackButton> = {
  title: "StateVersion/RollbackButton",
  component: RollbackButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The RollbackButton component provides a safe way to rollback to a previous state version
with confirmation dialog and version comparison display.

## Features
- **Confirmation dialog**: Prevents accidental rollbacks with detailed confirmation
- **Version comparison**: Side-by-side display of current and target versions
- **Loading states**: Visual feedback during rollback operation
- **Accessible**: Full keyboard navigation and screen reader support
- **Customizable**: Multiple sizes and variants to match design needs
- **Safe operation**: Clear description of the rollback action and its consequences
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    targetVersion: {
      description: "Version to rollback to",
      control: false,
    },
    currentVersion: {
      description: "Current version being rolled back from",
      control: false,
    },
    onRollback: {
      description: "Callback when rollback is confirmed",
      action: "rollbackConfirmed",
    },
    loading: {
      description: "Whether rollback operation is in progress",
      control: "boolean",
    },
    disabled: {
      description: "Whether rollback is disabled",
      control: "boolean",
    },
    size: {
      description: "Button size",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      description: "Button variant",
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RollbackButton>;

export const Default: Story = {
  args: {
    targetVersion,
    currentVersion,
  },
};

export const SmallButton: Story = {
  args: {
    targetVersion,
    currentVersion,
    size: "sm",
  },
};

export const LargeButton: Story = {
  args: {
    targetVersion,
    currentVersion,
    size: "lg",
  },
};

export const PrimaryVariant: Story = {
  args: {
    targetVersion,
    currentVersion,
    variant: "primary",
  },
};

export const SecondaryVariant: Story = {
  args: {
    targetVersion,
    currentVersion,
    variant: "secondary",
  },
};

export const Loading: Story = {
  args: {
    targetVersion,
    currentVersion,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    targetVersion,
    currentVersion,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled rollback button when operation is not allowed.",
      },
    },
  },
};

export const InteractiveDemo: Story = {
  args: {
    targetVersion,
    currentVersion,
  },
  render: (args) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [lastRollback, setLastRollback] = React.useState<string | null>(null);

    const handleRollback = (targetVersionId: string) => {
      setIsLoading(true);
      // Simulate rollback operation
      setTimeout(() => {
        setIsLoading(false);
        setLastRollback(targetVersionId);
      }, 2000);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <RollbackButton
          {...args}
          loading={isLoading}
          onRollback={handleRollback}
        />
        {lastRollback && (
          <div style={{ 
            padding: "0.5rem 1rem", 
            backgroundColor: "#22c55e", 
            color: "white", 
            borderRadius: "0.375rem",
            fontSize: "0.875rem"
          }}>
            Successfully rolled back to {lastRollback}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing the complete rollback flow with loading and success states.",
      },
    },
  },
};

export const VersionComparison: Story = {
  args: {
    targetVersion: {
      ...targetVersion,
      description: "This is a much longer description that demonstrates how the confirmation dialog handles longer text content and ensures good readability",
    },
    currentVersion,
  },
  parameters: {
    docs: {
      description: {
        story: "Example showing version comparison with longer descriptions.",
      },
    },
  },
};

export const MinimalVersions: Story = {
  args: {
    targetVersion: {
      id: "v1.0.0",
      version: "1.0.0",
      description: "Initial",
      createdAt: "2023-12-01T12:00:00Z",
      author: { id: "user-1", name: "Dev" },
      content: {},
      checksum: "sha256:abc",
      size: 64,
    },
    currentVersion: {
      id: "v1.1.0",
      version: "1.1.0", 
      description: "Update",
      createdAt: "2023-12-15T12:00:00Z",
      author: { id: "user-2", name: "Dev2" },
      content: {},
      checksum: "sha256:def",
      size: 128,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Rollback button with minimal version data (no emails, tags, etc.).",
      },
    },
  },
};