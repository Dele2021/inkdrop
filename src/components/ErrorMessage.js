"use client";

/**
 * Human-readable error messages.
 *
 * Blockchain errors are horrifying: hex strings, revert reasons,
 * gas estimation failures. This component translates them into
 * language your grandmother would understand.
 */

const ERROR_MAP = [
  // User rejected
  { match: /user rejected|user denied|rejected the request/i, message: "You cancelled the transaction." },
  // Insufficient funds
  { match: /insufficient funds|exceeds balance/i, message: "Not enough funds in your wallet." },
  // Allowance
  { match: /allowance|ERC20: insufficient/i, message: "USDC approval needed. Please try again." },
  // Wrong amount
  { match: /wrong amount/i, message: "The payment amount doesn't match what's required." },
  // Link inactive
  { match: /link inactive|not active/i, message: "This payment link is no longer active." },
  // Link not found
  { match: /link not found|not found/i, message: "This payment link doesn't exist." },
  // Network
  { match: /network|chain/i, message: "Please switch to Ink Chain in your wallet." },
  // Gas
  { match: /gas|underpriced/i, message: "Transaction fee issue. Please try again." },
  // Generic revert
  { match: /revert|execution reverted/i, message: "Transaction failed. Please try again." },
  // Connection
  { match: /connect|disconnected/i, message: "Wallet disconnected. Please reconnect." },
];

export function parseError(error) {
  if (!error) return "Something went wrong. Please try again.";

  const errorString = error.message || error.toString() || "";

  for (const { match, message } of ERROR_MAP) {
    if (match.test(errorString)) {
      return message;
    }
  }

  // Fallback — don't show hex garbage
  return "Something went wrong. Please try again.";
}

export function ErrorMessage({ error, className = "" }) {
  if (!error) return null;

  const message = typeof error === "string" ? error : parseError(error);

  return (
    <div
      className={`bg-ghost-error/10 border border-ghost-error/30 rounded-xl p-3 text-center ${className}`}
    >
      <p className="text-sm text-ghost-error">{message}</p>
    </div>
  );
}
