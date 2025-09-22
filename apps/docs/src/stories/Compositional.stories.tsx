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
  title: "Examples/Compositional Design",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Compositional Design Examples

This demonstrates the transformation from bespoke components to compositional design following EUI principles.
Instead of creating specialized components like \`OrganizationCard\`, we compose interfaces from basic primitives.

## Key Principles

1. **Use structural primitives**: Stack, Inline, Card, Text, etc.
2. **Avoid bespoke components**: Don't create \`UserProfileCard\`, \`ProductInfoPanel\`, etc.
3. **Compose at usage site**: Build complex UIs by combining simple primitives
4. **Maximize reusability**: Each primitive can be used in countless contexts

## Benefits

- **Reduced bundle size**: Fewer components to maintain
- **Increased flexibility**: Compose any layout from primitives
- **Better consistency**: All spacing/colors come from design tokens
- **Easier maintenance**: Changes to primitives affect entire system
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data types for examples
interface Organization {
  id: string;
  name: string;
  description: string;
  plan: "free" | "pro" | "enterprise";
  memberCount: number;
  workspaceCount: number;
  storageUsed: number;
  storageLimit: number;
  createdAt: string;
}

const mockOrg: Organization = {
  id: "org-123",
  name: "Acme Corporation",
  description:
    "Building the future of digital experiences with cutting-edge technology and innovation.",
  plan: "enterprise",
  memberCount: 42,
  workspaceCount: 8,
  storageUsed: 15.7,
  storageLimit: 100,
  createdAt: "2023-01-15T10:30:00Z",
};

export const OrganizationInfo: Story = {
  render: () => (
    <Card padding="lg" shadow="md" style={{ maxWidth: "600px" }}>
      <Stack gap="lg">
        {/* Header Section */}
        <Stack gap="sm">
          <Inline justify="space-between" align="start">
            <Stack gap="xs">
              <Heading level={2} size="lg">
                {mockOrg.name}
              </Heading>
              <Inline gap="sm" align="center">
                <Badge
                  variant={mockOrg.plan === "enterprise" ? "success" : "info"}
                  filled
                  size="sm"
                >
                  {mockOrg.plan.toUpperCase()}
                </Badge>
                <Text size="sm" color="subdued">
                  Since {new Date(mockOrg.createdAt).getFullYear()}
                </Text>
              </Inline>
            </Stack>

            <Inline gap="sm">
              <Button variant="ghost" size="sm">
                Settings
              </Button>
              <Button variant="primary" size="sm">
                Upgrade
              </Button>
            </Inline>
          </Inline>

          <Text color="subdued">{mockOrg.description}</Text>
        </Stack>

        <Separator />

        {/* Metrics Section */}
        <Stack gap="md">
          <Text weight="semibold" size="sm" color="subdued">
            USAGE OVERVIEW
          </Text>

          <Inline gap="xl" wrap>
            <Stack gap="xs" align="center">
              <Text size="xl" weight="bold" color="accent">
                {mockOrg.memberCount}
              </Text>
              <Text size="sm" color="subdued">
                Team Members
              </Text>
            </Stack>

            <Stack gap="xs" align="center">
              <Text size="xl" weight="bold" color="accent">
                {mockOrg.workspaceCount}
              </Text>
              <Text size="sm" color="subdued">
                Workspaces
              </Text>
            </Stack>

            <Stack gap="xs" align="center">
              <Text size="xl" weight="bold" color="accent">
                {mockOrg.storageUsed}GB
              </Text>
              <Text size="sm" color="subdued">
                of {mockOrg.storageLimit}GB used
              </Text>
            </Stack>
          </Inline>

          {/* Progress Bar Composed from Primitives */}
          <Stack gap="xs">
            <Inline justify="space-between">
              <Text size="sm" weight="medium">
                Storage
              </Text>
              <Text size="sm" color="subdued">
                {Math.round((mockOrg.storageUsed / mockOrg.storageLimit) * 100)}
                % used
              </Text>
            </Inline>
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
                  width: `${(mockOrg.storageUsed / mockOrg.storageLimit) * 100}%`,
                  height: "100%",
                  backgroundColor: "var(--freeui-color-brand-500)",
                  borderRadius: "var(--freeui-border-radius-full)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </Stack>
        </Stack>

        <Separator />

        {/* Actions Section */}
        <Inline gap="sm" justify="end">
          <Button variant="outline" size="sm">
            View Analytics
          </Button>
          <Button variant="outline" size="sm">
            Manage Team
          </Button>
          <Button variant="primary" size="sm">
            Create Workspace
          </Button>
        </Inline>
      </Stack>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Organization information composed from primitives instead of a bespoke \`OrganizationCard\` component.

**Composed from:**
- Card (container)
- Stack (vertical layout)
- Inline (horizontal layout)
- Heading (title)
- Text (descriptions and values)
- Badge (plan indicator)
- Button (actions)
- Separator (visual dividers)

This approach enables infinite variations while maintaining consistency.
        `,
      },
    },
  },
};

