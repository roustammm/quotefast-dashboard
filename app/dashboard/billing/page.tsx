'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckIcon, XMarkIcon, CreditCardIcon } from '@heroicons/react/24/outline'

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock subscription data - in real app this would come from your database
  const subscription = {
    plan: 'Professional',
    status: 'active',
    currentPeriodEnd: '2024-02-15',
    amount: 79,
    currency: 'EUR',
    interval: 'month'
  }

  const handleUpgrade = async (planName: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: `price_${planName.toLowerCase()}`,
          customerEmail: 'user@example.com', // In real app, get from auth context
          planName: planName,
        }),
      })

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    if (confirm('Weet je zeker dat je je abonnement wilt opzeggen?')) {
      // In real app, call your API to cancel subscription
      console.log('Canceling subscription...')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing & Abonnement</h1>
                <p className="text-gray-600 mt-1">Beheer je abonnement en betalingen</p>
              </div>
              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Terug naar Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Huidig Abonnement</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  subscription.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {subscription.status === 'active' ? 'Actief' : 'Inactief'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-gray-900">{subscription.plan}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Prijs</span>
                  <span className="font-medium text-gray-900">
                    €{subscription.amount}/{subscription.interval === 'month' ? 'maand' : 'jaar'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Volgende factuur</span>
                  <span className="font-medium text-gray-900">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString('nl-NL')}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-gray-900">
                    {subscription.status === 'active' ? 'Actief' : 'Inactief'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => handleUpgrade('Enterprise')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Bezig...' : 'Upgraden'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Opzeggen
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Betaalmethoden</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <CreditCardIcon className="w-8 h-8 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">**** **** **** 4242</p>
                      <p className="text-sm text-gray-600">Vervalt 12/25</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Standaard
                  </span>
                </div>
                
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                  + Nieuwe betaalmethode toevoegen
                </button>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Beschikbare Plannen</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Starter</h3>
                    <span className="text-sm text-gray-600">€29/maand</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Perfect voor kleine bedrijven</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">100 offertes/maand</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">Basis CRM</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <XMarkIcon className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-gray-400">Geen AI</span>
                    </div>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Professional</h3>
                    <span className="text-sm text-gray-600">€79/maand</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Ideal voor groeiende bedrijven</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">Onbeperkte offertes</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">AI-suggesties</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">Automatisatie</span>
                    </div>
                  </div>
                  <span className="inline-block mt-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Huidig plan
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Enterprise</h3>
                    <span className="text-sm text-gray-600">€199/maand</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Voor grote organisaties</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">Alles van Pro</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">White-label</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-600">24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Factuurgeschiedenis</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">Professional Plan</p>
                    <p className="text-sm text-gray-600">15 januari 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">€79,00</p>
                    <p className="text-sm text-green-600">Betaald</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">Professional Plan</p>
                    <p className="text-sm text-gray-600">15 december 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">€79,00</p>
                    <p className="text-sm text-green-600">Betaald</p>
                  </div>
                </div>
                
                <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2">
                  Alle facturen bekijken
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
