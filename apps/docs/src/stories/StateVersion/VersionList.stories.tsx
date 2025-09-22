import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VersionList, StateVersion } from "@rockminster/react";

// Mock data for stories
const mockVersions: StateVersion[] = [
  {
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
      users: {
        count: 150,
        features: ["auth", "profiles", "settings"],
      },
      config: {
        theme: "dark",
        notifications: true,
      },
    },
    checksum: "sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    size: 2048,
    tags: ["stable", "auth"],
  },
  {
    id: "v1.2.1-def456",
    version: "1.2.1",
    description: "Bug fixes for user interface and performance improvements",
    createdAt: "2024-01-10T14:20:00Z",
    author: {
      id: "user-2",
      name: "Bob Smith",
      email: "bob@example.com",
    },
    content: {
      users: {
        count: 120,
        features: ["basic"],
      },
      config: {
        theme: "light",
        notifications: false,
      },
    },
    checksum: "sha256:b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7",
    size: 1845,
    tags: ["bugfix"],
  },
  {
    id: "v1.2.0-ghi789",
    version: "1.2.0",
    description: "Major UI redesign with improved accessibility and mobile support",
    createdAt: "2024-01-05T09:15:00Z",
    author: {
      id: "user-3",
      name: "Carol Davis",
      email: "carol@example.com",
    },
    content: {
      users: {
        count: 100,
        features: ["basic"],
      },
      config: {
        theme: "light",
        notifications: false,
      },
    },
    checksum: "sha256:c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
    size: 1920,
    tags: ["major", "ui"],
  },
  {
    id: "v1.1.0-jkl012",
    version: "1.1.0",
    description: "Initial release with basic functionality",
    createdAt: "2023-12-20T16:45:00Z",
    author: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    content: {
      users: {
        count: 50,
        features: ["basic"],
      },
      config: {
        theme: "light",
        notifications: false,
      },
    },
    checksum: "sha256:d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9",
    size: 1024,
    tags: ["initial"],
  },
];

const meta: Meta<typeof VersionList> = {
  title: "StateVersion/VersionList",
  component: VersionList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The VersionList component displays a list of state versions with metadata including timestamps, authors, and descriptions. 
It supports selection, loading states, and compact mode for space-constrained layouts.

## Features
- **Version browsing**: Display versions with metadata and descriptions
- **Selectable versions**: Visual feedback for selected versions
- **Loading and error states**: Proper feedback during data fetching
- **Compact mode**: Space-efficient layout option
- **Accessible**: Full keyboard navigation and screen reader support
- **Tags support**: Display version tags for categorization
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    versions: {
      description: "Array of state versions to display",
      control: false,
    },
    selectedVersionId: {
      description: "ID of the currently selected version",
      control: "text",
    },
    onVersionSelect: {
      description: "Callback when a version is selected",
      action: "versionSelected",
    },
    loading: {
      description: "Whether to show loading state",
      control: "boolean",
    },
    error: {
      description: "Error message to display",
      control: "text",
    },
    compact: {
      description: "Whether to use compact layout",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof VersionList>;

export const Default: Story = {
  args: {
    versions: mockVersions,
  },
};

export const WithSelection: Story = {
  args: {
    versions: mockVersions,
    selectedVersionId: "v1.3.0-abc123",
  },
};

export const Compact: Story = {
  args: {
    versions: mockVersions,
    compact: true,
  },
};

export const Loading: Story = {
  args: {
    versions: [],
    loading: true,
  },
};

export const Error: Story = {
  args: {
    versions: [],
    error: "Failed to load versions. Please check your connection and try again.",
  },
};

export const Empty: Story = {
  args: {
    versions: [],
  },
};

export const SingleVersion: Story = {
  args: {
    versions: [mockVersions[0]],
  },
};

export const Interactive: Story = {
  args: {
    versions: mockVersions,
  },
  render: (args) => {
    const [selectedId, setSelectedId] = React.useState<string | undefined>();

    return (
      <VersionList
        {...args}
        selectedVersionId={selectedId}
        onVersionSelect={(version) => setSelectedId(version.id)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive version list with selection state management.",
      },
    },
  },
};