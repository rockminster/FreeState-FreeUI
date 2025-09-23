import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  FilterPanel,
  FilterGroup,
  FilterField,
  ExportMenu,
  ExportButton,
  ActivityList,
  ActivityItem,
  Input,
  Button,
  Badge,
  Stack,
  Inline,
  Heading,
} from "@rockminster/react";

const meta: Meta<typeof FilterPanel> = {
  title: "Data Components/Data Components",
  component: FilterPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Data Components provide structured interfaces for displaying and interacting with data. These components focus on data filtering, exporting, and activity tracking.

## Components

- **FilterPanel**: Container for grouping filter controls
- **ExportMenu/ExportButton**: Data export functionality
- **ActivityList**: Display of chronological activities

## Composition Philosophy

These components work together to create comprehensive data management interfaces while maintaining the design system's compositional approach.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

const FilteringInterfaceDemo = () => {
  const [filters, setFilters] = React.useState({
    user: "",
    dateFrom: "",
    dateTo: "",
    eventType: "",
  });

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--freeui-color-neutral-50)",
      }}
    >
      <Stack gap="lg">
        <FilterPanel
          title="Filter Events"
          actions={
            <Inline gap="sm">
              <Button variant="ghost" size="sm">
                Clear
              </Button>
              <Button variant="primary" size="sm">
                Apply Filters
              </Button>
            </Inline>
          }
        >
          <FilterGroup title="Basic Filters">
            <FilterField label="User">
              <Input
                placeholder="Filter by user..."
                value={filters.user}
                onChange={(e) =>
                  setFilters({ ...filters, user: e.target.value })
                }
              />
            </FilterField>

            <Inline gap="md">
              <FilterField label="From Date">
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                />
              </FilterField>

              <FilterField label="To Date">
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                />
              </FilterField>
            </Inline>

            <FilterField label="Event Type">
              <Input
                placeholder="Select event type..."
                value={filters.eventType}
                onChange={(e) =>
                  setFilters({ ...filters, eventType: e.target.value })
                }
              />
            </FilterField>
          </FilterGroup>

          <FilterGroup title="Export Options">
            <Inline gap="sm">
              <ExportButton
                format="csv"
                onExport={() => alert("Exporting CSV...")}
              />
              <ExportButton
                format="json"
                onExport={() => alert("Exporting JSON...")}
              />
              <ExportMenu
                options={[
                  { format: "csv", label: "CSV File" },
                  { format: "json", label: "JSON File" },
                  { format: "pdf", label: "PDF Report" },
                ]}
                onExport={(format) => alert(`Exporting ${format}...`)}
              />
            </Inline>
          </FilterGroup>
        </FilterPanel>

        {/* Sample data display */}
        <Stack gap="md">
          <Heading level={3}>Filtered Results</Heading>
          <ActivityList>
            <ActivityItem
              title="User login"
              description="User authentication successful"
              timestamp="2 hours ago"
              actor="john.doe@example.com"
              status="success"
              indicator="🔓"
              metadata={<Badge variant="success">Success</Badge>}
            />
            <ActivityItem
              title="File upload"
              description="Document.pdf uploaded to project folder"
              timestamp="1 hour ago"
              actor="jane.smith@example.com"
              status="info"
              indicator="📄"
              metadata={<Badge variant="info">Upload</Badge>}
            />
            <ActivityItem
              title="Permission change"
              description="User role updated to administrator"
              timestamp="30 minutes ago"
              actor="admin@example.com"
              status="warning"
              indicator="⚠️"
              metadata={<Badge variant="warning">Admin</Badge>}
            />
          </ActivityList>
        </Stack>
      </Stack>
    </div>
  );
};

export const Default: Story = {
  render: () => <FilteringInterfaceDemo />,
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates a complete data management interface using FilterPanel, FilterGroup, FilterField, ExportMenu, and ActivityList components. Users can filter data and export results in different formats.
        `,
      },
    },
  },
};

export const ExportOptions: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Stack gap="lg">
        <Heading level={3}>Export Components</Heading>

        <div>
          <h4>Single Export Button</h4>
          <Inline gap="sm">
            <ExportButton
              format="csv"
              onExport={() => alert("Exporting CSV...")}
            />
            <ExportButton
              format="json"
              onExport={() => alert("Exporting JSON...")}
            />
            <ExportButton
              format="pdf"
              onExport={() => alert("Exporting PDF...")}
            />
          </Inline>
        </div>

        <div>
          <h4>Export Menu</h4>
          <ExportMenu
            options={[
              { format: "csv", label: "CSV File" },
              { format: "json", label: "JSON Data" },
              { format: "pdf", label: "PDF Report" },
              { format: "xlsx", label: "Excel Spreadsheet" },
            ]}
            onExport={(format) => alert(`Exporting ${format.toUpperCase()}...`)}
          />
        </div>
      </Stack>
    </div>
  ),
};

export const ActivityFeed: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Stack gap="md">
        <Heading level={3}>Activity Feed</Heading>
        <ActivityList>
          <ActivityItem
            title="System backup completed"
            description="Weekly backup process finished successfully"
            timestamp="5 minutes ago"
            actor="system"
            status="success"
            indicator="💾"
            metadata={<Badge variant="success">Automated</Badge>}
          />
          <ActivityItem
            title="New user registration"
            description="User created account and verified email"
            timestamp="15 minutes ago"
            actor="sarah.connor@example.com"
            status="info"
            indicator="👤"
            metadata={<Badge variant="info">New User</Badge>}
          />
          <ActivityItem
            title="Failed login attempt"
            description="Multiple failed authentication attempts detected"
            timestamp="1 hour ago"
            actor="unknown.user@suspicious.com"
            status="error"
            indicator="🚨"
            metadata={<Badge variant="danger">Security</Badge>}
          />
          <ActivityItem
            title="Configuration updated"
            description="System settings modified by administrator"
            timestamp="2 hours ago"
            actor="admin@example.com"
            status="warning"
            indicator="⚙️"
            metadata={<Badge variant="warning">Config</Badge>}
            clickable
            onClick={() => alert("View configuration details")}
          />
        </ActivityList>
      </Stack>
    </div>
  ),
};
