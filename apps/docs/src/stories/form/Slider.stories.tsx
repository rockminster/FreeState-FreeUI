import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@rockminster/react";

const meta: Meta<typeof Slider> = {
  title: "Form/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Slider component is a compositional form primitive that allows users to select values from a range.
It follows WCAG AA accessibility guidelines and can be composed with other primitives to build control panels.

## Features
- **Accessible by default**: Semantic HTML, keyboard navigation, screen reader support
- **Multiple sizes**: Small, medium, and large variants
- **Value display**: Optional current value indicator
- **Error states**: Built-in error styling and ARIA attributes
- **Compositional**: Works seamlessly with Stack, Inline, and other layout primitives
- **Full TypeScript support**: Complete type definitions

## Compositional Usage
Use Slider with Stack and Inline primitives to build settings panels, filter controls, and value selection interfaces.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the slider",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the slider has an error state",
    },
    label: {
      control: { type: "text" },
      description: "Label text for the slider",
    },
    description: {
      control: { type: "text" },
      description: "Additional description text",
    },
    showValue: {
      control: { type: "boolean" },
      description: "Whether to show the current value",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the slider is disabled",
    },
    min: {
      control: { type: "number" },
      description: "Minimum value",
    },
    max: {
      control: { type: "number" },
      description: "Maximum value",
    },
    step: {
      control: { type: "number" },
      description: "Step increment",
    },
  },
  args: {
    label: "Volume",
    size: "md",
    error: false,
    disabled: false,
    showValue: true,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Volume Level",
    showValue: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Memory Allocation",
    description: "Adjust memory allocation for optimal performance",
    showValue: true,
    min: 1,
    max: 16,
    defaultValue: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
      <Slider size="sm" label="Small slider" showValue defaultValue={25} />
      <Slider size="md" label="Medium slider" showValue defaultValue={50} />
      <Slider size="lg" label="Large slider" showValue defaultValue={75} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All slider sizes shown together for comparison.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
      <Slider label="Normal state" showValue defaultValue={30} />
      <Slider label="Error state" error showValue defaultValue={80} />
      <Slider label="Disabled state" disabled showValue defaultValue={60} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All slider states shown together for comparison.",
      },
    },
  },
};

export const ComposedSettings: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <h3 style={{ marginBottom: "1.5rem", color: "var(--freeui-color-neutral-900)" }}>
        Performance Settings
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Slider 
          label="CPU Usage Limit"
          description="Maximum CPU percentage to use"
          showValue
          min={10}
          max={100}
          defaultValue={75}
        />
        <Slider 
          label="Memory Allocation"
          description="RAM allocation in GB"
          showValue
          min={1}
          max={32}
          step={1}
          defaultValue={8}
        />
        <Slider 
          label="Network Bandwidth"
          description="Maximum bandwidth utilization"
          showValue
          min={0}
          max={100}
          defaultValue={50}
        />
        <Slider 
          label="Storage Cache"
          description="Cache size for temporary files"
          showValue
          min={100}
          max={10000}
          step={100}
          defaultValue={2000}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing how Slider composes with other primitives to build settings interfaces.",
      },
    },
  },
};