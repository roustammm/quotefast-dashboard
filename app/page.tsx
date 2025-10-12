'use client'

import Link from 'next/link'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon, Play, ArrowRight, CheckCircle, Shield, Users, Zap, Code, Rocket, Heart, Search, Bell, Settings, ArrowUp, ArrowDown, Folder, DollarSign, TrendingUp, Clock, FileText, Sparkles, Star } from 'lucide-react'
import PublicFooter from './components/PublicFooter'
import PricingSection from './components/PricingSection'
import AnimatedCard from '../components/ui/AnimatedCard'
import GradientText from '../components/ui/GradientText'
import FloatingElements from '../components/ui/FloatingElements'
import ScrollProgress from '../components/ui/ScrollProgress'
import ParallaxSection from '../components/ui/ParallaxSection'
import { motion } from 'framer-motion'

export default function Home() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <ScrollProgress />
      <FloatingElements />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-app py-6 flex items-center justify-between relative z-10"
      >
        <Link href="/" className="font-bold text-xl text-brand-text flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-brand-primary" />
          QuoteFast
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-brand-muted">
            <Link href="/features" className="hover:text-brand-text transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/pricing" className="hover:text-brand-text transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/login" className="hover:text-brand-text transition-colors relative group">
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>
          
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-primary/30 transition-all"
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-brand-text" />
                <span className="text-sm text-brand-text">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-brand-text" />
                <span className="text-sm text-brand-text">Light</span>
              </>
            )}
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register" className="btn-primary flex items-center gap-2">
              <Star className="w-4 h-4" />
              Probeer gratis
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section - Enhanced */}
      <section className="container-app py-24 relative z-10">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 text-brand-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-brand-primary/30 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Zap className="w-4 h-4" />
          </motion.div>
          <span>AI-Powered Quote Generation</span>
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-brand-text">
            <GradientText className="text-5xl md:text-6xl font-bold">
              QuoteFast Dashboard.
            </GradientText>
            <br />
            <span className="text-brand-muted">Automatiseer je offertes met AI en groei je bedrijf sneller.</span>
          </h1>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 group">
              <Sparkles className="w-5 h-5" />
              Start Gratis Proberen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/features" className="btn-ghost text-lg px-8 py-4 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Bekijk Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview - Makerkit Style */}
        <div className="mt-16 relative">
          <div className="relative max-w-6xl mx-auto">
            {/* macOS Window Frame */}
            <div className="macos-window rounded-t-xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-800/50 border-b border-gray-600/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">QuoteFast Dashboard</div>
                <div className="w-6"></div>
              </div>
            </div>
            
            {/* Dashboard Content - Real Dashboard Interface */}
            <div className="bg-gray-900 rounded-b-xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gray-800/50 border-b border-gray-700/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search anything..." 
                        className="bg-gray-700/50 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-600/30 focus:outline-none focus:border-blue-500/50 w-64"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                    <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                    <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        U
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promotional Banner */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mx-6 mt-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Try the Advanced Layout</h3>
                    <p className="text-gray-300">Experience custom cursors, 3D backgrounds, and glassmorphism effects.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                      <Zap className="w-4 h-4" />
                      View Demo
                    </button>
                    <button className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-colors">
                      Examples
                    </button>
                  </div>
                </div>
              </div>

              {/* Dashboard Cards Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Card 1 - Executions */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Executions</h3>
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">340</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        204%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>75%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 2 - Projects */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Projects</h3>
                      <Folder className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">12</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        18%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>60%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 3 - Team Reviews */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Team Reviews</h3>
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">5</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                        <ArrowDown className="w-3 h-3" />
                        -12%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>40%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 4 - Active Users */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Active Users</h3>
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">1.284</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        8%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '82%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>82%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 5 - Revenue */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Revenue</h3>
                      <DollarSign className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">$45.2K</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        32%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '91%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>91%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 6 - Conversion */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Conversion</h3>
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">3.2%</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                        <ArrowDown className="w-3 h-3" />
                        -5%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '28%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>28%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 7 - Avg Response */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Avg. Response</h3>
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">1.2s</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        15%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '67%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>67%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>

                  {/* Card 8 - Offers Generated */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-300 text-sm font-medium">Offers Generated</h3>
                      <FileText className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">127</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                        <ArrowUp className="w-3 h-3" />
                        24%
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '76%'}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>76%</span>
                      <span>Last updated: Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section className="container-app py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-text mb-4">
            <GradientText>Waarom kiezen voor QuoteFast?</GradientText>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Ontdek de krachtige features die je bedrijf naar het volgende niveau tillen
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <AnimatedCard delay={0.1} className="text-center bg-brand-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <Zap className="w-6 h-6 text-brand-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">AI Offertegenerator</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Laat AI automatisch professionele offertes genereren. Slimme productherkenning en automatische prijsberekening.
            </p>
          </AnimatedCard>

          {/* Feature 2 */}
          <AnimatedCard delay={0.2} className="text-center bg-brand-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <Users className="w-6 h-6 text-brand-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">CRM & Klantbeheer</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Beheer al je klanten, leads en contacten op één plek. Track conversaties en follow-ups voor betere klantrelaties.
            </p>
          </AnimatedCard>

          {/* Feature 3 */}
          <AnimatedCard delay={0.3} className="text-center bg-brand-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-6 h-6 text-brand-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">Facturatie & Betalingen</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Automatische facturatie, betalingsherinneringen en Stripe integratie. Accepteer betalingen online.
            </p>
          </AnimatedCard>

          {/* Feature 4 */}
          <AnimatedCard delay={0.4} className="text-center bg-brand-card/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <Rocket className="w-6 h-6 text-brand-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">Workflow Automatisering</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Automatiseer repetitieve taken. Van lead capture tot factuur verzending - alles draait automatisch.
            </p>
          </AnimatedCard>
        </div>
      </section>

      {/* Video Section 1 - Dashboard Demo */}
      <section className="container-app py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-text mb-4">Zie QuoteFast Dashboard in Actie</h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Bekijk hoe eenvoudig het is om offertes te genereren, klanten te beheren en je bedrijf te laten groeien
          </p>
        </div>
        
        {/* Video Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="video-placeholder aspect-video rounded-2xl flex items-center justify-center group cursor-pointer">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-brand-text font-medium">QuoteFast Dashboard Demo</p>
              <p className="text-brand-muted text-sm mt-2">AI Offertegenerator & CRM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section 2 - Authentication Flows (Side by Side) */}
      <section className="container-app py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-brand-text mb-6">Veilige Authenticatie & Gebruikersbeheer</h2>
            <p className="text-brand-muted text-lg mb-8">
              QuoteFast biedt complete authenticatie flows voor email, social login, en meer. 
              Beveilig je gebruikersaccounts met enterprise-grade security.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Email Authenticatie</h3>
                  <p className="text-brand-muted text-sm">Gebruikers kunnen inloggen met email en wachtwoord met veilige validatie.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Social Login</h3>
                  <p className="text-brand-muted text-sm">Ondersteuning voor Google, Facebook, LinkedIn en meer OAuth providers.</p>
          </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Magic Links</h3>
                  <p className="text-brand-muted text-sm">Wachtwoordloze authenticatie met veilige email link verificatie.</p>
                </div>
            </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Wachtwoord Reset</h3>
                  <p className="text-brand-muted text-sm">Geautomatiseerde wachtwoord reset flow met veilige token validatie.</p>
                </div>
              </div>
            </div>
            </div>

          {/* Video Content */}
          <div className="relative">
            <div className="video-placeholder aspect-video rounded-2xl flex items-center justify-center group cursor-pointer">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-brand-text font-medium">Authenticatie Demo</p>
                <p className="text-brand-muted text-sm mt-2">Login & Registratie Flow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section 3 - AI Offertegenerator */}
      <section className="container-app py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video Content */}
          <div className="relative order-2 lg:order-1">
            <div className="video-placeholder aspect-video rounded-2xl flex items-center justify-center group cursor-pointer">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-brand-text font-medium">AI Offertegenerator</p>
                <p className="text-brand-muted text-sm mt-2">Smart Quote Generation</p>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-brand-text mb-6">AI-Powered Offertegenerator</h2>
            <p className="text-brand-muted text-lg mb-8">
              Laat AI automatisch professionele offertes genereren op basis van je producten en diensten. 
              Bespaar uren werk en verhoog je conversie met slimme suggesties.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Slimme Productherkenning</h3>
                  <p className="text-brand-muted text-sm">AI herkent automatisch producten en stelt de juiste prijzen voor.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Automatische Berekenen</h3>
                  <p className="text-brand-muted text-sm">BTW, kortingen en totaalbedragen worden automatisch berekend.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Professionele Templates</h3>
                  <p className="text-brand-muted text-sm">Kies uit verschillende professionele offerte templates.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">PDF Export</h3>
                  <p className="text-brand-muted text-sm">Exporteer offertes direct naar PDF voor verzending naar klanten.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section 4 - Multi-Tenancy & Teams */}
      <section className="container-app py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-brand-text mb-6">Teams & Samenwerking</h2>
            <p className="text-brand-muted text-lg mb-8">
              Laat je gebruikers teams aanmaken en resources delen met andere leden. 
              Perfect voor bureaus, consultants en groeiende bedrijven.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Organisaties/Teams</h3>
                  <p className="text-brand-muted text-sm">Ingebouwde ondersteuning voor gebruikersgroepen die resources en permissies kunnen delen.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Gebruiker Uitnodigingen</h3>
                  <p className="text-brand-muted text-sm">Gebruikers kunnen nieuwe leden uitnodigen, rollen toewijzen en toegang tot features beheren.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Lid Rollen</h3>
                  <p className="text-brand-muted text-sm">Eigenaar, Admin, Lid rollen met verschillende permissieniveaus.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-brand-text font-semibold mb-1">Resource Delen</h3>
                  <p className="text-brand-muted text-sm">Deel projecten, documenten en data veilig tussen teamleden.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Content */}
          <div className="relative">
            <div className="video-placeholder aspect-video rounded-2xl flex items-center justify-center group cursor-pointer">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-brand-text font-medium">Team Beheer</p>
                <p className="text-brand-muted text-sm mt-2">Multi-Tenancy Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="container-app py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-text mb-4">Complete SaaS Solution</h2>
          <p className="text-brand-muted text-lg max-w-3xl mx-auto">
            QuoteFast is meer dan alleen offertes. Het is een complete business management suite 
            met alle tools die je nodig hebt om je bedrijf te laten groeien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-brand-card/50 rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all group">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">CRM & Klantbeheer</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Beheer al je klanten, leads en contacten op één plek. Track conversaties, 
              notities en follow-ups voor betere klantrelaties.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-brand-card/50 rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all group">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">Facturatie & Betalingen</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Automatische facturatie, betalingsherinneringen en integratie met Stripe. 
              Accepteer betalingen online en houd je cashflow in de gaten.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-brand-card/50 rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all group">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">Workflow Automatisering</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Automatiseer repetitieve taken met slimme workflows. Van lead capture 
              tot factuur verzending - alles draait automatisch.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-brand-card/50 rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all group">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">API & Integraties</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Krachtige API voor integraties met je bestaande tools. Webhooks, 
              Zapier, en custom integraties voor maximale flexibiliteit.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-brand-card/50 rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all group">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">Rapportage & Analytics</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Inzichtelijke dashboards en rapporten. Track je omzet, conversies 
              en klantgedrag voor betere business beslissingen.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-brand-card/50 rounded-2xl p-8 border border-white/10 hover:border-brand-primary/30 transition-all group">
            <div className="w-12 h-12 bg-brand-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-text mb-3">Klantportaal</h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Geef je klanten toegang tot hun eigen portaal. Bekijk offertes, 
              facturen en projectstatus in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="container-app py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-brand-text mb-6">Klaar om je Bedrijf te Laten Groeien?</h2>
          <p className="text-brand-muted text-lg mb-8 max-w-2xl mx-auto">
            Sluit je aan bij honderden ondernemers die al hun offertes automatiseren met QuoteFast
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 group">
              Start Gratis Proberen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/features" className="btn-ghost text-lg px-8 py-4">Bekijk Alle Features</Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-brand-muted text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-brand-secondary" />
              <span>Geen setup kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-secondary" />
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-secondary" />
              <span>500+ tevreden klanten</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
