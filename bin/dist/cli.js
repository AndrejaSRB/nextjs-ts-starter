#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const process_1 = require("process");
const prompts_1 = __importDefault(require("prompts"));
const main = async () => {
    try {
        let projectName = process.argv[2];
        if (!projectName) {
            console.error('Please provide a project name');
            console.error('Usage: npx @0xandreja/nextjs-ts-starter <project-name>');
            process.exit(1);
        }
        // Check if user wants to install in current directory
        const useCurrentDir = projectName === '.';
        const targetDir = useCurrentDir ? (0, process_1.cwd)() : (0, path_1.join)((0, process_1.cwd)(), projectName);
        if (!useCurrentDir && (0, fs_1.existsSync)(targetDir)) {
            console.error(`Directory ${projectName} already exists`);
            process.exit(1);
        }
        // Ask about Privy
        const { usePrivy } = await (0, prompts_1.default)({
            type: 'confirm',
            name: 'usePrivy',
            message: 'Would you like to include Privy authentication?',
            initial: true,
        });
        if (!useCurrentDir) {
            console.log(`Creating new Next.js project in ${targetDir}...`);
            (0, fs_1.mkdirSync)(targetDir);
        }
        else {
            console.log(`Initializing Next.js project in current directory...`);
            // Check if directory is not empty
            const files = (0, child_process_1.execSync)('ls -A', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
            // Filter out common hidden files that don't matter
            const ignoredFiles = ['.DS_Store', '.git', '.gitignore', '.idea', '.vscode'];
            const relevantFiles = files.filter(file => !ignoredFiles.includes(file));
            if (relevantFiles.length > 0) {
                console.log('Detected files in current directory:', relevantFiles.join(', '));
                const { confirm } = await (0, prompts_1.default)({
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
        const templateDir = (0, path_1.join)(__dirname, '..', '..', 'templates');
        const templateSource = (0, path_1.join)(templateDir, usePrivy ? 'with-privy' : 'without-privy');
        console.log(`Using template from: ${templateSource}`);
        if (!(0, fs_1.existsSync)(templateSource)) {
            console.error(`Template directory not found at ${templateSource}`);
            process.exit(1);
        }
        // Copy template files directly (not copying from root templates folder anymore)
        console.log('Copying template files...');
        (0, child_process_1.execSync)(`cp -r "${templateSource}/." "${targetDir}"`, { stdio: 'inherit' });
        // Remove web3 folder if NO Privy
        if (!usePrivy) {
            const web3Dir = (0, path_1.join)(targetDir, 'components', 'web3');
            if ((0, fs_1.existsSync)(web3Dir)) {
                try {
                    (0, fs_1.rmSync)(web3Dir, { recursive: true, force: true });
                    console.log('Removed web3 components folder (not needed without Privy)');
                }
                catch (error) {
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
        (0, fs_1.writeFileSync)((0, path_1.join)(targetDir, '.env.example'), envExample);
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
        (0, fs_1.writeFileSync)((0, path_1.join)(targetDir, '.gitignore'), gitignore);
        // Initialize git repository (only if not already a git repo)
        if (!(0, fs_1.existsSync)((0, path_1.join)(targetDir, '.git'))) {
            console.log('Initializing git repository...');
            (0, child_process_1.execSync)('git init', { cwd: targetDir, stdio: 'inherit' });
        }
        // Install dependencies
        console.log('Installing dependencies (this may take a few minutes)...');
        try {
            (0, child_process_1.execSync)('npm install', {
                cwd: targetDir,
                stdio: 'inherit',
                env: { ...process.env, FORCE_COLOR: '1' },
            });
        }
        catch {
            console.error('Error during npm install. You can try running npm install manually in the project directory.');
            console.error('Continuing with project creation...');
        }
        console.log(`
🎉 Success! Created ${useCurrentDir ? 'project in current directory' : projectName} at ${targetDir}

📦 Package: https://www.npmjs.com/package/@0xandreja/nextjs-ts-starter
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
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};
main();
