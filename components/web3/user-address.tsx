'use client';

import useUser from '@/hooks/use-user';
import ellipsis from '@/utils/ellipsis';

const UserAddress = () => {
  const user = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <span className="text-sm text-gray-600 dark:text-gray-300">Wallet Address:</span>
      <code className="font-mono text-sm text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        {ellipsis(user?.wallet?.address)}
      </code>
    </div>
  );
};

export default UserAddress;
