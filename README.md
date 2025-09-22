# FreeUI Design System

A tokens-first design system for FreeState apps, built with accessibility and developer experience in mind.

## ✨ Features

- **🎨 Tokens-first approach**: Consistent design language across all components
- **♿ Accessible by default**: WCAG AA compliant components out of the box
- **🔧 Developer-friendly**: Boring APIs that just work, minimal dependencies
- **📚 Comprehensive docs**: Complete Storybook documentation
- **🔒 Type-safe**: Strict TypeScript throughout
- **⚡ Modern tooling**: pnpm + Turborepo for optimal DX

## 📦 Packages

This monorepo contains the following packages:

- **[@rockminster/tokens](./packages/tokens)**: Design tokens (colors, typography, spacing, etc.)
- **[@rockminster/css](./packages/css)**: CSS utilities and custom properties
- **[@rockminster/react](./packages/react)**: React component library with compositional primitives
- **[@rockminster/docs](./apps/docs)**: Storybook documentation site

## 🧩 Component Categories

### Layout Primitives

Build any interface structure with flexible layout components:

- **`Stack`** - Vertical layouts with consistent spacing
- **`Inline`** - Horizontal layouts with alignment options
- **`Separator`** - Visual content dividers

### Display Primitives

Present content with consistent typography and indicators:

- **`Text`** - All text content with semantic colors and weights
- **`Heading`** - Semantic headings with independent visual sizing
- **`Badge`** - Status indicators and labels

### Foundation Components

Core interactive and container components:

- **`Card`** - Flexible content containers
- **`Button`** - User actions with multiple variants
- **`Input`** - Form controls and data entry

> **Compositional Philosophy**: Rather than providing bespoke components for specific use cases, FreeUI focuses on flexible primitives that can be composed to build any interface. This approach reduces bundle size, increases flexibility, and ensures consistent design patterns.

## 🚀 Quick Start

### Installation

```bash
# Install the packages you need
npm install @rockminster/react @rockminster/css @rockminster/tokens

# Or with pnpm
pnpm add @rockminster/react @rockminster/css @rockminster/tokens

# Or with yarn
yarn add @rockminster/react @rockminster/css @rockminster/tokens
```

### Basic Usage

```tsx
import { Button } from "@rockminster/react";
import "@rockminster/css/dist/index.css";

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Hello FreeUI!
      </Button>
    </div>
  );
}
```

### Using Design Tokens

```tsx
import { colors, spacing, typography } from "@rockminster/tokens";

const customStyles = {
  backgroundColor: colors.brand[500],
  padding: spacing[4],
  fontFamily: typography.fontFamily.sans.join(", "),
  fontSize: typography.fontSize.lg,
};
```

## 🏗️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/rockminster/FreeState-FreeUI.git
cd FreeState-FreeUI

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start Storybook development server
pnpm dev
```

### Available Scripts

```bash
# Build all packages
pnpm build

# Start development mode
pnpm dev

# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Clean all build outputs
pnpm clean

# Create a changeset (for releases)
pnpm changeset

# Release packages
pnpm release
```

## 📖 Documentation

Visit our [Storybook documentation](https://rockminster.github.io/FreeState-FreeUI/) to explore all components and design tokens.

To run Storybook locally:

```bash
pnpm dev
```

Then open [http://localhost:6006](http://localhost:6006) in your browser.

## 🎯 Design Principles

### Accessibility First

All components are built with WCAG AA compliance in mind:

- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Color contrast compliance

### Tokens-First Architecture

The design system is built on a foundation of design tokens:

- **Consistent values**: All spacing, colors, and typography use predefined tokens
- **Easy theming**: Change tokens to customize the entire system
- **Platform agnostic**: Tokens can be used across web, mobile, and other platforms

### Compositional Design

Following compositional design principles, FreeUI provides flexible building blocks rather than bespoke components:

- **Layout primitives**: Stack, Inline, Separator for structural composition
- **Display primitives**: Text, Heading, Badge for content presentation
- **Foundation primitives**: Card, Button, Input for core functionality
- **Compose don't create**: Build interfaces by combining primitives rather than creating specialized components

### Boring APIs

We prioritize predictable, intuitive APIs:

- Consistent naming conventions
- Minimal required props
- Sensible defaults
- Clear TypeScript types

## 🔧 Architecture

```
FreeState-FreeUI/
├── packages/
│   ├── tokens/          # Design tokens
│   ├── css/            # CSS utilities
│   ├── react/          # React components
│   └── eslint-config/  # Shared ESLint config
├── apps/
│   └── docs/           # Storybook documentation
├── .changeset/         # Changeset configuration
└── .github/
    └── workflows/      # CI/CD workflows
```

## 🚦 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🤝 Contributing

We welcome contributions! Please read our [contributing guide](./CONTRIBUTING.md) to get started.

## 📞 Support

- [GitHub Issues](https://github.com/rockminster/FreeState-FreeUI/issues)
- [Discussions](https://github.com/rockminster/FreeState-FreeUI/discussions)
