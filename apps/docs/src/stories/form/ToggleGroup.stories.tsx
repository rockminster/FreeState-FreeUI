import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ToggleGroup, Stack, Inline, Card, Text, Heading } from "@rockminster/react";

const meta: Meta<typeof ToggleGroup> = {
  title: "Form/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The ToggleGroup component allows users to select one or multiple options from a set,
perfect for enabling/disabling metrics, filters, and feature toggles in observability dashboards.

## Features
- **Single or multi-select**: Flexible selection modes for different use cases
- **Keyboard navigation**: Full keyboard support with arrow keys and space/enter
- **Accessible**: Proper ARIA attributes and role management
- **Multiple variants**: Default and outline styles
- **Flexible sizing**: Small, medium, and large variants
- **Compositional**: Works seamlessly with other layout primitives

## Observability Usage
Use ToggleGroup for metric selection, filter controls, dashboard sections,
and any scenario where users need to quickly enable/disable multiple options.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: { type: "boolean" },
      description: "Whether multiple options can be selected",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the toggle group",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
      description: "Visual variant of the toggle group",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the toggle group is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

const metricOptions = [
  { value: "cpu", label: "CPU" },
  { value: "memory", label: "Memory" },
  { value: "disk", label: "Disk" },
  { value: "network", label: "Network" },
];

const timeOptions = [
  { value: "5m", label: "5m" },
  { value: "15m", label: "15m" },
  { value: "1h", label: "1h" },
  { value: "6h", label: "6h" },
  { value: "24h", label: "24h" },
];

const chartTypeOptions = [
  { value: "line", label: "Line" },
  { value: "bar", label: "Bar" },
  { value: "area", label: "Area" },
];

export const SingleSelect: Story = {
  args: {
    options: timeOptions,
    singleValue: "1h",
    multiple: false,
    label: "Time Range",
  },
};

export const MultiSelect: Story = {
  args: {
    options: metricOptions,
    value: ["cpu", "memory"],
    multiple: true,
    label: "Active Metrics",
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="lg">
      <ToggleGroup
        options={chartTypeOptions}
        singleValue="line"
        label="Default Style"
        variant="default"
      />
      <ToggleGroup
        options={chartTypeOptions}
        singleValue="bar"
        label="Outline Style"
        variant="outline"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle groups in different visual styles.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="lg">
      <ToggleGroup
        options={metricOptions}
        value={["cpu"]}
        multiple
        label="Small"
        size="sm"
      />
      <ToggleGroup
        options={metricOptions}
        value={["cpu", "memory"]}
        multiple
        label="Medium"
        size="md"
      />
      <ToggleGroup
        options={metricOptions}
        value={["cpu", "memory", "disk"]}
        multiple
        label="Large"
        size="lg"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle groups in different sizes for various dashboard contexts.",
      },
    },
  },
};

export const MetricsDashboardExample: Story = {
  render: function MetricsDashboardExample() {
    const [activeMetrics, setActiveMetrics] = React.useState<string[]>(["cpu", "memory"]);
    const [timeRange, setTimeRange] = React.useState<string>("1h");
    const [chartType, setChartType] = React.useState<string>("line");

    return (
      <Card padding="lg" style={{ width: "500px" }}>
        <Stack gap="lg">
          <Heading level={3} size="sm">
            Metrics Dashboard Controls
          </Heading>
          
          <Stack gap="md">
            <ToggleGroup
              options={metricOptions}
              value={activeMetrics}
              multiple
              label="Select Metrics to Display"
              onChange={(value) => setActiveMetrics(value as string[])}
            />
            
            <Inline gap="lg" wrap>
              <ToggleGroup
                options={timeOptions}
                singleValue={timeRange}
                label="Time Range"
                size="sm"
                onChange={(value) => setTimeRange(value as string)}
              />
              
              <ToggleGroup
                options={chartTypeOptions}
                singleValue={chartType}
                label="Chart Type"
                size="sm"
                variant="outline"
                onChange={(value) => setChartType(value as string)}
              />
            </Inline>
          </Stack>
          
          <Card padding="md" style={{ backgroundColor: "var(--freeui-color-neutral-50)" }}>
            <Stack gap="xs">
              <Text size="sm" weight="semibold">Current Selection:</Text>
              <Text size="sm">
                Metrics: {activeMetrics.join(", ") || "None"}
              </Text>
              <Text size="sm">
                Time Range: {timeRange}
              </Text>
              <Text size="sm">
                Chart Type: {chartType}
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing how ToggleGroup components work together in a metrics dashboard control panel.",
      },
    },
  },
};

export const AlertingConfiguration: Story = {
  render: function AlertingConfiguration() {
    const [enabledAlerts, setEnabledAlerts] = React.useState<string[]>(["high_cpu", "low_memory"]);
    const [severity, setSeverity] = React.useState<string>("warning");

    const alertOptions = [
      { value: "high_cpu", label: "High CPU" },
      { value: "low_memory", label: "Low Memory" },
      { value: "disk_full", label: "Disk Full" },
      { value: "high_latency", label: "High Latency" },
      { value: "error_rate", label: "Error Rate" },
    ];

    const severityOptions = [
      { value: "info", label: "Info" },
      { value: "warning", label: "Warning" },
      { value: "critical", label: "Critical" },
    ];

    return (
      <Card padding="lg" style={{ width: "450px" }}>
        <Stack gap="lg">
          <Heading level={3} size="sm">
            Alert Configuration
          </Heading>
          
          <ToggleGroup
            options={alertOptions}
            value={enabledAlerts}
            multiple
            label="Enabled Alert Types"
            onChange={(value) => setEnabledAlerts(value as string[])}
          />
          
          <ToggleGroup
            options={severityOptions}
            singleValue={severity}
            label="Minimum Severity Level"
            variant="outline"
            onChange={(value) => setSeverity(value as string)}
          />
          
          <Card padding="sm" style={{ backgroundColor: "var(--freeui-color-neutral-25)" }}>
            <Text size="sm">
              <strong>{enabledAlerts.length}</strong> alert type(s) enabled at{" "}
              <strong>{severity}</strong> level or higher
            </Text>
          </Card>
        </Stack>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of using ToggleGroup for alert and monitoring configuration in an observability system.",
      },
    },
  },
};