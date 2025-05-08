#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import prompts from 'prompts';

const main = async () => {
  try {
    let projectName = process.argv[2];

    if (!projectName) {
      console.error('Please provide a project name');
      console.error('Usage: npx create-nextjs-ts <project-name>');
      process.exit(1);
    }

    // Check if user wants to install in current directory
    const useCurrentDir = projectName === '.';
    const targetDir = useCurrentDir ? cwd() : join(cwd(), projectName);

    if (!useCurrentDir && existsSync(targetDir)) {
      console.error(`Directory ${projectName} already exists`);
      process.exit(1);
    }

    // Ask about Privy
    const { usePrivy } = await prompts({
      type: 'confirm',
      name: 'usePrivy',
      message: 'Would you like to include Privy authentication?',
      initial: true,
    });

    if (!useCurrentDir) {
      console.log(`Creating new Next.js project in ${targetDir}...`);
      mkdirSync(targetDir);
    } else {
      console.log(`Initializing Next.js project in current directory...`);

      // Check if directory is not empty
      const files = execSync('ls -A', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);

      // Filter out common hidden files that don't matter
      const ignoredFiles = ['.DS_Store', '.git', '.gitignore', '.idea', '.vscode'];
      const relevantFiles = files.filter(file => !ignoredFiles.includes(file));

      if (relevantFiles.length > 0) {
        console.log('Detected files in current directory:', relevantFiles.join(', '));
        const { confirm } = await prompts({
          type: 'confirm',
          name: 'confirm',
          message: 'Current directory is not empty. Continue anyway?',
          initial: false,
        });

        if (!confirm) {
          console.log('Operation cancelled.');
          process.exit(0);
        }
      }
    }

    // Find template directory
    const templateDir = join(__dirname, '..', '..', 'templates');
    const templateSource = join(templateDir, usePrivy ? 'with-privy' : 'without-privy');

    console.log(`Using template from: ${templateSource}`);

    if (!existsSync(templateSource)) {
      console.error(`Template directory not found at ${templateSource}`);
      process.exit(1);
    }

    // Copy template files directly (not copying from root templates folder anymore)
    console.log('Copying template files...');
    execSync(`cp -r "${templateSource}/." "${targetDir}"`, { stdio: 'inherit' });

    // Remove web3 folder if NO Privy
    if (!usePrivy) {
      const web3Dir = join(targetDir, 'components', 'web3');
      if (existsSync(web3Dir)) {
        try {
          rmSync(web3Dir, { recursive: true, force: true });
          console.log('Removed web3 components folder (not needed without Privy)');
        } catch (error) {
          console.error('Could not remove web3 components folder:', error);
        }
      }
    }

    // Create .env.example
    console.log('Creating .env.example...');
    const envExample = usePrivy
      ? `# Privy
NEXT_PUBLIC_PRIVY_APP_ID="PIVY APP ID"
NEXT_PUBLIC_PRIVY_CLIENT_ID="PRIVY APP SECRET"
`
      : `# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
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

    // Initialize git repository (only if not already a git repo)
    if (!existsSync(join(targetDir, '.git'))) {
      console.log('Initializing git repository...');
      execSync('git init', { cwd: targetDir, stdio: 'inherit' });
    }

    // Install dependencies
    console.log('Installing dependencies (this may take a few minutes)...');
    try {
      execSync('npm install', {
        cwd: targetDir,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' },
      });
    } catch {
      console.error(
        'Error during npm install. You can try running npm install manually in the project directory.'
      );
      console.error('Continuing with project creation...');
    }

    console.log(`
🎉 Success! Created ${useCurrentDir ? 'project in current directory' : projectName} at ${targetDir}

📦 Package: https://www.npmjs.com/package/create-nextjs-ts
⭐️ Star it on GitHub: https://github.com/AndrejaSRB/nextjs-ts-starter

🚀 Getting Started:
  ${useCurrentDir ? '' : `cd ${projectName}`}
  npm run dev

📚 Available Scripts:
  npm run dev     - Start development server
  npm run build   - Build for production
  npm start       - Start production server
  npm run lint    - Run ESLint
  npm run format  - Format code with Prettier

🔧 Configuration:
  - Edit .env.example and rename to .env.local
  ${usePrivy ? '- Configure Privy in the .env file\n  - Customize components in the components/ directory' : '- Add your environment variables to .env.local'}

💡 Need help? Open an issue on GitHub!
    `);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

main();
