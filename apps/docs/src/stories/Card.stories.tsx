import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@freeui/react";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Card component provides a flexible container with surface background, configurable padding, and optional shadow levels. 
It's designed to be fully composable and follows WCAG accessibility guidelines.

## Features
- **Surface background**: Uses design system tokens for consistent theming
- **Configurable padding**: Four padding levels (none, sm, md, lg)
- **Optional shadows**: Three shadow levels (none, sm, md)
- **Fully composable**: Accepts any children and standard div props
- **Accessible by default**: Semantic HTML with proper ARIA support
- **Full TypeScript support**: Complete type definitions
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    shadow: {
      control: { type: "select" },
      options: ["none", "sm", "md"],
      description: "The shadow level for the card",
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
      description: "The padding level for the card",
    },
    children: {
      control: { type: "text" },
      description: "The content of the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--freeui-color-neutral-900)" }}>
          Card Title
        </h3>
        <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
          This is a basic card with default padding and shadow.
        </p>
      </div>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    shadow: "none",
    children: (
      <div>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--freeui-color-neutral-900)" }}>
          Card Without Shadow
        </h3>
        <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
          This card has no shadow for a flat design.
        </p>
      </div>
    ),
  },
};

export const MediumShadow: Story = {
  args: {
    shadow: "md",
    children: (
      <div>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--freeui-color-neutral-900)" }}>
          Card With Medium Shadow
        </h3>
        <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
          This card has a medium shadow for more elevation.
        </p>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "sm",
    children: (
      <div>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--freeui-color-neutral-900)" }}>
          Small Padding
        </h3>
        <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
          This card has small padding for compact layouts.
        </p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    children: (
      <div>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--freeui-color-neutral-900)" }}>
          Large Padding
        </h3>
        <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
          This card has large padding for spacious layouts.
        </p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    children: (
      <div style={{ padding: "1rem" }}>
        <h3 style={{ marginBottom: "0.5rem", color: "var(--freeui-color-neutral-900)" }}>
          Custom Content Layout
        </h3>
        <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
          This card has no padding, allowing for custom content layouts with full control.
        </p>
      </div>
    ),
  },
};

export const AllVariations: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", width: "800px" }}>
      <Card shadow="none" padding="sm">
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--freeui-color-neutral-900)" }}>
          No Shadow, Small Padding
        </h4>
        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--freeui-color-neutral-600)" }}>
          Minimal card design.
        </p>
      </Card>
      
      <Card shadow="sm" padding="md">
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--freeui-color-neutral-900)" }}>
          Small Shadow, Medium Padding
        </h4>
        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--freeui-color-neutral-600)" }}>
          Default card style.
        </p>
      </Card>
      
      <Card shadow="md" padding="lg">
        <h4 style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--freeui-color-neutral-900)" }}>
          Medium Shadow, Large Padding
        </h4>
        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--freeui-color-neutral-600)" }}>
          Elevated card design.
        </p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All card variations shown together for comparison.",
      },
    },
  },
};

export const WithComplexContent: Story = {
  args: {
    shadow: "md",
    padding: "lg",
    children: (
      <div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            backgroundColor: "var(--freeui-color-brand-500)",
            borderRadius: "50%",
            marginRight: "0.75rem"
          }} />
          <div>
            <h3 style={{ margin: 0, fontSize: "1.125rem", color: "var(--freeui-color-neutral-900)" }}>
              Complex Card Layout
            </h3>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--freeui-color-neutral-600)" }}>
              With avatar and action buttons
            </p>
          </div>
        </div>
        
        <p style={{ marginBottom: "1rem", color: "var(--freeui-color-neutral-700)", lineHeight: 1.5 }}>
          This card demonstrates how the Card component can contain complex layouts with multiple elements,
          including images, text, and interactive elements while maintaining proper spacing and visual hierarchy.
        </p>
        
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button style={{
            backgroundColor: "var(--freeui-color-brand-500)",
            color: "var(--freeui-color-white)",
            border: "none",
            borderRadius: "var(--freeui-border-radius-md)",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer"
          }}>
            Primary Action
          </button>
          <button style={{
            backgroundColor: "transparent",
            color: "var(--freeui-color-brand-500)",
            border: "1px solid var(--freeui-color-brand-500)",
            borderRadius: "var(--freeui-border-radius-md)",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer"
          }}>
            Secondary
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a card with complex content including avatar, text, and action buttons.",
      },
    },
  },
};