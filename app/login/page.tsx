'use client'
import React, { useState } from 'react'
import { Lock, Mail, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import ErrorMessage from '../../components/ui/ErrorMessage'
import BrainNeuronAnimation from '../../components/ui/BrainNeuronAnimation'

// Force dynamic rendering for pages that use auth context
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
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
      await signIn(email, password)
      
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Brain Neuron Animation Background */}
      <BrainNeuronAnimation />
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center shadow-2xl relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welkom terug 👋</h1>
          <p className="text-gray-300">Log in om verder te gaan</p>

          {/* Demo credentials for testing */}
          <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-white">
            <p className="font-medium mb-1">🔧 Test Account:</p>
            <p><strong>Email:</strong> test@quotefast.nl</p>
            <p><strong>Wachtwoord:</strong> testpassword123</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white font-medium mb-2">
              E-mailadres
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jij@voorbeeld.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-white font-medium mb-2">
              Wachtwoord
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Wachtwoord"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? 'Inloggen...' : 'Inloggen'}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-300">
          Nog geen account?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 hover:underline">
            Registreer nu
          </Link>
        </div>
      </div>
    </div>
  )
}
