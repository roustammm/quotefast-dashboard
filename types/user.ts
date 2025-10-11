// types/user.ts

import { OnboardingData } from '../lib/onboarding'

export interface User {
  id: string
  email: string
  name: string
  company?: string
  subscription: {
    plan: string
    status: 'active' | 'inactive' | 'cancelled'
    currentPeriodEnd: string
  }
}

export interface UserMetadata {
  name?: string
  company?: string
  subscription_plan?: string
  subscription_end?: string
  onboarding?: OnboardingData & {
    completedAt: string
  }
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, company?: string, onboardingData?: OnboardingData) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}
