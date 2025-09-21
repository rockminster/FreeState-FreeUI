import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@freeui/react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Input component is a fundamental form element that provides users with a way to enter text. 
It follows WCAG AA accessibility guidelines and supports multiple variants, sizes, and states.

## Features
- **Accessible by default**: Semantic HTML, keyboard navigation, screen reader support
- **Multiple variants**: Outline (default) and subtle styles
- **Flexible sizing**: Small, medium, and large sizes
- **Error states**: Built-in error styling and ARIA attributes
- **Full TypeScript support**: Complete type definitions
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outline", "subtle"],
      description: "The visual style variant of the input",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the input",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the input has an error state",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the input",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "HTML input type",
    },
  },
  args: {
    placeholder: "Enter text...",
    variant: "outline",
    size: "md",
    disabled: false,
    error: false,
    type: "text",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Default input",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    placeholder: "Outline input",
  },
  parameters: {
    docs: {
      description: {
        story: "The default outline variant with a visible border.",
      },
    },
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    placeholder: "Subtle input",
  },
  parameters: {
    docs: {
      description: {
        story: "The subtle variant with a background color instead of a border.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    error: true,
    placeholder: "Input with error",
    value: "Invalid input",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with error state for validation feedback.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "Cannot edit this",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled input that cannot be interacted with.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", width: "300px" }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All input sizes shown together for comparison.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", width: "300px" }}>
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="subtle" placeholder="Subtle variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All input variants shown together for comparison.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", width: "300px" }}>
      <Input placeholder="Normal state" />
      <Input error placeholder="Error state" />
      <Input disabled placeholder="Disabled state" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All input states shown together for comparison.",
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start", width: "300px" }}>
      <label htmlFor="email-input" style={{ 
        fontFamily: "var(--freeui-font-family-sans)", 
        fontSize: "var(--freeui-font-size-sm)",
        fontWeight: "var(--freeui-font-weight-medium)",
        color: "var(--freeui-color-neutral-700)"
      }}>
        Email Address
      </label>
      <Input 
        id="email-input"
        type="email" 
        placeholder="Enter your email"
        aria-describedby="email-help"
      />
      <span 
        id="email-help"
        style={{ 
          fontSize: "var(--freeui-font-size-xs)",
          color: "var(--freeui-color-neutral-500)"
        }}
      >
        We&apos;ll never share your email with anyone else.
      </span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input with associated label and help text for proper accessibility.",
      },
    },
  },
};