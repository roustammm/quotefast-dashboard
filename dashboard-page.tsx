'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Search,
  Bell,
  Settings,
  Plus
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { ContactsList } from '@/components/dashboard/ContactsList';
import AIVoiceQuoteGenerator from '@/components/AIVoiceQuoteGenerator';

export default function DashboardPage() {
  // Demo data
  const stats = [
    {
      title: 'Totaal Contacten',
      value: 156,
      trend: 12,
      icon: <Users className="h-6 w-6 text-blue-400" />,
      color: 'blue' as const,
    },
    {
      title: 'Nieuwe Deze Maand',
      value: 23,
      trend: 8,
      icon: <TrendingUp className="h-6 w-6 text-purple-400" />,
      color: 'purple' as const,
    },
    {
      title: 'Actieve Contacten',
      value: 89,
      trend: 5,
      icon: <FileText className="h-6 w-6 text-green-400" />,
      color: 'green' as const,
    },
    {
      title: 'Omzet Deze Maand',
      value: '€24,5K',
      trend: 15,
      icon: <DollarSign className="h-6 w-6 text-orange-400" />,
      color: 'orange' as const,
    },
  ];

  const contacts = [
    {
      id: '1',
      name: 'Jan de Vries',
      email: 'jan@example.com',
      phone: '+31 6 1234 5678',
      lastContact: '2 dagen geleden',
    },
    {
      id: '2',
      name: 'Maria Jansen',
      email: 'maria@example.com',
      phone: '+31 6 9876 5432',
      lastContact: '5 dagen geleden',
    },
    {
      id: '3',
      name: 'Piet Bakker',
      email: 'piet@example.com',
      lastContact: '1 week geleden',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Left: Welcome */}
          <div>
            <h1 className="text-2xl font-bold text-white">
              Dashboard
              <span className="ml-3 inline-block rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 text-sm font-medium">
                PRO
              </span>
            </h1>
            <p className="mt-1 text-sm text-gray-400">Welcome back 👋</p>
          </div>

          {/* Right: Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-80 rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-xl focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Notification */}
            <button className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-gray-400 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Settings */}
            <button className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-gray-400 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white">
              <Settings className="h-5 w-5" />
            </button>

            {/* User Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 font-semibold text-white">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Quick Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex gap-4"
        >
          <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-purple-500/70">
            <Plus className="h-5 w-5" />
            Nieuwe Offerte
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10">
            <Users className="h-5 w-5" />
            Nieuw Contact
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10">
            <FileText className="h-5 w-5" />
            Alle Offertes
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <ContactsList contacts={contacts} />
        </motion.div>

        {/* Charts Section (Optional) */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Omzet Overzicht</h3>
            <div className="flex h-64 items-center justify-center text-gray-400">
              📊 Chart component hier (gebruik Recharts of Chart.js)
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">Recente Activiteit</h3>
            <div className="space-y-4">
              {[
                { action: 'Offerte verstuurd naar Jan de Vries', time: '5 min geleden' },
                { action: 'Nieuw contact toegevoegd: Maria Jansen', time: '1 uur geleden' },
                { action: 'Offerte geaccepteerd door Piet Bakker', time: '3 uur geleden' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-400" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* AI Voice Quote Generator (Floating Button) */}
      <AIVoiceQuoteGenerator />
    </div>
  );
}
