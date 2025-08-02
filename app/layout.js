import './globals.css'
import { Inter } from 'next/font/google'
import { TooltipProvider } from "../components/ui/tooltip"
import { ToasterProvider } from "../components/ToasterProvider.jsx"
import { AdminAuthProvider } from "../contexts/AdminAuthContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TalentHub - Discover Exceptional Talent',
  description: 'Connect with top professionals who bring creativity, expertise, and passion to every project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminAuthProvider>
          <TooltipProvider>
            {children}
            <ToasterProvider />
          </TooltipProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
