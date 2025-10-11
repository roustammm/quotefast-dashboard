// lib/onboarding.ts

export interface OnboardingData {
  companyName: string
  industry: string
  teamSize: string
  usageGoals: string[]
  workflowPreferences: {
    automationLevel: string
    reportingFrequency: string
    integrationNeeds: string[]
  }
  aiFeatureInterests: string[]
  experienceLevel: string
}

export interface OnboardingStep {
  id: number
  title: string
  description: string
  fields: OnboardingField[]
  isOptional?: boolean
}

export interface OnboardingField {
  name: string
  type: 'text' | 'select' | 'radio' | 'checkbox' | 'slider'
  label: string
  placeholder?: string
  options?: { value: string; label: string }[]
  required?: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    message?: string
  }
}

export const INDUSTRY_OPTIONS = [
  { value: 'bouw', label: 'Bouw' },
  { value: 'it', label: 'IT' },
  { value: 'consultancy', label: 'Consultancy' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'dienstverlening', label: 'Dienstverlening' },
  { value: 'retail', label: 'Retail' },
  { value: 'zorg', label: 'Zorg' },
  { value: 'onderwijs', label: 'Onderwijs' },
  { value: 'anders', label: 'Anders' }
]

export const TEAM_SIZE_OPTIONS = [
  { value: '1-5', label: '1-5 medewerkers' },
  { value: '6-20', label: '6-20 medewerkers' },
  { value: '21-50', label: '21-50 medewerkers' },
  { value: '51-200', label: '51-200 medewerkers' },
  { value: '200+', label: '200+ medewerkers' }
]

export const USAGE_GOALS_OPTIONS = [
  { value: 'offertes', label: 'Offertes genereren' },
  { value: 'factureren', label: 'Factureren' },
  { value: 'crm', label: 'CRM' },
  { value: 'workflow', label: 'Workflow automatisering' },
  { value: 'rapportage', label: 'Rapportage' },
  { value: 'projectmanagement', label: 'Projectmanagement' },
  { value: 'klantbeheer', label: 'Klantbeheer' }
]

export const AUTOMATION_LEVELS = [
  { value: 'minimaal', label: 'Minimaal' },
  { value: 'gemiddeld', label: 'Gemiddeld' },
  { value: 'maximum', label: 'Maximum' }
]

export const REPORTING_FREQUENCIES = [
  { value: 'dagelijks', label: 'Dagelijks' },
  { value: 'wekelijks', label: 'Wekelijks' },
  { value: 'maandelijks', label: 'Maandelijks' },
  { value: 'on-demand', label: 'On-demand' }
]

export const INTEGRATION_NEEDS = [
  { value: 'email', label: 'E-mail' },
  { value: 'boekhouding', label: 'Boekhouding' },
  { value: 'crm', label: 'CRM' },
  { value: 'projectmanagement', label: 'Projectmanagement' },
  { value: 'betalingen', label: 'Betalingen' },
  { value: 'calendar', label: 'Kalender' },
  { value: 'storage', label: 'Cloud Storage' }
]

export const AI_FEATURE_INTERESTS = [
  { 
    value: 'ai-offerte-generator', 
    label: 'AI Offerte Generator',
    description: 'Automatische prijsberekening en offerte generatie'
  },
  { 
    value: 'smart-templates', 
    label: 'Smart Templates',
    description: 'Context-aware templates die zich aanpassen'
  },
  { 
    value: 'predictive-analytics', 
    label: 'Predictive Analytics',
    description: 'Voorspel conversies en optimaliseer processen'
  },
  { 
    value: 'workflow-automation', 
    label: 'Workflow Automation',
    description: 'Trigger-based actions en automatisering'
  },
  { 
    value: 'natural-language-processing', 
    label: 'Natural Language Processing',
    description: 'Chat interface voor natuurlijke interactie'
  },
  { 
    value: 'document-analysis', 
    label: 'Document Analysis',
    description: 'Automatische analyse van documenten en contracten'
  }
]

