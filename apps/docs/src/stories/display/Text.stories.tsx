import type { Meta, StoryObj } from "@storybook/react";
import { Text, Heading, Badge } from "@rockminster/react";

const meta: Meta<typeof Text> = {
  title: "Display/Text",
  component: Text,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Text is a foundational typography component that provides consistent text styling across the design system.

## Compositional Approach

Following EUI's compositional principles, Text is designed as a flexible primitive that can represent any text content
without being tied to specific use cases. Rather than creating specialized text components like "ProductName" or 
"UserEmail", compose interfaces using Text with appropriate size, weight, and color variants.

## Features
- **Typography scale**: Five size levels using design tokens
- **Weight variants**: Four weight options for hierarchy
- **Semantic colors**: Six color variants for different contexts
- **Truncation support**: Optional ellipsis overflow behavior
- **Flexible HTML**: Customizable element type (span, p, div, etc.)
- **Full composability**: Works as building block for complex components

## Usage Philosophy

Use Text as the foundation for all text content rather than creating specialized text components.
This maintains consistency and reduces the number of components developers need to learn.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Text size following design system scale",
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight for hierarchy",
    },
    color: {
      control: { type: "select" },
      options: ["default", "subdued", "success", "warning", "danger", "accent"],
      description: "Text color using semantic naming",
    },
    truncate: {
      control: { type: "boolean" },
      description: "Whether to truncate with ellipsis",
    },
    as: {
      control: { type: "text" },
      description: "HTML element to render",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "This is default text content",
    size: "md",
    weight: "normal",
    color: "default",
  },
};

export const SizeVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="md">Medium text (md) - default</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows all available text sizes in the design system scale.",
      },
    },
  },
};

export const WeightVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different font weights for creating visual hierarchy.",
      },
    },
  },
};

export const ColorVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Text color="default">Default color text</Text>
      <Text color="subdued">Subdued color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="warning">Warning color text</Text>
      <Text color="danger">Danger color text</Text>
      <Text color="accent">Accent color text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows semantic color variants for different contexts and meanings.",
      },
    },
  },
};

export const CompositionExample: Story = {
  render: () => (
    <div style={{ maxWidth: "500px" }}>
      <div style={{ marginBottom: "16px" }}>
        <Heading level={2} size="lg" style={{ marginBottom: "4px" }}>
          User Profile Information
        </Heading>
        <Text color="subdued" size="sm">
          Manage your account details and preferences
        </Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text weight="medium" size="sm" style={{ minWidth: "80px" }}>
            Name:
          </Text>
          <Text>John Doe</Text>
          <Badge variant="success" size="sm">
            Verified
          </Badge>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text weight="medium" size="sm" style={{ minWidth: "80px" }}>
            Email:
          </Text>
          <Text as="code" size="sm" style={{ fontFamily: "monospace" }}>
            john.doe@example.com
          </Text>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text weight="medium" size="sm" style={{ minWidth: "80px" }}>
            Status:
          </Text>
          <Text color="success" weight="medium">
            Active
          </Text>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
          <Text weight="medium" size="sm" style={{ minWidth: "80px" }}>
            Bio:
          </Text>
          <Text size="sm" color="subdued" style={{ lineHeight: "1.5" }}>
            Software engineer with 5+ years of experience building scalable web
            applications. Passionate about design systems and user experience.
          </Text>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how Text components compose to build complex interfaces without specialized components.",
      },
    },
  },
};

export const TruncationBehavior: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "300px",
      }}
    >
      <div>
        <Text
          weight="medium"
          size="sm"
          style={{ marginBottom: "4px", display: "block" }}
        >
          Normal text (wraps):
        </Text>
        <Text>
          This is a very long piece of text that will wrap naturally when it
          exceeds the container width.
        </Text>
      </div>

      <div>
        <Text
          weight="medium"
          size="sm"
          style={{ marginBottom: "4px", display: "block" }}
        >
          Truncated text (ellipsis):
        </Text>
        <Text truncate>
          This is a very long piece of text that will be truncated with an
          ellipsis when it exceeds the container width.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates normal wrapping behavior versus truncation with ellipsis.",
      },
    },
  },
};
