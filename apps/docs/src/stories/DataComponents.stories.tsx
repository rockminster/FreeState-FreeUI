import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Timeline,
  TimelineItem,
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

const meta: Meta<typeof Timeline> = {
  title: "Data Components/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Timeline component provides a visual representation of chronological events. It's a reusable component that can be used to build audit trails, activity feeds, process flows, and more.

## Features

- **Flexible Content**: Accepts any content within TimelineItem components
- **Visual Indicators**: Customizable icons and status variants
- **Accessibility**: Proper ARIA roles and semantic structure
- **Responsive**: Works across different screen sizes
- **Composable**: Can be combined with other components for rich displays

## Use Cases

- Audit trails and activity logs
- Process flows and workflows
- Historical data display
- Event chronologies
- Status updates and notifications
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem icon="📝">
        <Stack gap="xs">
          <Heading level={4} size="sm">
            Document Updated
          </Heading>
          <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
            Project requirements document was updated with new specifications
          </p>
          <div style={{ fontSize: "var(--freeui-font-size-xs)", color: "var(--freeui-color-neutral-500)" }}>
            2 hours ago by Sarah Chen
          </div>
        </Stack>
      </TimelineItem>
      
      <TimelineItem icon="✅" variant="success">
        <Stack gap="xs">
          <Heading level={4} size="sm">
            Review Completed
          </Heading>
          <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
            Code review was completed and approved by the team lead
          </p>
          <div style={{ fontSize: "var(--freeui-font-size-xs)", color: "var(--freeui-color-neutral-500)" }}>
            4 hours ago by Mike Wilson
          </div>
        </Stack>
      </TimelineItem>
      
      <TimelineItem icon="🚀" variant="info" isLast>
        <Stack gap="xs">
          <Heading level={4} size="sm">
            Deployment Started
          </Heading>
          <p style={{ margin: 0, color: "var(--freeui-color-neutral-600)" }}>
            Production deployment initiated for version 2.1.0
          </p>
          <div style={{ fontSize: "var(--freeui-font-size-xs)", color: "var(--freeui-color-neutral-500)" }}>
            6 hours ago by Deploy Bot
          </div>
        </Stack>
      </TimelineItem>
    </Timeline>
  ),
};

