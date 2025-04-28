# Package Maintenance Guide

## Publishing New Versions

1. **Update Version**

   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. **Compile TypeScript**

   ```bash
   npx tsc bin/cli.ts --outDir bin/dist
   ```

3. **Test Locally**

   ```bash
   npm link
   npx create-nextjs-ts test-project
   ```

4. **Publish**
   ```bash
   npm publish
   ```

## Project Structure

```
.
├── bin/              # CLI implementation
│   ├── cli.ts       # Main CLI script
│   └── dist/        # Compiled JavaScript
├── templates/        # Project template files
├── docs/            # Documentation
└── package.json     # Package configuration
```

## Development Workflow

1. Make changes to the template files in `templates/`
2. Update the CLI script in `bin/cli.ts` if needed
3. Compile TypeScript
4. Test locally using `npm link`
5. Update version and publish

## Common Tasks

### Adding New Dependencies

1. Add to `package.json` in the root project
2. Add to `templates/package.json` for the generated project

### Updating Template Files

1. Modify files in `templates/`
2. Test the changes locally
3. Update version and publish

### Testing Changes

1. `npm link` in the root directory
2. Create a test project: `npx create-nextjs-ts test-project`
3. Verify all features work as expected
