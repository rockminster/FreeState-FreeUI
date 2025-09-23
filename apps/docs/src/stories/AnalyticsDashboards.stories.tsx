import type { Meta, StoryObj } from "@storybook/react";
import {
  Stack,
  Inline,
  Card,
  Text,
  Heading,
  Button,
  Badge,
  Separator,
} from "@rockminster/react";

const meta: Meta = {
  title: "Examples/Analytics Dashboards",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Analytics & Monitoring Dashboards

These dashboards demonstrate how to compose complex analytics interfaces using FreeUI's compositional design principles.
Instead of creating specialized dashboard components, we build comprehensive monitoring interfaces from basic primitives.

## Dashboard Types

1. **Usage Analytics**: API calls, storage usage, bandwidth tracking
2. **Security & Access**: Authentication failures, access patterns, security events
3. **Performance Metrics**: Operation durations, lock durations, state file growth

## Key Features

- Real-time data visualization using composed primitives
- Responsive layouts that adapt to different screen sizes
- Consistent spacing and theming through design tokens
- Accessibility-first design with proper ARIA attributes
- Modular sections that can be rearranged or repurposed

## Design Principles

- **No bespoke components**: Every element uses existing FreeUI primitives
- **Flexible composition**: Layouts can be easily modified or extended
- **Data-driven**: All metrics use structured data interfaces
- **Consistent styling**: All spacing, colors, and typography from design tokens
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data interfaces for analytics dashboards
interface ApiMetrics {
  totalCalls: number;
  callsToday: number;
  avgResponseTime: number;
  errorRate: number;
  topEndpoints: Array<{
    endpoint: string;
    calls: number;
    avgResponseTime: number;
  }>;
}

interface StorageMetrics {
  totalUsed: number;
  totalLimit: number;
  stateFiles: number;
  avgFileSize: number;
  growthRate: number;
  topFiles: Array<{
    name: string;
    size: number;
    lastModified: string;
  }>;
}

interface SecurityMetrics {
  failedAttempts: number;
  blockedIPs: number;
  unusualPatterns: number;
  recentEvents: Array<{
    type: "failed_auth" | "blocked_ip" | "unusual_access";
    timestamp: string;
    details: string;
    severity: "low" | "medium" | "high";
  }>;
}

interface PerformanceMetrics {
  avgOperationDuration: number;
  avgLockDuration: number;
  slowestOperations: Array<{
    operation: string;
    duration: number;
    timestamp: string;
  }>;
  lockContentions: Array<{
    resource: string;
    waitTime: number;
    timestamp: string;
  }>;
}

// Mock data
const mockApiMetrics: ApiMetrics = {
  totalCalls: 1247856,
  callsToday: 8432,
  avgResponseTime: 245,
  errorRate: 2.3,
  topEndpoints: [
    { endpoint: "/api/state/read", calls: 3421, avgResponseTime: 156 },
    { endpoint: "/api/state/write", calls: 2134, avgResponseTime: 289 },
    { endpoint: "/api/locks/acquire", calls: 1876, avgResponseTime: 98 },
    { endpoint: "/api/auth/validate", calls: 1234, avgResponseTime: 45 },
  ],
};

const mockStorageMetrics: StorageMetrics = {
  totalUsed: 47.3,
  totalLimit: 100,
  stateFiles: 1543,
  avgFileSize: 0.031,
  growthRate: 12.5,
  topFiles: [
    {
      name: "production.tfstate",
      size: 2.4,
      lastModified: "2024-01-15T14:30:00Z",
    },
    {
      name: "staging.tfstate",
      size: 1.8,
      lastModified: "2024-01-15T13:15:00Z",
    },
    {
      name: "development.tfstate",
      size: 0.9,
      lastModified: "2024-01-15T12:45:00Z",
    },
  ],
};

const mockSecurityMetrics: SecurityMetrics = {
  failedAttempts: 23,
  blockedIPs: 5,
  unusualPatterns: 2,
  recentEvents: [
    {
      type: "failed_auth",
      timestamp: "2024-01-15T14:45:00Z",
      details: "Multiple failed login attempts from 192.168.1.100",
      severity: "medium",
    },
    {
      type: "blocked_ip",
      timestamp: "2024-01-15T14:30:00Z",
      details: "Blocked IP 10.0.0.50 after 5 failed attempts",
      severity: "high",
    },
    {
      type: "unusual_access",
      timestamp: "2024-01-15T13:15:00Z",
      details: "Access pattern anomaly detected for user admin@acme.com",
      severity: "low",
    },
  ],
};

const mockPerformanceMetrics: PerformanceMetrics = {
  avgOperationDuration: 1.2,
  avgLockDuration: 0.8,
  slowestOperations: [
    {
      operation: "state_backup",
      duration: 45.2,
      timestamp: "2024-01-15T14:20:00Z",
    },
    {
      operation: "state_migration",
      duration: 32.1,
      timestamp: "2024-01-15T13:45:00Z",
    },
    {
      operation: "lock_cleanup",
      duration: 15.6,
      timestamp: "2024-01-15T12:30:00Z",
    },
  ],
  lockContentions: [
    {
      resource: "production.tfstate",
      waitTime: 5.2,
      timestamp: "2024-01-15T14:35:00Z",
    },
    {
      resource: "staging.tfstate",
      waitTime: 3.1,
      timestamp: "2024-01-15T13:20:00Z",
    },
  ],
};

// Helper function to format duration
const formatDuration = (seconds: number): string => {
  if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s`;
};

// Helper function to format file size
const formatFileSize = (gb: number): string => {
  if (gb < 0.001) return `${Math.round(gb * 1000000)}KB`;
  if (gb < 1) return `${Math.round(gb * 1000)}MB`;
  return `${gb.toFixed(1)}GB`;
};

// Helper function to format timestamp
const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
};

export const UsageAnalyticsDashboard: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--freeui-color-neutral-50)",
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Inline justify="space-between" align="center">
          <Stack gap="xs">
            <Heading level={1} size="lg">
              Usage Analytics
            </Heading>
            <Text color="subdued">
              Monitor API usage, storage consumption, and bandwidth metrics
            </Text>
          </Stack>
          <Inline gap="sm">
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button variant="primary" size="sm">
              Configure Alerts
            </Button>
          </Inline>
        </Inline>

        {/* API Metrics Overview */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Heading level={2} size="md">
              API Metrics
            </Heading>

            <Inline gap="xl" wrap>
              <Stack gap="xs" align="center">
                <Text size="xl" weight="bold" color="accent">
                  {mockApiMetrics.totalCalls.toLocaleString()}
                </Text>
                <Text size="sm" color="subdued">
                  Total API Calls
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Text size="xl" weight="bold" color="accent">
                  {mockApiMetrics.callsToday.toLocaleString()}
                </Text>
                <Text size="sm" color="subdued">
                  Calls Today
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockApiMetrics.avgResponseTime}ms
                  </Text>
                  <Badge variant="success" size="sm">
                    Good
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Avg Response Time
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockApiMetrics.errorRate}%
                  </Text>
                  <Badge variant="warning" size="sm">
                    Watch
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Error Rate
                </Text>
              </Stack>
            </Inline>

            <Separator />

            {/* Top Endpoints */}
            <Stack gap="md">
              <Text weight="semibold" size="sm" color="subdued">
                TOP ENDPOINTS
              </Text>
              <Stack gap="sm">
                {mockApiMetrics.topEndpoints.map((endpoint, index) => (
                  <Card
                    key={index}
                    padding="md"
                    style={{
                      backgroundColor: "var(--freeui-color-neutral-25)",
                    }}
                  >
                    <Inline justify="space-between" align="center">
                      <Stack gap="xs">
                        <Text weight="medium" as="code">
                          {endpoint.endpoint}
                        </Text>
                        <Text size="sm" color="subdued">
                          {endpoint.calls.toLocaleString()} calls
                        </Text>
                      </Stack>
                      <Stack gap="xs" align="end">
                        <Text size="sm" weight="medium">
                          {endpoint.avgResponseTime}ms
                        </Text>
                        <Text size="xs" color="subdued">
                          avg response
                        </Text>
                      </Stack>
                    </Inline>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Storage Metrics */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Heading level={2} size="md">
              Storage Usage
            </Heading>

            <Inline gap="xl" wrap>
              <Stack gap="xs" align="center">
                <Text size="xl" weight="bold" color="accent">
                  {formatFileSize(mockStorageMetrics.totalUsed)}
                </Text>
                <Text size="sm" color="subdued">
                  Used of {formatFileSize(mockStorageMetrics.totalLimit)}
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Text size="xl" weight="bold" color="accent">
                  {mockStorageMetrics.stateFiles.toLocaleString()}
                </Text>
                <Text size="sm" color="subdued">
                  State Files
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Text size="xl" weight="bold" color="accent">
                  {formatFileSize(mockStorageMetrics.avgFileSize)}
                </Text>
                <Text size="sm" color="subdued">
                  Avg File Size
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    +{mockStorageMetrics.growthRate}%
                  </Text>
                  <Badge variant="info" size="sm">
                    Growing
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Monthly Growth
                </Text>
              </Stack>
            </Inline>

            {/* Storage Usage Bar */}
            <Stack gap="xs">
              <Inline justify="space-between">
                <Text size="sm" weight="medium">
                  Storage Usage
                </Text>
                <Text size="sm" color="subdued">
                  {Math.round(
                    (mockStorageMetrics.totalUsed /
                      mockStorageMetrics.totalLimit) *
                      100
                  )}
                  % used
                </Text>
              </Inline>
              <div
                style={{
                  width: "100%",
                  height: "12px",
                  backgroundColor: "var(--freeui-color-neutral-200)",
                  borderRadius: "var(--freeui-border-radius-full)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(mockStorageMetrics.totalUsed / mockStorageMetrics.totalLimit) * 100}%`,
                    height: "100%",
                    backgroundColor: "var(--freeui-color-brand-500)",
                    borderRadius: "var(--freeui-border-radius-full)",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </Stack>

            <Separator />

            {/* Largest Files */}
            <Stack gap="md">
              <Text weight="semibold" size="sm" color="subdued">
                LARGEST STATE FILES
              </Text>
              <Stack gap="sm">
                {mockStorageMetrics.topFiles.map((file, index) => (
                  <Card
                    key={index}
                    padding="md"
                    style={{
                      backgroundColor: "var(--freeui-color-neutral-25)",
                    }}
                  >
                    <Inline justify="space-between" align="center">
                      <Stack gap="xs">
                        <Text weight="medium" as="code">
                          {file.name}
                        </Text>
                        <Text size="sm" color="subdued">
                          Modified {formatTime(file.lastModified)}
                        </Text>
                      </Stack>
                      <Text weight="semibold" color="accent">
                        {formatFileSize(file.size)}
                      </Text>
                    </Inline>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Usage Analytics Dashboard composed from FreeUI primitives, showcasing API metrics and storage usage monitoring.

**Composed from:**
- Stack & Inline (layout structure)
- Card (section containers)
- Heading & Text (content hierarchy)
- Badge (status indicators)
- Button (actions)
- Custom progress bars using CSS and design tokens

This demonstrates how complex analytics interfaces can be built without specialized dashboard components.
        `,
      },
    },
  },
};

export const SecurityAccessDashboard: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--freeui-color-neutral-50)",
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Inline justify="space-between" align="center">
          <Stack gap="xs">
            <Heading level={1} size="lg">
              Security & Access Monitoring
            </Heading>
            <Text color="subdued">
              Track authentication failures, blocked IPs, and unusual access
              patterns
            </Text>
          </Stack>
          <Inline gap="sm">
            <Button variant="outline" size="sm">
              Security Report
            </Button>
            <Button variant="primary" size="sm">
              Configure Alerts
            </Button>
          </Inline>
        </Inline>

        {/* Security Overview */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Heading level={2} size="md">
              Security Overview
            </Heading>

            <Inline gap="xl" wrap>
              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockSecurityMetrics.failedAttempts}
                  </Text>
                  <Badge variant="warning" size="sm">
                    Today
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Failed Auth Attempts
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockSecurityMetrics.blockedIPs}
                  </Text>
                  <Badge variant="error" size="sm">
                    Blocked
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  IP Addresses
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockSecurityMetrics.unusualPatterns}
                  </Text>
                  <Badge variant="info" size="sm">
                    Detected
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Unusual Patterns
                </Text>
              </Stack>
            </Inline>

            <Separator />

            {/* Recent Security Events */}
            <Stack gap="md">
              <Text weight="semibold" size="sm" color="subdued">
                RECENT SECURITY EVENTS
              </Text>
              <Stack gap="sm">
                {mockSecurityMetrics.recentEvents.map((event, index) => (
                  <Card
                    key={index}
                    padding="md"
                    style={{
                      backgroundColor: "var(--freeui-color-neutral-25)",
                    }}
                  >
                    <Inline justify="space-between" align="start">
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Inline gap="sm" align="center">
                          <Badge
                            variant={
                              event.severity === "high"
                                ? "error"
                                : event.severity === "medium"
                                  ? "warning"
                                  : "info"
                            }
                            size="sm"
                          >
                            {event.type.replace("_", " ").toUpperCase()}
                          </Badge>
                          <Text size="sm" color="subdued">
                            {formatTime(event.timestamp)}
                          </Text>
                        </Inline>
                        <Text size="sm">{event.details}</Text>
                      </Stack>
                      <Badge
                        variant={
                          event.severity === "high"
                            ? "error"
                            : event.severity === "medium"
                              ? "warning"
                              : "neutral"
                        }
                        size="sm"
                      >
                        {event.severity}
                      </Badge>
                    </Inline>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Security & Access Monitoring Dashboard showing authentication failures, blocked IPs, and security events.

**Composed from:**
- Stack & Inline (layout structure)
- Card (event containers)
- Badge (severity and status indicators)
- Text (event details and timestamps)
- Color-coded badges for different threat levels

Demonstrates security monitoring interfaces built with compositional design principles.
        `,
      },
    },
  },
};

export const PerformanceMetricsDashboard: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--freeui-color-neutral-50)",
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Inline justify="space-between" align="center">
          <Stack gap="xs">
            <Heading level={1} size="lg">
              Performance Metrics
            </Heading>
            <Text color="subdued">
              Monitor operation durations, lock performance, and system
              bottlenecks
            </Text>
          </Stack>
          <Inline gap="sm">
            <Button variant="outline" size="sm">
              Performance Report
            </Button>
            <Button variant="primary" size="sm">
              Optimize Settings
            </Button>
          </Inline>
        </Inline>

        {/* Performance Overview */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Heading level={2} size="md">
              Performance Overview
            </Heading>

            <Inline gap="xl" wrap>
              <Stack gap="xs" align="center">
                <Text size="xl" weight="bold" color="accent">
                  {formatDuration(mockPerformanceMetrics.avgOperationDuration)}
                </Text>
                <Text size="sm" color="subdued">
                  Avg Operation Duration
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Text size="xl" weight="bold" color="accent">
                  {formatDuration(mockPerformanceMetrics.avgLockDuration)}
                </Text>
                <Text size="sm" color="subdued">
                  Avg Lock Duration
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockPerformanceMetrics.slowestOperations.length}
                  </Text>
                  <Badge variant="warning" size="sm">
                    Slow
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Operations &gt; 10s
                </Text>
              </Stack>

              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockPerformanceMetrics.lockContentions.length}
                  </Text>
                  <Badge variant="error" size="sm">
                    Contentions
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Lock Conflicts
                </Text>
              </Stack>
            </Inline>

            <Separator />

            {/* Slowest Operations */}
            <Stack gap="md">
              <Text weight="semibold" size="sm" color="subdued">
                SLOWEST OPERATIONS
              </Text>
              <Stack gap="sm">
                {mockPerformanceMetrics.slowestOperations.map(
                  (operation, index) => (
                    <Card
                      key={index}
                      padding="md"
                      style={{
                        backgroundColor: "var(--freeui-color-neutral-25)",
                      }}
                    >
                      <Inline justify="space-between" align="center">
                        <Stack gap="xs">
                          <Text weight="medium" as="code">
                            {operation.operation}
                          </Text>
                          <Text size="sm" color="subdued">
                            {formatTime(operation.timestamp)}
                          </Text>
                        </Stack>
                        <Inline gap="xs" align="center">
                          <Text weight="semibold" color="accent">
                            {formatDuration(operation.duration)}
                          </Text>
                          <Badge variant="warning" size="sm">
                            Slow
                          </Badge>
                        </Inline>
                      </Inline>
                    </Card>
                  )
                )}
              </Stack>
            </Stack>

            <Separator />

            {/* Lock Contentions */}
            <Stack gap="md">
              <Text weight="semibold" size="sm" color="subdued">
                LOCK CONTENTIONS
              </Text>
              <Stack gap="sm">
                {mockPerformanceMetrics.lockContentions.map(
                  (contention, index) => (
                    <Card
                      key={index}
                      padding="md"
                      style={{
                        backgroundColor: "var(--freeui-color-neutral-25)",
                      }}
                    >
                      <Inline justify="space-between" align="center">
                        <Stack gap="xs">
                          <Text weight="medium" as="code">
                            {contention.resource}
                          </Text>
                          <Text size="sm" color="subdued">
                            {formatTime(contention.timestamp)}
                          </Text>
                        </Stack>
                        <Inline gap="xs" align="center">
                          <Text weight="semibold" color="accent">
                            {formatDuration(contention.waitTime)} wait
                          </Text>
                          <Badge variant="error" size="sm">
                            Contention
                          </Badge>
                        </Inline>
                      </Inline>
                    </Card>
                  )
                )}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Performance Metrics Dashboard tracking operation durations, lock performance, and system bottlenecks.

