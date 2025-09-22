import type { Meta, StoryObj } from "@storybook/react";
import { ApiKeyForm, ApiKeyFormData } from "@rockminster/react";

const mockAvailableScopes = [
  "read",
  "write",
  "admin",
  "delete",
  "user:read",
  "user:write",
  "analytics:read",
  "billing:read",
  "billing:write",
];

const meta: Meta<typeof ApiKeyForm> = {
  title: "Authentication/ApiKeyForm",
  component: ApiKeyForm,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The ApiKeyForm component provides a comprehensive form for creating new API keys with security configurations.

## Features
- **Key naming**: Human-readable names and descriptions
- **Permission scopes**: Granular permission selection with checkboxes
- **Expiration settings**: Optional expiration date configuration
- **IP restrictions**: Multi-line IP address and CIDR block input
- **Rate limiting**: Configurable requests per minute and burst size
- **Form validation**: Real-time validation with error messages
- **Loading states**: Proper feedback during form submission
- **Accessibility**: Full keyboard navigation and screen reader support

## Security Features
- Required permission selection prevents overly broad access
- IP restriction support for enhanced security
- Rate limiting configuration to prevent abuse
- Form validation ensures proper input formatting
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    availableScopes: {
      description: "Available permission scopes for selection",
      control: false,
    },
    onFormSubmit: {
      description: "Callback when form is submitted",
      action: "form submitted",
    },
    loading: {
      description: "Whether form is submitting",
      control: "boolean",
    },
    errors: {
      description: "Form validation errors",
      control: "object",
    },
    initialValues: {
      description: "Initial form values for editing",
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApiKeyForm>;

export const Default: Story = {
  args: {
    availableScopes: mockAvailableScopes,
    onFormSubmit: (formData: ApiKeyFormData) => {
      console.log("Form submitted:", formData);
    },
  },
};

export const WithInitialValues: Story = {
  args: {
    availableScopes: mockAvailableScopes,
    onFormSubmit: (formData: ApiKeyFormData) => {
      console.log("Form submitted:", formData);
    },
    initialValues: {
      name: "Existing API Key",
      description: "Pre-filled description for editing an existing key",
      permissions: ["read", "write"],
      expiresAt: "2024-12-31T23:59",
      ipRestrictions: ["192.168.1.0/24", "10.0.0.0/8"],
      rateLimit: {
        requestsPerMinute: 500,
        burstSize: 25,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form pre-filled with initial values for editing an existing API key.",
      },
    },
  },
};

export const WithValidationErrors: Story = {
  args: {
    availableScopes: mockAvailableScopes,
    onFormSubmit: (formData: ApiKeyFormData) => {
      console.log("Form submitted:", formData);
    },
    errors: {
      name: "API key name is required and must be unique",
      permissions: "At least one permission must be selected",
      expiresAt: "Expiration date must be in the future",
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Form displaying validation errors for required fields.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    availableScopes: mockAvailableScopes,
    onFormSubmit: (formData: ApiKeyFormData) => {
      console.log("Form submitted:", formData);
    },
    loading: true,
    initialValues: {
      name: "New Production Key",
      description: "API key for production environment",
      permissions: ["read", "write"],
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Form in loading state during submission.",
      },
    },
  },
};

export const MinimalConfiguration: Story = {
  args: {
    availableScopes: ["read", "write", "admin"],
    onFormSubmit: (formData: ApiKeyFormData) => {
      console.log("Form submitted:", formData);
    },
    initialValues: {
      name: "Simple Key",
      permissions: ["read"],
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal API key configuration with basic permissions only.",
      },
    },
  },
};

export const HighSecurityConfiguration: Story = {
  args: {
    availableScopes: mockAvailableScopes,
    onFormSubmit: (formData: ApiKeyFormData) => {
      console.log("Form submitted:", formData);
    },
    initialValues: {
      name: "High Security Key",
      description: "API key with strict security settings for production use",
      permissions: ["read"],
      expiresAt: "2024-03-31T23:59",
      ipRestrictions: ["203.0.113.0/24"],
      rateLimit: {
        requestsPerMinute: 60,
        burstSize: 5,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "High security configuration with IP restrictions, rate limiting, and expiration.",
      },
    },
  },
};

export const LimitedScopes: Story = {
  args: {
    availableScopes: ["read", "user:read", "analytics:read"],
    onFormSubmit: (formData: ApiKeyFormData) => {
      console.log("Form submitted:", formData);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Form with limited permission scopes for restricted environments.",
      },
    },
  },
};
