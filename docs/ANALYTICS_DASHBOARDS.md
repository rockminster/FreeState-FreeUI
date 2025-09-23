# Analytics Dashboards

## Overview

The Analytics Dashboards provide comprehensive monitoring interfaces for FreeState applications, enabling teams to track key metrics and identify potential issues. These dashboards are built using FreeUI's compositional design principles, demonstrating how complex data visualizations can be created from basic primitives.

## Available Dashboards

### 1. Usage Analytics Dashboard

Monitors API usage, storage consumption, and bandwidth metrics:

- **API Metrics**: Total calls, daily calls, response times, error rates
- **Top Endpoints**: Most frequently used API endpoints with performance data
- **Storage Usage**: Current usage, file counts, growth trends
- **Storage Details**: Largest files, usage visualization with progress bars

**Key Components Used:**

- Stack, Inline (layout)
- Card (containers)
- Text, Heading (content)
- Badge (status indicators)
- Custom progress bars using CSS

### 2. Security & Access Dashboard

Tracks authentication failures, blocked IPs, and security events:

- **Security Overview**: Failed authentication attempts, blocked IPs, unusual patterns
- **Recent Events**: Timeline of security incidents with severity levels
- **Threat Intelligence**: Color-coded alerts based on threat levels

**Key Components Used:**

- Stack, Inline (layout)
- Card (event containers)
- Badge (severity indicators)
- Text (event details and timestamps)

### 3. Performance Metrics Dashboard

Monitors operation durations, lock performance, and system bottlenecks:

- **Performance Overview**: Average operation and lock durations
- **Slow Operations**: Operations taking longer than expected
- **Lock Contentions**: Resource conflicts and wait times
- **Performance Indicators**: Color-coded badges for different performance levels

**Key Components Used:**

- Stack, Inline (layout)
- Card (metric containers)
- Badge (performance indicators)
- Text (duration formatting)

## Design Principles

All dashboards follow FreeUI's compositional design principles:

1. **No Bespoke Components**: Every dashboard is built from existing FreeUI primitives
2. **Flexible Composition**: Layouts can be easily modified, extended, or rearranged
3. **Data-Driven Design**: All metrics use structured TypeScript interfaces
4. **Consistent Styling**: Spacing, colors, and typography from design tokens
5. **Accessibility First**: Proper semantic structure and ARIA attributes

## Data Interfaces

The dashboards use well-defined TypeScript interfaces for type safety:

```typescript
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
```

## Implementation Benefits

By using compositional design:

- **Reduced Bundle Size**: No specialized dashboard components to maintain
- **Maximum Flexibility**: Easy to modify layouts and add new metrics
- **Better Consistency**: All styling comes from design tokens
- **Easier Maintenance**: Changes to primitives affect entire system
- **Enhanced Reusability**: Components can be used in any context

## Usage in Applications

These dashboard examples can be adapted for real applications by:

1. Replacing mock data with live API calls
2. Adding interactive features (filters, date ranges, etc.)
3. Implementing real-time updates
4. Adding drill-down capabilities
5. Customizing metrics based on specific needs

The compositional approach ensures that any modifications or extensions can be made without breaking existing functionality or requiring new component development.
