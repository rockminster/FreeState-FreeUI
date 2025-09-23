import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  StatusIndicator,
  Stack,
  Inline,
  Card,
  Text,
  Heading,
} from "@rockminster/react";

const meta: Meta<typeof StatusIndicator> = {
  title: "Display/StatusIndicator",
  component: StatusIndicator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The StatusIndicator component provides clear visual status communication for system health,
service availability, and alert levels in observability dashboards.

## Features
- **Clear status communication**: Distinct colors and states for different statuses
- **Multiple sizes**: Small, medium, and large variants for different contexts
- **Pulse animation**: Optional animation for loading or active states
- **Accessible**: Proper ARIA attributes and screen reader support
- **Flexible text**: Optional status labels and custom text
- **Compositional**: Works seamlessly with other layout primitives

## Observability Usage
Use StatusIndicator for service health, API status, alert severity levels,
and any binary or multi-state system conditions.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["healthy", "warning", "critical", "unknown", "loading"],
      description: "The status level to display",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the status indicator",
    },
    pulse: {
      control: { type: "boolean" },
      description: "Whether to show pulse animation",
    },
    showStatus: {
      control: { type: "boolean" },
      description: "Whether to show status text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {
  args: {
    status: "healthy",
    showStatus: true,
  },
};

export const WithLabel: Story = {
  args: {
    status: "warning",
    label: "API Service",
    showStatus: true,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <Stack gap="md">
      <StatusIndicator status="healthy" showStatus />
      <StatusIndicator status="warning" showStatus />
      <StatusIndicator status="critical" showStatus />
      <StatusIndicator status="unknown" showStatus />
      <StatusIndicator status="loading" showStatus />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available status levels with their default visual representations.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Inline gap="lg" align="center">
      <StatusIndicator status="healthy" size="sm" label="Small" />
      <StatusIndicator status="warning" size="md" label="Medium" />
      <StatusIndicator status="critical" size="lg" label="Large" />
    </Inline>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Status indicators in different sizes for various dashboard contexts.",
      },
    },
  },
};

export const WithPulse: Story = {
  render: () => (
    <Stack gap="md">
      <StatusIndicator
        status="loading"
        pulse
        label="Syncing data..."
        showStatus
      />
      <StatusIndicator
        status="critical"
        pulse
        label="Active alert"
        showStatus
      />
      <StatusIndicator status="warning" pulse label="Monitoring" showStatus />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Status indicators with pulse animation for active or attention-requiring states.",
      },
    },
  },
};

export const ServiceStatusDashboard: Story = {
  render: () => (
    <Stack gap="lg" style={{ width: "400px" }}>
      <Heading level={3} size="sm">
        Service Health Status
      </Heading>

      <Card padding="md">
        <Stack gap="sm">
          <Inline justify="space-between" align="center">
            <Text weight="medium">API Gateway</Text>
            <StatusIndicator status="healthy" showStatus />
          </Inline>

          <Inline justify="space-between" align="center">
            <Text weight="medium">Authentication Service</Text>
            <StatusIndicator status="healthy" showStatus />
          </Inline>

          <Inline justify="space-between" align="center">
            <Text weight="medium">Database</Text>
            <StatusIndicator status="warning" showStatus />
          </Inline>

          <Inline justify="space-between" align="center">
            <Text weight="medium">Cache Layer</Text>
            <StatusIndicator status="critical" showStatus />
          </Inline>

          <Inline justify="space-between" align="center">
            <Text weight="medium">Message Queue</Text>
            <StatusIndicator status="loading" pulse showStatus />
          </Inline>
        </Stack>
      </Card>

      <Card padding="md">
        <Stack gap="sm">
          <Heading level={4} size="xs">
            Regional Status
          </Heading>

          <Inline gap="lg" wrap>
            <Stack gap="xs" align="center">
              <StatusIndicator status="healthy" size="lg" />
              <Text size="sm" color="subdued">
                US East
              </Text>
            </Stack>

            <Stack gap="xs" align="center">
              <StatusIndicator status="healthy" size="lg" />
              <Text size="sm" color="subdued">
                US West
              </Text>
            </Stack>

            <Stack gap="xs" align="center">
              <StatusIndicator status="warning" size="lg" />
              <Text size="sm" color="subdued">
                Europe
              </Text>
            </Stack>

            <Stack gap="xs" align="center">
              <StatusIndicator status="critical" size="lg" pulse />
              <Text size="sm" color="subdued">
                Asia Pacific
              </Text>
            </Stack>
          </Inline>
        </Stack>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of using StatusIndicator components in a comprehensive service health dashboard showing both individual services and regional status.",
      },
    },
  },
};
