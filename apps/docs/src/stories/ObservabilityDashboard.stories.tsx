import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Stack,
  Inline,
  Card,
  Text,
  Heading,
  Button,
  Badge,
  Select,
  ToggleGroup,
  Progress,
  StatusIndicator,
  Alert,
  Switch,
  Timeline,
} from "@rockminster/react";

const meta: Meta = {
  title: "Examples/Observability Dashboard",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Comprehensive Observability Dashboard

This dashboard demonstrates how to build a complete observability and metrics integration interface 
using FreeUI's compositional design principles and the new observability-focused components.

## Key Features

- **System Health Monitoring**: Real-time status indicators and progress bars
- **Metric Selection Controls**: Dropdown selectors and toggle groups for metric configuration
- **Alert Management**: Critical error notifications and dismissible alerts
- **Log Viewer Interface**: Scrollable log display with filtering capabilities
- **Timeline Visualization**: Historical data display with event markers
- **Interactive Controls**: Switches, selectors, and toggle groups for dashboard configuration

## Components Used

### New Observability Components:
- **Select**: Metric and time range selection
- **ToggleGroup**: Multi-metric selection and feature toggles
- **Progress**: Resource usage and completion indicators
- **StatusIndicator**: Service health and system status
- **Alert**: Critical notifications and error reporting

### Existing Primitives:
- **Stack/Inline**: Layout composition
- **Card**: Content containers and sections
- **Text/Heading**: Typography and content
- **Button**: Actions and controls
- **Badge**: Status labels and indicators
- **Switch**: Feature enable/disable
- **Timeline**: Event chronology

## Design Philosophy

Following FreeUI's compositional approach, this dashboard is built entirely from primitive components
rather than specialized dashboard widgets. This ensures maximum flexibility, consistency, and maintainability
while enabling teams to create sophisticated observability interfaces.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for observability dashboard
const systemServices = [
  { name: "API Gateway", status: "healthy" as const, uptime: "99.9%" },
  { name: "Authentication", status: "healthy" as const, uptime: "99.8%" },
  { name: "Database", status: "warning" as const, uptime: "98.5%" },
  { name: "Cache Layer", status: "critical" as const, uptime: "85.2%" },
  { name: "Message Queue", status: "loading" as const, uptime: "—" },
];

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
];

const logLevelOptions = [
  { value: "error", label: "ERROR" },
  { value: "warn", label: "WARN" },
  { value: "info", label: "INFO" },
  { value: "debug", label: "DEBUG" },
];

const mockLogs = [
  {
    timestamp: "2024-01-20 14:32:15",
    level: "ERROR",
    service: "auth",
    message: "Failed authentication attempt from 192.168.1.100",
  },
  {
    timestamp: "2024-01-20 14:31:42",
    level: "WARN",
    service: "api",
    message: "High response time detected: 2.3s",
  },
  {
    timestamp: "2024-01-20 14:30:18",
    level: "INFO",
    service: "db",
    message: "Connection pool resized to 50 connections",
  },
  {
    timestamp: "2024-01-20 14:29:55",
    level: "ERROR",
    service: "cache",
    message: "Redis connection timeout",
  },
  {
    timestamp: "2024-01-20 14:29:12",
    level: "INFO",
    service: "api",
    message: "Health check completed successfully",
  },
];

const mockAlerts = [
  {
    id: 1,
    variant: "danger" as const,
    title: "Critical: Cache Service Down",
    message:
      "Redis cache cluster is unresponsive. Application performance degraded.",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    variant: "warning" as const,
    title: "High Database Response Time",
    message: "Average query response time exceeded 1.5s threshold",
    timestamp: "8 minutes ago",
  },
];