export const ActivityFeed: Story = {
  render: () => (
    <div style={{ padding: "24px", backgroundColor: "var(--freeui-color-neutral-50)" }}>
      <Stack gap="lg">
        <Heading level={2}>Recent Activity</Heading>
        
        <ActivityList dividers>
          <ActivityItem
            title="Permission Updated"
            description="User role changed from Viewer to Editor for workspace access"
            timestamp="2 min ago"
            actor="admin@company.com"
            status="info"
            indicator={<Badge variant="info" size="sm">PERM</Badge>}
            metadata={
              <Inline gap="xs">
                <Badge variant="neutral" size="sm">workspace: production</Badge>
                <Badge variant="neutral" size="sm">role: editor</Badge>
              </Inline>
            }
          />
          
          <ActivityItem
            title="State File Modified"
            description="Terraform state updated with new infrastructure changes"
            timestamp="15 min ago"
            actor="sarah.chen@company.com"
            status="success"
            indicator={<Badge variant="success" size="sm">STATE</Badge>}
            metadata={
              <Inline gap="xs">
                <Badge variant="neutral" size="sm">environment: staging</Badge>
                <Badge variant="neutral" size="sm">resources: +3</Badge>
              </Inline>
            }
          />
          
          <ActivityItem
            title="API Key Rotated"
            description="Scheduled rotation of production API key completed successfully"
            timestamp="1 hour ago"
            actor="system"
            status="warning"
            indicator={<Badge variant="warning" size="sm">API</Badge>}
            metadata={
              <Badge variant="neutral" size="sm">key: prod_api_2024</Badge>
            }
          />
          
          <ActivityItem
            title="Login Failed"
            description="Multiple failed login attempts detected from unusual location"
            timestamp="2 hours ago"
            actor="security.monitor"
            status="error"
            indicator={<Badge variant="danger" size="sm">SEC</Badge>}
            metadata={
              <Inline gap="xs">
                <Badge variant="danger" size="sm">attempts: 5</Badge>
                <Badge variant="neutral" size="sm">ip: 203.0.113.45</Badge>
              </Inline>
            }
          />
        </ActivityList>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This example shows how to combine Timeline, ActivityList, and ActivityItem components to create a comprehensive activity feed. Each activity includes relevant metadata displayed as badges.
        `,
      },
    },
  },
};

export const FilteringInterface: Story = {
  render: () => {
    const [filters, setFilters] = React.useState({
      user: "",
      dateFrom: "",
      dateTo: "",
      eventType: ""
    });

    return (
      <div style={{ padding: "24px", backgroundColor: "var(--freeui-color-neutral-50)" }}>
        <Stack gap="lg">
          <FilterPanel
            title="Filter Events"
            actions={
              <Inline gap="sm">
                <Button variant="ghost" size="sm">Clear</Button>
                <Button variant="primary" size="sm">Apply Filters</Button>
              </Inline>
            }
          >
            <FilterGroup title="Basic Filters">
              <FilterField label="User">
                <Input 
                  placeholder="Enter username or email..."
                  value={filters.user}
                  onChange={(e) => setFilters({...filters, user: e.target.value})}
                />
              </FilterField>
              
              <FilterField label="Event Type">
                <select 
                  value={filters.eventType}
                  onChange={(e) => setFilters({...filters, eventType: e.target.value})}
                  style={{
                    padding: "var(--freeui-spacing-2) var(--freeui-spacing-3)",
                    border: "1px solid var(--freeui-color-neutral-300)",
                    borderRadius: "var(--freeui-border-radius-md)",
                    fontSize: "var(--freeui-font-size-sm)",
                    backgroundColor: "var(--freeui-color-white)",
                    width: "100%"
                  }}
                >
                  <option value="">All Events</option>
                  <option value="state_change">State Changes</option>
                  <option value="permission_change">Permission Changes</option>
                  <option value="api_key_event">API Key Events</option>
                  <option value="login">Login Events</option>
                </select>
              </FilterField>
            </FilterGroup>
            
            <FilterGroup title="Date Range" collapsible>
              <FilterField label="From Date">
                <Input 
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </FilterField>
              
              <FilterField label="To Date">
                <Input 
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </FilterField>
            </FilterGroup>
          </FilterPanel>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Heading level={3}>Filtered Results</Heading>
            <Inline gap="sm">
              <ExportButton
                format="csv"
                onExport={() => console.log("Exporting CSV...")}
              />
              <ExportMenu
                options={[
                  { value: "csv", label: "CSV", description: "Comma-separated values for spreadsheets" },
                  { value: "json", label: "JSON", description: "Structured data format" },
                  { value: "pdf", label: "PDF", description: "Printable document format" }
                ]}
                onExport={(format) => console.log(`Exporting ${format}...`)}
              />
            </Inline>
          </div>
          
          <ActivityList>
            <ActivityItem
              title="Filtered Event 1"
              description="This event matches the current filter criteria"
              timestamp="1 hour ago"
              actor="user@example.com"
              indicator={<Badge variant="info" size="sm">INFO</Badge>}
            />
            <ActivityItem
              title="Filtered Event 2"
              description="Another event that meets the filter requirements"
              timestamp="3 hours ago"
              actor="another.user@example.com"
              indicator={<Badge variant="success" size="sm">OK</Badge>}
            />
          </ActivityList>
        </Stack>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates a complete filtering interface using FilterPanel, FilterGroup, FilterField, and ExportMenu components. Users can filter data and export results in different formats.
        `,
      },
    },
  },
};

export const TimelineVariants: Story = {
  render: () => (
    <div style={{ padding: "24px" }}>
      <Stack gap="xl">
        <div>
          <Heading level={3} style={{ marginBottom: "var(--freeui-spacing-4)" }}>
            Timeline with Status Variants
          </Heading>
          <Timeline>
            <TimelineItem variant="success" icon="✅">
              <Stack gap="xs">
                <strong>Success Event</strong>
                <span>Operation completed successfully</span>
              </Stack>
            </TimelineItem>
            
            <TimelineItem variant="warning" icon="⚠️">
              <Stack gap="xs">
                <strong>Warning Event</strong>
                <span>Potential issue detected</span>
              </Stack>
            </TimelineItem>
            
            <TimelineItem variant="error" icon="❌">
              <Stack gap="xs">
                <strong>Error Event</strong>
                <span>Operation failed</span>
              </Stack>
            </TimelineItem>
            
            <TimelineItem variant="info" icon="ℹ️" isLast>
              <Stack gap="xs">
                <strong>Info Event</strong>
                <span>Informational message</span>
              </Stack>
            </TimelineItem>
          </Timeline>
        </div>
      </Stack>
    </div>
  ),
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
              variant="outline"
            />
            <ExportButton
              format="pdf"
              onExport={() => alert("Exporting PDF...")}
              loading
            />
          </Inline>
        </div>
        
        <div>
          <h4>Export Menu with Options</h4>
          <ExportMenu
            options={[
              { 
                value: "csv", 
                label: "CSV Format", 
                description: "Comma-separated values for Excel and other spreadsheet applications" 
              },
              { 
                value: "json", 
                label: "JSON Format", 
                description: "Structured data format for API consumption and data processing" 
              },
              { 
                value: "xml", 
                label: "XML Format", 
                description: "Extensible markup language for enterprise systems",
                disabled: true
              },
              { 
                value: "pdf", 
                label: "PDF Document", 
                description: "Portable document format for reports and archival" 
              }
            ]}
            onExport={(format) => alert(`Exporting ${format}...`)}
            placement="bottom-start"
          />
        </div>
      </Stack>
    </div>
  ),
};