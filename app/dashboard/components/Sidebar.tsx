"use client";
import { Home, Library, Folder, Settings, Users, Clock, Bell, Bot, User, FileText, Receipt, Mail, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../../../contexts/ThemeContext";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Folder, label: "Projects", href: "/dashboard/projects" },
  { icon: Library, label: "Library", href: "/dashboard/library" },
  { icon: Bot, label: "AI Models", href: "/dashboard/models" },
  { icon: User, label: "Contactpersonen", href: "/dashboard/contactpersoon" },
  { icon: FileText, label: "Offertes", href: "/dashboard/offertes" },
  { icon: Receipt, label: "Facturatie", href: "/dashboard/facturatie" },
  { icon: Mail, label: "Email", href: "/dashboard/email" },
  { icon: MessageCircle, label: "WhatsApp", href: "/dashboard/whatsapp" },
  { icon: MapPin, label: "Omgeving", href: "/dashboard/omgeving" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: Bell, label: "Updates", href: "/dashboard/updates" },
  { icon: Clock, label: "History", href: "/dashboard/history" },
] as const;

export default function Sidebar() {
  const { theme } = useTheme();
  
  return (
    <aside className={`fixed left-0 top-0 h-screen w-20 flex flex-col items-center justify-between py-6 backdrop-blur-xl border-r transition-all duration-300 dashboard-sidebar group ${
      theme === "dark"
        ? "bg-white/10 border-white/20 hover:bg-white/12"
        : "bg-white/90 border-gray-400/60 shadow-lg hover:bg-white/95 hover:shadow-xl"
    }`}>
      <div className="flex flex-col items-center gap-6">
        {navItems.map(({ icon: Icon, label, href }, index) => (
          <Link
            key={label}
            href={href}
            className={`group relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 hover:scale-110 backdrop-blur-md ${
              theme === "dark"
                ? "bg-gray-800/60 hover:bg-gray-700/70 border border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl"
                : "bg-gray-100/80 hover:bg-gray-200/90 shadow-sm border border-gray-300/50"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
            aria-label={`Navigate to ${label}`}
          >
            <Icon className={`h-5 w-5 transition-colors duration-300 ${
              theme === "dark" ? "text-white group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"
            }`} />
            <span className={`absolute left-14 text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 tooltip-transition tooltip tooltip-enhanced tooltip-pointer-events-none whitespace-nowrap z-50 backdrop-blur-md ${
              theme === "dark"
                ? "bg-gray-800/80 text-white border border-gray-600/50 shadow-xl"
                : "bg-white/90 text-gray-800 border border-gray-300/60 shadow-lg"
            }`} role="tooltip">
              {label}
              <span className={`absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${
                theme === "dark" ? "bg-gray-800/80 border-l border-t border-gray-600/50" : "bg-white/90 border-l border-t border-gray-300/60"
              }`}></span>
            </span>
          </Link>
        ))}
      </div>
      <div className="relative">
        <Link
          href="/dashboard/settings"
          className={`p-3 rounded-2xl transition-all duration-300 group hover:scale-110 backdrop-blur-md ${
            theme === "dark"
              ? "bg-gray-800/60 hover:bg-gray-700/70 border border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl"
              : "bg-white/70 hover:bg-white/80 border border-gray-300/60 hover:border-gray-400/70 shadow-md hover:shadow-lg"
          }`}
          aria-label="Navigate to Settings"
        >
          <Settings className={`h-5 w-5 transition-colors duration-300 ${
            theme === "dark" ? "text-white group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"
          }`} />
        </Link>
        <span className={`absolute left-14 top-1/2 -translate-y-1/2 text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 tooltip-transition tooltip tooltip-enhanced tooltip-pointer-events-none whitespace-nowrap z-50 backdrop-blur-md ${
          theme === "dark"
            ? "bg-gray-800/80 text-white border border-gray-600/50 shadow-xl"
            : "bg-white/90 text-gray-800 border border-gray-300/60 shadow-lg"
        }`} role="tooltip">
          Settings
          <span className={`absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${
            theme === "dark" ? "bg-gray-800/80 border-l border-t border-gray-600/50" : "bg-white/90 border-l border-t border-gray-300/60"
          }`}></span>
        </span>
      </div>
      
      {/* Active indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></div>
      </div>
    </aside>
  );
}
