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

- **[@freeui/tokens](./packages/tokens)**: Design tokens (colors, typography, spacing, etc.)
- **[@freeui/css](./packages/css)**: CSS utilities and custom properties
- **[@freeui/react](./packages/react)**: React component library
- **[@freeui/docs](./apps/docs)**: Storybook documentation site

## 🚀 Quick Start

### Installation

```bash
# Install the packages you need
npm install @freeui/react @freeui/css @freeui/tokens

# Or with pnpm
pnpm add @freeui/react @freeui/css @freeui/tokens

# Or with yarn
yarn add @freeui/react @freeui/css @freeui/tokens
```

### Basic Usage

```tsx
import { Button } from "@freeui/react";
import "@freeui/css/dist/index.css";

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
import { colors, spacing, typography } from "@freeui/tokens";

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
