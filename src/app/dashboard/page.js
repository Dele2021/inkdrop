"use client";

import { useState, useEffect, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits } from "viem";
import toast from "react-hot-toast";
import Link from "next/link";

import { INKDROP_ABI, ERC20_ABI } from "@/lib/contracts";
import { CONTRACT_ADDRESS, DEFAULT_TOKEN } from "@/lib/config";
import {
  shortenAddress,
  formatTokenAmount,
  formatDate,
  getPayUrl,
  copyToClipboard,
} from "@/lib/utils";
import { QRCode } from "@/components/QRCode";
import { ShareButtons } from "@/components/ShareButtons";
import { ErrorMessage, parseError } from "@/components/ErrorMessage";
import { GhostLogo } from "@/components/GhostLogo";
import { PlusIcon, CopyIcon, WalletIcon } from "@/components/Icons";

// ── Create Link Form ─────────────────────────────────────
function CreateLinkForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState(null);

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const hasToasted = useRef(false);

  useEffect(() => {
    if (isSuccess && !hasToasted.current) {
      hasToasted.current = true;
      toast.success("Payment link created!");
      setTitle("");
      setDescription("");
      setAmount("");
      setIsOpen(false);
      setFormError(null);
      if (onSuccess) onSuccess();
    }
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (writeError) setFormError(writeError);
  }, [writeError]);

    const handleCreate = () => {
        setFormError(null);
        hasToasted.current = false;

        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            toast.error("Add a title for your link");
            return;
        }
        if (trimmedTitle.length > 80) {
            toast.error("Title must be 80 characters or less");
            return;
        }
        if (!isOpen) {
            if (!amount) {
                toast.error("Set an amount or toggle 'flexible amount'");
                return;
            }
            const parsed = parseFloat(amount);
            if (isNaN(parsed) || parsed <= 0) {
                toast.error("Amount must be a positive number");
                return;
            }
            if (parsed > 1_000_000) {
                toast.error("Amount cannot exceed 1,000,000");
                return;
            }
        }

    const tokenAmount = isOpen
      ? 0n
      : parseUnits(amount, DEFAULT_TOKEN.decimals);

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: INKDROP_ABI,
      functionName: "createLink",
      args: [
        tokenAmount,
        DEFAULT_TOKEN.address,
        title.trim(),
        description.trim(),
        "",
      ],
    });
  };

  return (
    <div className="glass-card p-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(113, 50, 245, 0.12)" }}
        >
          <PlusIcon />
        </div>
        <h2 className="text-lg font-bold">Create Payment Link</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "var(--ink-text-muted)" }}
          >
            Title *
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
            style={{
              background: "var(--ink-surface)",
              border: "1px solid var(--ink-border)",
              color: "var(--ink-text)",
            }}
            onFocus={(e) => e.target.style.borderColor = "rgba(113, 50, 245, 0.4)"}
            onBlur={(e) => e.target.style.borderColor = "var(--ink-border)"}
            placeholder="e.g. Logo Design for Acme Corp"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "var(--ink-text-muted)" }}
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none resize-none transition-all"
            style={{
              background: "var(--ink-surface)",
              border: "1px solid var(--ink-border)",
              color: "var(--ink-text)",
            }}
            onFocus={(e) => e.target.style.borderColor = "rgba(113, 50, 245, 0.4)"}
            onBlur={(e) => e.target.style.borderColor = "var(--ink-border)"}
            rows={2}
            placeholder="What's this payment for? (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--ink-text-muted)" }}
            >
              Amount (USDC)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--ink-text-secondary)" }}>
              <input
                type="checkbox"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
                className="rounded accent-ink-purple"
                style={{ accentColor: "var(--ink-purple)" }}
              />
              Flexible amount
            </label>
          </div>
          {!isOpen && (
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium"
                style={{ color: "var(--ink-text-muted)" }}
              >
                $
              </span>
              <input
                type="number"
                className="w-full pl-8 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                style={{
                  background: "var(--ink-surface)",
                  border: "1px solid var(--ink-border)",
                  color: "var(--ink-text)",
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(113, 50, 245, 0.4)"}
                onBlur={(e) => e.target.style.borderColor = "var(--ink-border)"}
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          )}
          {isOpen && (
            <p className="text-sm font-medium" style={{ color: "var(--ink-text-secondary)" }}>
              Buyer can pay any amount — great for tips, donations, or custom invoices.
            </p>
          )}
        </div>

        <ErrorMessage error={formError} />

        <button
          onClick={handleCreate}
          disabled={isPending || isConfirming}
          className="btn-primary w-full py-3.5 text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? "Confirm in wallet..."
            : isConfirming
            ? "Creating..."
            : "Create Link"}
        </button>
      </div>
    </div>
  );
}

