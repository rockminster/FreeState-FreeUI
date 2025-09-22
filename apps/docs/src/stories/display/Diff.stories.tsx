import type { Meta, StoryObj } from "@storybook/react";
import { Diff, type DiffLine } from "@rockminster/react";

const meta: Meta<typeof Diff> = {
  title: "Display/Diff",
  component: Diff,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Diff component is a compositional display primitive for showing file or content differences.
It provides a clear visual representation of changes with proper semantic colors and accessibility support.

## Features
- **Accessible by default**: Semantic HTML, keyboard navigation, screen reader support
- **Multiple sizes**: Small, medium, and large variants
- **Line numbers**: Optional line number display
- **Syntax highlighting**: Optional syntax enhancement
- **Compositional**: Works seamlessly with Stack, Inline, and other layout primitives
- **Full TypeScript support**: Complete type definitions

## Compositional Usage
Use Diff with Stack and Inline primitives to build version comparison interfaces, code review tools, and change tracking systems.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the diff display",
    },
    showLineNumbers: {
      control: { type: "boolean" },
      description: "Whether to show line numbers",
    },
    syntax: {
      control: { type: "boolean" },
      description: "Whether to enable syntax highlighting",
    },
    title: {
      control: { type: "text" },
      description: "Optional title for the diff",
    },
  },
  args: {
    size: "md",
    showLineNumbers: true,
    syntax: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock diff data
const sampleDiff: DiffLine[] = [
  { type: "unchanged", content: "function calculateTotal(items) {" },
  { type: "unchanged", content: "  let total = 0;" },
  { type: "removed", content: "  let tax = 0.08;" },
  { type: "added", content: "  const TAX_RATE = 0.085;" },
  { type: "unchanged", content: "  for (const item of items) {" },
  { type: "unchanged", content: "    total += item.price;" },
  { type: "unchanged", content: "  }" },
  { type: "removed", content: "  return total + (total * tax);" },
  { type: "added", content: "  return total + (total * TAX_RATE);" },
  { type: "unchanged", content: "}" },
];

const configDiff: DiffLine[] = [
  { type: "unchanged", content: "{" },
  { type: "unchanged", content: '  "name": "freeui-app",' },
  { type: "unchanged", content: '  "version": "1.2.0",' },
  { type: "removed", content: '  "port": 3000,' },
  { type: "added", content: '  "port": 8080,' },
  { type: "removed", content: '  "environment": "development",' },
  { type: "added", content: '  "environment": "production",' },
  { type: "added", content: '  "ssl": true,' },
  { type: "unchanged", content: '  "database": {' },
  { type: "unchanged", content: '    "host": "localhost"' },
  { type: "unchanged", content: "  }" },
  { type: "unchanged", content: "}" },
];

export const Default: Story = {
  args: {
    lines: sampleDiff,
    title: "src/utils/calculator.js",
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    lines: sampleDiff,
    showLineNumbers: false,
    title: "Code Changes",
  },
};

export const ConfigurationDiff: Story = {
  args: {
    lines: configDiff,
    title: "config/app.json",
    showLineNumbers: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example showing configuration file changes with added and removed lines.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h4
          style={{
            marginBottom: "0.5rem",
            color: "var(--freeui-color-neutral-900)",
          }}
        >
          Small Size
        </h4>
        <Diff
          lines={sampleDiff.slice(0, 4)}
          size="sm"
          title="Small diff view"
        />
      </div>
      <div>
        <h4
          style={{
            marginBottom: "0.5rem",
            color: "var(--freeui-color-neutral-900)",
          }}
        >
          Medium Size
        </h4>
        <Diff
          lines={sampleDiff.slice(0, 4)}
          size="md"
          title="Medium diff view"
        />
      </div>
      <div>
        <h4
          style={{
            marginBottom: "0.5rem",
            color: "var(--freeui-color-neutral-900)",
          }}
        >
          Large Size
        </h4>
        <Diff
          lines={sampleDiff.slice(0, 4)}
          size="lg"
          title="Large diff view"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All diff sizes shown together for comparison.",
      },
    },
  },
};

export const FileComparison: Story = {
  render: () => (
    <div style={{ maxWidth: "800px" }}>
      <h3
        style={{
          marginBottom: "1rem",
          color: "var(--freeui-color-neutral-900)",
        }}
      >
        File Comparison Tool
      </h3>
      <p
        style={{
          marginBottom: "1.5rem",
          color: "var(--freeui-color-neutral-600)",
        }}
      >
        Compare different versions of files to track changes and improvements.
      </p>
      <Diff
        lines={[
          { type: "unchanged", content: "# FreeUI Configuration" },
          { type: "unchanged", content: "" },
          { type: "unchanged", content: "## Theme Settings" },
          { type: "removed", content: 'primaryColor: "#0066cc"' },
          { type: "added", content: 'primaryColor: "#0ea5e9"' },
          { type: "removed", content: "darkMode: false" },
          { type: "added", content: "darkMode: true" },
          { type: "added", content: "highContrast: false" },
          { type: "unchanged", content: "" },
          { type: "unchanged", content: "## Layout Settings" },
          { type: "unchanged", content: "maxWidth: 1200px" },
          { type: "removed", content: 'sidebar: "left"' },
          { type: "added", content: 'sidebar: "right"' },
          { type: "added", content: "collapsible: true" },
        ]}
        title="theme.config.md"
        showLineNumbers={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how Diff enables state comparison for configuration changes.",
      },
    },
  },
};
