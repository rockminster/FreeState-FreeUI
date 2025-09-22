import type { Meta, StoryObj } from "@storybook/react";
import { Inline, Card, Text, Button, Badge } from "@rockminster/react";

const meta: Meta<typeof Inline> = {
  title: "Layout/Inline",
  component: Inline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Inline is a foundational layout component for horizontal arrangement of elements with consistent spacing.

## Compositional Approach

Like Stack, Inline follows EUI's compositional principles by providing flexible horizontal layout primitives
rather than rigid components tied to specific use cases. This enables building diverse interfaces
through composition rather than creating bespoke components.

## Features
- **Flexible spacing**: Six spacing levels using design tokens
- **Justification control**: Multiple justify-content options
- **Alignment control**: Cross-axis alignment options
- **Wrapping support**: Optional flex-wrap behavior
- **Semantic HTML**: Customizable element type
- **Full composability**: Works with any child components

## Usage Philosophy

Use Inline to arrange items horizontally in toolbars, button groups, breadcrumbs, tag lists,
and any other horizontal layout needs without creating specialized components.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "Spacing between inline items",
    },
    justify: {
      control: { type: "select" },
      options: [
        "start",
        "center",
        "end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      description: "Justification of items along the main axis",
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end", "baseline", "stretch"],
      description: "Alignment of items along the cross axis",
    },
    wrap: {
      control: { type: "boolean" },
      description: "Whether items should wrap when they overflow",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Inline>;

export const Default: Story = {
  args: {
    gap: "md",
    align: "center",
  },
  render: (args) => (
    <Inline {...args}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </Inline>
  ),
};

export const ToolbarComposition: Story = {
  args: {
    gap: "md",
    justify: "space-between",
    align: "center",
  },
  render: (args) => (
    <Card padding="md" shadow="sm">
      <Inline {...args}>
        <Inline gap="sm" align="center">
          <Text weight="semibold">Dashboard</Text>
          <Badge variant="info" size="sm">
            Beta
          </Badge>
        </Inline>

        <Inline gap="sm" align="center">
          <Button variant="ghost" size="sm">
            Settings
          </Button>
          <Button variant="ghost" size="sm">
            Help
          </Button>
          <Button variant="primary" size="sm">
            Upgrade
          </Button>
        </Inline>
      </Inline>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of composing a toolbar interface using nested Inline components.",
      },
    },
  },
};

export const TagList: Story = {
  args: {
    gap: "xs",
    wrap: true,
  },
  render: (args) => (
    <Card padding="md">
      <Text
        weight="medium"
        size="sm"
        style={{ marginBottom: "8px", display: "block" }}
      >
        Project Tags:
      </Text>
      <Inline {...args}>
        <Badge variant="default" size="sm">
          React
        </Badge>
        <Badge variant="default" size="sm">
          TypeScript
        </Badge>
        <Badge variant="default" size="sm">
          Design System
        </Badge>
        <Badge variant="default" size="sm">
          Accessibility
        </Badge>
        <Badge variant="default" size="sm">
          Storybook
        </Badge>
        <Badge variant="default" size="sm">
          Component Library
        </Badge>
        <Badge variant="default" size="sm">
          Frontend
        </Badge>
        <Badge variant="default" size="sm">
          UI/UX
        </Badge>
      </Inline>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tag list with wrapping enabled, showing how Inline handles overflow gracefully.",
      },
    },
  },
};

export const JustificationOptions: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      {(
        [
          "start",
          "center",
          "end",
          "space-between",
          "space-around",
          "space-evenly",
        ] as const
      ).map((justify) => (
        <div key={justify} style={{ marginBottom: "24px" }}>
          <Text
            weight="medium"
            size="sm"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Justify: {justify}
          </Text>
          <div
            style={{
              border: "1px dashed #ccc",
              padding: "12px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Inline gap="sm" justify={justify}>
              <Button size="sm">One</Button>
              <Button size="sm">Two</Button>
              <Button size="sm">Three</Button>
            </Inline>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different justification options for controlling item distribution.",
      },
    },
  },
};

export const MixedContent: Story = {
  args: {
    gap: "md",
    align: "center",
    wrap: true,
  },
  render: (args) => (
    <Card padding="lg">
      <div style={{ marginBottom: "16px" }}>
        <Text weight="semibold" size="lg">
          Composed Interface Elements
        </Text>
        <Text size="sm" color="subdued">
          Demonstrating mixed content types in horizontal layout
        </Text>
      </div>

      <Inline {...args}>
        <Badge variant="success" size="md">
          Active
        </Badge>

        <div
          style={{ height: "24px", width: "1px", backgroundColor: "#e5e5e5" }}
        />

        <Inline gap="xs" align="center">
          <Text size="sm" color="subdued">
            Status:
          </Text>
          <Text size="sm" weight="medium">
            Deployed
          </Text>
        </Inline>

        <div
          style={{ height: "24px", width: "1px", backgroundColor: "#e5e5e5" }}
        />

        <Inline gap="sm">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            Clone
          </Button>
          <Button variant="outline" size="sm">
            Deploy
          </Button>
        </Inline>
      </Inline>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complex composition showing mixed content types arranged horizontally with separators.",
      },
    },
  },
};
