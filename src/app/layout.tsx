import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { TransactionModal } from '@/components/modals/transaction-modal'
import { ProviderReactQuery } from '@/provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart spending',
  description: 'A smart way to organize your spending',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="36x36" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ProviderReactQuery>
            <TransactionModal />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ProviderReactQuery>
        </SessionProvider>
      </body>
    </html>
  )
}
