```javascript
'use client'

import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon, Play, ArrowRight, CheckCircle, Shield, Users, Zap, Code, Rocket, Heart, Search, Bell, Settings, ArrowUp, ArrowDown, Folder, DollarSign, TrendingUp, Clock, FileText, Sparkles, Star } from 'lucide-react'
import PublicFooter from '@/app/components/PublicFooter'
import PricingSection from '@/app/components/PricingSection'
import GradientText from '@/components/ui/GradientText'
import FloatingElements from '@/components/ui/FloatingElements'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { motion } from 'framer-motion'
import { Button } from '@/lib/Button'
import { memo, useMemo, useState, useEffect } from 'react'

// --- Helper Functions ---
const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

// --- Memoized Components ---

// Feature Card Component
const FeatureCard = memo(({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 rounded-2xl border-border hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      aria-label={`Feature: ${title}`} // Accessibility: ARIA label
    >
      <motion.div
        whileHover={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.3 }}
        className="w-12 h-12 glass-card rounded-lg flex items-center justify-center mb-4 mx-auto"
      >
        <Icon className="w-6 h-6 text-primary" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
      </motion.div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
});
FeatureCard.displayName = 'FeatureCard'; // Helps with debugging in React DevTools

// Dashboard Card Component
const DashboardCard = memo(({ title, value, change, changeType, progress, icon: Icon, delay = 0 }) => {
  const progressColorClass = useMemo(() => {
    switch (changeType) {
      case 'positive':
        return 'bg-success-gradient';
      case 'negative':
        return 'bg-destructive-gradient';
      default:
        return 'bg-warning-gradient';
    }
  }, [changeType]);

  return (
    <motion.div
      className="glass-card p-6 rounded-xl border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      aria-label={`Dashboard Card: ${title}`} // Accessibility: ARIA label
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground/80">{title}</h3>
        <Button variant="glass" size="icon" className="!w-auto !h-auto p-1 hover:bg-accent rounded !border-none" aria-label={`View ${title} details`}> {/* Accessibility: ARIA label for button */}
          <Icon className="w-4 h-4 text-primary" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
        </Button>
      </div>
      <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`modern-glass-button px-2 py-1 text-xs ${changeType === 'positive' ? '' : 'bg-destructive/10 text-destructive'}`}>
          {changeType === 'positive' ? <ArrowUp className="w-3 h-3" aria-hidden="true" /> : <ArrowDown className="w-3 h-3" aria-hidden="true" />} {/* Accessibility: Hide icon from screen readers */}
          {change}
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-2">
        <motion.div
          className={`h-2 rounded-full ${progressColorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: delay + 0.2 }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{progress}%</span>
        <span>Last updated: Just now</span>
      </div>
    </motion.div>
  );
});
DashboardCard.displayName = 'DashboardCard'; // Helps with debugging in React DevTools

