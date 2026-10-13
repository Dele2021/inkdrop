/**
 * Analytics — lightweight event tracking.
 *
 * Logs events to console in dev, ready to wire to
 * Plausible, PostHog, or any provider in production.
 * Just replace the track() implementation.
 */

const isDev = process.env.NODE_ENV === "development";

export function track(event, properties = {}) {
  if (isDev) {
    console.debug(`[analytics] ${event}`, properties);
  }

  // Wire your analytics provider here:
  // posthog?.capture(event, properties);
  // plausible?.(event, { props: properties });
}

// Pre-defined events
export const events = {
  LINK_CREATED: "link_created",
  LINK_TOGGLED: "link_toggled",
  PAYMENT_COMPLETED: "payment_completed",
  PAYMENT_FAILED: "payment_failed",
  WALLET_CONNECTED: "wallet_connected",
  ETH_PAY_STARTED: "eth_pay_started",
  QR_VIEWED: "qr_viewed",
  LINK_SHARED: "link_shared",
  CSV_EXPORTED: "csv_exported",
  WITHDRAWAL: "withdrawal",
};