export const ComprehensiveObservabilityDashboard: Story = {
  render: function ComprehensiveObservabilityDashboard() {
    const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>([
      "cpu",
      "memory",
    ]);
    const [timeRange, setTimeRange] = React.useState<string>("1h");
    const [logLevels, setLogLevels] = React.useState<string[]>([
      "error",
      "warn",
    ]);
    const [autoRefresh, setAutoRefresh] = React.useState(true);
    const [alerts, setAlerts] = React.useState(mockAlerts);

    const dismissAlert = (id: number) => {
      setAlerts(alerts.filter((alert) => alert.id !== id));
    };

    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: "var(--freeui-color-neutral-50)",
          minHeight: "100vh",
        }}
      >
        <Stack gap="xl">
          {/* Header */}
          <Inline justify="space-between" align="center">
            <Stack gap="xs">
              <Heading level={1} size="lg">
                System Observability Dashboard
              </Heading>
              <Text color="subdued">
                Real-time monitoring, metrics, and alerting for your
                infrastructure
              </Text>
            </Stack>
            <Inline gap="sm">
              <Switch
                label="Auto-refresh"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <Button variant="outline" size="sm">
                Export Data
              </Button>
              <Button variant="primary" size="sm">
                Configure Alerts
              </Button>
            </Inline>
          </Inline>

          {/* Active Alerts */}
          {alerts.length > 0 && (
            <Card padding="md" shadow="sm">
              <Stack gap="sm">
                <Inline justify="space-between" align="center">
                  <Heading level={3} size="sm">
                    Active Alerts ({alerts.length})
                  </Heading>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAlerts([])}
                  >
                    Dismiss All
                  </Button>
                </Inline>
                {alerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    variant={alert.variant}
                    title={alert.title}
                    dismissible
                    onDismiss={() => dismissAlert(alert.id)}
                  >
                    <Stack gap="xs">
                      <Text>{alert.message}</Text>
                      <Text size="sm" color="subdued">
                        {alert.timestamp}
                      </Text>
                    </Stack>
                  </Alert>
                ))}
              </Stack>
            </Card>
          )}

          {/* Dashboard Controls */}
          <Card padding="lg" shadow="sm">
            <Stack gap="md">
              <Heading level={3} size="sm">
                Dashboard Configuration
              </Heading>

              <Inline gap="lg" wrap>
                <ToggleGroup
                  options={metricOptions}
                  value={selectedMetrics}
                  multiple
                  label="Active Metrics"
                  onChange={(value) => setSelectedMetrics(value as string[])}
                />

                <Select
                  options={timeRangeOptions}
                  value={timeRange}
                  label="Time Range"
                  onChange={(e) => setTimeRange(e.target.value)}
                />
              </Inline>
            </Stack>
          </Card>

          {/* System Overview Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Service Health */}
            <Card padding="lg" shadow="sm">
              <Stack gap="md">
                <Heading level={3} size="sm">
                  Service Health
                </Heading>

                <Stack gap="sm">
                  {systemServices.map((service) => (
                    <Inline
                      key={service.name}
                      justify="space-between"
                      align="center"
                    >
                      <Stack gap="xs">
                        <Text weight="medium">{service.name}</Text>
                        <Text size="sm" color="subdued">
                          Uptime: {service.uptime}
                        </Text>
                      </Stack>
                      <StatusIndicator
                        status={service.status}
                        pulse={service.status === "loading"}
                        showStatus
                      />
                    </Inline>
                  ))}
                </Stack>
              </Stack>
            </Card>

            {/* Resource Metrics */}
            <Card padding="lg" shadow="sm">
              <Stack gap="md">
                <Heading level={3} size="sm">
                  Resource Usage
                </Heading>

                <Stack gap="sm">
                  <Progress
                    value={72}
                    label="CPU Usage"
                    variant="warning"
                    showValue
                  />
                  <Progress
                    value={45}
                    label="Memory Usage"
                    variant="success"
                    showValue
                  />
                  <Progress
                    value={88}
                    label="Disk Space"
                    variant="danger"
                    showValue
                  />
                  <Progress
                    value={23}
                    label="Network I/O"
                    variant="default"
                    showValue
                  />
                </Stack>
              </Stack>
            </Card>

            {/* Quick Metrics */}
            <Card padding="lg" shadow="sm">
              <Stack gap="md">
                <Heading level={3} size="sm">
                  Current Metrics
                </Heading>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <Stack gap="xs" align="center">
                    <Text size="xl" weight="bold" color="accent">
                      847ms
                    </Text>
                    <Text size="sm" color="subdued">
                      Avg Response
                    </Text>
                  </Stack>

                  <Stack gap="xs" align="center">
                    <Text size="xl" weight="bold" color="accent">
                      2.4%
                    </Text>
                    <Text size="sm" color="subdued">
                      Error Rate
                    </Text>
                  </Stack>

                  <Stack gap="xs" align="center">
                    <Text size="xl" weight="bold" color="accent">
                      1,247
                    </Text>
                    <Text size="sm" color="subdued">
                      Requests/min
                    </Text>
                  </Stack>

                  <Stack gap="xs" align="center">
                    <Text size="xl" weight="bold" color="accent">
                      99.7%
                    </Text>
                    <Text size="sm" color="subdued">
                      Availability
                    </Text>
                  </Stack>
                </div>
              </Stack>
            </Card>
          </div>

          {/* Log Viewer */}
          <Card padding="lg" shadow="sm">
            <Stack gap="md">
              <Inline justify="space-between" align="center">
                <Heading level={3} size="sm">
                  System Logs
                </Heading>
                <ToggleGroup
                  options={logLevelOptions}
                  value={logLevels}
                  multiple
                  size="sm"
                  onChange={(value) => setLogLevels(value as string[])}
                />
              </Inline>

              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  border: "1px solid var(--freeui-color-neutral-200)",
                  borderRadius: "6px",
                  backgroundColor: "var(--freeui-color-neutral-25)",
                }}
              >
                <Stack gap="xs" style={{ padding: "12px" }}>
                  {mockLogs
                    .filter((log) =>
                      logLevels.includes(log.level.toLowerCase())
                    )
                    .map((log, index) => (
                      <Inline
                        key={index}
                        gap="sm"
                        align="start"
                        style={{ fontFamily: "monospace", fontSize: "13px" }}
                      >
                        <Text
                          size="sm"
                          color="subdued"
                          style={{ minWidth: "130px" }}
                        >
                          {log.timestamp}
                        </Text>
                        <Badge
                          variant={
                            log.level === "ERROR"
                              ? "danger"
                              : log.level === "WARN"
                                ? "warning"
                                : "default"
                          }
                          size="sm"
                          style={{ minWidth: "60px" }}
                        >
                          {log.level}
                        </Badge>
                        <Text
                          size="sm"
                          weight="medium"
                          style={{ minWidth: "80px" }}
                        >
                          {log.service}
                        </Text>
                        <Text size="sm">{log.message}</Text>
                      </Inline>
                    ))}
                </Stack>
              </div>
            </Stack>
          </Card>

          {/* Event Timeline */}
          <Card padding="lg" shadow="sm">
            <Stack gap="md">
              <Heading level={3} size="sm">
                Recent Events
              </Heading>

              <div style={{ position: "relative", padding: "16px 0" }}>
                <Timeline
                  orientation="vertical"
                  variant="solid"
                  style={{
                    position: "absolute",
                    left: "20px",
                    height: "200px",
                  }}
                />

                <Stack gap="lg" style={{ paddingLeft: "50px" }}>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-38px",
                        top: "4px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor:
                          "var(--freeui-color-semantic-danger-500)",
                      }}
                    />
                    <Stack gap="xs">
                      <Text weight="medium">Cache Service Failure</Text>
                      <Text size="sm" color="subdued">
                        2 minutes ago
                      </Text>
                      <Text size="sm">
                        Redis cluster went offline, fallback to database
                      </Text>
                    </Stack>
                  </div>

                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-38px",
                        top: "4px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor:
                          "var(--freeui-color-semantic-warning-500)",
                      }}
                    />
                    <Stack gap="xs">
                      <Text weight="medium">High Database Load</Text>
                      <Text size="sm" color="subdued">
                        8 minutes ago
                      </Text>
                      <Text size="sm">
                        Query response time increased to 1.8s average
                      </Text>
                    </Stack>
                  </div>

                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-38px",
                        top: "4px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor:
                          "var(--freeui-color-semantic-success-500)",
                      }}
                    />
                    <Stack gap="xs">
                      <Text weight="medium">Deployment Completed</Text>
                      <Text size="sm" color="subdued">
                        25 minutes ago
                      </Text>
                      <Text size="sm">
                        API v2.1.3 deployed successfully to production
                      </Text>
                    </Stack>
                  </div>
                </Stack>
              </div>
            </Stack>
          </Card>
        </Stack>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
This comprehensive observability dashboard demonstrates the full capabilities of FreeUI's 
observability components working together. It showcases:

- **Real-time system monitoring** with status indicators and progress bars
- **Interactive metric selection** using toggle groups and dropdowns
- **Alert management** with dismissible notifications
- **Log filtering and viewing** with scrollable interfaces
- **Event timeline visualization** showing system events chronologically
- **Dashboard configuration** with switches and selectors

The entire interface is built using compositional design principles, making it easy to 
modify, extend, or repurpose individual sections for specific monitoring needs.
        `,
      },
    },
  },
};
