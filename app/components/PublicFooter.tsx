'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function PublicFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link href="/" className="font-bold text-xl text-brand-text mb-4 block">
              QuoteFast
            </Link>
            <p className="text-brand-muted mb-6 max-w-md">
              Automatiseer je bedrijfsprocessen met AI. Van offertes tot facturen, 
              alles in één modern platform.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                className="text-brand-muted hover:text-brand-text transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-brand-muted hover:text-brand-text transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-brand-muted hover:text-brand-text transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@quotefast.ai" 
                className="text-brand-muted hover:text-brand-text transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-brand-text font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-brand-muted hover:text-brand-text transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-brand-muted hover:text-brand-text transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-brand-muted hover:text-brand-text transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-brand-muted hover:text-brand-text transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-brand-text font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-brand-muted hover:text-brand-text transition-colors">
                  Documentatie
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-brand-muted hover:text-brand-text transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-muted hover:text-brand-text transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-brand-muted hover:text-brand-text transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-brand-muted text-sm">
            © 2024 QuoteFast - Alle rechten voorbehouden.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-brand-muted hover:text-brand-text transition-colors">
              Algemene Voorwaarden
            </Link>
            <Link href="/privacy" className="text-sm text-brand-muted hover:text-brand-text transition-colors">
              Privacybeleid
            </Link>
            <Link href="/cookies" className="text-sm text-brand-muted hover:text-brand-text transition-colors">
              Cookiebeleid
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
