import type { Meta, StoryObj } from "@storybook/react";
import { PlanBadge } from "@rockminster/react";

const meta: Meta<typeof PlanBadge> = {
  title: "OrganizationWorkspace/PlanBadge",
  component: PlanBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The PlanBadge component displays subscription plan types with appropriate visual styling and semantic colors.

## Features
- **Plan Types**: Free, Pro, and Enterprise plans
- **Visual Distinction**: Different colors for each plan type
- **Compact Design**: Suitable for cards, lists, and headers
- **Accessible**: Proper contrast ratios and semantic markup
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    plan: {
      control: { type: "select" },
      options: ["free", "pro", "enterprise"],
      description: "The subscription plan type",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlanBadge>;

export const Free: Story = {
  args: {
    plan: "free",
  },
  parameters: {
    docs: {
      description: {
        story: "Free plan badge with basic styling.",
      },
    },
  },
};

export const Pro: Story = {
  args: {
    plan: "pro",
  },
  parameters: {
    docs: {
      description: {
        story: "Pro plan badge with premium styling.",
      },
    },
  },
};

export const Enterprise: Story = {
  args: {
    plan: "enterprise",
  },
  parameters: {
    docs: {
      description: {
        story: "Enterprise plan badge with high-tier styling.",
      },
    },
  },
};

export const AllPlans: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <PlanBadge plan="free" />
      <PlanBadge plan="pro" />
      <PlanBadge plan="enterprise" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All plan badges shown together for comparison.",
      },
    },
  },
};
