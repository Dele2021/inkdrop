'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { createWalletClient, custom, parseUnits, encodeFunctionData } from 'viem';
// Ink Chain (OP Stack L2 by Kraken, Chain ID 57073)
const inkMainnet = { id: 57073, name: 'Ink', nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc-gel.inkonchain.com'] } }, blockExplorers: { default: { name: 'Ink Explorer', url: 'https://explorer.inkonchain.com' } } };

const USDC_ADDRESS = '0xF1815bd50389c46847f0Bda824eC8da914045D14';
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const USDC_ABI = [
  {
    name: 'approve',
    type: 'function',
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ name: '', type: 'bool' }],
  },
];

const CONTRACT_ABI = [
  {
    name: 'pay',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'linkId', type: 'string' },
    ],
    outputs: [],
  },
];

export default function PayPage() {
  const { id } = useParams();
  const { login, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/links?id=${id}`)
      .then(r => r.json())
      .then(data => { setLink(data); setLoading(false); })
      .catch(() => { setError('Link not found'); setLoading(false); });
  }, [id]);

  const handlePay = async () => {
    if (!authenticated) { login(); return; }
    const wallet = wallets[0];
    if (!wallet) { setError('No wallet connected'); return; }

    try {
      setPaying(true);
      setError(null);

      const provider = await wallet.getEthereumProvider();
      const client = createWalletClient({ chain: inkMainnet, transport: custom(provider) });
      const [address] = await client.getAddresses();

      const amount = parseUnits(link.amount.toString(), 6); // USDC has 6 decimals

      // Step 1: Approve USDC
      const approveData = encodeFunctionData({
        abi: USDC_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESS, amount],
      });
      const approveTx = await client.sendTransaction({ account: address, to: USDC_ADDRESS, data: approveData });

      // Wait for approve to be mined
      const publicClient = createPublicClient({ chain: inkMainnet, transport: custom(provider) });
      await publicClient.waitForTransactionReceipt({ hash: approveTx });

      // Step 2: Pay via contract
      const payData = encodeFunctionData({
        abi: CONTRACT_ABI,
        functionName: 'pay',
        args: [link.payoutAddress, amount, id],
      });
      const hash = await client.sendTransaction({ account: address, to: CONTRACT_ADDRESS, data: payData });

      setTxHash(hash);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Transaction failed');
    } finally {
      setPaying(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-lg animate-pulse">Loading payment...</div>
    </div>
  );

  if (error && !link) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-2xl font-bold mb-2">Link not found</h1>
        <p className="text-gray-400">This payment link may have expired or doesn't exist.</p>
      </div>
    </div>
  );

  if (txHash) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#080b11] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
          <span className="text-green-400 text-2xl">✓</span>
        </div>
        <h1 className="text-white text-2xl font-bold mb-2">Payment Sent!</h1>
        <p className="text-gray-400 mb-4">Your payment of ${link.amount} USDC has been sent on Ink Chain.</p>
        <a
          href={`https://explorer.inkonchain.com/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A78BFA] text-sm hover:underline"
        >
          View on Explorer →
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#080b11] border border-white/10 rounded-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#7132F5]/20 border border-[#7132F5]/40 flex items-center justify-center">
            <span className="text-[#A78BFA] text-xs font-bold">ID</span>
          </div>
          <span className="text-gray-400 text-sm font-mono">{window?.location?.host ?? "inkdrop-eight.vercel.app"}/pay/{id}</span>
        </div>

        {/* Link details */}
        <h1 className="text-white text-2xl font-bold mb-1">{link.title}</h1>
        {link.description && <p className="text-gray-400 text-sm mb-4">{link.description}</p>}

        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Amount</span>
            <span className="text-white font-bold text-xl font-mono">${link.amount} USDC</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Platform fee (1%)</span>
            <span className="text-gray-300 text-sm font-mono">${(link.amount * 0.01).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-gray-400 text-sm">Recipient receives</span>
            <span className="text-[#A78BFA] font-bold font-mono">${(link.amount * 0.99).toFixed(2)} USDC</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 bg-[#7132F5]/10 border border-[#7132F5]/20 rounded-lg px-3 py-2">
          <span className="text-[#A78BFA] text-xs font-mono">⚡ Ink Chain L2</span>
          <span className="text-gray-500 text-xs">· ~1.8s finality · &lt;$0.001 gas</span>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={paying || !ready}
          className="w-full py-4 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(113,50,245,0.4)] min-h-[52px]"
        >
          {paying ? 'Processing...' : authenticated ? `Pay $${link.amount} USDC` : 'Connect Wallet to Pay'}
        </button>

        <p className="text-center text-gray-600 text-xs mt-4">
          Powered by InkDrop · Secured by Ink Chain
        </p>
      </div>
    </div>
  );
}
