'use client'

import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import { Check, X } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '29',
      period: 'per maand',
      description: 'Perfect voor kleine bedrijven en freelancers',
      features: [
        'Tot 100 offertes per maand',
        'Basis CRM functionaliteit',
        'E-mail support',
        '5GB opslag',
        'Basis rapportages',
        'Standaard templates'
      ],
      limitations: [
        'Geen AI-suggesties',
        'Geen automatisatie',
        'Geen API toegang'
      ],
      popular: false,
      cta: 'Start gratis',
      href: '/register?plan=starter'
    },
    {
      name: 'Professional',
      price: '79',
      period: 'per maand',
      description: 'Ideal voor groeiende bedrijven',
      features: [
        'Onbeperkte offertes',
        'AI-suggesties & automatisatie',
        'Geavanceerd CRM',
        'Priority support',
        '50GB opslag',
        'Uitgebreide rapportages',
        'Custom templates',
        'API toegang',
        'SEPA betalingen'
      ],
      limitations: [],
      popular: true,
      cta: 'Start gratis',
      href: '/register?plan=professional'
    },
    {
      name: 'Enterprise',
      price: '199',
      period: 'per maand',
      description: 'Voor grote organisaties',
      features: [
        'Alles van Professional',
        'White-label oplossing',
        'Dedicated account manager',
        '24/7 telefoon support',
        'Onbeperkte opslag',
        'Custom integraties',
        'Advanced analytics',
        'SSO integratie',
        'SLA garantie'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact sales',
      href: '/contact'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <PublicNav currentPage="pricing" />

      {/* Hero Section */}
      <section className="container-app py-24">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight mb-6">
            Eenvoudige, transparante<br />
            prijzen
          </h1>
          <p className="text-lg text-brand-muted mb-8 max-w-3xl mx-auto">
            Kies het plan dat bij je bedrijf past. Upgrade of downgrade op elk moment.
            Alle plannen bevatten een 14-dagen gratis proefperiode.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container-app py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative glass-card rounded-xl p-8 border transition-colors ${
                plan.popular 
                  ? 'border-blue-500/50 ring-2 ring-blue-500/20' 
                  : 'border-white/10 hover:border-white/20'
              } backdrop-blur-2xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Meest populair
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-text mb-2">{plan.name}</h3>
                <p className="text-brand-muted mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-brand-text">€{plan.price}</span>
                  <span className="text-brand-muted ml-2">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-brand-secondary mr-3 flex-shrink-0" />
                    <span className="text-brand-text">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-center">
                    <X className="w-5 h-5 text-brand-muted mr-3 flex-shrink-0" />
                    <span className="text-brand-muted">{limitation}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`w-full px-6 py-3 rounded-lg font-medium transition-colors text-center block ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-app py-20 bg-white/5 rounded-2xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-text mb-4">
            Veelgestelde vragen
          </h2>
          <p className="text-brand-muted">
            Alles wat je moet weten over onze prijzen en plannen
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="glass-card bg-white/10 rounded-xl p-6 border border-white/10 backdrop-blur-2xl">
            <h3 className="text-lg font-semibold text-brand-text mb-3">
              Kan ik mijn plan wijzigen?
            </h3>
            <p className="text-brand-muted">
              Ja, je kunt op elk moment upgraden of downgraden. Wijzigingen worden direct doorgevoerd 
              en je betaalt alleen het verschil voor de resterende periode.
            </p>
          </div>
          
          <div className="glass-card bg-white/10 rounded-xl p-6 border border-white/10 backdrop-blur-2xl">
            <h3 className="text-lg font-semibold text-brand-text mb-3">
              Is er een gratis proefperiode?
            </h3>
            <p className="text-brand-muted">
              Alle plannen bevatten een 14-dagen gratis proefperiode. Je hoeft geen creditcard 
              in te voeren om te beginnen.
            </p>
          </div>
          
          <div className="glass-card bg-white/10 rounded-xl p-6 border border-white/10 backdrop-blur-2xl">
            <h3 className="text-lg font-semibold text-brand-text mb-3">
              Wat gebeurt er met mijn data als ik stop?
            </h3>
            <p className="text-brand-muted">
              Je kunt je data op elk moment exporteren. Na opzegging bewaren we je data nog 
              30 dagen, daarna wordt deze veilig verwijderd.
            </p>
          </div>
          
          <div className="glass-card bg-white/10 rounded-xl p-6 border border-white/10 backdrop-blur-2xl">
            <h3 className="text-lg font-semibold text-brand-text mb-3">
              Bieden jullie kortingen voor jaarlijkse betaling?
            </h3>
            <p className="text-brand-muted">
              Ja! Bij jaarlijkse betaling krijg je 2 maanden gratis. Dat is een korting van 16% 
              op je totale kosten.
            </p>
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
            Start vandaag nog met je 14-dagen gratis proefperiode.
          </p>
          <Link
            href="/register"
            className="btn-primary inline-flex justify-center items-center px-8 py-4 rounded-lg font-medium transition-all"
          >
            Begin gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}