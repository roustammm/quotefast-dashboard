'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { OnboardingData } from '../lib/onboarding'

interface AIPersonalizationContextType {
  onboardingData: OnboardingData | null
  personalizedTemplates: any[]
  suggestedWorkflows: any[]
  relevantIntegrations: any[]
  contextualHelp: (feature: string) => string
  loading: boolean
}

const AIPersonalizationContext = createContext<AIPersonalizationContextType | undefined>(undefined)

export function AIPersonalizationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [personalizedTemplates, setPersonalizedTemplates] = useState<any[]>([])
  const [suggestedWorkflows, setSuggestedWorkflows] = useState<any[]>([])
  const [relevantIntegrations, setRelevantIntegrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // In a real app, you would fetch this from Supabase
      // For now, we'll simulate loading the onboarding data
      const mockOnboardingData: OnboardingData = {
        companyName: user.company || 'Mijn Bedrijf',
        industry: 'it',
        teamSize: '6-20',
        usageGoals: ['offertes', 'factureren', 'crm'],
        workflowPreferences: {
          automationLevel: 'gemiddeld',
          reportingFrequency: 'wekelijks',
          integrationNeeds: ['email', 'boekhouding']
        },
        aiFeatureInterests: ['ai-offerte-generator', 'smart-templates'],
        experienceLevel: 'enig'
      }
      
      setOnboardingData(mockOnboardingData)
      setLoading(false)
    } else {
      setOnboardingData(null)
      setLoading(false)
    }
  }, [user])

  const contextualHelp = (feature: string): string => {
    if (!onboardingData) return ''

    const helpTexts: Record<string, string> = {
      'offertes': `Gebaseerd op je ${onboardingData.industry} branche en ${onboardingData.teamSize} team, raden we aan om te beginnen met onze AI-gegenereerde offerte templates.`,
      'factureren': `Voor ${onboardingData.companyName} hebben we geoptimaliseerde factuur workflows die passen bij je ${onboardingData.workflowPreferences.automationLevel} automatisering niveau.`,
      'crm': `Met je interesse in ${onboardingData.aiFeatureInterests.join(', ')} kunnen we je CRM personaliseren voor betere klantinteracties.`,
      'dashboard': `Welkom ${onboardingData.companyName}! Je dashboard is geoptimaliseerd voor ${onboardingData.industry} bedrijven met ${onboardingData.teamSize} medewerkers.`
    }

    return helpTexts[feature] || ''
  }

  const value: AIPersonalizationContextType = {
    onboardingData,
    personalizedTemplates,
    suggestedWorkflows,
    relevantIntegrations,
    contextualHelp,
    loading
  }

  return (
    <AIPersonalizationContext.Provider value={value}>
      {children}
    </AIPersonalizationContext.Provider>
  )
}

export function useAIPersonalization() {
  const context = useContext(AIPersonalizationContext)
  if (context === undefined) {
    throw new Error('useAIPersonalization must be used within an AIPersonalizationProvider')
  }
  return context
}
