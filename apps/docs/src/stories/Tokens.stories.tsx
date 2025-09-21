import type { Meta, StoryObj } from "@storybook/react";
import { colors, typography, spacing } from "@freeui/tokens";

const meta: Meta = {
  title: "Design Tokens/Overview",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Design Tokens

FreeUI is built on a foundation of design tokens that ensure consistency across all components and applications. 
These tokens define the visual language of the design system.

## Token Categories

- **Colors**: Brand, neutral, and semantic color palettes
- **Typography**: Font families, sizes, weights, and spacing
- **Spacing**: Consistent spacing scale for layout and components  
- **Border Radius**: Rounded corner values
- **Shadows**: Elevation and depth effects
- **Animation**: Duration and easing values

All tokens are WCAG AA compliant and designed for accessibility.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: "1rem", fontFamily: typography.fontFamily.sans.join(", ") }}>
        Color Palette
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", fontFamily: typography.fontFamily.sans.join(", ") }}>
          Brand Colors
        </h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {Object.entries(colors.brand).map(([key, value]) => (
            <div
              key={key}
              style={{
                backgroundColor: value,
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                color: parseInt(key) > 500 ? "white" : "black",
                fontFamily: typography.fontFamily.mono.join(", "),
                fontSize: "12px",
                padding: "4px",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", fontFamily: typography.fontFamily.sans.join(", ") }}>
          Neutral Colors
        </h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {Object.entries(colors.neutral).map(([key, value]) => (
            <div
              key={key}
              style={{
                backgroundColor: value,
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                color: parseInt(key) > 500 ? "white" : "black",
                fontFamily: typography.fontFamily.mono.join(", "),
                fontSize: "12px",
                padding: "4px",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", fontFamily: typography.fontFamily.sans.join(", ") }}>
          Semantic Colors
        </h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {Object.entries(colors.semantic).map(([category, shades]) => (
            <div key={category}>
              <h4 style={{ 
                marginBottom: "0.5rem", 
                fontFamily: typography.fontFamily.sans.join(", "),
                textTransform: "capitalize",
                fontSize: "14px",
              }}>
                {category}
              </h4>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                {Object.entries(shades).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      backgroundColor: value,
                      width: "60px",
                      height: "60px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "center",
                      color: key === "50" ? "black" : "white",
                      fontFamily: typography.fontFamily.mono.join(", "),
                      fontSize: "10px",
                      padding: "2px",
                    }}
                  >
                    {key}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: "1rem", fontFamily: typography.fontFamily.sans.join(", ") }}>
        Typography Scale
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", fontFamily: typography.fontFamily.sans.join(", ") }}>
          Font Sizes
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {Object.entries(typography.fontSize).map(([key, value]) => (
            <div key={key} style={{ display: "flex", alignItems: "baseline", gap: "2rem" }}>
              <code style={{ 
                fontFamily: typography.fontFamily.mono.join(", "),
                minWidth: "60px",
                fontSize: "14px",
                color: colors.neutral[600],
              }}>
                {key}
              </code>
              <span style={{ 
                fontSize: value,
                fontFamily: typography.fontFamily.sans.join(", "),
                lineHeight: typography.lineHeight.normal,
              }}>
                The quick brown fox jumps over the lazy dog
              </span>
              <span style={{ 
                fontFamily: typography.fontFamily.mono.join(", "),
                fontSize: "12px",
                color: colors.neutral[500],
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: "1rem", fontFamily: typography.fontFamily.sans.join(", ") }}>
        Spacing Scale
      </h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Object.entries(spacing).map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <code style={{ 
              fontFamily: typography.fontFamily.mono.join(", "),
              minWidth: "40px",
              fontSize: "14px",
              color: colors.neutral[600],
            }}>
              {key}
            </code>
            <div
              style={{
                backgroundColor: colors.brand[500],
                height: "20px",
                width: value,
                borderRadius: "2px",
              }}
            />
            <span style={{ 
              fontFamily: typography.fontFamily.mono.join(", "),
              fontSize: "12px",
              color: colors.neutral[500],
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};