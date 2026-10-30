// v2
"use client";

/**
 * BUYER PAY PAGE — The checkout experience.
 *
 * Two clear paths, no jargon:
 *
 * PATH A: "Pay with Wallet" — crypto-native buyers
 * PATH B: "Pay with Email"  — everyone else (grandma-friendly)
 *
 * Both paths end the same: USDC lands in the seller's contract balance.
 */

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePrivy } from "@privy-io/react-auth";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import toast from "react-hot-toast";

import { INKDROP_ABI, ERC20_ABI } from "@/lib/contracts";
import { CONTRACT_ADDRESS, DEFAULT_TOKEN, FEE_PERCENT, EXPLORER_URL } from "@/lib/config";
import { formatTokenAmount, parseTokenAmount, shortenAddress } from "@/lib/utils";
import { useSmartAccount } from "@/hooks/useSmartAccount";
import { ErrorMessage, parseError } from "@/components/ErrorMessage";
import { ETHPayOption } from "@/components/ETHPayOption";
import { GhostLogo } from "@/components/GhostLogo";

/* ── Ghost Logo (matches landing + dashboard) ── */

/* ── Inline Icon Components ── */
function WalletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a1 1 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="url(#checkGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
      <defs>
        <linearGradient id="checkGrad" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="#9E70FF" />
          <stop offset="100%" stopColor="#7132F5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ── Payment method selector ──────────────────────────────
