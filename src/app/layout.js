import './globals.css'

export const metadata = {
  title: 'InkDrop — Crypto Payment Links on Ink Chain',
  description: 'Gasless USDC payment links on Ink Chain. 1% platform fee. Instant settlement.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
