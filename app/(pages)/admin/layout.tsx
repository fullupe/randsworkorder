
import '../../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AdminNavBar from '@/app/components/AdminNavBar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'R&S LOTTO ',
  description: ' Dev. Fyberlite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
       <AdminNavBar/>
        {children}
        
        </body>
    </html>
  )
}
