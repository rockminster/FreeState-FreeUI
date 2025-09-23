import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Select, Stack, Inline, Card, Heading } from "@rockminster/react";

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Select component provides a dropdown interface for choosing from a list of options.
Perfect for metric selection, filtering, and configuration in observability dashboards.

## Features
- **Accessible by default**: Semantic HTML with proper ARIA attributes and keyboard navigation
- **Multiple sizes**: Small, medium, and large variants
- **Error states**: Built-in error styling and ARIA attributes
- **Flexible options**: Support for disabled options and custom values
- **Compositional**: Works seamlessly with other layout primitives
- **Full TypeScript support**: Complete type definitions for options and props

## Observability Usage
Use Select for metric selection, time range selection, and dashboard filtering.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the select component",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the select is in an error state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the select is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const metricOptions = [
  { value: "cpu", label: "CPU Usage" },
  { value: "memory", label: "Memory Usage" },
  { value: "disk", label: "Disk I/O" },
  { value: "network", label: "Network Traffic" },
  { value: "errors", label: "Error Rate" },
  { value: "latency", label: "Response Latency" },
];

const timeRangeOptions = [
  { value: "5m", label: "Last 5 minutes" },
  { value: "15m", label: "Last 15 minutes" },
  { value: "1h", label: "Last hour" },
  { value: "6h", label: "Last 6 hours" },
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
];

export const Default: Story = {
  args: {
    options: metricOptions,
    placeholder: "Choose a metric...",
    size: "md",
  },
};

export const WithLabel: Story = {
  args: {
    options: metricOptions,
    label: "Select Metric",
    placeholder: "Choose a metric...",
    size: "md",
  },
};

export const WithDescription: Story = {
  args: {
    options: timeRangeOptions,
    label: "Time Range",
    description: "Select the time range for metric analysis",
    placeholder: "Choose time range...",
    size: "md",
  },
};

export const ErrorState: Story = {
  args: {
    options: metricOptions,
    label: "Select Metric",
    error: true,
    placeholder: "Choose a metric...",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="lg">
      <Select
        options={metricOptions}
        label="Small"
        size="sm"
        placeholder="Choose metric..."
      />
      <Select
        options={metricOptions}
        label="Medium"
        size="md"
        placeholder="Choose metric..."
      />
      <Select
        options={metricOptions}
        label="Large"
        size="lg"
        placeholder="Choose metric..."
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select component in different sizes for various use cases.",
      },
    },
  },
};

export const MetricsDashboardExample: Story = {
  render: () => (
    <Card padding="lg" style={{ width: "400px" }}>
      <Stack gap="md">
        <Heading level={3} size="sm">
          Dashboard Configuration
        </Heading>

        <Select
          options={metricOptions}
          label="Primary Metric"
          description="Main metric to display in the dashboard"
          placeholder="Choose primary metric..."
          defaultValue="cpu"
        />

        <Select
          options={timeRangeOptions}
          label="Time Range"
          description="Time period for metric analysis"
          placeholder="Select time range..."
          defaultValue="1h"
        />

        <Inline gap="sm">
          <Select
            options={[
              { value: "line", label: "Line Chart" },
              { value: "bar", label: "Bar Chart" },
              { value: "area", label: "Area Chart" },
            ]}
            label="Chart Type"
            size="sm"
            defaultValue="line"
          />

          <Select
            options={[
              { value: "auto", label: "Auto Refresh" },
              { value: "30s", label: "30 seconds" },
              { value: "1m", label: "1 minute" },
              { value: "5m", label: "5 minutes" },
            ]}
            label="Refresh Rate"
            size="sm"
            defaultValue="auto"
          />
        </Inline>
      </Stack>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of using Select components in an observability dashboard configuration panel.",
      },
    },
  },
};
