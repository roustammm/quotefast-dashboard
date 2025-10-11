"use client";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className={`flex h-screen transition-colors duration-300 relative ${
      theme === "dark"
        ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100"
        : "bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 text-gray-900"
    }`}>
      <Sidebar />
      <main className="flex-1 ml-20 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 relative dashboard-main min-h-screen">
        <TopNav />
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </ThemeProvider>
  );
}
