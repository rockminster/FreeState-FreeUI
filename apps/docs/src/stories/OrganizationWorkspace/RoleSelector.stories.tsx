import type { Meta, StoryObj } from "@storybook/react";
import { RoleSelector } from "@rockminster/react";
import { useState } from "react";

const meta: Meta<typeof RoleSelector> = {
  title: "OrganizationWorkspace/RoleSelector",
  component: RoleSelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The RoleSelector component provides a dropdown interface for selecting user roles with clear permission descriptions.

## Features
- **Role Selection**: Admin, Contributor, and Read-Only roles
- **Permission Descriptions**: Clear explanations of each role's capabilities
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Disabled State**: Support for disabled/read-only scenarios
- **Controlled Component**: Fully controlled with value and onChange
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "select" },
      options: ["admin", "contributor", "read-only"],
      description: "Currently selected role",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the selector is disabled",
    },
    onChange: {
      description: "Callback when role selection changes",
      action: "role-changed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoleSelector>;

export const Default: Story = {
  args: {
    value: "contributor",
  },
};

export const Admin: Story = {
  args: {
    value: "admin",
  },
  parameters: {
    docs: {
      description: {
        story: "Role selector with admin role selected, showing full access description.",
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    value: "read-only",
  },
  parameters: {
    docs: {
      description: {
        story: "Role selector with read-only role selected, showing limited access description.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    value: "admin",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled role selector for read-only scenarios.",
      },
    },
  },
};

// Interactive story with state management
export const Interactive: Story = {
  render: function InteractiveRoleSelector() {
    const [role, setRole] = useState<"admin" | "contributor" | "read-only">("contributor");
    
    return (
      <div style={{ minWidth: "300px" }}>
        <RoleSelector
          value={role}
          onChange={setRole}
        />
        <div style={{ marginTop: "16px", fontSize: "14px", color: "#64748b" }}>
          Selected role: <strong>{role}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive role selector with state management and current selection display.",
      },
    },
  },
};