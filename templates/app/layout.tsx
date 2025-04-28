import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';

import Providers from '@/components/privy/privy-provider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import QueryProvider from '@/providers/query-client';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextJS Typescript Starter',
  description: 'A starter for NextJS with Typescript, TailwindCSS, and Shadcn/UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <Providers>{children}</Providers>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
