# Fix ESLint job failure caused by missing or misconfigured @typescript-eslint dependencies

## Description
The ESLint job has been failing due to missing or misconfigured `@typescript-eslint` dependencies, as observed in job 50879104946 and PR #1. 

## Proposed Solution
- Add `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` as `devDependencies` in the root `package.json`.
- Install the new dependencies.

This will ensure that the `@typescript-eslint/recommended` config in `packages/eslint-config/index.js` is resolved, allowing the lint jobs to pass.