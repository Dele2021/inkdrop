// ── Utility functions ────────────────────────────────────

/**
 * Shorten an Ethereum address for display: 0x1234...abcd
 */
export function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format a token amount from its smallest unit to display value.
 * e.g. 1000000 with 6 decimals => "1.00"
 */
export function formatTokenAmount(amount, decimals = 6, displayDecimals = 2) {
  if (!amount) return "0.00";
  const value = Number(amount) / 10 ** decimals;
  return value.toFixed(displayDecimals);
}

/**
 * Parse a human-readable amount to token units.
 * e.g. "100" with 6 decimals => 100000000n
 */
export function parseTokenAmount(amount, decimals = 6) {
  const parts = amount.split(".");
  const whole = parts[0] || "0";
  const fraction = (parts[1] || "").padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole) * BigInt(10 ** decimals) + BigInt(fraction);
}

/**
 * Format a timestamp to a readable date
 */
export function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Generate the shareable URL for a payment link
 */
export function getPayUrl(linkId) {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${base}/pay/${linkId}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  }
}
