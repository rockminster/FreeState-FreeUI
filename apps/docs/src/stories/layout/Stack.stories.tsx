import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Card, Text, Heading, Button } from "@rockminster/react";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Stack is a foundational layout component for vertical arrangement of elements with consistent spacing.

## Compositional Approach

Following the EUI design principle, Stack is designed to be a structural primitive that accepts any children
and provides consistent vertical spacing without being tied to specific use cases or data structures.

## Features
- **Flexible spacing**: Six spacing levels using design tokens
- **Alignment control**: Multiple alignment options
- **Semantic HTML**: Customizable element type with proper ARIA support  
- **Wrapping support**: Optional flex-wrap behavior
- **Full composability**: Works with any child components

## Usage Philosophy

Stack should be used as a building block to compose interfaces rather than creating bespoke layout components
for specific scenarios. This enables maximum reusability and consistency across the design system.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "Spacing between stack items",
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end", "stretch"],
      description: "Alignment of items along the cross axis",
    },
    wrap: {
      control: { type: "boolean" },
      description: "Whether items should wrap when they overflow",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    gap: "md",
    align: "stretch",
  },
  render: (args) => (
    <Stack {...args}>
      <Card padding="md">
        <Text>First item in the stack</Text>
      </Card>
      <Card padding="md">
        <Text>Second item in the stack</Text>
      </Card>
      <Card padding="md">
        <Text>Third item in the stack</Text>
      </Card>
    </Stack>
  ),
};

export const CompositionExample: Story = {
  args: {
    gap: "lg",
    align: "stretch",
  },
  render: (args) => (
    <Card padding="lg" shadow="md">
      <Stack {...args}>
        <Heading level={2} size="lg">
          Composed Interface
        </Heading>
        <Text color="subdued">
          This demonstrates how Stack can be used to compose complex interfaces
          from simple primitives without creating bespoke components.
        </Text>
        <Stack gap="sm">
          <Text weight="medium">Features:</Text>
          <Text>• Consistent spacing using design tokens</Text>
          <Text>• Flexible alignment and wrapping</Text>
          <Text>• Semantic HTML structure</Text>
          <Text>• Full accessibility support</Text>
        </Stack>
        <Button variant="primary">Take Action</Button>
      </Stack>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how Stack enables composition of complex interfaces from basic primitives.",
      },
    },
  },
};

export const GapVariations: Story = {
  render: () => (
    <Stack gap="xl">
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((gap) => (
        <div key={gap}>
          <Text weight="medium" size="sm">
            Gap: {gap}
          </Text>
          <Stack
            gap={gap}
            style={{ border: "1px dashed #ccc", padding: "12px" }}
          >
            <Card padding="sm">
              <Text size="sm">Item 1</Text>
            </Card>
            <Card padding="sm">
              <Text size="sm">Item 2</Text>
            </Card>
            <Card padding="sm">
              <Text size="sm">Item 3</Text>
            </Card>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all available gap sizes for consistent spacing.",
      },
    },
  },
};

export const AlignmentOptions: Story = {
  render: () => (
    <Stack gap="lg">
      {(["start", "center", "end", "stretch"] as const).map((align) => (
        <div key={align}>
          <Text weight="medium" size="sm">
            Align: {align}
          </Text>
          <Stack
            gap="sm"
            align={align}
            style={{
              border: "1px dashed #ccc",
              padding: "12px",
              minHeight: "80px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Card padding="sm" style={{ width: "200px" }}>
              <Text size="sm">Fixed width item</Text>
            </Card>
            <Card padding="sm" style={{ width: "150px" }}>
              <Text size="sm">Smaller item</Text>
            </Card>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows how different alignment options affect item positioning within the Stack.",
      },
    },
  },
};
