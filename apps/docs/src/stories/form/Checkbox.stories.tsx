import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@rockminster/react";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Checkbox component is a compositional form primitive that provides users with binary choices.
It follows WCAG AA accessibility guidelines and can be composed with other primitives to build complex forms.

## Features
- **Accessible by default**: Semantic HTML, keyboard navigation, screen reader support
- **Multiple sizes**: Small, medium, and large variants
- **Error states**: Built-in error styling and ARIA attributes
- **Compositional**: Works seamlessly with Stack, Inline, and other layout primitives
- **Full TypeScript support**: Complete type definitions

## Compositional Usage
Use Checkbox with Stack and Inline primitives to build form layouts, preference panels, and selection interfaces.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the checkbox",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the checkbox has an error state",
    },
    label: {
      control: { type: "text" },
      description: "Label text for the checkbox",
    },
    description: {
      control: { type: "text" },
      description: "Additional description text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled",
    },
  },
  args: {
    label: "Accept terms",
    size: "md",
    error: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "I agree to the terms and conditions",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive email updates about important changes to your account",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All checkbox sizes shown together for comparison.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox label="Normal state" />
      <Checkbox label="Checked state" defaultChecked />
      <Checkbox label="Error state" error />
      <Checkbox label="Disabled state" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All checkbox states shown together for comparison.",
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    label: "I have read the privacy policy",
    description: "This field is required to continue",
    error: true,
  },
};