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
        const projectName = process.argv[2];
        if (!projectName) {
            console.error('Please provide a project name');
            console.error('Usage: npx @0xandreja/nextjs-ts-starter <project-name>');
            process.exit(1);
        }
        const targetDir = (0, path_1.join)((0, process_1.cwd)(), projectName);
        if ((0, fs_1.existsSync)(targetDir)) {
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
        console.log(`Creating new Next.js project in ${targetDir}...`);
        (0, fs_1.mkdirSync)(targetDir);
        // Copy template files
        const templateDir = (0, path_1.join)(__dirname, '..', '..', 'templates');
        const privyTemplateDir = (0, path_1.join)(templateDir, usePrivy ? 'with-privy' : 'without-privy');
        console.log(`Looking for templates in: ${templateDir}`);
        if (!(0, fs_1.existsSync)(templateDir)) {
            console.error(`Template directory not found at ${templateDir}`);
            process.exit(1);
        }
        // List contents of template directory
        console.log('Template directory contents:');
        (0, child_process_1.execSync)(`ls -la "${templateDir}"`, { stdio: 'inherit' });
        // Copy base files (excluding with-privy/without-privy folders)
        (0, child_process_1.execSync)(`cp -r "${templateDir}/." "${targetDir}"`, { stdio: 'inherit' });
        // Copy the selected privy template OVER the base files
        (0, child_process_1.execSync)(`cp -r "${privyTemplateDir}/." "${targetDir}"`, { stdio: 'inherit' });
        // Copy the selected privy template's app/ contents into the generated app/ directory
        (0, child_process_1.execSync)(`cp -r "${privyTemplateDir}/app/." "${targetDir}/app"`, { stdio: 'inherit' });
        // Remove web3 folder if NO Privy
        if (!usePrivy) {
            const web3Dir = (0, path_1.join)(targetDir, 'components', 'web3');
            try {
                (0, fs_1.rmSync)(web3Dir, { recursive: true, force: true });
            }
            catch { }
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
        // Initialize git repository
        console.log('Initializing git repository...');
        (0, child_process_1.execSync)('git init', { cwd: targetDir, stdio: 'inherit' });
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
