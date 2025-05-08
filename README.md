# Next.js TypeScript Starter

A modern Next.js starter template with TypeScript, Tailwind CSS, and essential tools for building web applications.

## Features

- ⚡️ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 🔒 Authentication with Privy
- 🌙 Dark/Light mode with next-themes
- 🎯 TypeScript for type safety
- 📊 React Query for data fetching
- 🎭 Radix UI components
- 🎨 Shadcn UI components
- 🔄 ESLint & Prettier for code quality

## Installation

### ✅ Recommended: Using npx (runs without installing)

```bash
# Create a new project
npx create-nextjs-ts my-app

# Or install in the current directory
npx create-nextjs-ts .
```

### ❌ Not Recommended: Global installation

```bash
# Install globally (not recommended)
npm install -g create-nextjs-ts

# Then use the command
create-nextjs-ts my-app
```

After creating your project:

```bash
# Navigate to your project
cd my-app

# Start the development server
npm run dev
```

## Included Tools

### Core

- Next.js 15.3.1
- React 19
- TypeScript 5

### Styling

- Tailwind CSS 4
- Shadcn UI
- Radix UI
- next-themes

### Authentication

- Privy.io

### Data Management

- Tanstack React Query
- Viem for Web3

### Development

- ESLint
- Prettier
- TypeScript
- Turbopack

## Project Structure

```
.
├── app/              # Next.js app directory
├── components/       # React components
│   ├── ui/          # UI components
│   ├── web3/        # Web3 components (with Privy)
│   └── theme/       # Theme components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── providers/       # React context providers
└── public/          # Static assets
```

## License

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