function PayMethodSelector({ onSelect }) {
  return (
    <div className="space-y-3 animate-fade-up">
      <p
        className="text-sm font-medium text-center mb-4"
        style={{ color: "var(--ink-text-secondary)" }}
      >
        How would you like to pay?
      </p>

      <button
        onClick={() => onSelect("wallet")}
        className="w-full p-4 rounded-xl transition-all duration-200 text-left group"
        style={{
          background: "var(--ink-surface)",
          border: "1px solid var(--ink-border)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(113, 50, 245, 0.3)";
          e.currentTarget.style.background = "rgba(113, 50, 245, 0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--ink-border)";
          e.currentTarget.style.background = "var(--ink-surface)";
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(113, 50, 245, 0.12)", color: "var(--ink-light)" }}
          >
            <WalletIcon />
          </div>
          <div>
            <p className="font-semibold">Pay with Wallet</p>
            <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
              MetaMask, Rabby, or any crypto wallet
            </p>
          </div>
        </div>
      </button>

      <button
        onClick={() => onSelect("email")}
        className="w-full p-4 rounded-xl transition-all duration-200 text-left group"
        style={{
          background: "var(--ink-surface)",
          border: "1px solid var(--ink-border)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(113, 50, 245, 0.3)";
          e.currentTarget.style.background = "rgba(113, 50, 245, 0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--ink-border)";
          e.currentTarget.style.background = "var(--ink-surface)";
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(113, 50, 245, 0.12)", color: "var(--ink-light)" }}
          >
            <MailIcon />
          </div>
          <div>
            <p className="font-semibold">Pay with Email</p>
            <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
              No wallet needed — sign in with email or Google
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

// ── Wallet Payment Flow ──────────────────────────────────
function WalletPayFlow({ linkId, link, payAmount, onSuccess, onBack }) {
  const { address, isConnected } = useAccount();
  const [flowError, setFlowError] = useState(null);

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: DEFAULT_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address, CONTRACT_ADDRESS],
    query: { enabled: !!address },
  });

  const { data: tokenBalance } = useReadContract({
    address: DEFAULT_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address },
  });

  // Approve
  const {
    writeContract: approveWrite,
    data: approveHash,
    isPending: isApproving,
    error: approveError,
  } = useWriteContract();
  const { isLoading: isApproveConfirming, isSuccess: approveSuccess } =
    useWaitForTransactionReceipt({ hash: approveHash });

  // Pay
  const {
    writeContract: payWrite,
    data: payHash,
    isPending: isPaying,
    error: payError,
  } = useWriteContract();
  const { isLoading: isPayConfirming, isSuccess: paySuccess } =
    useWaitForTransactionReceipt({ hash: payHash });

  useEffect(() => {
    if (approveSuccess) {
      refetchAllowance();
      toast.success("Approved! Now click Pay.");
      setFlowError(null);
    }
  }, [approveSuccess, refetchAllowance]);

  useEffect(() => {
    if (paySuccess) onSuccess(payHash);
  }, [paySuccess, onSuccess]);

  // Surface errors
  useEffect(() => {
    if (approveError) setFlowError(approveError);
    if (payError) setFlowError(payError);
  }, [approveError, payError]);

  const needsApproval = !allowance || allowance < payAmount;
  const hasEnoughBalance = tokenBalance && tokenBalance >= payAmount;

  if (!isConnected) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
          Connect your wallet to pay
        </p>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
        <BackButton onClick={onBack} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Balance warning */}
      {tokenBalance !== undefined && !hasEnoughBalance && payAmount > 0n && (
        <ErrorMessage
          error={`Insufficient USDC. You have $${formatTokenAmount(tokenBalance)}.`}
        />
      )}

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <span
          className="px-3 py-1.5 rounded-full font-medium"
          style={{
            background: needsApproval
              ? "rgba(113, 50, 245, 0.15)"
              : "rgba(52, 211, 153, 0.15)",
            color: needsApproval ? "var(--ink-light)" : "var(--ink-success)",
          }}
        >
          {needsApproval ? "1. Approve" : "✓ Approved"}
        </span>
        <span style={{ color: "var(--ink-border)" }}>→</span>
        <span
          className="px-3 py-1.5 rounded-full font-medium"
          style={{
            background: !needsApproval
              ? "rgba(113, 50, 245, 0.15)"
              : "var(--ink-surface)",
            color: !needsApproval ? "var(--ink-light)" : "var(--ink-text-secondary)",
          }}
        >
          2. Pay
        </span>
      </div>

      {/* Error display */}
      <ErrorMessage error={flowError} />

      {/* Action button */}
      {needsApproval ? (
        <button
          onClick={() => {
            setFlowError(null);
            approveWrite({
              address: DEFAULT_TOKEN.address,
              abi: ERC20_ABI,
              functionName: "approve",
              args: [CONTRACT_ADDRESS, payAmount],
            });
          }}
          disabled={isApproving || isApproveConfirming || payAmount === 0n}
          className="btn-primary w-full py-3.5 text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isApproving
            ? "Confirm in wallet..."
            : isApproveConfirming
            ? "Approving..."
            : "Approve USDC"}
        </button>
      ) : (
        <button
          onClick={() => {
            setFlowError(null);
            payWrite({
              address: CONTRACT_ADDRESS,
              abi: INKDROP_ABI,
              functionName: "pay",
              args: [linkId, payAmount],
            });
          }}
          disabled={isPaying || isPayConfirming}
          className="btn-primary w-full py-3.5 text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPaying
            ? "Confirm in wallet..."
            : isPayConfirming
            ? "Processing..."
            : `Pay $${formatTokenAmount(payAmount)}`}
        </button>
      )}

      <BackButton onClick={onBack} />
    </div>
  );
}