// Video Section Component
const VideoSection = memo(({ title, description, videoTitle, videoDescription, icon: Icon, videoUrl, isReversed = false, checkList }) => {
  const isMounted = useIsMounted();

  return (
    <section className="container-app py-24">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        {/* Text Content */}
        <div className={isReversed ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}>
          <h2 className="text-4xl font-bold text-white mb-6">{title}</h2>
          <p className="text-muted-foreground text-lg mb-8">{description}</p>

          {checkList && (
            <div className="space-y-4">
              {checkList.map((item, index) => (
                <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-3 glass-card p-3 rounded-xl" key={index}>
                  <div className="w-6 h-6 glass-card rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Video Content */}
        <div className={`relative ${isReversed ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}`}>
          <div className="glass-card aspect-video rounded-2xl flex items-center justify-center group cursor-pointer p-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 glass-card rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Play className="w-8 h-8 text-primary ml-1" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
            </motion.div>
            <p className="text-foreground font-medium text-lg">{videoTitle}</p>
            <p className="text-muted-foreground text-sm mt-2">{videoDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
});
VideoSection.displayName = 'VideoSection';

// --- Main Component ---

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const isMounted = useIsMounted();

  // --- Data ---
  const features = useMemo(() => [
    {
      icon: Zap,
      title: "AI Offertegenerator",
      description: "Laat AI automatisch professionele offertes genereren. Slimme productherkenning en automatische prijsberekening."
    },
    {
      icon: Users,
      title: "CRM & Klantbeheer",
      description: "Beheer al je klanten, leads en contacten op één plek. Track conversaties en follow-ups voor betere klantrelaties."
    },
    {
      icon: Shield,
      title: "Facturatie & Betalingen",
      description: "Automatische facturatie, betalingsherinneringen en Stripe integratie. Accepteer betalingen online."
    },
    {
      icon: Rocket,
      title: "Workflow Automatisering",
      description: "Automatiseer repetitieve taken. Van lead capture tot factuur verzending - alles draait automatisch."
    }
  ], []);

  const dashboardCards = useMemo(() => [
    { title: "Executions", value: "340", change: "204%", changeType: "positive", progress: 75, icon: Zap, delay: 0 },
    { title: "Projects", value: "12", change: "18%", changeType: "positive", progress: 60, icon: Folder, delay: 0.2 },
    { title: "Team Reviews", value: "5", change: "-12%", changeType: "negative", progress: 40, icon: Users, delay: 0.4 },
    { title: "Active Users", value: "1.284", change: "8%", changeType: "positive", progress: 82, icon: Users, delay: 0.6 },
    { title: "Revenue", value: "$45.2K", change: "32%", changeType: "positive", progress: 91, icon: DollarSign, delay: 0.8 },
    { title: "Conversion", value: "3.2%", change: "-5%", changeType: "negative", progress: 28, icon: TrendingUp, delay: 1.0 },
    { title: "Avg. Response", value: "1.2s", change: "15%", changeType: "positive", progress: 67, icon: Clock, delay: 1.2 },
    { title: "Offers Generated", value: "127", change: "24%", changeType: "positive", progress: 76, icon: FileText, delay: 1.4 }
  ], []);

  const authenticationChecklist = useMemo(() => [
    { title: 'Email Authenticatie', description: 'Gebruikers kunnen inloggen met email en wachtwoord met veilige validatie.' },
    { title: 'Social Login', description: 'Ondersteuning voor Google, Facebook, LinkedIn en meer OAuth providers.' },
    { title: 'Magic Links', description: 'Wachtwoordloze authenticatie met veilige email link verificatie.' },
    { title: 'Wachtwoord Reset', description: 'Geautomatiseerde wachtwoord reset flow met veilige token validatie.' },
  ], []);

  const aiQuoteGeneratorChecklist = useMemo(() => [
    { title: 'Slimme Productherkenning', description: 'AI herkent automatisch producten en stelt de juiste prijzen voor.' },
    { title: 'Automatische Berekenen', description: 'BTW, kortingen en totaalbedragen worden automatisch berekend.' },
    { title: 'Professionele Templates', description: 'Kies uit verschillende professionele offerte templates.' },
    { title: 'PDF Export', description: 'Exporteer offertes direct naar PDF voor verzending naar klanten.' },
  ], []);

  const teamCollaborationChecklist = useMemo(() => [
    { title: 'Organisaties/Teams', description: 'Ingebouwde ondersteuning voor gebruikersgroepen die resources en permissies kunnen delen.' },
    { title: 'Gebruiker Uitnodigingen', description: 'Gebruikers kunnen nieuwe leden uitnodigen, rollen toewijzen en toegang tot features beheren.' },
    { title: 'Lid Rollen', description: 'Eigenaar, Admin, Lid rollen met verschillende permissieniveaus.' },
    { title: 'Resource Delen', description: 'Deel projecten, documenten en data veilig tussen teamleden.' },
  ], []);

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-950/30 to-background relative overflow-hidden">
      <ScrollProgress />
      <FloatingElements />

      {/* Navigation - Glass styled */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-app py-6 flex items-center justify-between relative z-10"
      >
        <Link href="/" className="font-bold text-xl text-white flex items-center gap-2 hover:scale-105 transition-transform" aria-label="Go to homepage"> {/* Accessibility: ARIA label */}
          <Sparkles className="w-6 h-6 text-primary" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
          QuoteFast
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-white/80">
            <Button href="/features" variant="underline" size="sm">Features</Button>
            <Button href="/pricing" variant="underline" size="sm">Pricing</Button>
            <Button href="/login" variant="underline" size="sm">Login</Button>
          </div>

          {/* Theme Toggle - Glass styled */}
          <Button
            variant="glass"
            size="sm"
            onClick={toggleTheme}
            className="rounded-full !border-primary"
            aria-label={`Toggle theme to ${theme === 'dark' ? 'light' : 'dark'} mode`} // Accessibility: ARIA label
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
                <span className="sr-only">Light Mode</span>
                {/*<span className="text-sm">Light</span>*/}
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
                <span className="sr-only">Dark Mode</span>
                {/*<span className="text-sm">Dark</span>*/}
              </>
            )}
          </Button>

          <Button href="/register" variant="glass" size="default">
            <Star className="w-4 h-4" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
            Start Gratis
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section - Enhanced with Glass Buttons */}
      <section className="container-app py-24 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Zap className="w-4 h-4 text-primary" aria-hidden="true" /> {/* Accessibility: Hide icon from screen readers */}
          </motion.div>
          <span className="text-sm font-medium text-foreground">AI-Powered Quote Generation</span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white">
            <GradientText className="text-5xl md:text-6xl font-bold">
              QuoteFast Dashboard.
            </GradientText>
            <br />
            <span className="text-muted-foreground">Automatiseer je offertes met AI en groei je bedrijf sneller.</span>
          