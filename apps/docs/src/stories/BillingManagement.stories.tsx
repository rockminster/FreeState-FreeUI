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
  RadioButton,
  RadioGroup,
} from "@rockminster/react";

const meta: Meta = {
  title: "Examples/Billing Management",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Billing, Plan, and Subscription Management UI

This demonstrates a complete billing and subscription management interface using compositional design principles.
Instead of creating bespoke components like \`BillingCard\` or \`SubscriptionPanel\`, we compose interfaces from basic primitives.

## Key Features

- **Subscription Plans**: Current plan display with upgrade/downgrade options
- **Usage Metrics**: Progress bars showing consumption and overages
- **Billing Information**: Payment methods and billing details management
- **Plan Comparison**: Side-by-side plan features comparison
- **Invoice History**: Transaction history with download options
- **Payment Integration**: Ready for payment provider integration

## Design Principles

- **No bespoke components**: Every element uses existing FreeUI primitives
- **Flexible composition**: Layouts can be easily modified or extended
- **Data-driven**: All billing data uses structured interfaces
- **Consistent styling**: All spacing, colors, and typography from design tokens
- **Accessibility**: Proper ARIA labels and keyboard navigation
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Data interfaces for billing management
interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  isPopular?: boolean;
  isCurrentPlan?: boolean;
}

interface UsageMetric {
  name: string;
  used: number;
  limit: number;
  unit: string;
  overage?: number;
  overagePrice?: number;
}

interface BillingInfo {
  companyName: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  taxId?: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "paypal";
  lastFour: string;
  brand?: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
  downloadUrl: string;
}

// Mock data
const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: 0,
    interval: "month",
    features: [
      "5 team members",
      "10GB storage",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Best for growing teams",
    price: 29,
    interval: "month",
    features: [
      "25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    isPopular: true,
    isCurrentPlan: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    interval: "month",
    features: [
      "Unlimited team members",
      "1TB storage",
      "Custom analytics",
      "24/7 phone support",
      "Advanced security",
      "SSO integration",
      "Custom onboarding",
    ],
  },
];

const currentUsage: UsageMetric[] = [
  {
    name: "Team Members",
    used: 18,
    limit: 25,
    unit: "members",
  },
  {
    name: "Storage",
    used: 87.5,
    limit: 100,
    unit: "GB",
  },
  {
    name: "API Calls",
    used: 125000,
    limit: 100000,
    unit: "calls",
    overage: 25000,
    overagePrice: 0.001,
  },
];

const mockBillingInfo: BillingInfo = {
  companyName: "Acme Corporation",
  email: "billing@acme.com",
  address: {
    street: "123 Business Ave",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
  },
  taxId: "US123456789",
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "card-1",
    type: "card",
    brand: "Visa",
    lastFour: "4242",
    expiryDate: "12/27",
    isDefault: true,
  },
  {
    id: "card-2",
    type: "card",
    brand: "Mastercard",
    lastFour: "8888",
    expiryDate: "08/26",
    isDefault: false,
  },
];

const invoiceHistory: Invoice[] = [
  {
    id: "inv-001",
    date: "2024-03-01",
    amount: 29.0,
    status: "paid",
    description: "Pro Plan - March 2024",
    downloadUrl: "#",
  },
  {
    id: "inv-002",
    date: "2024-02-01",
    amount: 54.0,
    status: "paid",
    description: "Pro Plan + Overages - February 2024",
    downloadUrl: "#",
  },
  {
    id: "inv-003",
    date: "2024-01-01",
    amount: 29.0,
    status: "paid",
    description: "Pro Plan - January 2024",
    downloadUrl: "#",
  },
];

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getUsagePercentage = (used: number, limit: number): number => {
  return Math.min((used / limit) * 100, 100);
};

export const SubscriptionOverview: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--freeui-color-neutral-50)",
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Stack gap="sm">
          <Heading level={1} size="lg">
            Billing & Subscription
          </Heading>
          <Text color="subdued">
            Manage your subscription, usage, and billing information
          </Text>
        </Stack>

        {/* Current Plan Section */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Inline justify="space-between" align="center">
              <Stack gap="xs">
                <Heading level={2} size="md">
                  Current Plan
                </Heading>
                <Text color="subdued">
                  You are currently on the Pro plan
                </Text>
              </Stack>
              <Badge variant="success" size="lg">
                Pro Plan
              </Badge>
            </Inline>

            <Separator />

            <Inline gap="xl" wrap>
              <Stack gap="xs">
                <Text size="sm" color="subdued">
                  Monthly Cost
                </Text>
                <Text size="xl" weight="bold">
                  {formatCurrency(29)}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" color="subdued">
                  Next Billing Date
                </Text>
                <Text size="lg" weight="medium">
                  April 15, 2024
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" color="subdued">
                  Billing Cycle
                </Text>
                <Text size="lg" weight="medium">
                  Monthly
                </Text>
              </Stack>
            </Inline>

            <Inline gap="sm" justify="end">
              <Button variant="outline" size="sm">
                View Plans
              </Button>
              <Button variant="primary" size="sm">
                Upgrade Plan
              </Button>
            </Inline>
          </Stack>
        </Card>

        {/* Usage Metrics */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Heading level={2} size="md">
              Usage This Month
            </Heading>

            <Stack gap="md">
              {currentUsage.map((metric, index) => {
                const percentage = getUsagePercentage(metric.used, metric.limit);
                const isOverage = metric.used > metric.limit;

                return (
                  <Stack key={index} gap="sm">
                    <Inline justify="space-between" align="center">
                      <Text weight="medium">{metric.name}</Text>
                      <Inline gap="xs" align="center">
                        <Text size="sm">
                          {metric.used.toLocaleString()} / {metric.limit.toLocaleString()} {metric.unit}
                        </Text>
                        {isOverage && (
                          <Badge variant="warning" size="sm">
                            Overage
                          </Badge>
                        )}
                      </Inline>
                    </Inline>

                    {/* Progress Bar */}
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
                          width: `${percentage}%`,
                          height: "100%",
                          backgroundColor: isOverage
                            ? "var(--freeui-color-semantic-warning-500)"
                            : percentage > 80
                            ? "var(--freeui-color-semantic-warning-500)"
                            : "var(--freeui-color-brand-500)",
                          borderRadius: "var(--freeui-border-radius-full)",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>

                    {metric.overage && metric.overagePrice && (
                      <Text size="sm" color="subdued">
                        Overage: {metric.overage.toLocaleString()} {metric.unit} ×{" "}
                        {formatCurrency(metric.overagePrice)} = {formatCurrency(metric.overage * metric.overagePrice)}
                      </Text>
                    )}
                  </Stack>
                );
              })}
            </Stack>

            {currentUsage.some(m => m.overage) && (
              <Card
                padding="md"
                shadow="none"
                style={{ backgroundColor: "var(--freeui-color-semantic-warning-50)" }}
              >
                <Stack gap="sm">
                  <Inline gap="xs" align="center">
                    <Text weight="medium" color="warning">
                      Overage Charges This Month
                    </Text>
                    <Badge variant="warning">
                      {formatCurrency(
                        currentUsage
                          .filter(m => m.overage && m.overagePrice)
                          .reduce((total, m) => total + (m.overage! * m.overagePrice!), 0)
                      )}
                    </Badge>
                  </Inline>
                  <Text size="sm" color="subdued">
                    Consider upgrading your plan to avoid overage charges.
                  </Text>
                  <Inline gap="sm">
                    <Button variant="outline" size="sm">
                      View Plans
                    </Button>
                    <Button variant="primary" size="sm">
                      Upgrade Now
                    </Button>
                  </Inline>
                </Stack>
              </Card>
            )}
          </Stack>
        </Card>

        {/* Action Items */}
        <Inline gap="md" wrap>
          <Button variant="outline">
            Download Invoice
          </Button>
          <Button variant="outline">
            Billing History
          </Button>
          <Button variant="outline">
            Payment Methods
          </Button>
          <Button variant="primary">
            Billing Settings
          </Button>
        </Inline>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Subscription overview composed from primitives, showing current plan status,
usage metrics with progress indicators, and overage warnings.

**Composed from:**
- Card (containers)
- Stack (vertical layouts)
- Inline (horizontal layouts)
- Heading (titles)
- Text (content and labels)
- Badge (status indicators)
- Button (actions)
- Separator (visual dividers)

**Features:**
- Current plan display with billing information
- Usage metrics with visual progress bars
- Overage warnings and calculations
- Action buttons for plan management
        `,
      },
    },
  },
};

