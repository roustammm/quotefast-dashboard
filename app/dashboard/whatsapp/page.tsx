"use client";
import DashboardCard from "../components/DashboardCard";
import { useTheme } from "../../../contexts/ThemeContext";

export default function WhatsappPage() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>WhatsApp</h1>
        <p className={`${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>Beheer je WhatsApp berichten en automatisering</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Berichten Verzonden" value={456} growth="28%" />
        <DashboardCard title="Response Rate" value="78%" growth="12%" />
        <DashboardCard title="Actieve Chats" value={23} />
      </div>
      
      <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
        theme === "dark"
          ? "bg-card/80 border-border shadow-sm"
          : "bg-card/90 border-border shadow-md"
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>Recente WhatsApp Berichten</h2>
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
              }`}>Bedankt voor de snelle reactie!</p>
            </div>
            <span className="text-xs text-emerald-400">2 minuten geleden</span>
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
              }`}>Wanneer kunnen we afspreken?</p>
            </div>
            <span className="text-xs text-yellow-400">5 minuten geleden</span>
          </div>
        </div>
      </div>
    </div>
  );
}
