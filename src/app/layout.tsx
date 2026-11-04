import './globals.css'

export const metadata = {
  title: 'InkDrop — Crypto Payment Links on Ink Chain',
  description: 'Gasless USDC payment links on Ink Chain. 1% fee.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