// ── Email Payment Flow ───────────────────────────────────
function EmailPayFlow({ linkId, link, payAmount, onSuccess, onBack }) {
  const { login, authenticated, logout } = usePrivy();
  const {
    isReady,
    user,
    approveAndPay,
    payWithEth,
    getBalance,
    smartAccountAddress,
    gasMode,
  } = useSmartAccount();
  const [isPaying, setIsPaying] = useState(false);
  const [balance, setBalance] = useState(null);
  const [flowError, setFlowError] = useState(null);

  useEffect(() => {
    if (isReady) {
      getBalance().then(setBalance);
    }
  }, [isReady, getBalance]);

  const handlePay = async () => {
    if (!isReady || payAmount === 0n) return;
    setIsPaying(true);
    setFlowError(null);
    try {
      let receipt;
      if (payWithETH) {
        const { parseEther } = await import("viem");
        const usdcAmount = Number(payAmount) / 1e6;
        const ethAmount = parseEther(String((usdcAmount / ethPrice * 1.01).toFixed(18)));
        receipt = await payWithEth(linkId, ethAmount);
      } else {
        receipt = await approveAndPay(linkId, payAmount);
      }
      toast.success("Payment complete!");
      onSuccess(receipt.transactionHash);
    } catch (error) {
      console.error("Payment failed:", error);
      setFlowError(error);
    } finally {
      setIsPaying(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
          Sign in to pay — no crypto wallet needed
        </p>
        <button onClick={login} className="btn-primary w-full py-3.5 text-sm rounded-xl">
          Sign in with Email or Google
        </button>
        <BackButton onClick={onBack} />
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="text-center space-y-4 py-4">
        <GhostLogo size={40} />
        <div className="mx-auto w-fit">
          <div
            className="h-1 w-24 rounded-full overflow-hidden"
            style={{ background: "var(--ink-surface)" }}
          >
            <div
              className="h-full w-1/2 rounded-full animate-pulse"
              style={{ background: "var(--ink-purple)" }}
            />
          </div>
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
          Setting up your account...
        </p>
      </div>
    );
  }

  const hasEnoughBalance = balance !== null && balance >= payAmount;
  const userEmail =
    user?.email?.address || user?.google?.email || "your account";

  return (
    <div className="space-y-4">
      {/* Signed in as */}
      <div
        className="rounded-xl p-3 flex items-center justify-between"
        style={{
          background: "var(--ink-surface)",
          border: "1px solid var(--ink-border)",
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: "var(--ink-success)" }}
          />
          <span className="text-sm truncate" style={{ color: "var(--ink-text-secondary)" }}>
            Signed in as{" "}
            <span style={{ color: "var(--ink-text)" }}>{userEmail}</span>
          </span>
        </div>
        <button
          onClick={logout}
          className="text-xs shrink-0 ml-2 transition-colors"
          style={{ color: "var(--ink-text-secondary)" }}
          onMouseEnter={(e) => (e.target.style.color = "var(--ink-light)")}
          onMouseLeave={(e) => (e.target.style.color = "var(--ink-text-secondary)")}
        >
          Sign out
        </button>
      </div>

      {/* Balance check */}
      {balance !== null && !hasEnoughBalance && payAmount > 0n && (
        <div
          className="rounded-xl p-3 text-center"
          style={{
            background: "rgba(251, 191, 36, 0.08)",
            border: "1px solid rgba(251, 191, 36, 0.2)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--ink-warning)" }}>
            You need ${formatTokenAmount(payAmount)} USDC to pay.
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--ink-text-secondary)" }}>
            Send USDC to{" "}
            <span style={{ fontFamily: "var(--font-mono)" }}>
              {shortenAddress(smartAccountAddress)}
            </span>{" "}
            first, then come back.
          </p>
        </div>
      )}

      {/* Error display */}
      <ErrorMessage error={flowError} />

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={isPaying || payAmount === 0n}
        className="btn-primary w-full py-3.5 text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPaying
          ? "Processing payment..."
          : `Pay $${formatTokenAmount(payAmount)}`}
      </button>

      <p className="text-xs text-center" style={{ color: "var(--ink-text-secondary)" }}>
        Gas fee:{" "}
        {gasMode === "gasless" ? (
          <span style={{ color: "var(--ink-success)" }}>$0 (covered by Ink)</span>
        ) : (
          <span style={{ color: "var(--ink-success)" }}>~$0.001 (Ink L2)</span>
        )}
      </p>

      <BackButton onClick={onBack} />
    </div>
  );
}

// ── Back Button ──────────────────────────────────────────
function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-1.5 text-sm py-1 transition-colors"
      style={{ color: "var(--ink-text-secondary)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-light)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-text-secondary)")}
    >
      <ArrowLeftIcon />
      Choose a different method
    </button>
  );
}

