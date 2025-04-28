'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import * as React from 'react';

import { Toggle } from '@/components/ui/toggle';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      pressed={theme === 'dark' || theme === 'system'}
      onPressedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="outline"
      size="lg"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Toggle>
  );
}
