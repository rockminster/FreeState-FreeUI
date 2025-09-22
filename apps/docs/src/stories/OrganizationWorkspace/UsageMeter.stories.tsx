import type { Meta, StoryObj } from "@storybook/react";
import { UsageMeter } from "@rockminster/react";

const meta: Meta<typeof UsageMeter> = {
  title: "OrganizationWorkspace/UsageMeter",
  component: UsageMeter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The UsageMeter component displays usage vs limits with a visual progress bar and automatic color-coding based on usage percentage.

## Features
- **Visual Progress**: Progress bar showing usage percentage
- **Auto Color-Coding**: Automatic warning (75%+) and danger (90%+) states
- **Number Formatting**: Smart formatting for large numbers (K, M notation)
- **Units Support**: Optional unit labels for context
- **Accessible**: ARIA progress bar with proper labels
- **Manual Variants**: Override automatic color-coding when needed
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label for the usage meter",
    },
    usage: {
      control: { type: "number", min: 0 },
      description: "Current usage value",
    },
    limit: {
      control: { type: "number", min: 0 },
      description: "Maximum limit value",
    },
    unit: {
      control: { type: "text" },
      description: "Unit label (e.g., GB, /month)",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "warning", "danger"],
      description: "Color variant (auto-calculated if not specified)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UsageMeter>;

export const Default: Story = {
  args: {
    label: "Storage",
    usage: 32,
    limit: 100,
    unit: "GB",
  },
  parameters: {
    docs: {
      description: {
        story: "Default usage meter with moderate usage (32%).",
      },
    },
  },
};

export const LowUsage: Story = {
  args: {
    label: "API Requests",
    usage: 1250,
    limit: 10000,
    unit: "/ month",
  },
  parameters: {
    docs: {
      description: {
        story: "Low usage meter showing good availability (12.5%).",
      },
    },
  },
};

export const WarningLevel: Story = {
  args: {
    label: "Users",
    usage: 38,
    limit: 50,
  },
  parameters: {
    docs: {
      description: {
        story: "Warning level usage meter (76%) automatically showing warning color.",
      },
    },
  },
};

export const DangerLevel: Story = {
  args: {
    label: "Workspaces",
    usage: 9,
    limit: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Danger level usage meter (90%) automatically showing danger color.",
      },
    },
  },
};

export const OverLimit: Story = {
  args: {
    label: "Storage",
    usage: 105,
    limit: 100,
    unit: "GB",
  },
  parameters: {
    docs: {
      description: {
        story: "Usage meter showing over-limit scenario (105%).",
      },
    },
  },
};

export const LargeNumbers: Story = {
  args: {
    label: "API Requests",
    usage: 1250000,
    limit: 5000000,
    unit: "/ month",
  },
  parameters: {
    docs: {
      description: {
        story: "Usage meter with large numbers showing K/M formatting (1.3M / 5.0M).",
      },
    },
  },
};

export const ManualVariant: Story = {
  args: {
    label: "Custom Metric",
    usage: 25,
    limit: 100,
    variant: "danger",
  },
  parameters: {
    docs: {
      description: {
        story: "Usage meter with manually overridden danger variant despite low usage.",
      },
    },
  },
};

export const NoUnit: Story = {
  args: {
    label: "Items",
    usage: 847,
    limit: 1000,
  },
  parameters: {
    docs: {
      description: {
        story: "Usage meter without unit labels.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: "400px" }}>
      <UsageMeter label="Default" usage={32} limit={100} unit="GB" />
      <UsageMeter label="Warning" usage={78} limit={100} unit="GB" />
      <UsageMeter label="Danger" usage={95} limit={100} unit="GB" />
      <UsageMeter label="Manual Warning" usage={25} limit={100} unit="GB" variant="warning" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All usage meter variants shown together for comparison.",
      },
    },
  },
};