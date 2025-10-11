"use client";
import DashboardCard from "../components/DashboardCard";
import { useTheme } from "../../../contexts/ThemeContext";

export default function OmgevingPage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Omgeving & Lokale Bedrijven</h1>
        <p className={`${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>Ontdek bedrijven en diensten in je omgeving</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Lokale Bedrijven" value={127} growth="8%" />
        <DashboardCard title="Nieuwe Deze Week" value={12} growth="15%" />
        <DashboardCard title="Actieve Partners" value={34} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categorieën */}
        <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
          theme === "dark"
            ? "bg-card/80 border-border shadow-sm"
            : "bg-card/90 border-border shadow-md"
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>Populaire Categorieën</h2>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-sm">🍕</span>
                </div>
                <div>
                  <p className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>Restaurants & Horeca</p>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>23 bedrijven</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400">+3 deze week</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-sm">🛒</span>
                </div>
                <div>
                  <p className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>Winkels & Retail</p>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>18 bedrijven</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400">+2 deze week</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 text-sm">🔧</span>
                </div>
                <div>
                  <p className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>Diensten & Reparaties</p>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>31 bedrijven</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400">+5 deze week</span>
            </div>
          </div>
        </div>

        {/* Recente Toevoegingen */}
        <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
          theme === "dark"
            ? "bg-card/80 border-border shadow-sm"
            : "bg-card/90 border-border shadow-md"
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>Recent Toegevoegd</h2>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
            }`}>
              <div>
                <p className={`font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>Café de Hoek</p>
                <p className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>Hoofdstraat 123 - Koffie & Lunch</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">⭐ 4.8</span>
                  <span className={`text-xs ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>0.2 km</span>
                </div>
              </div>
              <span className="text-xs text-emerald-400">2 dagen geleden</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
            }`}>
              <div>
                <p className={`font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>Auto Service Jan</p>
                <p className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>Industrieweg 45 - Auto Reparaties</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">⭐ 4.6</span>
                  <span className={`text-xs ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>0.8 km</span>
                </div>
              </div>
              <span className="text-xs text-emerald-400">5 dagen geleden</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-xl ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
            }`}>
              <div>
                <p className={`font-medium ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>Bloemenwinkel Bloem</p>
                <p className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>Marktplein 7 - Bloemen & Planten</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">⭐ 4.9</span>
                  <span className={`text-xs ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}>0.3 km</span>
                </div>
              </div>
              <span className="text-xs text-emerald-400">1 week geleden</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kaart Preview */}
      <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
        theme === "dark"
          ? "bg-card/80 border-border shadow-sm"
          : "bg-card/90 border-border shadow-md"
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Kaart Overzicht</h2>
        <div className={`rounded-xl p-8 text-center ${
          theme === "dark" ? "bg-gray-800/50" : "bg-gray-100/50"
        }`}>
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-400 text-2xl">🗺️</span>
          </div>
          <p className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>Interactieve kaart met alle lokale bedrijven</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Bekijk op Kaart
          </button>
        </div>
      </div>
    </div>
  );
}