// ── Success Screen ───────────────────────────────────────
function PaymentSuccess({ amount, link, txHash }) {
  return (
    <div className="text-center animate-fade-up px-4">
      <div className="flex justify-center mb-5">
        <CheckCircleIcon />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gradient">Payment Complete!</h2>
      <p className="font-medium" style={{ color: "var(--ink-text-secondary)" }}>
        ${formatTokenAmount(amount)} USDC sent to{" "}
        {shortenAddress(link.seller)}
      </p>

      <div
        className="glass-card mt-6 p-5 space-y-3"
      >
        <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
          Confirmed in ~1 second on Ink Chain
        </p>

        {txHash && (
          <a
            href={`${EXPLORER_URL}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--ink-light)" }}
            onMouseEnter={(e) => (e.target.style.color = "var(--ink-purple)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--ink-light)")}
          >
            View on Explorer <ExternalLinkIcon />
          </a>
        )}
      </div>

      <div className="mt-6">
        <a
          href="/"
          className="btn-ghost px-6 py-2.5 text-sm rounded-xl inline-block"
        >
          Back to InkDrop
        </a>
      </div>
    </div>
  );
}

// ── Loading Skeleton ─────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center space-y-4 py-4">
            <div className="flex justify-center">
              <GhostLogo size={40} />
            </div>
            <div
              className="h-6 rounded-lg w-2/3 mx-auto animate-pulse"
              style={{ background: "var(--ink-surface)" }}
            />
            <div
              className="h-4 rounded-lg w-1/2 mx-auto animate-pulse"
              style={{ background: "var(--ink-surface)" }}
            />
            <div
              className="h-16 rounded-xl w-full animate-pulse mt-4"
              style={{ background: "var(--ink-surface)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Status Page (not found / paused) ─────────────────────
function StatusPage({ icon, title, description }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card text-center max-w-sm w-full p-8">
        <div className="flex justify-center mb-4">{icon}</div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function PayPage() {
  const params = useParams();
  const linkId = params.id;
  const [payMethod, setPayMethod] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [payWithETH, setPayWithETH] = useState(false);
  const [ethPrice, setEthPrice] = useState(2000);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      .then(r => r.json())
      .then(d => setEthPrice(d.ethereum.usd))
      .catch(() => {});
  }, []);
  const [txHash, setTxHash] = useState(null);

  const {
    data: link,
    isLoading,
    error,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: INKDROP_ABI,
    functionName: "getLink",
    args: [linkId],
    query: { enabled: !!linkId },
  });

  const isOpenAmount = link && link.amount === 0n;
  const payAmount = isOpenAmount
    ? customAmount
      ? parseTokenAmount(customAmount, 6)
      : 0n
    : link?.amount || 0n;

  const fee = payAmount > 0n ? (payAmount * 100n) / 10000n : 0n;

  if (isLoading) return <LoadingSkeleton />;

  if (
    error ||
    !link ||
    link.seller === "0x0000000000000000000000000000000000000000"
  ) {
    return (
      <StatusPage
        icon={
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(239, 68, 68, 0.12)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
        }
        title="Link Not Found"
        description="This payment link doesn't exist or has been removed."
      />
    );
  }

  if (!link.active) {
    return (
      <StatusPage
        icon={
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(251, 191, 36, 0.12)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </div>
        }
        title="Link Paused"
        description="This payment link is currently not accepting payments."
      />
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <PaymentSuccess amount={payAmount} link={link} txHash={txHash} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 sm:py-12">
      {/* Background glow */}
      <div
        className="glow-orb"
        style={{
          width: 400,
          height: 400,
          background: "#7132F5",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-6 sm:p-8 animate-fade-up">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <GhostLogo size={40} />
            </div>
            <h1 className="text-lg sm:text-xl font-bold mb-1">{link.title}</h1>
            {link.description && (
              <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
                {link.description}
              </p>
            )}
            <p className="text-xs mt-2" style={{ color: "var(--ink-text-muted)" }}>
              Paying{" "}
              <span style={{ fontFamily: "var(--font-mono)" }}>
                {shortenAddress(link.seller)}
              </span>
            </p>
          </div>

          {/* Amount display / input */}
          <div
            className="rounded-xl p-4 mb-6 text-center"
            style={{
              background: "var(--ink-surface)",
              border: "1px solid var(--ink-border)",
            }}
          >
            {isOpenAmount ? (
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-2 text-center"
                  style={{ color: "var(--ink-text-muted)" }}
                >
                  Enter amount
                </label>
                <div className="relative max-w-[200px] mx-auto">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-medium"
                    style={{ color: "var(--ink-text-muted)" }}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full text-center text-3xl font-bold pl-10 py-4 rounded-xl outline-none"
                    style={{
                      background: "transparent",
                      color: "var(--ink-text)",
                      border: "none",
                    }}
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    autoFocus
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--ink-text-muted)" }}>
                  USDC
                </p>
              </div>
            ) : (
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gradient-purple">
                  ${formatTokenAmount(link.amount)}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--ink-text-secondary)" }}>
                  USDC
                </p>
              </div>
            )}
          </div>

          {/* Payment method selection OR payment flow */}
          {!payMethod ? (
            <PayMethodSelector onSelect={setPayMethod} />
          ) : payMethod === "wallet" ? (
            <>
              {/* USDC / ETH toggle */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setPayWithETH(false)} style={{display:"none"}}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: !payWithETH ? "var(--ink-purple)" : "var(--ink-surface)",
                    color: !payWithETH ? "#fff" : "var(--ink-text-secondary)",
                    border: `1px solid ${!payWithETH ? "var(--ink-purple)" : "var(--ink-border)"}`,
                  }}
                >
                  USDC
                </button>
                <button
                  onClick={() => setPayWithETH(true)} style={{display:"none"}}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: payWithETH ? "var(--ink-purple)" : "var(--ink-surface)",
                    color: payWithETH ? "#fff" : "var(--ink-text-secondary)",
                    border: `1px solid ${payWithETH ? "var(--ink-purple)" : "var(--ink-border)"}`,
                  }}
                >
                  ETH
                </button>
              </div>
              {false ? (
                <ETHPayOption
                  linkId={linkId}
                  link={link}
                  onSuccess={(hash) => { setTxHash(hash); setIsSuccess(true); }}
                  onBack={() => setPayWithETH(false)}
                />
              ) : (
                <WalletPayFlow
                  linkId={linkId}
                  link={link}
                  payAmount={payAmount}
                  onSuccess={(hash) => { setTxHash(hash); setIsSuccess(true); }}
                  onBack={() => setPayMethod(null)}
                />
              )}
            </>
          ) : (
            <EmailPayFlow
              linkId={linkId}
              link={link}
              payAmount={payAmount}
              onSuccess={(hash) => { setTxHash(hash); setIsSuccess(true); }}
              onBack={() => setPayMethod(null)}
            />
          )}

          {/* Fee disclosure */}
          {payAmount > 0n && (
            <div
              className="mt-5 pt-4"
              style={{ borderTop: "1px solid var(--ink-border)" }}
            >
              <div className="flex justify-between text-sm" style={{ color: "var(--ink-text-secondary)" }}>
                <span>Network fee</span>
                <span style={{ color: "var(--ink-success)" }}>~$0.001</span>
              </div>
              <div className="flex justify-between text-sm mt-1" style={{ color: "var(--ink-text-secondary)" }}>
                <span>Service fee ({FEE_PERCENT}%)</span>
                <span>${formatTokenAmount(fee)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-4" style={{ color: "var(--ink-text-muted)" }}>
          Powered by{" "}
          <span className="text-gradient font-semibold">InkDrop</span>{" "}
          on Ink Chain
        </p>
      </div>
    </div>
  );
}
