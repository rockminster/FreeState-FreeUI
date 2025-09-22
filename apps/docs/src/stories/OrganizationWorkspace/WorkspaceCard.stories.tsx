import type { Meta, StoryObj } from "@storybook/react";
import { WorkspaceCard, Workspace, WorkspaceMember } from "@rockminster/react";

// Mock workspace members
const mockMembers: WorkspaceMember[] = [
  {
    id: "user-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    joinedAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "user-2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "contributor",
    joinedAt: "2023-02-20T14:15:00Z",
  },
  {
    id: "user-3",
    name: "Carol Davis",
    email: "carol@example.com",
    role: "read-only",
    joinedAt: "2023-03-10T09:45:00Z",
  },
  {
    id: "user-4",
    name: "David Wilson",
    email: "david@example.com",
    role: "contributor",
    joinedAt: "2023-04-05T16:20:00Z",
  },
  {
    id: "user-5",
    name: "Eva Brown",
    email: "eva@example.com",
    role: "read-only",
    joinedAt: "2023-05-12T11:30:00Z",
  },
];

// Mock workspace data
const mockWorkspace: Workspace = {
  id: "workspace-1",
  name: "Product Development",
  description:
    "Main workspace for product development team collaboration and project management.",
  organizationId: "org-1",
  members: mockMembers,
  owner: {
    id: "user-1",
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  createdAt: "2023-01-15T10:30:00Z",
  updatedAt: "2024-01-10T14:20:00Z",
};

const smallWorkspace: Workspace = {
  ...mockWorkspace,
  id: "workspace-2",
  name: "Design Team",
  description: "Workspace for design team collaboration.",
  members: mockMembers.slice(0, 2),
};

const largeWorkspace: Workspace = {
  ...mockWorkspace,
  id: "workspace-3",
  name: "Engineering",
  description: "Large engineering team workspace with many contributors.",
  members: [
    ...mockMembers,
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `user-${i + 6}`,
      name: `Engineer ${i + 1}`,
      email: `engineer${i + 1}@example.com`,
      role: "contributor" as const,
      joinedAt: "2023-06-01T10:00:00Z",
    })),
  ],
};

const meta: Meta<typeof WorkspaceCard> = {
  title: "OrganizationWorkspace/WorkspaceCard",
  component: WorkspaceCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The WorkspaceCard component displays workspace information with member management capabilities and role-based access controls.

## Features
- **Member Management**: View member count and role distribution
- **Role-Based Actions**: Different actions based on user permissions
- **Member Preview**: Shows recent members with their roles
- **Permission Awareness**: UI adapts based on current user's role
- **Accessible Design**: Proper ARIA labels and semantic structure
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    workspace: {
      description: "Workspace data object",
      control: { type: "object" },
    },
    currentUserId: {
      description: "ID of the current user to determine permissions",
      control: { type: "text" },
    },
    onManageMembers: {
      description: "Callback for manage members action",
      action: "manage-members",
    },
    onSettings: {
      description: "Callback for settings action",
      action: "settings",
    },
    onLeave: {
      description: "Callback for leave workspace action",
      action: "leave",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WorkspaceCard>;

export const Default: Story = {
  args: {
    workspace: mockWorkspace,
    currentUserId: "user-2",
  },
  parameters: {
    docs: {
      description: {
        story: "Default workspace card viewed by a contributor.",
      },
    },
  },
};

export const OwnerView: Story = {
  args: {
    workspace: mockWorkspace,
    currentUserId: "user-1", // Owner
  },
  parameters: {
    docs: {
      description: {
        story: "Workspace card viewed by the owner with full permissions.",
      },
    },
  },
};

export const AdminView: Story = {
  args: {
    workspace: {
      ...mockWorkspace,
      members: [
        ...mockWorkspace.members,
        {
          id: "user-admin",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          joinedAt: "2023-01-20T10:30:00Z",
        },
      ],
    },
    currentUserId: "user-admin",
  },
  parameters: {
    docs: {
      description: {
        story: "Workspace card viewed by an admin user.",
      },
    },
  },
};

export const ReadOnlyView: Story = {
  args: {
    workspace: mockWorkspace,
    currentUserId: "user-3", // Read-only user
  },
  parameters: {
    docs: {
      description: {
        story:
          "Workspace card viewed by a read-only user with limited permissions.",
      },
    },
  },
};

export const SmallWorkspace: Story = {
  args: {
    workspace: smallWorkspace,
    currentUserId: "user-1",
  },
  parameters: {
    docs: {
      description: {
        story: "Small workspace with only 2 members.",
      },
    },
  },
};

export const LargeWorkspace: Story = {
  args: {
    workspace: largeWorkspace,
    currentUserId: "user-1",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Large workspace with many members showing preview and overflow.",
      },
    },
  },
};

export const NoDescription: Story = {
  args: {
    workspace: {
      ...mockWorkspace,
      description: undefined,
    },
    currentUserId: "user-1",
  },
  parameters: {
    docs: {
      description: {
        story: "Workspace card without description text.",
      },
    },
  },
};

export const GuestView: Story = {
  args: {
    workspace: mockWorkspace,
    // No currentUserId - guest view
  },
  parameters: {
    docs: {
      description: {
        story:
          "Workspace card viewed by a guest (no user ID) with minimal actions.",
      },
    },
  },
};
