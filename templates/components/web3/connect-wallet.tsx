'use client';

import { usePrivy } from '@privy-io/react-auth';

import { Button } from '../ui/button';

const ConnectWalletButton = () => {
  const { ready, authenticated, login, logout } = usePrivy();

  if (authenticated) {
    return (
      <Button variant="default" onClick={() => logout()}>
        Logout
      </Button>
    );
  }

  return (
    <Button disabled={!ready} variant="default" onClick={() => login()}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