// ── Single Link Card ─────────────────────────────────────
function LinkCard({ linkId, link }) {
  const [showPayments, setShowPayments] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const payUrl = getPayUrl(linkId);

  const { writeContract: toggleLink } = useWriteContract();
  const [showToggleConfirm, setShowToggleConfirm] = useState(false);

  const { data: payments } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: INKDROP_ABI,
    functionName: "getLinkPayments",
    args: [linkId],
    query: { enabled: showPayments },
  });

  const handleCopy = async () => {
    await copyToClipboard(payUrl);
    toast.success("Link copied!");
  };

  const exportPaymentsCSV = () => {
    if (!payments || payments.length === 0) return;
    const header = "Buyer,Amount (USDC),Date\n";
    const rows = payments.map((p) =>
      [p.buyer, formatTokenAmount(p.amount), formatDate(p.timestamp)].join(",")
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inkdrop-payments-" + linkId + ".csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded!");
  };

  const handleToggle = () => {
    toggleLink({
      address: CONTRACT_ADDRESS,
      abi: INKDROP_ABI,
      functionName: "toggleLink",
      args: [linkId],
    });
  };

  return (
    <div className="glass-card p-6 animate-fade-up">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold truncate">{link.title}</h3>
            <span
              className={`badge ${
                link.active ? "badge-success" : "badge-pending"
              }`}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: link.active ? "var(--ink-success)" : "var(--ink-warning)",
                  display: "inline-block",
                }}
              />
              {link.active ? "Active" : "Paused"}
            </span>
          </div>
          {link.description && (
            <p
              className="text-sm font-medium mb-2 line-clamp-2"
              style={{ color: "var(--ink-text-secondary)" }}
            >
              {link.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div
        className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium mt-3"
        style={{ color: "var(--ink-text-secondary)" }}
      >
        <span>
          {link.amount > 0n
            ? `$${formatTokenAmount(link.amount)} USDC`
            : "Flexible amount"}
        </span>
        <span>{Number(link.paymentCount)} payments</span>
        <span style={{ color: "var(--ink-light)" }}>
          ${formatTokenAmount(link.totalReceived)} received
        </span>
      </div>

      {/* URL bar */}
      <div
        className="mt-4 p-3 rounded-xl flex items-center gap-2 cursor-pointer group"
        style={{
          background: "var(--ink-surface)",
          border: "1px solid var(--ink-border)",
        }}
        onClick={handleCopy}
      >
        <span
          className="text-xs truncate flex-1"
          style={{ color: "var(--ink-text-muted)", fontFamily: "var(--font-mono)" }}
        >
          {payUrl}
        </span>
        <span
          className="shrink-0 transition-colors"
          style={{ color: "var(--ink-text-muted)" }}
        >
          <CopyIcon />
        </span>
      </div>

      {/* Share buttons */}
      <div className="mt-3">
        <ShareButtons url={payUrl} title={link.title} />
      </div>

      {/* Management buttons */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowQR(!showQR)}
          className="btn-ghost px-4 py-2 text-sm rounded-xl"
        >
          {showQR ? "Hide QR" : "QR Code"}
        </button>
        <button
          onClick={() => setShowToggleConfirm(true)}
          className="btn-ghost px-4 py-2 text-sm rounded-xl"
        >
          {link.active ? "Pause" : "Activate"}
        </button>
        {Number(link.paymentCount) > 0 && (
          <>
            <button
              onClick={() => setShowPayments(!showPayments)}
              className="btn-ghost px-4 py-2 text-sm rounded-xl"
            >
              {showPayments ? "Hide" : `${Number(link.paymentCount)} payments`}
            </button>
            {showPayments && payments && payments.length > 0 && (
              <button
                onClick={exportPaymentsCSV}
                className="btn-ghost px-4 py-2 text-sm rounded-xl"
              >
                Export CSV
              </button>
            )}
          </>
        )}
      </div>

      {/* QR code */}
      {showToggleConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6" onClick={() => setShowToggleConfirm(false)}>
          <div className="bg-ink-surface border border-ink-border rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">
              {link.active ? "Pause this link?" : "Reactivate this link?"}
            </h3>
            <p className="text-sm text-ink-text-secondary mb-5">
              {link.active
                ? "Buyers won\u2019t be able to pay using this link while it\u2019s paused."
                : "This link will start accepting payments again."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { handleToggle(); setShowToggleConfirm(false); }}
                className="btn-primary flex-1 text-sm"
              >
                {link.active ? "Yes, pause" : "Yes, activate"}
              </button>
              <button
                onClick={() => setShowToggleConfirm(false)}
                className="btn-secondary flex-1 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="mt-5 flex justify-center animate-fade-up">
          <QRCode url={payUrl} size={180} />
        </div>
      )}

      {/* Expandable payments */}
      {showPayments && payments && (
        <div className="mt-5 space-y-2 animate-fade-up">
          {payments.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-sm p-3 rounded-xl gap-2 flex-wrap"
              style={{
                background: "var(--ink-surface)",
                border: "1px solid var(--ink-border)",
              }}
            >
              <span
                className="text-xs"
                style={{ color: "var(--ink-text-muted)", fontFamily: "var(--font-mono)" }}
              >
                {shortenAddress(p.buyer)}
              </span>
              <span className="font-semibold" style={{ color: "var(--ink-light)" }}>
                ${formatTokenAmount(p.amount)}
              </span>
              <span className="text-xs" style={{ color: "var(--ink-text-muted)" }}>
                {formatDate(p.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────
export default function Dashboard() {
  const { address, isConnected } = useAccount();

  const { data: linkIds, refetch: refetchLinks, isLoading: isLinksLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: INKDROP_ABI,
    functionName: "getSellerLinks",
    args: [address],
    query: { enabled: !!address },
  });

  const linkQueries = (linkIds || []).map((id) => ({
    address: CONTRACT_ADDRESS,
    abi: INKDROP_ABI,
    functionName: "getLink",
    args: [id],
  }));

  const { data: linkResults } = useReadContracts({
    contracts: linkQueries,
    query: { enabled: linkQueries.length > 0 },
  });

  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: INKDROP_ABI,
    functionName: "balances",
    args: [address, DEFAULT_TOKEN.address],
    query: { enabled: !!address },
  });

  // Withdraw
  const {
    writeContract: withdrawFn,
    data: withdrawHash,
    isPending: isWithdrawing,
    error: withdrawError,
  } = useWriteContract();
  const { isLoading: isWithdrawConfirming, isSuccess: withdrawSuccess } =
    useWaitForTransactionReceipt({ hash: withdrawHash });
  const hasWithdrawToasted = useRef(false);

  useEffect(() => {
    if (withdrawSuccess && !hasWithdrawToasted.current) {
      hasWithdrawToasted.current = true;
      toast.success("Withdrawal complete!");
    }
  }, [withdrawSuccess]);

  const handleWithdraw = () => {
    hasWithdrawToasted.current = false;
    withdrawFn({
      address: CONTRACT_ADDRESS,
      abi: INKDROP_ABI,
      functionName: "withdraw",
      args: [DEFAULT_TOKEN.address],
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <GhostLogo size={56} />
        <h1 className="text-2xl font-bold text-gradient">Connect your wallet</h1>
        <p
          className="text-base font-medium max-w-sm"
          style={{ color: "var(--ink-text-secondary)" }}
        >
          Connect your wallet to create payment links and manage your InkDrop
          account.
        </p>
        <ConnectButton />
      </div>
    );
  }

  if (isLinksLoading) {
    return (
      <div className="min-h-screen relative">
        <div className="glow-orb" style={{ width: 500, height: 500, background: "#7132F5", top: -250, right: -150 }} />
        <div className="max-w-2xl mx-auto px-4 py-12 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-ink-surface rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-ink-surface rounded-xl animate-pulse" />
          </div>
          <div className="glass-card p-6 mb-6 animate-fade-up">
            <div className="h-5 w-32 bg-ink-surface rounded animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-ink-surface rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-ink-surface rounded animate-pulse" />
            </div>
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="glass-card p-6 mb-4 animate-fade-up">
              <div className="flex justify-between mb-3">
                <div className="h-5 w-40 bg-ink-surface rounded animate-pulse" />
                <div className="h-5 w-16 bg-ink-surface rounded-full animate-pulse" />
              </div>
              <div className="h-4 w-24 bg-ink-surface rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const links = (linkIds || [])
    .map((id, i) => ({
      id,
      data: linkResults?.[i]?.result,
    }))
    .filter((l) => l.data);

  links.reverse();

  return (
    <div className="min-h-screen relative">
      {/* Background glow */}
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          background: "#7132F5",
          top: -250,
          right: -150,
        }}
      />

      {/* Nav */}
      <nav className="relative z-10" style={{ borderBottom: "1px solid var(--ink-border)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <GhostLogo size={24} />
            <span className="text-lg font-bold tracking-tight">InkDrop</span>
          </Link>
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
          />
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Balance Card */}
        <div className="accent-card p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <WalletIcon />
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--ink-text-muted)" }}
              >
                Available to withdraw
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="text-gradient-purple">
                ${balance ? formatTokenAmount(balance) : "0.00"}
              </span>
              <span
                className="text-base font-medium ml-2"
                style={{ color: "var(--ink-text-muted)" }}
              >
                USDC
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleWithdraw}
              disabled={
                !balance ||
                balance === 0n ||
                isWithdrawing ||
                isWithdrawConfirming
              }
              className="btn-primary px-6 py-3 text-sm rounded-xl whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isWithdrawing
                ? "Confirm..."
                : isWithdrawConfirming
                ? "Withdrawing..."
                : "Withdraw"}
            </button>
            <ErrorMessage error={withdrawError} />
          </div>
        </div>

        {/* Create Link */}
        <CreateLinkForm onSuccess={() => refetchLinks()} />

        {/* My Links */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">
              Your Links
              <span
                className="ml-2 text-sm font-medium"
                style={{ color: "var(--ink-text-muted)" }}
              >
                ({links.length})
              </span>
            </h2>
          </div>

          {links.length === 0 ? (
            <div
              className="glass-card p-12 text-center animate-fade-up"
            >
              <GhostLogo size={40} />
              <p className="font-semibold mt-4 mb-1">
                No payment links yet
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--ink-text-secondary)" }}
              >
                Create your first one above — it takes 10 seconds.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <LinkCard key={link.id} linkId={link.id} link={link.data} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