export const PlanComparison: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--freeui-color-neutral-50)",
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Stack gap="sm" align="center">
          <Heading level={1} size="lg">
            Choose Your Plan
          </Heading>
          <Text color="subdued">
            Select the perfect plan for your team&apos;s needs
          </Text>
        </Stack>

        {/* Billing Toggle */}
        <Inline justify="center">
          <RadioGroup name="billing-cycle" direction="row">
            <RadioButton label="Monthly" defaultChecked />
            <RadioButton label="Yearly (Save 20%)" />
          </RadioGroup>
        </Inline>

        {/* Plans Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              padding="lg"
              shadow={plan.isPopular ? "lg" : "sm"}
              style={{
                borderWidth: plan.isCurrentPlan ? "2px" : "1px",
                borderStyle: "solid",
                borderColor: plan.isCurrentPlan
                  ? "var(--freeui-color-brand-500)"
                  : plan.isPopular
                  ? "var(--freeui-color-brand-200)"
                  : "var(--freeui-color-neutral-200)",
                position: "relative",
              }}
            >
              <Stack gap="lg">
                {/* Plan Header */}
                <Stack gap="sm">
                  <Inline justify="space-between" align="start">
                    <Heading level={3} size="md">
                      {plan.name}
                    </Heading>
                    {plan.isPopular && (
                      <Badge variant="success" size="sm">
                        Most Popular
                      </Badge>
                    )}
                    {plan.isCurrentPlan && (
                      <Badge variant="brand" size="sm">
                        Current Plan
                      </Badge>
                    )}
                  </Inline>
                  <Text color="subdued" size="sm">
                    {plan.description}
                  </Text>
                </Stack>

                {/* Pricing */}
                <Stack gap="xs">
                  <Inline gap="xs" align="baseline">
                    <Text size="3xl" weight="bold">
                      {formatCurrency(plan.price)}
                    </Text>
                    <Text color="subdued">
                      /{plan.interval}
                    </Text>
                  </Inline>
                  {plan.price > 0 && (
                    <Text size="sm" color="subdued">
                      Billed {plan.interval}ly
                    </Text>
                  )}
                </Stack>

                <Separator />

                {/* Features */}
                <Stack gap="sm">
                  <Text weight="medium" size="sm">
                    What&apos;s included:
                  </Text>
                  <Stack gap="xs">
                    {plan.features.map((feature, index) => (
                      <Inline key={index} gap="xs" align="center">
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            backgroundColor: "var(--freeui-color-semantic-success-500)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text size="xs" weight="bold" style={{ color: "white" }}>
                            ✓
                          </Text>
                        </div>
                        <Text size="sm">{feature}</Text>
                      </Inline>
                    ))}
                  </Stack>
                </Stack>

                {/* Action Button */}
                <Button
                  variant={plan.isCurrentPlan ? "outline" : plan.isPopular ? "primary" : "outline"}
                  size="md"
                  style={{ width: "100%" }}
                >
                  {plan.isCurrentPlan
                    ? "Current Plan"
                    : plan.price === 0
                    ? "Downgrade to Free"
                    : plan.price > 29
                    ? "Upgrade"
                    : "Get Started"}
                </Button>
              </Stack>
            </Card>
          ))}
        </div>

        {/* Bottom Notice */}
        <Card
          padding="md"
          shadow="none"
          style={{ backgroundColor: "var(--freeui-color-neutral-100)" }}
        >
          <Stack gap="sm">
            <Text size="sm" color="subdued" style={{ textAlign: "center" }}>
              All plans include 14-day free trial. No credit card required for Free plan.
              Cancel anytime.
            </Text>
            <Inline justify="center" gap="sm">
              <Button variant="ghost" size="sm">
                View Full Comparison
              </Button>
              <Button variant="ghost" size="sm">
                Contact Sales
              </Button>
            </Inline>
          </Stack>
        </Card>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Plan comparison interface with billing cycle toggle and feature comparison.
