"use client";

import { useState, useEffect } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, formatEther, formatUnits } from "viem";
import { INKDROP_ABI, VELODROME_ROUTER_ABI } from "@/lib/contracts";
import { CONTRACT_ADDRESS, SWAP_ROUTER, WETH_ADDRESS, DEFAULT_TOKEN } from "@/lib/config";
import { formatTokenAmount } from "@/lib/utils";
import { ErrorMessage, parseError } from "@/components/ErrorMessage";

export function ETHPayOption({ linkId, link, onSuccess, onBack }) {
  const { address } = useAccount();
  const [ethAmount, setEthAmount] = useState("");
  const [minTokenOut, setMinTokenOut] = useState(0n);
  const [quoteUSDC, setQuoteUSDC] = useState(null);
  const [error, setError] = useState(null);

  const { data: ethBalance } = useBalance({ address });

  const isFixedAmount = link.amount > 0n;
  const SLIPPAGE_BPS = 200;

  const { data: rateData } = useReadContract({
    address: SWAP_ROUTER,
    abi: VELODROME_ROUTER_ABI,
    functionName: "getAmountsOut",
    args: [
      parseEther("1"),
      [
        {
          from: WETH_ADDRESS,
          to: DEFAULT_TOKEN.address,
          stable: false,
          factory: SWAP_ROUTER,
        },
      ],
    ],
    query: { enabled: !!SWAP_ROUTER },
  });

  const usdcPerEth = rateData ? rateData[rateData.length - 1] : null;

  useEffect(() => {
    if (!usdcPerEth || usdcPerEth === 0n) return;
    if (isFixedAmount) {
      const rawEth = (link.amount * BigInt(1e18)) / usdcPerEth;
      const bufferedEth = (rawEth * 10200n) / 10000n;
      setEthAmount(formatEther(bufferedEth));
      setMinTokenOut(link.amount);
      setQuoteUSDC(formatUnits(link.amount, 6));
    }
  }, [usdcPerEth, isFixedAmount, link.amount]);

  useEffect(() => {
    if (isFixedAmount || !usdcPerEth || !ethAmount) return;
    try {
      const ethWei = parseEther(ethAmount);
      const estimatedUSDC = (ethWei * usdcPerEth) / BigInt(1e18);
      const minOut = (estimatedUSDC * BigInt(10000 - SLIPPAGE_BPS)) / 10000n;
      setMinTokenOut(minOut);
      setQuoteUSDC(formatUnits(estimatedUSDC, 6));
    } catch {
      setQuoteUSDC(null);
      setMinTokenOut(0n);
    }
  }, [ethAmount, usdcPerEth, isFixedAmount]);

  const { data: txHash, writeContract, isPending: isSending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess && txHash) {
      onSuccess(txHash);
    }
  }, [isSuccess, txHash, onSuccess]);

  const handlePay = () => {
    setError(null);
    try {
      const ethWei = parseEther(ethAmount);
      if (ethBalance && ethWei > ethBalance.value) {
        setError("Insufficient ETH balance");
        return;
      }
      writeContract(
        {
          address: CONTRACT_ADDRESS,
          abi: INKDROP_ABI,
          functionName: "payWithETH",
          args: [linkId, minTokenOut],
          value: ethWei,
        },
        {
          onError: (err) => setError(parseError(err)),
        }
      );
    } catch (err) {
      setError("Invalid ETH amount");
    }
  };

  const isLoading = isSending || isConfirming;
  const ethPrice = usdcPerEth ? Number(formatUnits(usdcPerEth, 6)) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pay with ETH</h3>
        <button onClick={onBack} className="text-sm text-ink-text-secondary hover:text-ink-text">
          ← Pay with USDC
        </button>
      </div>

      {ethPrice && (
        <p className="text-sm text-ink-text-secondary">
          1 ETH ≈ ${ethPrice.toLocaleString()} USDC
        </p>
      )}

      <div className="glass-card">
        <label className="text-sm text-ink-text-secondary block mb-1">
          {isFixedAmount ? "ETH to send (calculated)" : "ETH amount"}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.0001"
            min="0"
            value={ethAmount}
            onChange={(e) => !isFixedAmount && setEthAmount(e.target.value)}
            readOnly={isFixedAmount}
            placeholder="0.00"
            className="w-full bg-transparent text-2xl font-bold outline-none"
          />
          <span className="text-ink-text-secondary text-lg">ETH</span>
        </div>

        {ethBalance && (
          <p className="text-xs text-ink-text-secondary mt-1">
            Balance: {Number(formatEther(ethBalance.value)).toFixed(4)} ETH
            {!isFixedAmount && (
              <button
                onClick={() => {
                  const max = ethBalance.value - parseEther("0.001");
                  if (max > 0n) setEthAmount(formatEther(max));
                }}
                className="ml-2 text-ink-purple hover:underline"
              >
                Max
              </button>
            )}
          </p>
        )}

        {quoteUSDC && (
          <p className="text-sm text-ink-purple mt-2">
            Seller receives ≈ {Number(quoteUSDC).toFixed(2)} USDC
          </p>
        )}
      </div>

      <p className="text-xs text-ink-text-secondary">
        2% slippage buffer · Swaps via DEX · Single transaction
      </p>

      <button
        onClick={handlePay}
        disabled={isLoading || !ethAmount || Number(ethAmount) <= 0}
        className="btn-primary w-full"
      >
        {isSending ? "Confirm in wallet..." : isConfirming ? "Confirming..." : "Pay " + (ethAmount || "0") + " ETH"}
      </button>

      {error && <ErrorMessage error={error} />}
    </div>
  );
}
