'use client';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http } from 'wagmi';

const inkMainnet = {
  id: 57073,
  name: 'Ink',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://rpc-gel.inkonchain.com'] } },
  blockExplorers: { default: { name: 'Ink Explorer', url: 'https://explorer.inkonchain.com' } },
};

const wagmiConfig = createConfig({
  chains: [inkMainnet],
  transports: { [inkMainnet.id]: http() },
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#7132F5',
          logo: 'https://inkdrop-eight.vercel.app/favicon.ico',
        },
        defaultChain: inkMainnet,
        supportedChains: [inkMainnet],
        walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        loginMethods: ['email', 'wallet'],
        embeddedWallets: { createOnLogin: 'users-without-wallets', requireUserPasswordOnImport: false },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