export const EXPERIENCE_LEVELS = [
  { value: 'nieuw', label: 'Nieuw met AI tools' },
  { value: 'enig', label: 'Enige ervaring' },
  { value: 'ervaren', label: 'Ervaren gebruiker' }
]

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Account Basics',
    description: 'Basis account informatie',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Volledige naam',
        placeholder: 'Je volledige naam',
        required: true,
        validation: {
          minLength: 2,
          message: 'Naam moet minimaal 2 karakters bevatten'
        }
      },
      {
        name: 'email',
        type: 'text',
        label: 'E-mailadres',
        placeholder: 'je@email.com',
        required: true,
        validation: {
          pattern: /\S+@\S+\.\S+/,
          message: 'Voer een geldig e-mailadres in'
        }
      },
      {
        name: 'password',
        type: 'text',
        label: 'Wachtwoord',
        placeholder: 'Minimaal 6 karakters',
        required: true,
        validation: {
          minLength: 6,
          message: 'Wachtwoord moet minimaal 6 karakters bevatten'
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Bedrijfsinformatie',
    description: 'Vertel ons over je bedrijf',
    fields: [
      {
        name: 'companyName',
        type: 'text',
        label: 'Bedrijfsnaam',
        placeholder: 'Naam van je bedrijf',
        required: true,
        validation: {
          minLength: 2,
          message: 'Bedrijfsnaam moet minimaal 2 karakters bevatten'
        }
      },
      {
        name: 'industry',
        type: 'select',
        label: 'Branche',
        options: INDUSTRY_OPTIONS,
        required: true
      },
      {
        name: 'teamSize',
        type: 'radio',
        label: 'Teamgrootte',
        options: TEAM_SIZE_OPTIONS,
        required: true
      },
      {
        name: 'usageGoals',
        type: 'checkbox',
        label: 'Primaire doelen',
        options: USAGE_GOALS_OPTIONS,
        required: true
      }
    ]
  },
  {
    id: 3,
    title: 'Workflow Preferences',
    description: 'Hoe wil je werken?',
    isOptional: true,
    fields: [
      {
        name: 'automationLevel',
        type: 'radio',
        label: 'Gewenst automatisering niveau',
        options: AUTOMATION_LEVELS,
        required: false
      },
      {
        name: 'reportingFrequency',
        type: 'select',
        label: 'Rapportage frequentie',
        options: REPORTING_FREQUENCIES,
        required: false
      },
      {
        name: 'integrationNeeds',
        type: 'checkbox',
        label: 'Gewenste integraties',
        options: INTEGRATION_NEEDS,
        required: false
      }
    ]
  },
  {
    id: 4,
    title: 'AI Features',
    description: 'Welke AI features interesseren je?',
    isOptional: true,
    fields: [
      {
        name: 'aiFeatureInterests',
        type: 'checkbox',
        label: 'AI Features',
        options: AI_FEATURE_INTERESTS,
        required: false
      },
      {
        name: 'experienceLevel',
        type: 'radio',
        label: 'Ervaring met AI tools',
        options: EXPERIENCE_LEVELS,
        required: false
      }
    ]
  }
]

export function validateOnboardingData(data: Partial<OnboardingData>, step: number): string[] {
  const errors: string[] = []
  const currentStep = ONBOARDING_STEPS.find(s => s.id === step)
  
  if (!currentStep) return errors

  for (const field of currentStep.fields) {
    if (field.required && !data[field.name as keyof OnboardingData]) {
      errors.push(`${field.label} is verplicht`)
      continue
    }

    const value = data[field.name as keyof OnboardingData]
    if (value && field.validation) {
      if (field.validation.minLength && typeof value === 'string' && value.length < field.validation.minLength) {
        errors.push(field.validation.message || `${field.label} is te kort`)
      }
      if (field.validation.pattern && typeof value === 'string' && !field.validation.pattern.test(value)) {
        errors.push(field.validation.message || `${field.label} is ongeldig`)
      }
    }
  }

  return errors
}

export function getDefaultOnboardingData(): Partial<OnboardingData> {
  return {
    companyName: '',
    industry: '',
    teamSize: '',
    usageGoals: [],
    workflowPreferences: {
      automationLevel: 'gemiddeld',
      reportingFrequency: 'wekelijks',
      integrationNeeds: []
    },
    aiFeatureInterests: [],
    experienceLevel: 'nieuw'
  }
}
