import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton, RadioGroup } from "@rockminster/react";

const meta: Meta<typeof RadioButton> = {
  title: "Form/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The RadioButton component allows users to select a single option from multiple choices.
It follows WCAG AA accessibility guidelines and supports proper keyboard navigation within groups.

## Features
- **Accessible by default**: Semantic HTML radio input, keyboard navigation (Arrow keys, Space), screen reader support
- **Multiple sizes**: Small, medium, and large variants
- **Error states**: Built-in error styling and ARIA attributes
- **RadioGroup helper**: Provides proper grouping and layout
- **Compositional**: Works seamlessly with Stack, Inline, and other layout primitives
- **Full TypeScript support**: Complete type definitions

## Usage
Use RadioButton components with the same \`name\` prop for proper radio group behavior, or use the RadioGroup wrapper component for easier management.

## Compositional Usage
Use RadioButton with Stack and Inline primitives to build forms, filters, and selection interfaces.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the radio button",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the radio button has an error state",
    },
    label: {
      control: { type: "text" },
      description: "Label text for the radio button",
    },
    description: {
      control: { type: "text" },
      description: "Additional description text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the radio button is disabled",
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the radio button is checked",
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for radio group behavior",
    },
  },
  args: {
    label: "Option",
    size: "md",
    error: false,
    disabled: false,
    checked: false,
    name: "example",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select this option",
    name: "default",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Premium Plan",
    description: "Full access to all features with priority support",
    name: "plan",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "300px",
      }}
    >
      <RadioButton size="sm" label="Small radio button" name="sizes" />
      <RadioButton size="md" label="Medium radio button" name="sizes" />
      <RadioButton size="lg" label="Large radio button" name="sizes" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All radio button sizes shown together for comparison.",
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
        gap: "1.5rem",
        width: "300px",
      }}
    >
      <RadioButton label="Normal state" name="states" />
      <RadioButton label="Checked state" name="states" defaultChecked />
      <RadioButton label="Error state" name="states" error />
      <RadioButton label="Disabled state" name="states" disabled />
      <RadioButton
        label="Disabled checked"
        name="states-disabled"
        disabled
        defaultChecked
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different radio button states including error and disabled states.",
      },
    },
  },
};

export const SimpleGroup: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
      }}
    >
      <h3
        style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: "600" }}
      >
        Subscription Plan
      </h3>
      <RadioButton label="Free" name="subscription" defaultChecked />
      <RadioButton label="Pro ($9/month)" name="subscription" />
      <RadioButton label="Enterprise ($29/month)" name="subscription" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Simple radio button group using manual name attribute management.",
      },
    },
  },
};

export const WithRadioGroup: Story = {
  render: () => (
    <RadioGroup name="payment-method" direction="column" gap="md">
      <RadioButton
        label="Credit Card"
        description="Pay with Visa, MasterCard, or American Express"
      />
      <RadioButton
        label="PayPal"
        description="Pay securely with your PayPal account"
      />
      <RadioButton
        label="Bank Transfer"
        description="Direct bank transfer (2-3 business days)"
      />
      <RadioButton
        label="Cryptocurrency"
        description="Pay with Bitcoin, Ethereum, or other cryptocurrencies"
        disabled
      />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Radio buttons using the RadioGroup wrapper component for easier management.",
      },
    },
  },
};

export const HorizontalGroup: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <h3 style={{ margin: "0 0 1rem 0", fontSize: "1rem", fontWeight: "600" }}>
        Priority Level
      </h3>
      <RadioGroup name="priority" direction="row" gap="lg">
        <RadioButton label="Low" />
        <RadioButton label="Medium" defaultChecked />
        <RadioButton label="High" />
        <RadioButton label="Critical" />
      </RadioGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal radio button group layout using RadioGroup.",
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        width: "400px",
        padding: "1.5rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ margin: "0", fontSize: "1.125rem", fontWeight: "600" }}>
        Survey Form
      </h3>

      <div>
        <h4
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "0.875rem",
            fontWeight: "600",
          }}
        >
          How satisfied are you with our service?
        </h4>
        <RadioGroup name="satisfaction" direction="column" gap="sm">
          <RadioButton label="Very Satisfied" />
          <RadioButton label="Satisfied" />
          <RadioButton label="Neutral" />
          <RadioButton label="Dissatisfied" />
          <RadioButton label="Very Dissatisfied" />
        </RadioGroup>
      </div>

      <div>
        <h4
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "0.875rem",
            fontWeight: "600",
          }}
        >
          How did you hear about us?
        </h4>
        <RadioGroup name="source" direction="column" gap="sm">
          <RadioButton
            label="Search Engine"
            description="Google, Bing, or other search engines"
          />
          <RadioButton
            label="Social Media"
            description="Facebook, Twitter, LinkedIn, etc."
          />
          <RadioButton
            label="Word of Mouth"
            description="Recommendation from friends or colleagues"
          />
          <RadioButton
            label="Advertisement"
            description="Online or print advertisements"
          />
          <RadioButton label="Other" />
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how RadioButton and RadioGroup components compose to build complex forms.",
      },
    },
  },
};