export const UserProfile: Story = {
  render: () => (
    <Card padding="md" shadow="sm" style={{ maxWidth: "400px" }}>
      <Stack gap="md">
        <Inline gap="md" align="center">
          {/* Avatar placeholder */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--freeui-color-brand-100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Text weight="semibold" color="accent">
              JD
            </Text>
          </div>

          <Stack gap="xs">
            <Text weight="semibold">John Doe</Text>
            <Text size="sm" color="subdued" as="code">
              john.doe@acme.com
            </Text>
            <Inline gap="xs">
              <Badge variant="success" size="sm">
                Active
              </Badge>
              <Badge variant="neutral" size="sm">
                Admin
              </Badge>
            </Inline>
          </Stack>
        </Inline>

        <Separator />

        <Stack gap="sm">
          <Inline justify="space-between" align="center">
            <Text size="sm" weight="medium">
              Last Login
            </Text>
            <Text size="sm" color="subdued">
              2 hours ago
            </Text>
          </Inline>

          <Inline justify="space-between" align="center">
            <Text size="sm" weight="medium">
              Workspaces
            </Text>
            <Text size="sm" color="subdued">
              3 active
            </Text>
          </Inline>

          <Inline justify="space-between" align="center">
            <Text size="sm" weight="medium">
              Role
            </Text>
            <Text size="sm" color="subdued">
              Organization Admin
            </Text>
          </Inline>
        </Stack>

        <Inline gap="sm" justify="end">
          <Button variant="ghost" size="sm">
            Message
          </Button>
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </Inline>
      </Stack>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: `
User profile composed from the same primitives, showing how the compositional approach
enables diverse layouts without creating specialized components.
        `,
      },
    },
  },
};

export const NotificationPanel: Story = {
  render: () => (
    <Card padding="md" shadow="sm" style={{ maxWidth: "450px" }}>
      <Stack gap="md">
        <Inline justify="space-between" align="center">
          <Heading level={3} size="sm">
            Recent Activity
          </Heading>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Inline>

        <Stack gap="sm">
          {[
            {
              type: "success",
              title: "Deployment successful",
              desc: "Production environment updated",
              time: "5 min ago",
            },
            {
              type: "info",
              title: "New team member",
              desc: "Sarah Chen joined the workspace",
              time: "2 hours ago",
            },
            {
              type: "warning",
              title: "Storage limit warning",
              desc: "85% of storage quota used",
              time: "1 day ago",
            },
          ].map((notification, index) => (
            <Stack key={index} gap="xs">
              <Inline gap="sm" align="start">
                <Badge
                  variant={notification.type as "success" | "info" | "warning"}
                  size="sm"
                  style={{ marginTop: "2px", flexShrink: 0 }}
                >
                  •
                </Badge>
                <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                  <Text weight="medium" size="sm">
                    {notification.title}
                  </Text>
                  <Text size="sm" color="subdued">
                    {notification.desc}
                  </Text>
                  <Text size="xs" color="subdued">
                    {notification.time}
                  </Text>
                </Stack>
              </Inline>
              {index < 2 && <Separator margin="xs" />}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Activity feed composed from primitives, demonstrating how complex data layouts
can be built without specialized list or notification components.
        `,
      },
    },
  },
};
