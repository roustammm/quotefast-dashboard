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
      
      <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
        theme === "dark"
          ? "bg-card/80 border-border shadow-sm"
          : "bg-card/90 border-border shadow-md"
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Recent Toegevoegde Contacten</h2>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
          }`}>
            <div>
              <p className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Jan de Vries</p>
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>jan@example.com</p>
            </div>
            <span className="text-xs text-emerald-400">2 dagen geleden</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
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
