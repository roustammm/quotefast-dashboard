"use client";
import DashboardCard from "../components/DashboardCard";
import { useTheme } from "../../../contexts/ThemeContext";

export default function EmailPage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Email</h1>
        <p className={`${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>Beheer je email communicatie en campagnes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Verzonden" value={1234} growth="32%" />
        <DashboardCard title="Open Rate" value="24.5%" growth="8%" />
        <DashboardCard title="Click Rate" value="3.2%" />
      </div>
      
      <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
        theme === "dark"
          ? "bg-card/80 border-border shadow-sm"
          : "bg-card/90 border-border shadow-md"
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Recente Email Campagnes</h2>
        <div className="space-y-3">
          <div className={`flex items-center justify-between p-3 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
          }`}>
            <div>
              <p className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Nieuwsbrief December</p>
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>1,234 ontvangers - 24.5% open rate</p>
            </div>
            <span className="text-xs text-emerald-400">Voltooid</span>
          </div>
          <div className={`flex items-center justify-between p-3 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
          }`}>
            <div>
              <p className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Product Update</p>
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>856 ontvangers - 18.2% open rate</p>
            </div>
            <span className="text-xs text-yellow-400">In behandeling</span>
          </div>
        </div>
      </div>
    </div>
  );
}
