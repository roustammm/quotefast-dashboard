'use client'
import React, { useState } from 'react'
import { Mail, Lock, UserPlus, User, AlertCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../providers'
import { useRouter } from 'next/navigation'
import PublicNav from '../components/PublicNav'
import OnboardingWizard from './components/OnboardingWizard'
import { OnboardingData } from '../../lib/onboarding'
import { motion } from 'framer-motion'
import AnimatedCard from '../../components/ui/AnimatedCard'
import GradientText from '../../components/ui/GradientText'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await signUp(form.email, form.password, form.name)

      // Succes — toon onboarding
      setShowOnboarding(true)
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden bij het aanmaken van je account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data)
    setShowOnboarding(false)
    // Redirect to dashboard
    router.push('/dashboard')
  }

  const handleOnboardingSkip = () => {
    setShowOnboarding(false)
    // Redirect to dashboard
    router.push('/dashboard')
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <PublicNav currentPage="register" />
        <div className="container-app py-24">
          <OnboardingWizard
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      <PublicNav currentPage="register" />
      <div className="container mx-auto px-6 py-24">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-blue-400" />
                <h1 className="text-3xl font-bold text-white">
                  Maak een account
                </h1>
              </div>
              <p className="text-gray-300">Start je gratis proefperiode van 14 dagen</p>
            </motion.div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Volledige naam
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  E-mailadres
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="john@example.com"
                    required
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
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Minimaal 8 karakters"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Account aanmaken...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Account aanmaken</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-300 text-sm">
                Heb je al een account?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Inloggen
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Door een account aan te maken, ga je akkoord met onze{' '}
                <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Algemene Voorwaarden
                </Link>{' '}
                en{' '}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacybeleid
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}