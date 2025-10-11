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
    <nav className="container-app py-6 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl text-brand-text">
        QuoteFast
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-brand-muted">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`hover:text-brand-text transition-colors ${
                currentPage === link.key ? 'text-brand-text font-medium' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/login" 
            className="hover:text-brand-text transition-colors"
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