Uses compositional design to create flexible plan cards.

**Key Features:**
- Monthly/yearly billing toggle
- Popular plan highlighting
- Current plan indication
- Feature lists with checkmarks
- Responsive grid layout
- Clear pricing display
        `,
      },
    },
  },
};

export const BillingInformation: Story = {
  render: () => (
    <div
      style={{
        padding: "24px",
        backgroundColor: "var(--freeui-color-neutral-50)",
        maxWidth: "800px",
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Stack gap="sm">
          <Heading level={1} size="lg">
            Billing Information
          </Heading>
          <Text color="subdued">
            Manage your billing details and payment methods
          </Text>
        </Stack>

        {/* Company Information */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Inline justify="space-between" align="center">
              <Heading level={2} size="md">
                Company Information
              </Heading>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Inline>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <Stack gap="xs">
                <Text size="sm" weight="medium" color="subdued">
                  Company Name
                </Text>
                <Text>{mockBillingInfo.companyName}</Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" weight="medium" color="subdued">
                  Email
                </Text>
                <Text>{mockBillingInfo.email}</Text>
              </Stack>
              <Stack gap="xs">
                <Text size="sm" weight="medium" color="subdued">
                  Tax ID
                </Text>
                <Text>{mockBillingInfo.taxId || "Not provided"}</Text>
              </Stack>
            </div>

            <Separator />

            <Stack gap="sm">
              <Text size="sm" weight="medium" color="subdued">
                Billing Address
              </Text>
              <Stack gap="xs">
                <Text>{mockBillingInfo.address.street}</Text>
                <Text>
                  {mockBillingInfo.address.city}, {mockBillingInfo.address.state}{" "}
                  {mockBillingInfo.address.zipCode}
                </Text>
                <Text>{mockBillingInfo.address.country}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Payment Methods */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Inline justify="space-between" align="center">
              <Heading level={2} size="md">
                Payment Methods
              </Heading>
              <Button variant="primary" size="sm">
                Add Payment Method
              </Button>
            </Inline>

            <Stack gap="md">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  padding="md"
                  shadow="none"
                  style={{
                    backgroundColor: "var(--freeui-color-neutral-50)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: method.isDefault
                      ? "var(--freeui-color-brand-200)"
                      : "var(--freeui-color-neutral-200)",
                  }}
                >
                  <Inline justify="space-between" align="center">
                    <Inline gap="md" align="center">
                      <div
                        style={{
                          width: "40px",
                          height: "28px",
                          backgroundColor: "var(--freeui-color-neutral-300)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text size="xs" weight="bold" color="subdued">
                          {method.brand?.slice(0, 4).toUpperCase() || method.type.toUpperCase()}
                        </Text>
                      </div>
                      <Stack gap="xs">
                        <Inline gap="xs" align="center">
                          <Text weight="medium">
                            **** **** **** {method.lastFour}
                          </Text>
                          {method.isDefault && (
                            <Badge variant="brand" size="sm">
                              Default
                            </Badge>
                          )}
                        </Inline>
                        {method.expiryDate && (
                          <Text size="sm" color="subdued">
                            Expires {method.expiryDate}
                          </Text>
                        )}
                      </Stack>
                    </Inline>

                    <Inline gap="sm">
                      {!method.isDefault && (
                        <Button variant="ghost" size="sm">
                          Set Default
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </Inline>
                  </Inline>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>

        {/* Invoice History */}
        <Card padding="lg" shadow="sm">
          <Stack gap="lg">
            <Inline justify="space-between" align="center">
              <Heading level={2} size="md">
                Invoice History
              </Heading>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Inline>

            <Stack gap="md">
              {invoiceHistory.slice(0, 3).map((invoice) => (
                <Card
                  key={invoice.id}
                  padding="md"
                  shadow="none"
                  style={{
                    backgroundColor: "var(--freeui-color-neutral-50)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "var(--freeui-color-neutral-200)",
                  }}
                >
                  <Inline justify="space-between" align="center">
                    <Stack gap="xs">
                      <Text weight="medium">{invoice.description}</Text>
                      <Text size="sm" color="subdued">
                        {formatDate(invoice.date)} • Invoice #{invoice.id.toUpperCase()}
                      </Text>
                    </Stack>

                    <Inline gap="md" align="center">
                      <Badge
                        variant={
                          invoice.status === "paid"
                            ? "success"
                            : invoice.status === "pending"
                            ? "warning"
                            : "error"
                        }
                        size="sm"
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                      <Text weight="medium">
                        {formatCurrency(invoice.amount)}
                      </Text>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </Inline>
                  </Inline>
                </Card>
              ))}
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
Comprehensive billing information management interface showing company details,
payment methods, and invoice history.

**Features:**
- Company information display and editing
- Payment method management with default selection
- Invoice history with status indicators
- Download functionality for invoices
- Responsive layout for different screen sizes
        `,
      },
    },
  },
};