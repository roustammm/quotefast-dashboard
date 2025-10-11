'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { 
  OnboardingData, 
  ONBOARDING_STEPS, 
  validateOnboardingData, 
  getDefaultOnboardingData 
} from '../../../lib/onboarding'

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void
  onSkip: () => void
}

export default function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<OnboardingData>>(getDefaultOnboardingData())
  const [errors, setErrors] = useState<string[]>([])

  const currentStepData = ONBOARDING_STEPS.find(step => step.id === currentStep)
  const isLastStep = currentStep === ONBOARDING_STEPS.length
  const isFirstStep = currentStep === 1

  const handleNext = () => {
    const validationErrors = validateOnboardingData(data, currentStep)
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors([])

    if (isLastStep) {
      onComplete(data as OnboardingData)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
      setErrors([])
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  const handleFieldChange = (fieldName: string, value: any) => {
    setData(prev => ({
      ...prev,
      [fieldName]: value
    }))
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleCheckboxChange = (fieldName: string, value: string, checked: boolean) => {
    setData(prev => {
      const currentValues = (prev[fieldName as keyof OnboardingData] as string[]) || []
      
      if (checked) {
        return {
          ...prev,
          [fieldName]: [...currentValues, value]
        }
      } else {
        return {
          ...prev,
          [fieldName]: currentValues.filter(v => v !== value)
        }
      }
    })
  }

  const renderField = (field: any) => {
    const fieldValue = data[field.name as keyof OnboardingData]

    switch (field.type) {
      case 'text':
        return (
          <input
            type={field.name === 'password' ? 'password' : 'text'}
            value={fieldValue as string || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-colors"
          />
        )

      case 'select':
        return (
          <select
            value={fieldValue as string || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-brand-text focus:outline-none focus:border-brand-primary transition-colors"
          >
            <option value="">Selecteer een optie</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option: any) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={fieldValue === option.value}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  className="w-4 h-4 text-brand-primary bg-white/10 border-white/20 focus:ring-brand-primary"
                />
                <span className="text-brand-text">{option.label}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-4">
            {field.options?.map((option: any) => (
              <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(fieldValue as string[] || []).includes(option.value)}
                  onChange={(e) => handleCheckboxChange(field.name, option.value, e.target.checked)}
                  className="w-4 h-4 text-brand-primary bg-white/10 border-white/20 rounded focus:ring-brand-primary mt-1"
                />
                <div>
                  <span className="text-brand-text font-medium">{option.label}</span>
                  {option.description && (
                    <p className="text-brand-muted text-sm mt-1">{option.description}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  if (!currentStepData) return null

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {ONBOARDING_STEPS.map((step) => (
            <div
              key={step.id}
              className={`w-3 h-3 rounded-full transition-colors ${
                step.id <= currentStep
                  ? 'bg-brand-primary'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-text mb-2">
          {currentStepData.title}
        </h2>
        <p className="text-brand-muted">
          {currentStepData.description}
        </p>
        {currentStepData.isOptional && (
          <p className="text-sm text-brand-muted mt-2">
            (Deze stap is optioneel)
          </p>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-6 mb-8">
        {currentStepData.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-brand-text font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <X className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Er zijn fouten opgetreden:</span>
          </div>
          <ul className="text-red-300 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <div>
          {!isFirstStep && (
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-6 py-3 text-brand-muted hover:text-brand-text transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Vorige</span>
            </button>
          )}
        </div>

        <div className="flex space-x-4">
          {currentStepData.isOptional && (
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-brand-muted hover:text-brand-text transition-colors"
            >
              Overslaan
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            <span>{isLastStep ? 'Voltooien' : 'Volgende'}</span>
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
            {isLastStep && <Check className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
