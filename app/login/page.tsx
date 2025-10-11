'use client'
import React, { useState } from 'react'
import { Lock, Mail, LogIn, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-gradient-to-br from-[#090f2f] via-[#1a1f4a] to-[#3b1a6b] flex items-center justify-center px-6">
      <div className="w-full max-w-md glass-card bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 text-center shadow-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welkom terug 👋</h1>
          <p className="text-white/70">Log in om verder te gaan</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jij@voorbeeld.com"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Wachtwoord"
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-xl font-medium text-white hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <LogIn className="inline w-4 h-4 mr-2" /> 
            {isLoading ? 'Inloggen...' : 'Inloggen'}
          </button>
        </form>

        <div className="mt-6 text-sm text-white/60">
          Nog geen account?{' '}
          <Link href="/register" className="text-blue-400 hover:underline">
            Maak er één aan
          </Link>
        </div>
      </div>
    </div>
  )
}
