import { Providers } from "./providers";
import "./globals.css";


export const metadata = {
  title: "InkDrop — Checkout Links on Ink",
  description:
    "Create payment links anyone can pay. No wallet, no gas, no crypto knowledge required.",
  openGraph: {
    title: "InkDrop — Get paid with a link",
    description:
      "Create a payment link in seconds. Buyer pays in USDC — no wallet, no gas, no crypto knowledge required. 1% fee. 1-second confirmation.",
    type: "website",
    siteName: "InkDrop",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkDrop — Get paid with a link",
    description:
      "Create a payment link in seconds. Buyer pays in USDC — no wallet, no gas, no crypto knowledge required.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-ink-bg text-white font-body min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
