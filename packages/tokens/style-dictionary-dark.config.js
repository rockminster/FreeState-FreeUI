module.exports = {
  source: ["src/dark.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "freeui",
      buildPath: "../css/src/generated/",
      files: [
        {
          destination: "dark-tokens.css",
          format: "css/variables",
          options: {
            selector: ':root[data-theme="dark"]',
            fileHeader: function () {
              return [
                "/* Dark theme tokens for FreeUI design system */",
                "/* Auto-generated from design tokens - do not edit directly */",
              ];
            },
          },
        },
      ],
    },
  },
};
