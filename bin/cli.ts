#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

const main = async () => {
  try {
    const projectName = process.argv[2];

    if (!projectName) {
      console.error('Please provide a project name');
      console.error('Usage: npx @0xandreja/nextjs-ts-starter <project-name>');
      process.exit(1);
    }

    const targetDir = join(cwd(), projectName);

    if (existsSync(targetDir)) {
      console.error(`Directory ${projectName} already exists`);
      process.exit(1);
    }

    console.log(`Creating new Next.js project in ${targetDir}...`);
    mkdirSync(targetDir);

    // Copy template files
    const templateDir = join(__dirname, '..', '..', 'templates');
    console.log(`Looking for templates in: ${templateDir}`);

    if (!existsSync(templateDir)) {
      console.error(`Template directory not found at ${templateDir}`);
      process.exit(1);
    }

    // List contents of template directory
    console.log('Template directory contents:');
    execSync(`ls -la "${templateDir}"`, { stdio: 'inherit' });

    // Copy files
    console.log('Copying template files...');
    execSync(`cp -r "${templateDir}/"* "${targetDir}"`, { stdio: 'inherit' });

    // Create .env.example
    console.log('Creating .env.example...');
    const envExample = `# Privy
NEXT_PUBLIC_PRIVY_APP_ID="PIVY APP ID"
NEXT_PUBLIC_PRIVY_CLIENT_ID="PRIVY APP SECRET"
`;
    writeFileSync(join(targetDir, '.env.example'), envExample);

    // Create .gitignore
    console.log('Creating .gitignore...');
    const gitignore = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`;
    writeFileSync(join(targetDir, '.gitignore'), gitignore);

    // Initialize git repository
    console.log('Initializing git repository...');
    execSync('git init', { cwd: targetDir, stdio: 'inherit' });

    // Install dependencies
    console.log('Installing dependencies (this may take a few minutes)...');
    try {
      execSync('npm install', {
        cwd: targetDir,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' },
      });
    } catch (error) {
      console.error(
        'Error during npm install. You can try running npm install manually in the project directory.'
      );
      console.error('Continuing with project creation...');
    }

    console.log(`
🎉 Success! Created ${projectName} at ${targetDir}

📦 Package: https://www.npmjs.com/package/@0xandreja/nextjs-ts-starter
⭐️ Star it on GitHub: https://github.com/AndrejaSRB/nextjs-ts-starter

🚀 Getting Started:
  cd ${projectName}
  npm run dev

📚 Available Scripts:
  npm run dev     - Start development server
  npm run build   - Build for production
  npm start       - Start production server
  npm run lint    - Run ESLint
  npm run format  - Format code with Prettier

🔧 Configuration:
  - Edit .env.example and rename to .env
  - Configure Privy in the .env file
  - Customize components in the components/ directory

💡 Need help? Open an issue on GitHub!
    `);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

main();
