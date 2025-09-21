module.exports = {
  source: ["src/light.json"],
  platforms: {
    css: {
      transformGroup: "css",
      prefix: "freeui",
      buildPath: "../css/src/generated/",
      files: [
        {
          destination: "light-tokens.css",
          format: "css/variables",
          selector: ":root",
          options: {
            fileHeader: function() {
              return [
                "/* Light theme tokens for FreeUI design system */",
                "/* Auto-generated from design tokens - do not edit directly */"
              ];
            }
          }
        }
      ]
    }
  }
};