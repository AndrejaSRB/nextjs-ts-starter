#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
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
    const templateDir = join(__dirname, '../templates');
    execSync(`cp -r ${templateDir}/* ${targetDir}`);

    // Initialize git repository
    execSync('git init', { cwd: targetDir });

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { cwd: targetDir });

    console.log(`
🎉 Success! Created ${projectName} at ${targetDir}
Inside that directory, you can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm start
    Runs the built app in production mode.

We suggest that you begin by typing:

  cd ${projectName}
  npm run dev
    `);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

main();
