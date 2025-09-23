import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Timeline, Stack, Inline, Card, Separator } from "@rockminster/react";

const meta: Meta<typeof Timeline> = {
  title: "Layout/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Timeline is a primitive layout component that renders a visual line for creating timeline interfaces.

## Primitive Design Philosophy

Like other layout primitives (Stack, Inline, Separator), Timeline provides a fundamental building block rather than a complete solution. It renders just a line that can be oriented horizontally or vertically.

## Composition Approach

Complex timeline interfaces are built by composing Timeline with other primitives:
- **Stack/Inline**: For arranging timeline content
- **Cards**: For timeline item containers  
- **Absolute positioning**: For placing items along the timeline
- **Custom styling**: For markers, icons, and indicators

## Features

- **Pure line primitive**: Just renders a styled line
- **Orientation support**: Horizontal and vertical layouts
- **Visual variants**: Solid, dashed, and dotted styles
- **Configurable thickness**: Thin, normal, and thick options
- **Design token-based**: Uses spacing and color tokens
- **Fully composable**: Works with all layout primitives

## Usage Philosophy

Use Timeline to create the visual backbone of chronological interfaces, then compose with other primitives to build rich timeline experiences without rigid, opinionated components.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Orientation of the timeline line",
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "dashed", "dotted"],
      description: "Visual style of the timeline line",
    },
    thickness: {
      control: { type: "select" },
      options: ["thin", "normal", "thick"],
      description: "Thickness of the timeline line",
    },
    margin: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "Spacing around the timeline",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {
    orientation: "vertical",
    variant: "solid",
    thickness: "normal",
    margin: "md",
  },
  render: (args) => (
    <div style={{ height: "200px", display: "flex", alignItems: "center" }}>
      <Timeline {...args} />
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    variant: "solid",
    thickness: "normal",
    margin: "md",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <Timeline {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack gap="lg">
      <div>
        <h4 style={{ marginBottom: "var(--freeui-spacing-2)" }}>Solid Timeline</h4>
        <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
          <Timeline orientation="vertical" variant="solid" />
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: "var(--freeui-spacing-2)" }}>Dashed Timeline</h4>
        <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
          <Timeline orientation="vertical" variant="dashed" />
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: "var(--freeui-spacing-2)" }}>Dotted Timeline</h4>
        <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
          <Timeline orientation="vertical" variant="dotted" />
        </div>
      </div>
    </Stack>
  ),
};

export const Thickness: Story = {
  render: () => (
    <Inline gap="lg" align="center">
      <Stack gap="sm" align="center">
        <span style={{ fontSize: "var(--freeui-font-size-sm)" }}>Thin</span>
        <div style={{ height: "100px" }}>
          <Timeline orientation="vertical" thickness="thin" />
        </div>
      </Stack>
      
      <Stack gap="sm" align="center">
        <span style={{ fontSize: "var(--freeui-font-size-sm)" }}>Normal</span>
        <div style={{ height: "100px" }}>
          <Timeline orientation="vertical" thickness="normal" />
        </div>
      </Stack>
      
      <Stack gap="sm" align="center">
        <span style={{ fontSize: "var(--freeui-font-size-sm)" }}>Thick</span>
        <div style={{ height: "100px" }}>
          <Timeline orientation="vertical" thickness="thick" />
        </div>
      </Stack>
    </Inline>
  ),
};

export const CompositionExample: Story = {
  render: () => (
    <div style={{ position: "relative", padding: "var(--freeui-spacing-8)" }}>
      {/* Timeline backbone */}
      <Timeline 
        orientation="vertical" 
        variant="solid" 
        thickness="normal"
        style={{ 
          position: "absolute", 
          left: "32px", 
          top: "var(--freeui-spacing-8)", 
          height: "400px" 
        }} 
      />
      
      {/* Timeline items composed with other primitives */}
      <Stack gap="xl">
        <div style={{ position: "relative", paddingLeft: "var(--freeui-spacing-12)" }}>
          {/* Timeline marker */}
          <div 
            style={{ 
              position: "absolute", 
              left: "24px", 
              top: "var(--freeui-spacing-3)",
              width: "16px", 
              height: "16px", 
              borderRadius: "50%", 
              backgroundColor: "var(--freeui-color-semantic-success-500)",
              border: "2px solid var(--freeui-color-white)",
              zIndex: 1 
            }} 
          />
          <Card padding="md" shadow="sm">
            <Stack gap="xs">
              <strong>Project Started</strong>
              <span style={{ color: "var(--freeui-color-neutral-600)" }}>
                Initial project setup completed
              </span>
              <span style={{ fontSize: "var(--freeui-font-size-xs)", color: "var(--freeui-color-neutral-500)" }}>
                2 hours ago
              </span>
            </Stack>
          </Card>
        </div>
        
        <div style={{ position: "relative", paddingLeft: "var(--freeui-spacing-12)" }}>
          {/* Timeline marker */}
          <div 
            style={{ 
              position: "absolute", 
              left: "24px", 
              top: "var(--freeui-spacing-3)",
              width: "16px", 
              height: "16px", 
              borderRadius: "50%", 
              backgroundColor: "var(--freeui-color-semantic-info-500)",
              border: "2px solid var(--freeui-color-white)",
              zIndex: 1 
            }} 
          />
          <Card padding="md" shadow="sm">
            <Stack gap="xs">
              <strong>Code Review</strong>
              <span style={{ color: "var(--freeui-color-neutral-600)" }}>
                Pull request submitted for review
              </span>
              <span style={{ fontSize: "var(--freeui-font-size-xs)", color: "var(--freeui-color-neutral-500)" }}>
                1 hour ago
              </span>
            </Stack>
          </Card>
        </div>
        
        <div style={{ position: "relative", paddingLeft: "var(--freeui-spacing-12)" }}>
          {/* Timeline marker */}
          <div 
            style={{ 
              position: "absolute", 
              left: "24px", 
              top: "var(--freeui-spacing-3)",
              width: "16px", 
              height: "16px", 
              borderRadius: "50%", 
              backgroundColor: "var(--freeui-color-neutral-300)",
              border: "2px solid var(--freeui-color-white)",
              zIndex: 1 
            }} 
          />
          <Card padding="md" shadow="sm">
            <Stack gap="xs">
              <strong>Deployment Pending</strong>
              <span style={{ color: "var(--freeui-color-neutral-600)" }}>
                Waiting for approval to deploy
              </span>
              <span style={{ fontSize: "var(--freeui-font-size-xs)", color: "var(--freeui-color-neutral-500)" }}>
                30 minutes ago
              </span>
            </Stack>
          </Card>
        </div>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates how to compose the Timeline primitive with other layout components to create a rich timeline interface:

- **Timeline**: Provides the visual backbone
- **Stack**: Arranges timeline items vertically
- **Card**: Contains timeline item content
- **Absolute positioning**: Places markers along the timeline
- **Custom styling**: Creates circular markers with semantic colors

This compositional approach provides maximum flexibility while maintaining clean, reusable primitives.
        `,
      },
    },
  },
};