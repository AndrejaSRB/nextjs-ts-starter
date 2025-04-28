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

## Quick Start

```bash
npx create-nextjs-ts my-app
cd my-app
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
│   ├── web3/        # Web3 components
│   └── theme/       # Theme components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── providers/       # React context providers
└── public/          # Static assets
```

## Development

See [MAINTENANCE.md](./docs/MAINTENANCE.md) for detailed instructions on maintaining and updating the package.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
