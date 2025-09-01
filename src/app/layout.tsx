import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'London Pesquisas - Pesquisas Eleitorais em Campo',
  description: 'Sistema completo para pesquisas eleitorais municipais, coleta de dados em campo e análise política',
  keywords: 'pesquisas eleitorais, campanha política, pesquisas de opinião, eleições municipais',
  authors: [{ name: 'London Pesquisas' }],
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/manifest.json',
  themeColor: '#1e3a8a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'London Pesquisas'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="application-name" content="London Pesquisas" />
        <meta name="apple-mobile-web-app-title" content="London Pesquisas" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}