**Composed from:**
- Stack & Inline (layout structure)
- Card (metric containers)
- Badge (performance indicators)
- Text (duration formatting and details)
- Custom formatting helpers for time and duration display

Shows how performance monitoring interfaces can be built using compositional design patterns.
        `,
      },
    },
  },
};

export const ComprehensiveAnalyticsSuite: Story = {
  render: () => (
    <div style={{ padding: "24px", backgroundColor: "var(--freeui-color-neutral-50)" }}>
      <Stack gap="xl">
        {/* Main Header */}
        <Inline justify="space-between" align="center">
          <Stack gap="xs">
            <Heading level={1} size="lg">
              FreeState Analytics Suite
            </Heading>
            <Text color="subdued">
              Comprehensive monitoring and analytics dashboard for usage, security, and performance
            </Text>
          </Stack>
          <Inline gap="sm">
            <Button variant="outline" size="sm">
              Export All Reports
            </Button>
            <Button variant="primary" size="sm">
              Configure Global Alerts
            </Button>
          </Inline>
        </Inline>

        {/* Quick Stats Overview */}
        <Card padding="lg" shadow="md">
          <Stack gap="lg">
            <Heading level={2} size="md">
              System Overview
            </Heading>
            
            <Inline gap="xl" wrap>
              {/* API Health */}
              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockApiMetrics.callsToday.toLocaleString()}
                  </Text>
                  <Badge variant="success" size="sm">
                    Healthy
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  API Calls Today
                </Text>
              </Stack>

              {/* Storage Status */}
              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {Math.round((mockStorageMetrics.totalUsed / mockStorageMetrics.totalLimit) * 100)}%
                  </Text>
                  <Badge variant="warning" size="sm">
                    Monitor
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Storage Used
                </Text>
              </Stack>

              {/* Security Status */}
              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {mockSecurityMetrics.failedAttempts}
                  </Text>
                  <Badge variant="warning" size="sm">
                    Watch
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Security Events
                </Text>
              </Stack>

              {/* Performance Status */}
              <Stack gap="xs" align="center">
                <Inline gap="xs" align="center">
                  <Text size="xl" weight="bold" color="accent">
                    {formatDuration(mockPerformanceMetrics.avgOperationDuration)}
                  </Text>
                  <Badge variant="success" size="sm">
                    Good
                  </Badge>
                </Inline>
                <Text size="sm" color="subdued">
                  Avg Response Time
                </Text>
              </Stack>
            </Inline>
          </Stack>
        </Card>

        {/* Dashboard Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
          gap: "24px" 
        }}>
          {/* API Usage Summary */}
          <Card padding="lg" shadow="sm">
            <Stack gap="md">
              <Inline justify="space-between" align="center">
                <Heading level={3} size="sm">
                  API Usage
                </Heading>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Inline>
              
              <Stack gap="sm">
                {mockApiMetrics.topEndpoints.slice(0, 3).map((endpoint, index) => (
                  <Inline key={index} justify="space-between" align="center">
                    <Text as="code" size="sm">
                      {endpoint.endpoint}
                    </Text>
                    <Inline gap="xs" align="center">
                      <Text size="sm" weight="medium">
                        {endpoint.calls}
                      </Text>
                      <Text size="xs" color="subdued">
                        calls
                      </Text>
                    </Inline>
                  </Inline>
                ))}
              </Stack>
            </Stack>
          </Card>

          {/* Security Summary */}
          <Card padding="lg" shadow="sm">
            <Stack gap="md">
              <Inline justify="space-between" align="center">
                <Heading level={3} size="sm">
                  Security Events
                </Heading>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Inline>
              
              <Stack gap="sm">
                {mockSecurityMetrics.recentEvents.slice(0, 2).map((event, index) => (
                  <Stack key={index} gap="xs">
                    <Inline justify="space-between" align="center">
                      <Badge
                        variant={event.severity === "high" ? "error" : "warning"}
                        size="sm"
                      >
                        {event.type.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Text size="xs" color="subdued">
                        {formatTime(event.timestamp)}
                      </Text>
                    </Inline>
                    <Text size="sm">
                      {event.details}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Card>

          {/* Performance Summary */}
          <Card padding="lg" shadow="sm">
            <Stack gap="md">
              <Inline justify="space-between" align="center">
                <Heading level={3} size="sm">
                  Performance
                </Heading>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Inline>
              
              <Stack gap="sm">
                <Inline justify="space-between" align="center">
                  <Text size="sm" color="subdued">
                    Avg Operation Duration
                  </Text>
                  <Text size="sm" weight="medium">
                    {formatDuration(mockPerformanceMetrics.avgOperationDuration)}
                  </Text>
                </Inline>
                <Inline justify="space-between" align="center">
                  <Text size="sm" color="subdued">
                    Avg Lock Duration
                  </Text>
                  <Text size="sm" weight="medium">
                    {formatDuration(mockPerformanceMetrics.avgLockDuration)}
                  </Text>
                </Inline>
                <Inline justify="space-between" align="center">
                  <Text size="sm" color="subdued">
                    Slow Operations
                  </Text>
                  <Inline gap="xs" align="center">
                    <Text size="sm" weight="medium">
                      {mockPerformanceMetrics.slowestOperations.length}
                    </Text>
                    <Badge variant="warning" size="sm">
                      Review
                    </Badge>
                  </Inline>
                </Inline>
              </Stack>
            </Stack>
          </Card>

          {/* Storage Summary */}
          <Card padding="lg" shadow="sm">
            <Stack gap="md">
              <Inline justify="space-between" align="center">
                <Heading level={3} size="sm">
                  Storage Usage
                </Heading>
                <Button variant="ghost" size="sm">
                  Manage Storage
                </Button>
              </Inline>
              
              <Stack gap="sm">
                <Inline justify="space-between" align="center">
                  <Text size="sm" color="subdued">
                    Total Used
                  </Text>
                  <Text size="sm" weight="medium">
                    {formatFileSize(mockStorageMetrics.totalUsed)} / {formatFileSize(mockStorageMetrics.totalLimit)}
                  </Text>
                </Inline>
                
                {/* Storage Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "var(--freeui-color-neutral-200)",
                    borderRadius: "var(--freeui-border-radius-full)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(mockStorageMetrics.totalUsed / mockStorageMetrics.totalLimit) * 100}%`,
                      height: "100%",
                      backgroundColor: "var(--freeui-color-brand-500)",
                      borderRadius: "var(--freeui-border-radius-full)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                
                <Inline justify="space-between" align="center">
                  <Text size="sm" color="subdued">
                    State Files
                  </Text>
                  <Text size="sm" weight="medium">
                    {mockStorageMetrics.stateFiles.toLocaleString()}
                  </Text>
                </Inline>
              </Stack>
            </Stack>
          </Card>
        </div>

        {/* Action Items */}
        <Card padding="lg" shadow="sm" style={{ backgroundColor: "var(--freeui-color-neutral-25)" }}>
          <Stack gap="md">
            <Heading level={3} size="sm">
              Recommended Actions
            </Heading>
            
            <Stack gap="sm">
              <Inline justify="space-between" align="center">
                <Stack gap="xs">
                  <Text weight="medium" size="sm">
                    Review storage usage trends
                  </Text>
                  <Text size="sm" color="subdued">
                    Storage usage at {Math.round((mockStorageMetrics.totalUsed / mockStorageMetrics.totalLimit) * 100)}% - consider cleanup
                  </Text>
                </Stack>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </Inline>
              
              <Separator />
              
              <Inline justify="space-between" align="center">
                <Stack gap="xs">
                  <Text weight="medium" size="sm">
                    Investigate failed authentication attempts
                  </Text>
                  <Text size="sm" color="subdued">
                    {mockSecurityMetrics.failedAttempts} failed attempts detected today
                  </Text>
                </Stack>
                <Button variant="outline" size="sm">
                  Investigate
                </Button>
              </Inline>
              
              <Separator />
              
              <Inline justify="space-between" align="center">
                <Stack gap="xs">
                  <Text weight="medium" size="sm">
                    Optimize slow operations
                  </Text>
                  <Text size="sm" color="subdued">
                    {mockPerformanceMetrics.slowestOperations.length} operations taking &gt; 10s
                  </Text>
                </Stack>
                <Button variant="outline" size="sm">
                  Optimize
                </Button>
              </Inline>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive Analytics Suite showing all monitoring capabilities in a unified dashboard layout.

**Composed from:**
- Stack & Inline (responsive layout structure)
- Card (modular section containers)
- Heading & Text (content hierarchy)
- Badge (status and severity indicators)
- Button (interactive actions)
- CSS Grid (responsive dashboard layout)
- Custom progress indicators using CSS and design tokens

This demonstrates how complex enterprise dashboards can be built entirely from compositional design principles, providing maximum flexibility while maintaining consistency and performance.
        `,
      },
    },
  },
};
