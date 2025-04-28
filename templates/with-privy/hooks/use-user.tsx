'use client';

import { usePrivy } from '@privy-io/react-auth';

const useUser = () => {
  const { ready, authenticated, user } = usePrivy();

  if (!ready || !authenticated) {
    return null;
  }

  return user;
};

export default useUser;
