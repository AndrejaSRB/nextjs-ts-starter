import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import ConnectWalletButton from '@/components/web3/connect-wallet';
import UserAddress from '@/components/web3/user-address';

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

      <div className="flex flex-col gap-2 mb-2 text-foreground">
        <UserAddress />
      </div>

      <div className="flex gap-4">
        <ConnectWalletButton />
        <Button variant="outline">Learn more</Button>
      </div>
    </main>
  );
}
