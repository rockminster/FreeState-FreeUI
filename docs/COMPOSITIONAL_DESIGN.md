# Compositional Design Principles

## Overview

FreeUI has been refactored to follow Elastic's EUI compositional design principles, moving away from bespoke components toward flexible building blocks that can be composed to create any interface.

## The Problem with Bespoke Components

Previously, FreeUI risked creating too many specialized components like:
- `OrganizationCard`
- `UserProfilePanel` 
- `ProductInfoCard`
- `NotificationList`

This approach leads to:
- ❌ Large bundle sizes
- ❌ Reduced flexibility
- ❌ Difficult maintenance
- ❌ Inconsistent spacing/styling
- ❌ Component explosion

## The Compositional Solution

Instead of bespoke components, we now provide **structural primitives** that can be composed to build any interface:

### Layout Primitives
- **`Stack`** - Vertical layout with consistent spacing
- **`Inline`** - Horizontal layout with alignment options
- **`Separator`** - Visual content dividers

### Display Primitives  
- **`Text`** - Typography with semantic colors and weights
- **`Heading`** - Semantic headings with visual sizing
- **`Badge`** - Status indicators and labels

### Foundation Primitives (existing)
- **`Card`** - Content containers
- **`Button`** - User actions
- **`Input`** - Form controls

## Benefits

✅ **Smaller bundle size** - Fewer components to ship
✅ **Infinite flexibility** - Compose any layout from primitives
✅ **Consistent design** - All spacing/colors from design tokens
✅ **Easy maintenance** - Changes to primitives affect entire system
✅ **Better accessibility** - ARIA support built into primitives
✅ **Predictable APIs** - Consistent patterns across all components

## Usage Examples

### Before: Bespoke Component
```tsx
// Rigid, limited reusability
<OrganizationCard 
  organization={org}
  showMetrics={true}
  onUpgrade={handleUpgrade}
/>
```

### After: Compositional Design
```tsx
// Flexible, unlimited variations
<Card padding="lg" shadow="md">
  <Stack gap="lg">
    <Inline justify="space-between">
      <Stack gap="xs">
        <Heading level={2}>{org.name}</Heading>
        <Badge variant="success">{org.plan}</Badge>
      </Stack>
      <Button onClick={handleUpgrade}>Upgrade</Button>
    </Inline>
    
    <Separator />
    
    <Inline gap="xl">
      <Stack align="center">
        <Text size="xl" weight="bold">{org.memberCount}</Text>
        <Text size="sm" color="subdued">Members</Text>
      </Stack>
      {/* More metrics... */}
    </Inline>
  </Stack>
</Card>
```

## Design Tokens Integration

All primitives use design tokens for consistency:

```css
/* Spacing from tokens */
.freeui-stack--gap-md { gap: var(--freeui-spacing-4); }

/* Colors from tokens */
.freeui-text--color-success { color: var(--freeui-color-semantic-success-600); }

/* Typography from tokens */
.freeui-heading--size-lg { font-size: var(--freeui-font-size-2xl); }
```

## Accessibility Built-In

Every primitive includes proper accessibility:

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility
- High contrast compliance

## Migration Strategy

1. **Use primitives for new features** - Build new interfaces using Stack, Inline, Text, etc.
2. **Gradually refactor existing components** - Replace bespoke components with composed primitives
3. **Remove unused components** - Delete specialized components as they're replaced
4. **Update documentation** - Document composition patterns for common use cases

## Best Practices

### ✅ Do
- Use Stack for vertical layouts
- Use Inline for horizontal layouts
- Use Text for all typography
- Use Heading for semantic hierarchy
- Use design token values
- Compose at the usage site

### ❌ Don't
- Create `ProductCard`, `UserPanel`, etc.
- Use hardcoded spacing values
- Bypass the type system
- Create wrapper components unnecessarily

## Common Patterns

### Information Display
```tsx
<Card padding="md">
  <Stack gap="sm">
    <Heading level={3} size="sm">User Information</Heading>
    <Inline justify="space-between">
      <Text weight="medium">Name:</Text>
      <Text>{user.name}</Text>
    </Inline>
    <Inline justify="space-between">
      <Text weight="medium">Status:</Text>
      <Badge variant="success">Active</Badge>
    </Inline>
  </Stack>
</Card>
```

### Action Toolbars
```tsx
<Inline justify="space-between" align="center">
  <Stack gap="xs">
    <Heading level={2}>Dashboard</Heading>
    <Text color="subdued">Manage your projects</Text>
  </Stack>
  
  <Inline gap="sm">
    <Button variant="outline">Settings</Button>
    <Button variant="primary">New Project</Button>
  </Inline>
</Inline>
```

### Metric Grids
```tsx
<Inline gap="xl" wrap>
  <Stack align="center" gap="xs">
    <Text size="2xl" weight="bold" color="accent">42</Text>
    <Text size="sm" color="subdued">Active Users</Text>
  </Stack>
  <Stack align="center" gap="xs">
    <Text size="2xl" weight="bold" color="accent">15</Text>
    <Text size="sm" color="subdued">Projects</Text>
  </Stack>
</Inline>
```

## Conclusion

By adopting compositional design principles, FreeUI becomes more flexible, maintainable, and consistent while reducing bundle size and complexity. This approach follows industry best practices established by design systems like Elastic's EUI.