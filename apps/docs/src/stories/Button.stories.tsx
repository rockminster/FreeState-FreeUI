import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@freeui/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Button component is a fundamental interactive element that provides users with a way to trigger actions. 
It follows WCAG AA accessibility guidelines and supports multiple variants, sizes, and states.

## Features
- **Accessible by default**: Semantic HTML, keyboard navigation, screen reader support
- **Multiple variants**: Primary, secondary, outline, and ghost styles
- **Flexible sizing**: Small, medium, and large sizes
- **Loading states**: Built-in loading spinner
- **Icon support**: Start and end icons
- **Full TypeScript support**: Complete type definitions
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost"],
      description: "The visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    loading: {
      control: { type: "boolean" },
      description: "Whether the button is in a loading state",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the button should take full width",
    },
    children: {
      control: { type: "text" },
      description: "The content of the button",
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading Button",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
  parameters: {
    layout: "padded",
  },
};

export const WithIcons: Story = {
  args: {
    children: "Download",
    startIcon: "📁",
    endIcon: "⬇️",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button variants shown together for comparison.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All button sizes shown together for comparison.",
      },
    },
  },
};