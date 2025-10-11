"use client";
import DashboardCard from "./components/DashboardCard";
import LoadingCard from "./components/LoadingCard";
import RevenueChart from "./components/RevenueChart";
import OffersChart from "./components/OffersChart";
import ConversionChart from "./components/ConversionChart";
import CustomerActivityChart from "./components/CustomerActivityChart";
import ActivityFeed from "./components/ActivityFeed";
import ExportButton from "./components/ExportButton";
import { Activity, FolderOpen, Users, Zap, FileText, Euro, Target, Clock, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAIPersonalization } from "../../contexts/AIPersonalizationContext";
import { getPersonalizedQuickActions } from "../../lib/aiPersonalization";

export default function DashboardPage() {
  const { theme } = useTheme();
  const { onboardingData, contextualHelp } = useAIPersonalization();
  const [isLoading, setIsLoading] = useState(true);
  
  // Fallback: force show content after 2 seconds max
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(fallbackTimer);
  }, []);
  const [data, setData] = useState({
    executions: 340,
    projects: 12,
    teamReviews: 5,
    activeUsers: 1284,
    revenue: "$45.2K",
    conversion: "3.2%",
    avgResponse: "1.2s",
    // QuoteFast-specifieke metrics
    offersSent: 127,
    avgOfferValue: "€2,450",
    acceptanceRate: "67%",
    openOffers: 23,
    activeCustomers: 89,
    aiGenerations: 45
  });

  useEffect(() => {
    // Simulate data loading - much faster
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    // Real-time data simulation
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        executions: prevData.executions + Math.floor(Math.random() * 3),
        offersSent: prevData.offersSent + Math.floor(Math.random() * 2),
        activeUsers: prevData.activeUsers + Math.floor(Math.random() * 5),
        aiGenerations: prevData.aiGenerations + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton for demo section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        </div>

        {/* Loading skeletons for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header with Export Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {onboardingData ? 
              `Welkom ${onboardingData.companyName}! ${contextualHelp('dashboard')}` :
              'Overzicht van je QuoteFast account'
            }
          </p>
        </div>
        <ExportButton />
      </div>

      {/* AI Quote Fast Advanced Layout Demo */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg p-6 border border-blue-200 dark:border-gray-600/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🚀 AI Quote Fast Advanced Layout
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ervaar de volgende generatie van offerte management met AI-powered features, custom cursors, en glassmorphism effecten
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard/advanced"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Zap className="h-4 w-4" />
              Bekijk Demo
            </Link>
            <Link
              href="/dashboard/examples"
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              Voorbeelden
            </Link>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <DashboardCard
          title="Executions"
          value={data.executions}
          growth="204%"
          icon={<Activity className="h-5 w-5" />}
          progress={75}
          trend="up"
          delay={0}
        />
        <DashboardCard
          title="Projects"
          value={data.projects}
          growth="18%"
          icon={<FolderOpen className="h-5 w-5" />}
          progress={60}
          trend="up"
          delay={100}
        />
        <DashboardCard
          title="Team Reviews"
          value={data.teamReviews}
          icon={<Users className="h-5 w-5" />}
          progress={40}
          trend="down"
          growth="-12%"
          delay={200}
        />
      </div>
      
      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <DashboardCard
          title="Active Users"
          value={data.activeUsers}
          growth="8%"
          progress={82}
          delay={300}
        />
        <DashboardCard
          title="Revenue"
          value={data.revenue}
          growth="32%"
          progress={91}
          delay={400}
        />
        <DashboardCard
          title="Conversion"
          value={data.conversion}
          growth="-5%"
          trend="down"
          progress={28}
          delay={500}
        />
        <DashboardCard
          title="Avg. Response"
          value={data.avgResponse}
          growth="15%"
          progress={67}
          delay={600}
        />
      </div>

      {/* QuoteFast-Specifieke Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <DashboardCard
          title="Offertes Verstuurd"
          value={data.offersSent}
          growth="24%"
          icon={<FileText className="h-5 w-5" />}
          progress={76}
          delay={700}
        />
        <DashboardCard
          title="Gem. Offerte Waarde"
          value={data.avgOfferValue}
          growth="12%"
          icon={<Euro className="h-5 w-5" />}
          progress={68}
          delay={800}
        />
        <DashboardCard
          title="Acceptatie Ratio"
          value={data.acceptanceRate}
          growth="8%"
          icon={<Target className="h-5 w-5" />}
          progress={67}
          delay={900}
        />
        <DashboardCard
          title="Open Offertes"
          value={data.openOffers}
          growth="-3%"
          trend="down"
          icon={<Clock className="h-5 w-5" />}
          progress={45}
          delay={1000}
        />
        <DashboardCard
          title="Klanten Actief"
          value={data.activeCustomers}
          growth="15%"
          icon={<Users className="h-5 w-5" />}
          progress={89}
          delay={1100}
        />
        <DashboardCard
          title="AI Generaties"
          value={data.aiGenerations}
          growth="42%"
          icon={<Zap className="h-5 w-5" />}
          progress={78}
          delay={1200}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart />
        <OffersChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ConversionChart />
        <CustomerActivityChart />
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActivityFeed />
        </div>
        <div className="xl:col-span-1">
          {/* Personalized Quick Actions */}
          <div className={`rounded-xl p-6 border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/30' 
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              {onboardingData ? (
                getPersonalizedQuickActions(onboardingData).map((action) => (
                  <Link
                    key={action.id}
                    href={action.href}
                    className={`w-full p-3 rounded-lg border transition-colors block text-left ${
                      theme === 'dark' 
                        ? 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30' 
                        : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm opacity-75">{action.description}</div>
                  </Link>
                ))
              ) : (
                <>
                  <button className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30' 
                      : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                  }`}>
                    Nieuwe Offerte
                  </button>
                  <button className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30' 
                      : 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'
                  }`}>
                    Klant Toevoegen
                  </button>
                  <button className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30' 
                      : 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100'
                  }`}>
                    Rapport Genereren
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

