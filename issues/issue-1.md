---
title: "Fix ESLint job failure caused by missing @typescript-eslint dependencies"
---

### Body:
The ESLint job is failing because the "@typescript-eslint/recommended" config cannot be found. This is likely due to missing or misconfigured @typescript-eslint dependencies.

### Proposed Solution:
- Add @typescript-eslint/eslint-plugin and @typescript-eslint/parser as devDependencies in the root package.json
- Run pnpm install or npm install to ensure the dependencies are installed

Please address this to restore functionality to the ESLint job.