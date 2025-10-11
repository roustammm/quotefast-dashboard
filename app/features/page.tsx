'use client'

import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import {
  CpuChipIcon,
  BoltIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyEuroIcon,
  ClockIcon,
  ShieldCheckIcon,
  CogIcon,
  UserGroupIcon,
  CloudIcon,
} from '@heroicons/react/24/outline'

export default function FeaturesPage() {
  const features = [
    {
      icon: <CpuChipIcon className="w-8 h-8 text-blue-400" />,
      title: 'AI Offertes',
      description: 'Genereer professionele offertes in minuten met intelligente AI-suggesties op basis van klantdata en historie.',
      benefits: [
        'Automatische prijsberekening',
        'Klant-specifieke suggesties',
        'Template bibliotheek',
        'Real-time validatie'
      ]
    },
    {
      icon: <BoltIcon className="w-8 h-8 text-purple-400" />,
      title: 'Workflow Automatisatie',
      description: 'Laat repetitieve taken automatisch verlopen met slimme workflows en triggers.',
      benefits: [
        'E-mail automatisatie',
        'Herinneringen & notificaties',
        'Status updates',
        'Custom triggers'
      ]
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8 text-green-400" />,
      title: 'Facturen & Betalingen',
      description: 'Maak en verstuur facturen in seconden. Volg betalingen real-time met SEPA-integratie.',
      benefits: [
        'SEPA direct debit',
        'Automatische herinneringen',
        'Multi-currency support',
        'Real-time tracking'
      ]
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-orange-400" />,
      title: 'Analytics & Rapportage',
      description: 'Krijg inzicht in je bedrijfsprestaties met uitgebreide analytics en rapporten.',
      benefits: [
        'Real-time dashboards',
        'Custom rapporten',
        'Export mogelijkheden',
        'Trend analyse'
      ]
    },
    {
      icon: <UserGroupIcon className="w-8 h-8 text-pink-400" />,
      title: 'CRM & Klantbeheer',
      description: 'Beheer je klanten en leads efficiënt met een geïntegreerd CRM systeem.',
      benefits: [
        'Klant profielen',
        'Lead tracking',
        'Communicatie geschiedenis',
        'Pipeline management'
      ]
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-400" />,
      title: 'Beveiliging & Compliance',
      description: 'Enterprise-grade beveiliging met volledige GDPR compliance en data bescherming.',
      benefits: [
        'End-to-end encryptie',
        'GDPR compliant',
        'Audit logs',
        'Backup & recovery'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <PublicNav currentPage="features" />

      {/* Hero Section */}
      <section className="container-app py-24">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight mb-6">
            Krachtige features voor<br />
            moderne bedrijven
          </h1>
          <p className="text-lg text-brand-muted mb-8 max-w-3xl mx-auto">
            Ontdek alle tools die je nodig hebt om je bedrijf te automatiseren, 
            te groeien en efficiënter te werken.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container-app py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card bg-white/10 backdrop-blur-2xl rounded-xl p-8 border border-white/10 hover:border-white/20 transition-colors">
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-4">
                {feature.title}
              </h3>
              <p className="text-brand-muted mb-6">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-brand-muted">
                    <svg className="w-4 h-4 text-brand-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-app py-20 bg-white/5 rounded-2xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-text mb-4">
            Vertrouwd door duizenden bedrijven
          </h2>
          <p className="text-brand-muted">
            Zie waarom bedrijven wereldwijd kiezen voor QuoteFast
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">10K+</div>
            <div className="text-brand-muted">Actieve gebruikers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-secondary mb-2">€2M+</div>
            <div className="text-brand-muted">Verwerkte betalingen</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-accent mb-2">50K+</div>
            <div className="text-brand-muted">Offertes gegenereerd</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">99.9%</div>
            <div className="text-brand-muted">Uptime garantie</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-app py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-lg text-brand-muted mb-8">
            Start vandaag nog met het automatiseren van je bedrijfsprocessen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="btn-primary inline-flex justify-center items-center px-8 py-4 rounded-lg font-medium transition-all"
            >
              Begin gratis
            </Link>
            <Link
              href="/pricing"
              className="btn-ghost inline-flex justify-center items-center px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Bekijk prijzen
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
