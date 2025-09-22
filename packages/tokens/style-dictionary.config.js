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
          options: {
            selector: ":root",
            fileHeader: function () {
              return [
                "Light theme tokens for FreeUI design system",
                "Auto-generated from design tokens - do not edit directly",
              ];
            },
          },
        },
      ],
    },
  },
};
