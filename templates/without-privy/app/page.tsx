import { ThemeToggle } from '@/components/theme/theme-toggle';
import TokenPrice from '@/components/token-price';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold mb-6 text-primary">Welcome!</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-2 text-foreground">
        <span className="text-lg font-medium">Nextjs</span>
        <span className="text-lg">•</span>
        <span className="text-lg font-medium">Typescript</span>
        <span className="text-lg">•</span>
        <span className="text-lg font-medium">TailwindCSS</span>
        <span className="text-lg">•</span>
        <span className="text-lg font-medium">Shadcn/UI</span>
      </div>

      <TokenPrice />
      <div className="flex gap-4">
        <Button variant="default">Start</Button>
        <Button variant="outline">Learn more</Button>
      </div>
    </main>
  );
}
