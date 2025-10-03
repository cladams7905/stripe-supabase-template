// ============================================
// ROOT LAYOUT (App Router)
// ============================================
// This file wraps all pages in your app
// You typically don't need to modify this

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js + Supabase + Stripe Template',
  description: 'A simple template for building apps with authentication and payments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
