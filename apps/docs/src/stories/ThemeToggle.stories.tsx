import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { colors } from "@rockminster/tokens";

const meta: Meta = {
  title: "Design Tokens/Theme Toggle",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Theme Toggle Demo

This demo showcases the FreeUI design system's dark theme implementation. 
Toggle between light and dark themes to see how colors adapt while maintaining WCAG AA accessibility standards.

## Usage

Add \`data-theme="dark"\` to the root element or any container to enable dark mode:

\`\`\`html
<html data-theme="dark">
  <!-- Your content will use dark theme colors -->
</html>
\`\`\`

## Implementation

The dark theme uses CSS custom properties with the \`:root[data-theme="dark"]\` selector.
All color tokens are automatically inverted to provide proper contrast in dark mode.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function ThemeToggleDemo() {
  const [isDark, setIsDark] = useState(false);

  React.useEffect(() => {
    const rootElement = document.documentElement;
    if (isDark) {
      rootElement.setAttribute("data-theme", "dark");
    } else {
      rootElement.removeAttribute("data-theme");
    }

    // Cleanup on unmount
    return () => {
      rootElement.removeAttribute("data-theme");
    };
  }, [isDark]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "var(--freeui-color-neutral-50)",
        color: "var(--freeui-color-neutral-900)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Theme Toggle Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "var(--freeui-color-white)",
          borderRadius: "12px",
          boxShadow: "var(--freeui-shadow-base)",
          border: "1px solid var(--freeui-color-neutral-200)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--freeui-color-neutral-900)",
          }}
        >
          FreeUI Theme Demo
        </h1>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            backgroundColor: "var(--freeui-color-brand-500)",
            color: "var(--freeui-color-white)",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--freeui-color-brand-600)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--freeui-color-brand-500)";
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--freeui-color-brand-600)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--freeui-color-brand-500)";
          }}
        >
          {isDark ? "🌞 Switch to Light" : "🌙 Switch to Dark"}
        </button>
      </div>

      {/* Color Palette Demo */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            marginBottom: "1.5rem",
            color: "var(--freeui-color-neutral-800)",
            fontSize: "1.25rem",
          }}
        >
          Color Palette
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Brand Colors */}
          <div
            style={{
              backgroundColor: "var(--freeui-color-white)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "var(--freeui-shadow-base)",
              border: "1px solid var(--freeui-color-neutral-200)",
            }}
          >
            <h3
              style={{
                marginBottom: "1rem",
                color: "var(--freeui-color-neutral-700)",
                fontSize: "1rem",
              }}
            >
              Brand Colors
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {Object.entries(colors.brand).map(([key]) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: `var(--freeui-color-brand-${key})`,
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                    color: parseInt(key) > 500 ? "white" : "black",
                    fontSize: "10px",
                    fontWeight: 500,
                    padding: "4px",
                    border: "1px solid var(--freeui-color-neutral-300)",
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div
            style={{
              backgroundColor: "var(--freeui-color-white)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "var(--freeui-shadow-base)",
              border: "1px solid var(--freeui-color-neutral-200)",
            }}
          >
            <h3
              style={{
                marginBottom: "1rem",
                color: "var(--freeui-color-neutral-700)",
                fontSize: "1rem",
              }}
            >
              Neutral Colors
            </h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {Object.entries(colors.neutral).map(([key]) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: `var(--freeui-color-neutral-${key})`,
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                    color: parseInt(key) > 500 ? "white" : "black",
                    fontSize: "10px",
                    fontWeight: 500,
                    padding: "4px",
                    border: "1px solid var(--freeui-color-neutral-300)",
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div
            style={{
              backgroundColor: "var(--freeui-color-white)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "var(--freeui-shadow-base)",
              border: "1px solid var(--freeui-color-neutral-200)",
            }}
          >
            <h3
              style={{
                marginBottom: "1rem",
                color: "var(--freeui-color-neutral-700)",
                fontSize: "1rem",
              }}
            >
              Semantic Colors
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {Object.entries(colors.semantic).map(([category, shades]) => (
                <div key={category}>
                  <h4
                    style={{
                      marginBottom: "0.5rem",
                      textTransform: "capitalize",
                      fontSize: "12px",
                      color: "var(--freeui-color-neutral-600)",
                    }}
                  >
                    {category}
                  </h4>
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {Object.entries(shades).map(([key]) => (
                      <div
                        key={key}
                        style={{
                          backgroundColor: `var(--freeui-color-semantic-${category}-${key})`,
                          width: "40px",
                          height: "40px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "center",
                          color: key === "50" ? "black" : "white",
                          fontSize: "8px",
                          fontWeight: 500,
                          padding: "2px",
                          border: "1px solid var(--freeui-color-neutral-300)",
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
      </div>

      {/* Component Examples */}
      <div>
        <h2
          style={{
            marginBottom: "1.5rem",
            color: "var(--freeui-color-neutral-800)",
            fontSize: "1.25rem",
          }}
        >
          Component Examples
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Card Example */}
          <div
            style={{
              backgroundColor: "var(--freeui-color-white)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "var(--freeui-shadow-lg)",
              border: "1px solid var(--freeui-color-neutral-200)",
            }}
          >
            <h3
              style={{
                marginBottom: "0.5rem",
                color: "var(--freeui-color-neutral-900)",
                fontSize: "1.125rem",
              }}
            >
              Card Component
            </h3>
            <p
              style={{
                marginBottom: "1rem",
                color: "var(--freeui-color-neutral-600)",
                lineHeight: 1.5,
              }}
            >
              This card demonstrates how components adapt to theme changes while
              maintaining readability and accessibility.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
              }}
            >
              <button
                style={{
                  backgroundColor: "var(--freeui-color-brand-500)",
                  color: "var(--freeui-color-white)",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Primary
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "var(--freeui-color-brand-500)",
                  border: "1px solid var(--freeui-color-brand-500)",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Secondary
              </button>
            </div>
          </div>

          {/* Alert Examples */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {Object.entries(colors.semantic).map(([type]) => (
              <div
                key={type}
                style={{
                  backgroundColor: `var(--freeui-color-semantic-${type}-50)`,
                  border: `1px solid var(--freeui-color-semantic-${type}-500)`,
                  borderRadius: "8px",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: `var(--freeui-color-semantic-${type}-500)`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h4
                    style={{
                      margin: 0,
                      marginBottom: "0.25rem",
                      textTransform: "capitalize",
                      color: `var(--freeui-color-semantic-${type}-700)`,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    {type} Alert
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      color: `var(--freeui-color-semantic-${type}-600)`,
                      fontSize: "0.75rem",
                    }}
                  >
                    This is a {type} message with proper contrast.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          backgroundColor: "var(--freeui-color-neutral-100)",
          borderRadius: "12px",
          textAlign: "center",
          border: "1px solid var(--freeui-color-neutral-200)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "var(--freeui-color-neutral-600)",
            fontSize: "0.875rem",
          }}
        >
          Current theme: <strong>{isDark ? "Dark" : "Light"}</strong> • All
          colors are WCAG AA compliant • Powered by FreeUI Design System
        </p>
      </div>
    </div>
  );
}

export const ThemeToggle: Story = {
  render: () => <ThemeToggleDemo />,
  parameters: {
    docs: {
      story: {
        height: "800px",
      },
    },
  },
};
