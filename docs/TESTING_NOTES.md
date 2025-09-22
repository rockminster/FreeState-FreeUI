# Testing Notes

## Storybook Test Runner Issue

The Storybook test runner is currently experiencing compatibility issues with Storybook 8.6.14. The error manifests as:

```
ReferenceError: Cannot access 'StorybookTestRunnerError' before initialization
```

### Temporary Solution

We have temporarily replaced the interactive test runner with a build-only smoke test that verifies:
- All packages build successfully
- All story files compile without errors  
- Storybook static build completes successfully

This ensures CI continues to catch build issues and story compilation errors.

### Future Resolution

This issue should be resolved when:
1. Storybook test runner releases a version compatible with Storybook 8.6+
2. Or we can implement a custom Playwright-based testing solution

### Related Files
- `apps/docs/package.json` - Modified test scripts
- `apps/docs/.storybook/test-runner.ts` - Test runner configuration (currently has working a11y setup for when runner is fixed)

### Testing Changes Made
- Updated `@storybook/test-runner` from `0.23.0` to `0.19.1` (neither version resolves the core issue)
- Modified test scripts to use build-only verification
- Preserved accessibility testing configuration for future restoration