import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Progress, Stack, Inline, Card, Text, Heading } from "@rockminster/react";

const meta: Meta<typeof Progress> = {
  title: "Display/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Progress component displays completion status and metrics with visual progress indicators.
Essential for showing system health, resource usage, and operational metrics in observability dashboards.

## Features
- **WCAG AA compliant**: Proper ARIA attributes and accessibility support
- **Multiple variants**: Success, warning, and danger states for different metric types
- **Flexible sizing**: Small, medium, and large variants
- **Indeterminate state**: Loading indicators for real-time metrics
- **Value display**: Optional percentage or custom value display
- **Compositional**: Works seamlessly with other layout primitives

## Observability Usage
Use Progress for displaying CPU usage, memory consumption, disk space, network utilization,
and other system metrics that have a measurable range or threshold.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current value (0-100)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the progress bar",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "danger"],
      description: "Visual variant of the progress bar",
    },
    showValue: {
      control: { type: "boolean" },
      description: "Whether to show the progress value",
    },
    indeterminate: {
      control: { type: "boolean" },
      description: "Whether the progress is indeterminate (loading)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 65,
    showValue: true,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    label: "CPU Usage",
    showValue: true,
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="lg" style={{ width: "300px" }}>
      <Progress value={45} label="Normal (45%)" variant="default" showValue />
      <Progress value={65} label="Good (65%)" variant="success" showValue />
      <Progress value={80} label="Warning (80%)" variant="warning" showValue />
      <Progress value={95} label="Critical (95%)" variant="danger" showValue />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different progress variants for various metric thresholds and alert levels.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="lg" style={{ width: "300px" }}>
      <Progress value={60} label="Small" size="sm" showValue />
      <Progress value={70} label="Medium" size="md" showValue />
      <Progress value={80} label="Large" size="lg" showValue />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars in different sizes for various dashboard contexts.",
      },
    },
  },
};

export const Indeterminate: Story = {
  render: () => (
    <Stack gap="lg" style={{ width: "300px" }}>
      <Progress indeterminate label="Loading metrics..." />
      <Progress indeterminate label="Analyzing data..." variant="warning" />
      <Progress indeterminate label="Processing alerts..." variant="danger" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Indeterminate progress bars for loading states and ongoing operations.",
      },
    },
  },
};

export const SystemMetricsDashboard: Story = {
  render: () => (
    <Stack gap="lg" style={{ width: "400px" }}>
      <Heading level={3} size="sm">
        System Resources
      </Heading>
      
      <Card padding="md">
        <Stack gap="md">
          <Progress
            value={72}
            label="CPU Usage"
            variant="warning"
            showValue
            size="md"
          />
          <Progress
            value={45}
            label="Memory Usage"
            variant="success"
            showValue
            size="md"
          />
          <Progress
            value={88}
            label="Disk Space"
            variant="danger"
            showValue
            size="md"
          />
          <Progress
            value={23}
            label="Network I/O"
            variant="default"
            showValue
            size="md"
          />
        </Stack>
      </Card>
      
      <Card padding="md">
        <Stack gap="md">
          <Heading level={4} size="xs">
            Application Health
          </Heading>
          
          <Inline gap="md" wrap>
            <Stack gap="xs" style={{ minWidth: "120px" }}>
              <Text size="sm" color="subdued">API Response</Text>
              <Progress value={92} variant="success" size="sm" showValue />
            </Stack>
            
            <Stack gap="xs" style={{ minWidth: "120px" }}>
              <Text size="sm" color="subdued">Database</Text>
              <Progress value={78} variant="warning" size="sm" showValue />
            </Stack>
            
            <Stack gap="xs" style={{ minWidth: "120px" }}>
              <Text size="sm" color="subdued">Cache Hit Rate</Text>
              <Progress value={96} variant="success" size="sm" showValue />
            </Stack>
          </Inline>
        </Stack>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of using Progress components in a system monitoring dashboard to show various metrics and their health status.",
      },
    },
  },
};