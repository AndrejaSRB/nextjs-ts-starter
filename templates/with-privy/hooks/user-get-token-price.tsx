import { useQuery } from '@tanstack/react-query';

export interface UniverseItem {
  szDecimals: number;
  name: string;
  maxLeverage: number;
}

export interface AssetContext {
  funding: string;
  openInterest: string;
  prevDayPx: string;
  dayNtlVlm: string;
  premium: string;
  oraclePx: string;
  markPx: string;
  midPx: string;
  impactPxs: string[];
  dayBaseVlm: string;
}

export interface HyperliquidResponse {
  universe: UniverseItem[];
  assetCtxs: AssetContext[];
}

const getCurrentPrice = async (symbol: string): Promise<number> => {
  try {
    const res = await fetch('https://api.hyperliquid.xyz/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'metaAndAssetCtxs' }),
    });

    if (!res.ok) {
      console.error('API response not OK:', res.status, res.statusText);
      throw new Error(`Failed to fetch price data: ${res.statusText}`);
    }

    const data = (await res.json()) as [HyperliquidResponse, AssetContext[]];

    const [metaData, assetCtxs] = data;

    if (!metaData?.universe?.length || !assetCtxs?.length) {
      throw new Error('No price data available');
    }

    const tokenIndex = metaData.universe.findIndex(item => item.name === symbol.toUpperCase());

    if (tokenIndex === -1) {
      throw new Error(
        `Symbol "${symbol}" is not supported. Please check the symbol and try again.`
      );
    }

    const assetContext = assetCtxs[tokenIndex];
    const price = parseFloat(assetContext.oraclePx);

    return price;
  } catch (error) {
    console.error('Error in getCurrentPrice:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get price for ${symbol}: ${error.message}`);
    }
    throw new Error(`Failed to get price for ${symbol}`);
  }
};

export const useTokenPrice = (symbol: string) => {
  return useQuery({
    queryKey: ['tokenPrice', symbol],
    queryFn: () => getCurrentPrice(symbol),
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    enabled: !!symbol,
  });
};

export default getCurrentPrice;
