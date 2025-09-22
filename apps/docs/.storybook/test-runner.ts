import type { TestRunnerConfig } from "@storybook/test-runner";
import { injectAxe, checkA11y } from "axe-playwright";

const config: TestRunnerConfig = {
  async preVisit(page) {
    // Inject axe-core before visiting each story
    await injectAxe(page);
  },
  async postVisit(page) {
    // Run accessibility tests after each story is rendered
    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      skipFailures: false,
    });
  },
};

export default config;
