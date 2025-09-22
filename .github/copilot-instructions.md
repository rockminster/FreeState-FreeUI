# FreeUI Design System

FreeUI is a tokens-first design system for FreeState apps built as a TypeScript monorepo. The system includes design tokens, CSS utilities, React components, and comprehensive Storybook documentation with accessibility testing.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Setup

- Install Node.js 18+ and pnpm 8+ (or pnpm 10.17.0 as specified in package.json)
- Clone repository: `git clone https://github.com/rockminster/FreeState-FreeUI.git`
- Navigate to project: `cd FreeState-FreeUI`

### Essential Commands

- Install dependencies: `pnpm install` -- takes ~6 seconds. NEVER CANCEL.
- Build all packages: `pnpm build` -- takes ~20 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Run linting: `pnpm lint` -- takes ~10 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Run type checking: `pnpm type-check` -- takes ~5 seconds. NEVER CANCEL.
- Run tests: `pnpm test` -- takes ~20 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Format code: `pnpm format`
- Check formatting: `pnpm lint:prettier` -- takes ~3 seconds.
- Clean build outputs: `pnpm clean`

### Development Workflow

- Start Storybook development server: `pnpm dev` (NOTE: dev mode has known issues, use build + serve instead)
- Alternative development approach: `pnpm build && cd apps/docs/storybook-static && python3 -m http.server 8080`
- Access Storybook at: http://localhost:6006 (dev) or http://localhost:8080 (static)

## Validation

### Manual Testing Requirements

- ALWAYS run through complete component testing scenarios after making changes
- Test Button component: Navigate to Button docs, test Primary/Secondary/Outline variants
- Test accessibility: Check that components have proper ARIA attributes and keyboard navigation
- Test theme switching: Verify light/dark mode tokens work correctly
- Test responsive behavior: Components should work across different screen sizes

### Build Validation Process

- Run `pnpm install` to ensure dependencies are current
- Run `pnpm lint` and fix any linting issues
- Run `pnpm type-check` and fix any TypeScript errors
- Run `pnpm build` and ensure all packages build successfully
- Run `pnpm test` to verify smoke tests pass
- Always run `pnpm format` before committing to ensure consistent code style

### CI Requirements

- All CI workflows (.github/workflows/ci.yml) must pass
- Build step uploads Storybook static artifacts
- Pages workflow deploys Storybook to GitHub Pages automatically

## Architecture

### Monorepo Structure

```
FreeState-FreeUI/
├── packages/
│   ├── tokens/          # Design tokens (TypeScript + Style Dictionary)
│   ├── css/            # CSS utilities and generated token CSS
│   ├── react/          # React components using tokens
│   └── eslint-config/  # Shared ESLint configuration
├── apps/
│   └── docs/           # Storybook documentation app
├── .changeset/         # Changeset configuration for releases
└── .github/
    └── workflows/      # CI/CD workflows
```

### Key Technologies

- **Build System**: Turbo + pnpm workspaces
- **Package Building**: tsup (TypeScript bundler)
- **Styling**: CSS custom properties + design tokens
- **Documentation**: Storybook 8.6.14
- **Testing**: Smoke tests via Storybook builds (interactive test runner disabled due to compatibility issues)
- **CI/CD**: GitHub Actions with Node.js 20

### Build Dependencies

- All packages must be built in dependency order: tokens → css → react → docs
- Tokens package generates CSS files that other packages consume
- Turbo handles dependency orchestration automatically

## Common Tasks

### Adding New Components

- Create component in `packages/react/src/components/`
- Add corresponding story in `apps/docs/src/stories/`
- Ensure component uses design tokens from `@rockminster/tokens`
- Test component in Storybook before committing

### Modifying Design Tokens

- Edit tokens in `packages/tokens/src/tokens.ts`
- Build tokens package: `pnpm --filter @rockminster/tokens build`
- Rebuild dependent packages: `pnpm build`
- Verify changes in Storybook

### Release Process

- Use Changesets: `pnpm changeset`
- Build all packages: `pnpm build`
- Release: `pnpm release` (automated via GitHub Actions)

## Known Issues and Workarounds

### Storybook Test Runner Issue

- **Problem**: Storybook test runner incompatible with Storybook 8.6.14
- **Error**: `ReferenceError: Cannot access 'StorybookTestRunnerError' before initialization`
- **Workaround**: Using smoke tests via `pnpm test` (builds Storybook successfully)
- **Files**: `apps/docs/package.json`, `docs/TESTING_NOTES.md`

### Development Mode Issues

- **Problem**: `pnpm dev` may fail due to TypeScript build race conditions
- **Workaround**: Use `pnpm build` followed by serving static Storybook build
- **Alternative**: Use individual package dev commands for specific packages

### TypeScript Version Warning

- **Warning**: ESLint shows TypeScript version 5.9.2 not officially supported
- **Impact**: Non-breaking warning, linting works correctly
- **Action**: Monitor for ESLint updates supporting TypeScript 5.9+

## Timeout Specifications

### Critical: NEVER CANCEL Commands

- `pnpm install`: Set timeout to 300+ seconds (typically completes in ~6s)
- `pnpm build`: Set timeout to 300+ seconds (typically completes in ~20s)
- `pnpm test`: Set timeout to 300+ seconds (typically completes in ~20s)
- `pnpm lint`: Set timeout to 180+ seconds (typically completes in ~10s)

### Build Time Expectations

- Fresh build (cold cache): 20-30 seconds
- Incremental build (warm cache): 5-10 seconds
- Install dependencies: 5-10 seconds
- Type checking: 3-5 seconds

## Quick Reference

### Package Commands

```bash
# Root level commands
pnpm install           # Install all dependencies
pnpm build            # Build all packages
pnpm dev              # Start development (NOTE: has issues, use build+serve)
pnpm test             # Run all tests
pnpm lint             # Lint all packages
pnpm type-check       # Type check all packages
pnpm clean            # Clean all build outputs

# Package-specific commands
pnpm --filter @rockminster/tokens build      # Build tokens only
pnpm --filter @rockminster/react build       # Build React components only
pnpm --filter @rockminster/docs build        # Build Storybook only
```

### Development URLs

- Storybook development: http://localhost:6006
- Storybook static: http://localhost:8080
- Production docs: https://rockminster.github.io/FreeState-FreeUI/

### File Locations

- Main package.json: `/package.json`
- Tokens source: `/packages/tokens/src/tokens.ts`
- React components: `/packages/react/src/components/`
- Storybook stories: `/apps/docs/src/stories/`
- CI workflows: `/.github/workflows/`
- ESLint config: `/packages/eslint-config/index.js`
