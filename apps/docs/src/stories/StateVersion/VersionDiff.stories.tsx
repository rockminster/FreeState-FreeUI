import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VersionDiff, VersionDiffData } from "@rockminster/react";

// Mock diff data
const mockDiffData: VersionDiffData = {
  sourceVersion: {
    id: "v1.2.0-ghi789",
    version: "1.2.0",
    description: "UI redesign with accessibility improvements",
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
  },
  targetVersion: {
    id: "v1.3.0-abc123",
    version: "1.3.0",
    description: "Added user authentication and profile management",
    createdAt: "2024-01-15T10:30:00Z",
    author: {
      id: "user-1",
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    content: {
      users: {
        count: 150,
        features: ["basic", "auth", "profiles"],
      },
      config: {
        theme: "dark",
        notifications: true,
        security: {
          twoFactor: true,
        },
      },
    },
    checksum: "sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    size: 2048,
  },
  diff: {
    additions: [
      {
        path: "users.features[1]",
        newValue: "auth",
        type: "addition",
        lineNumber: 5,
      },
      {
        path: "users.features[2]",
        newValue: "profiles",
        type: "addition",
        lineNumber: 6,
      },
      {
        path: "config.security",
        newValue: {
          twoFactor: true,
        },
        type: "addition",
        lineNumber: 12,
      },
    ],
    deletions: [],
    modifications: [
      {
        path: "users.count",
        oldValue: 100,
        newValue: 150,
        type: "modification",
        lineNumber: 3,
      },
      {
        path: "config.theme",
        oldValue: "light",
        newValue: "dark",
        type: "modification",
        lineNumber: 8,
      },
      {
        path: "config.notifications",
        oldValue: false,
        newValue: true,
        type: "modification",
        lineNumber: 9,
      },
    ],
  },
};

const mockMinimalDiff: VersionDiffData = {
  sourceVersion: {
    id: "v1.0.0",
    version: "1.0.0",
    description: "Initial version",
    createdAt: "2023-12-01T12:00:00Z",
    author: { id: "user-1", name: "Developer" },
    content: { message: "Hello" },
    checksum: "sha256:old",
    size: 32,
  },
  targetVersion: {
    id: "v1.0.1",
    version: "1.0.1",
    description: "Updated message",
    createdAt: "2023-12-02T12:00:00Z",
    author: { id: "user-1", name: "Developer" },
    content: { message: "Hello, World!" },
    checksum: "sha256:new",
    size: 48,
  },
  diff: {
    additions: [],
    deletions: [],
    modifications: [
      {
        path: "message",
        oldValue: "Hello",
        newValue: "Hello, World!",
        type: "modification",
        lineNumber: 2,
      },
    ],
  },
};

const meta: Meta<typeof VersionDiff> = {
  title: "StateVersion/VersionDiff",
  component: VersionDiff,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The VersionDiff component displays differences between two state versions, 
supporting both side-by-side and unified diff views with syntax highlighting.

## Features
- **Diff visualization**: Clear display of additions, deletions, and modifications
- **Layout options**: Side-by-side and unified diff views
- **Line numbers**: Optional line number display for easy reference
- **Syntax highlighting**: Color-coded changes for better readability
- **Statistics**: Summary of changes (additions, deletions, modifications)
- **Responsive**: Adapts to different screen sizes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    diffData: {
      description: "Diff data containing source/target versions and changes",
      control: false,
    },
    layout: {
      description: "Diff layout style",
      control: { type: "select" },
      options: ["side-by-side", "unified"],
    },
    showLineNumbers: {
      description: "Whether to show line numbers",
      control: "boolean",
    },
    loading: {
      description: "Whether diff is being calculated",
      control: "boolean",
    },
    error: {
      description: "Error message to display",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof VersionDiff>;

export const SideBySide: Story = {
  args: {
    diffData: mockDiffData,
    layout: "side-by-side",
  },
};

export const Unified: Story = {
  args: {
    diffData: mockDiffData,
    layout: "unified",
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    diffData: mockDiffData,
    layout: "unified",
    showLineNumbers: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Unified diff view without line numbers for cleaner appearance.",
      },
    },
  },
};

export const MinimalDiff: Story = {
  args: {
    diffData: mockMinimalDiff,
    layout: "unified",
  },
  parameters: {
    docs: {
      description: {
        story: "Simple diff showing a single modification between versions.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    diffData: mockDiffData,
    loading: true,
  },
};

export const Error: Story = {
  args: {
    diffData: mockDiffData,
    error: "Failed to calculate diff. The versions might be corrupted.",
  },
};

const InteractiveComponent = (args: { diffData: VersionDiffData }) => {
  const [layout, setLayout] = React.useState<"side-by-side" | "unified">(
    "side-by-side"
  );
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <label>
          <input
            type="radio"
            name="layout"
            value="side-by-side"
            checked={layout === "side-by-side"}
            onChange={() => setLayout("side-by-side")}
          />
          Side-by-side
        </label>
        <label>
          <input
            type="radio"
            name="layout"
            value="unified"
            checked={layout === "unified"}
            onChange={() => setLayout("unified")}
          />
          Unified
        </label>
        <label>
          <input
            type="checkbox"
            checked={showLineNumbers}
            onChange={(e) => setShowLineNumbers(e.target.checked)}
          />
          Show line numbers
        </label>
      </div>
      <VersionDiff
        {...args}
        layout={layout}
        showLineNumbers={showLineNumbers}
      />
    </div>
  );
};

export const Interactive: Story = {
  args: {
    diffData: mockDiffData,
  },
  render: InteractiveComponent,
  parameters: {
    docs: {
      description: {
        story: "Interactive diff viewer with layout and line number controls.",
      },
    },
  },
};
