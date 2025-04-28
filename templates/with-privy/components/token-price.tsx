'use client';

import { useTokenPrice } from '@/hooks/user-get-token-price';

const TokenPrice = () => {
  const { data: btcPrice, isLoading, error } = useTokenPrice('BTC');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-destructive">Error: {error.message}</p>;

  return <p>BTC Price: ${btcPrice?.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>;
};

export default TokenPrice;
