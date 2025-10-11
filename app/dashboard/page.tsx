"use client";
import DashboardCard from "./components/DashboardCard";
import LoadingCard from "./components/LoadingCard";
import { Zap, FileText, Users, Euro, TrendingUp, Target, BarChart3, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { customersApi, invoicesApi } from "../../lib/api-service";
import { DashboardData, DashboardCardProps, Invoice } from "../../types/dashboard";

const AiSphere = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="relative w-96 h-96">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute inset-8 bg-gradient-to-br from-pink-500 to-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-3000"></div>
    </div>
  </div>
);

export default function DashboardPage() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData>({
    offersSent: 0,
    avgOfferValue: "€0",
    activeCustomers: 0,
    aiGenerations: 45
  });

  // Memoized data fetching function
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Parallel data fetching voor betere performance
      const [customersResponse, invoicesResponse] = await Promise.all([
        customersApi.getAll(),
        invoicesApi.getAll()
      ]);
      
      // Controleer op fouten
      if (customersResponse.error) {
        setError(customersResponse.error);
        setIsLoading(false);
        return;
      }
      
      if (invoicesResponse.error) {
        setError(invoicesResponse.error);
        setIsLoading(false);
        return;
      }
      
      // Bereken dashboard metrics
      const activeCustomers = customersResponse.data?.length || 0;
      const invoices = invoicesResponse.data || [];
      const offersSent = invoices.length;
      
      // Bereken gemiddelde factuurwaarde met proper typing
      const totalValue = invoices.reduce((sum: number, invoice: Invoice) => {
        return sum + (invoice.total || 0);
      }, 0);
      
      const avgValue = offersSent > 0 ? totalValue / offersSent : 0;
      const formattedAvgValue = `€${avgValue.toFixed(0)}`;
      
      // Update state
      setData({
        offersSent,
        avgOfferValue: formattedAvgValue,
        activeCustomers,
        aiGenerations: 45 // TODO: Implementeer AI generaties API
      });
      
      setIsLoading(false);
    } catch (err: unknown) {
      console.error("Error fetching dashboard data:", err);
      const errorMessage = err instanceof Error ? err.message : "Er is een fout opgetreden bij het ophalen van de dashboard gegevens";
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    
    // Refresh data elke 30 seconden - alleen als component mounted is
    const interval = setInterval(fetchDashboardData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl px-4">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-2xl w-full backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-500 mb-2">Er is een fout opgetreden</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <button 
                onClick={() => fetchDashboardData()} 
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label="Vernieuw dashboard gegevens"
              >
                Vernieuwen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <AiSphere />
      
      <div className="relative z-10 flex flex-col items-center text-center mb-10 mt-8 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4 shadow-lg hover:bg-white/10 transition-all duration-300">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-gray-300">AI-Powered Dashboard</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-purple-400 mb-3">
          QuoteFast Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-300 max-w-2xl leading-relaxed">
          Visualiseer en plan je bedrijfsactiviteiten met AI-aangedreven inzichten en interactieve doelstellingen.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl mb-10">
        <EnhancedGlassCard 
          icon={<FileText className="h-8 w-8 text-blue-400" />} 
          title="Verstuurde Offertes" 
          value={data.offersSent} 
          description="Totaal aantal" 
          trend="+12% deze maand"
          color="blue"
          href="/dashboard/offertes"
        />
        <EnhancedGlassCard 
          icon={<Euro className="h-8 w-8 text-emerald-400" />} 
          title="Gem. Offerte Waarde" 
          value={data.avgOfferValue} 
          description="Laatste 30 dagen" 
          trend="+8% vs vorige maand"
          color="emerald"
          href="/dashboard/financials"
        />
        <EnhancedGlassCard 
          icon={<Users className="h-8 w-8 text-purple-400" />} 
          title="Actieve Klanten" 
          value={data.activeCustomers} 
          description="Leads en contacten" 
          trend="+15 nieuwe deze week"
          color="purple"
          href="/dashboard/contactpersoon"
        />
        <EnhancedGlassCard 
          icon={<Zap className="h-8 w-8 text-amber-400" />} 
          title="AI Generaties" 
          value={data.aiGenerations} 
          description="Slimme content" 
          trend="+3 vandaag"
          color="amber"
          href="/dashboard/ai-tools"
        />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/dashboard/offertes"
          className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-lg backdrop-blur-md text-white hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/25 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Bekijk alle offertes
          </div>
        </Link>
        <Link
          href="/dashboard/contactpersoon"
          className="px-6 py-3 bg-white/5 border border-white/20 rounded-lg backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Klanten beheren
          </div>
        </Link>
      </div>
    </div>
  );
}

const EnhancedGlassCard: React.FC<DashboardCardProps> = ({ icon, title, value, description, trend, color, href }) => {
  const colorClasses = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-400/20 hover:border-blue-400/40",
    emerald: "from-emerald-500/10 to-green-500/10 border-emerald-400/20 hover:border-emerald-400/40",
    purple: "from-purple-500/10 to-violet-500/10 border-purple-400/20 hover:border-purple-400/40",
    amber: "from-amber-500/10 to-yellow-500/10 border-amber-400/20 hover:border-amber-400/40"
  };

  const CardContent = () => (
    <>
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            {icon}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 font-medium">{trend}</div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
          <p className="text-sm font-semibold text-gray-200 mb-1">{title}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        
        {href && (
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-xs text-right text-gray-300 flex items-center justify-end">
              <span>Meer details</span>
              <TrendingUp className="h-3 w-3 ml-1" />
            </div>
          </div>
        )}
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`relative group bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-6 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 min-h-[200px] cursor-pointer`}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={`relative group bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-6 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 min-h-[200px]`}>
      <CardContent />
    </div>
  );
};

interface GlassCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ icon, title, value, description }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center backdrop-blur-lg shadow-lg hover:bg-white/10 transition-all duration-300 aspect-square">
      <div className="mb-4">{icon}</div>
      <h3 className="text-4xl font-bold text-white">{value}</h3>
      <p className="text-sm text-gray-300 mt-1">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
};

