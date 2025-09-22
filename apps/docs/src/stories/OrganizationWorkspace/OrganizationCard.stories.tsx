import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationCard, Organization } from "@rockminster/react";

// Mock organization data
const mockOrganization: Organization = {
  id: "org-1",
  name: "Acme Corporation",
  description: "A leading technology company focused on innovative solutions for modern businesses.",
  plan: "pro",
  limits: {
    workspaces: 10,
    users: 50,
    storage: 100,
    apiRequests: 100000,
  },
  usage: {
    workspaces: 7,
    users: 32,
    storage: 68,
    apiRequests: 45000,
  },
  owner: {
    id: "user-1",
    name: "John Smith",
    email: "john.smith@acme.com",
  },
  createdAt: "2023-01-15T10:30:00Z",
  updatedAt: "2024-01-10T14:20:00Z",
};

const freeOrganization: Organization = {
  ...mockOrganization,
  id: "org-2",
  name: "Startup Inc",
  description: "A growing startup with big dreams.",
  plan: "free",
  limits: {
    workspaces: 3,
    users: 10,
    storage: 5,
    apiRequests: 10000,
  },
  usage: {
    workspaces: 2,
    users: 8,
    storage: 3.2,
    apiRequests: 7500,
  },
};

const enterpriseOrganization: Organization = {
  ...mockOrganization,
  id: "org-3",
  name: "Global Enterprise",
  description: "A multinational corporation with complex organizational needs.",
  plan: "enterprise",
  limits: {
    workspaces: 100,
    users: 1000,
    storage: 1000,
    apiRequests: 1000000,
  },
  usage: {
    workspaces: 45,
    users: 523,
    storage: 423,
    apiRequests: 450000,
  },
};

const nearLimitOrganization: Organization = {
  ...freeOrganization,
  id: "org-4",
  name: "Growing Fast",
  description: "Approaching plan limits and needs to upgrade soon.",
  usage: {
    workspaces: 3,
    users: 9,
    storage: 4.8,
    apiRequests: 9200,
  },
};

const meta: Meta<typeof OrganizationCard> = {
  title: "OrganizationWorkspace/OrganizationCard",
  component: OrganizationCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The OrganizationCard component displays comprehensive organization information including plan details, usage metrics, and management actions.

## Features
- **Plan Management**: Visual plan badges and upgrade options
- **Usage Monitoring**: Progress meters for workspaces, users, storage, and API requests
- **Action Controls**: Buttons for settings, upgrades, and workspace management
- **Accessible Design**: Proper ARIA labels and keyboard navigation
- **Responsive Layout**: Adapts to different screen sizes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    organization: {
      description: "Organization data object",
      control: { type: "object" },
    },
    onUpgrade: {
      description: "Callback for upgrade action",
      action: "upgrade",
    },
    onSettings: {
      description: "Callback for settings action", 
      action: "settings",
    },
    onViewWorkspaces: {
      description: "Callback for view workspaces action",
      action: "view-workspaces",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrganizationCard>;

export const Default: Story = {
  args: {
    organization: mockOrganization,
  },
  parameters: {
    docs: {
      description: {
        story: "Default organization card with Pro plan and moderate usage.",
      },
    },
  },
};

export const FreePlan: Story = {
  args: {
    organization: freeOrganization,
  },
  parameters: {
    docs: {
      description: {
        story: "Organization with Free plan showing upgrade options.",
      },
    },
  },
};

export const EnterprisePlan: Story = {
  args: {
    organization: enterpriseOrganization,
  },
  parameters: {
    docs: {
      description: {
        story: "Enterprise organization with higher limits and no upgrade option.",
      },
    },
  },
};

export const NearLimits: Story = {
  args: {
    organization: nearLimitOrganization,
  },
  parameters: {
    docs: {
      description: {
        story: "Organization approaching plan limits with warning indicators.",
      },
    },
  },
};

export const NoDescription: Story = {
  args: {
    organization: {
      ...mockOrganization,
      description: undefined,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Organization card without description text.",
      },
    },
  },
};

export const InteractiveActions: Story = {
  args: {
    organization: mockOrganization,
    onUpgrade: () => alert("Upgrade clicked!"),
    onSettings: () => alert("Settings clicked!"), 
    onViewWorkspaces: () => alert("View workspaces clicked!"),
  },
  parameters: {
    docs: {
      description: {
        story: "Organization card with all interactive actions enabled.",
      },
    },
  },
};