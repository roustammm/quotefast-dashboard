'use client'

import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import { Check, X } from 'lucide-react'
import PricingSection from '../components/PricingSection'

export default function PricingPage() {
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
      <PricingSection />

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