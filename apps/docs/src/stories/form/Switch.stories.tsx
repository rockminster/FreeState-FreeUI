import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@rockminster/react";

const meta: Meta<typeof Switch> = {
  title: "Form/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Switch component is a toggle control for boolean states, perfect for enabling/disabling features.
It follows WCAG AA accessibility guidelines and can be composed with other primitives to build control panels.

## Features
- **Accessible by default**: Semantic HTML with role="switch", keyboard navigation, screen reader support
- **Multiple sizes**: Small, medium, and large variants
- **Flexible label positioning**: Labels can be positioned before or after the switch
- **Error states**: Built-in error styling and ARIA attributes
- **Compositional**: Works seamlessly with Stack, Inline, and other layout primitives
- **Full TypeScript support**: Complete type definitions

## Compositional Usage
Use Switch with Stack and Inline primitives to build settings panels, feature toggles, and configuration interfaces.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the switch",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the switch has an error state",
    },
    label: {
      control: { type: "text" },
      description: "Label text for the switch",
    },
    description: {
      control: { type: "text" },
      description: "Additional description text",
    },
    labelPosition: {
      control: { type: "select" },
      options: ["start", "end"],
      description: "Position of the label relative to the switch",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the switch is disabled",
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the switch is checked",
    },
  },
  args: {
    label: "Enable notifications",
    size: "md",
    error: false,
    disabled: false,
    labelPosition: "end",
    checked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enable dark mode",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive email notifications for important updates",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "300px",
      }}
    >
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch" />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All switch sizes shown together for comparison.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "300px",
      }}
    >
      <Switch label="Normal state" />
      <Switch label="Checked state" defaultChecked />
      <Switch label="Error state" error />
      <Switch label="Disabled state" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different switch states including error and disabled states.",
      },
    },
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "300px",
      }}
    >
      <Switch label="Label at start" labelPosition="start" />
      <Switch label="Label at end" labelPosition="end" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Switch with labels positioned at different sides.",
      },
    },
  },
};

export const FeatureToggles: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "400px",
        padding: "1.5rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
      }}
    >
      <h3
        style={{
          margin: "0 0 1rem 0",
          fontSize: "1.125rem",
          fontWeight: "600",
        }}
      >
        Feature Settings
      </h3>
      <Switch
        label="Enable two-factor authentication"
        description="Add an extra layer of security to your account"
      />
      <Switch
        label="Email notifications"
        description="Receive updates about your account activity"
        defaultChecked
      />
      <Switch
        label="Marketing emails"
        description="Receive promotional emails and product updates"
      />
      <Switch
        label="Beta features"
        description="Get early access to new features (may be unstable)"
        error
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how Switch components compose to build feature toggle interfaces.",
      },
    },
  },
};
