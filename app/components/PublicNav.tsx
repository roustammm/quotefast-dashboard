'use client'

import Link from 'next/link'
import { useTheme } from '../../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

interface PublicNavProps {
  currentPage?: 'home' | 'features' | 'pricing' | 'login' | 'register'
}

export default function PublicNav({ currentPage }: PublicNavProps) {
  const { theme, toggleTheme } = useTheme()

  const navLinks = [
    { href: '/features', label: 'Features', key: 'features' as const },
    { href: '/pricing', label: 'Pricing', key: 'pricing' as const },
  ]

  return (
    <nav className="container-app py-6 flex items-center justify-between relative z-10">
      <Link href="/" className="font-bold text-xl text-white flex items-center gap-2 hover:scale-105 transition-transform">
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        QuoteFast
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-white/80">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`modern-glass-button relative group hover:text-white transition-all px-4 py-2 rounded-lg ${
                currentPage === link.key ? 'text-white bg-green-500/20' : ''
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="/login"
            className="modern-glass-button hover:text-white transition-all px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-full"
        >
          {theme === 'dark' ? (
            <>
              <Moon className="w-4 h-4 text-brand-text" />
              <span className="text-sm text-brand-text">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-brand-text" />
              <span className="text-sm text-brand-text">Light</span>
            </>
          )}
        </button>
        
        <Link href="/register" className="btn-primary">
          Probeer gratis
        </Link>
      </div>
    </nav>
  )
}
