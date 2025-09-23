import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Alert, Stack, Button, Card, Text, Heading } from "@rockminster/react";

const meta: Meta<typeof Alert> = {
  title: "Display/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Alert component displays important messages and notifications with appropriate
severity levels and dismissible functionality for observability dashboards.

## Features
- **Multiple severity levels**: Info, success, warning, and danger variants
- **Dismissible functionality**: Optional close button with accessibility support
- **Flexible content**: Support for titles, messages, and custom icons
- **Multiple sizes**: Small, medium, and large variants
- **Accessible**: Proper ARIA attributes and live regions for screen readers
- **Compositional**: Works seamlessly with other layout primitives

## Observability Usage
Use Alert for system notifications, error reporting, status updates,
and any critical information that requires user attention in monitoring dashboards.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "danger"],
      description: "The alert severity/variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the alert",
    },
    dismissible: {
      control: { type: "boolean" },
      description: "Whether the alert can be dismissed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: "info",
    title: "System Information",
    children: "This is a basic information alert message.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack gap="md" style={{ width: "400px" }}>
      <Alert variant="info" title="Information">
        System maintenance scheduled for tonight at 2 AM UTC.
      </Alert>
      
      <Alert variant="success" title="Success">
        All services are operating normally. System health is optimal.
      </Alert>
      
      <Alert variant="warning" title="Warning">
        CPU usage is approaching 80%. Consider scaling resources.
      </Alert>
      
      <Alert variant="danger" title="Critical Error">
        Database connection failed. Immediate attention required.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available alert variants showing different severity levels for various system conditions.",
      },
    },
  },
};

export const Dismissible: Story = {
  render: function Dismissible() {
    const [alerts, setAlerts] = React.useState([
      { id: 1, variant: "warning" as const, title: "High Memory Usage", message: "Memory usage at 85%" },
      { id: 2, variant: "danger" as const, title: "Service Outage", message: "API gateway is down" },
      { id: 3, variant: "info" as const, title: "Maintenance", message: "Scheduled maintenance in 1 hour" },
    ]);

    const dismissAlert = (id: number) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
      <Stack gap="md" style={{ width: "400px" }}>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            dismissible
            onDismiss={() => dismissAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
        {alerts.length === 0 && (
          <Text color="subdued">All alerts dismissed</Text>
        )}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dismissible alerts that can be closed by the user, useful for temporary notifications.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="md" style={{ width: "400px" }}>
      <Alert variant="info" size="sm" title="Small Alert">
        Compact alert for minimal space.
      </Alert>
      
      <Alert variant="warning" size="md" title="Medium Alert">
        Standard alert size for most use cases.
      </Alert>
      
      <Alert variant="danger" size="lg" title="Large Alert">
        Prominent alert for critical messages that need attention.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert components in different sizes for various dashboard contexts and importance levels.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Stack gap="md" style={{ width: "400px" }}>
      <Alert
        variant="success"
        title="Backup Complete"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        }
      >
        Database backup completed successfully at 3:45 AM.
      </Alert>
      
      <Alert
        variant="warning"
        title="Resource Alert"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="m12 17 .01 0"></path>
          </svg>
        }
      >
        Disk space usage exceeded 75% threshold.
      </Alert>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alerts with custom icons to enhance visual communication of the message type.",
      },
    },
  },
};

export const MonitoringDashboard: Story = {
  render: function MonitoringDashboard() {
    const [alerts, setAlerts] = React.useState([
      {
        id: 1,
        variant: "danger" as const,
        title: "Critical: Database Connection",
        message: "Primary database connection lost. Failover initiated.",
        timestamp: "2 minutes ago"
      },
      {
        id: 2,
        variant: "warning" as const,
        title: "High CPU Usage",
        message: "CPU usage at 89% on server prod-web-01",
        timestamp: "5 minutes ago"
      },
      {
        id: 3,
        variant: "warning" as const,
        title: "Memory Usage Alert",
        message: "Memory usage approaching limit on multiple instances",
        timestamp: "8 minutes ago"
      },
      {
        id: 4,
        variant: "success" as const,
        title: "Service Restored",
        message: "Authentication service has been restored and is operating normally",
        timestamp: "15 minutes ago"
      }
    ]);

    const dismissAlert = (id: number) => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
      <Stack gap="lg" style={{ width: "500px" }}>
        <Heading level={3} size="sm">
          System Alerts & Notifications
        </Heading>
        
        <Card padding="md">
          <Stack gap="sm">
            {alerts.length === 0 ? (
              <Text color="subdued">No active alerts</Text>
            ) : (
              alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  variant={alert.variant}
                  title={alert.title}
                  dismissible
                  onDismiss={() => dismissAlert(alert.id)}
                >
                  <Stack gap="xs">
                    <Text>{alert.message}</Text>
                    <Text size="sm" color="subdued">{alert.timestamp}</Text>
                  </Stack>
                </Alert>
              ))
            )}
          </Stack>
        </Card>
        
        {alerts.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setAlerts([])}
          >
            Dismiss All Alerts
          </Button>
        )}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of using Alert components in a monitoring dashboard to show system alerts with timestamps and dismissal functionality.",
      },
    },
  },
};