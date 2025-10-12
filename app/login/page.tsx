'use client'
import React, { useState } from 'react'
import { Lock, Mail, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ErrorMessage from '../../components/ui/ErrorMessage'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic validation
    if (!email || !password) {
      setError('Vul alle velden in.')
      setIsLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Voer een geldig e-mailadres in.')
      setIsLoading(false)
      return
    }

    try {
      await login(email, password)
      
      // Check for redirect parameter
      const searchParams = new URLSearchParams(window.location.search)
      const redirectTo = searchParams.get('redirectTo') || '/dashboard'
      router.push(redirectTo)
    } catch (err: any) {
      // Use the error message from the error handler
      setError(err.message || 'Inloggen mislukt. Controleer je gegevens.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md glass-card bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 text-center shadow-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text mb-2">Welkom terug 👋</h1>
          <p className="text-brand-muted">Log in om verder te gaan</p>
        </div>

        <ErrorMessage 
          message={error} 
          onDismiss={() => setError('')} 
          className="mb-6"
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-brand-text font-medium mb-2">
              E-mailadres
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jij@voorbeeld.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-brand-text font-medium mb-2">
              Wachtwoord
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Wachtwoord"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-primary hover:bg-brand-primary-dark py-3 rounded-xl font-medium text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn className="inline w-4 h-4 mr-2" /> 
            {isLoading ? 'Inloggen...' : 'Inloggen'}
          </button>
        </form>

        <div className="mt-6 text-sm text-brand-muted">
          Nog geen account?{' '}
          <Link href="/register" className="text-brand-primary hover:text-brand-primary-light hover:underline">
            Registreer nu
          </Link>
        </div>
      </div>
    </div>
  )
}
