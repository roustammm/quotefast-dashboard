"use client";
import DashboardCard from "../components/DashboardCard";
import { useTheme } from "../../../contexts/ThemeContext";

export default function ContactpersoonPage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Contactpersonen</h1>
        <p className={`${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>Beheer je contactpersonen en klantgegevens</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Totaal Contacten" value={156} growth="12%" />
        <DashboardCard title="Nieuwe Deze Maand" value={23} growth="8%" />
        <DashboardCard title="Actieve Contacten" value={89} />
      </div>
      
      <div className={`backdrop-blur-xl rounded-2xl border p-6 transition-all duration-300 ${
        theme === "dark"
          ? "bg-white/10 border-white/20 hover:bg-white/15"
          : "bg-gray-50/90 border-gray-400/60 hover:bg-gray-100/90 shadow-md"
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Recent Toegevoegde Contacten</h2>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
            theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-100/50 hover:bg-gray-200/60"
          }`}>
            <div>
              <p className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Jan de Vries</p>
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>jan@example.com</p>
            </div>
            <span className={`text-xs ${
              theme === "dark" ? "text-emerald-400" : "text-emerald-600"
            }`}>2 dagen geleden</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
            theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-100/50 hover:bg-gray-200/60"
          }`}>
            <div>
              <p className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Maria Jansen</p>
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>maria@example.com</p>
            </div>
            <span className="text-xs text-emerald-400">5 dagen geleden</span>
          </div>
        </div>
      </div>
    </div>
  );
}
