"use client";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../../contexts/ThemeContext";
import { Search, Bell, Settings } from "lucide-react";
import { useState } from "react";

export default function TopNav() {
  const { theme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  
  return (
    <div className={`flex items-center justify-between rounded-2xl border backdrop-blur-xl px-6 py-4 transition-all duration-300 relative dashboard-nav group ${
      theme === "dark"
        ? "border-white/20 bg-white/10 hover:bg-white/15"
        : "border-gray-400/60 bg-gray-50/90 shadow-md hover:bg-gray-100/95 hover:shadow-lg"
    }`}>
      {/* Left side - Title */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={`text-lg sm:text-xl font-semibold transition-colors ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          Dashboard
        </div>
        <div className={`hidden sm:block text-sm ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          Welcome back! 👋
        </div>
      </div>
      
      {/* Right side - Search and Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Enhanced Search Bar */}
        <div className={`relative transition-all duration-300 ${
          isSearchFocused ? "scale-105" : "scale-100"
        }`}>
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors ${
            isSearchFocused
              ? "text-blue-500"
              : theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`} />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            aria-label="Search dashboard"
            className={`w-48 sm:w-64 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none border transition-all duration-300 ${
            theme === "dark"
                ? isSearchFocused
                  ? "bg-white/15 border-blue-500/50 text-white placeholder-gray-300"
                  : "bg-white/10 border-white/20 placeholder-gray-400 text-gray-100 hover:bg-white/12"
                : isSearchFocused
                  ? "bg-white border-blue-500 text-gray-900 placeholder-gray-500 shadow-md"
                  : "bg-gray-100/80 border-gray-400/60 placeholder-gray-600 text-gray-900 hover:bg-gray-100/90"
            }`}
          />
          {/* Search indicator */}
          {searchValue && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <button
            className={`relative p-2 rounded-xl transition-all duration-200 group-hover:scale-110 interactive-button ${
              theme === "dark"
                ? "hover:bg-white/10 text-gray-300 hover:text-white"
                : "hover:bg-gray-200/80 text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Notifications"
            aria-describedby="notification-indicator"
          >
            <Bell className="h-4 w-4" />
            <span id="notification-indicator" className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" aria-label="3 unread notifications"></span>
          </button>
          
          {/* Settings */}
          <button
            className={`p-2 rounded-xl transition-all duration-200 group-hover:scale-110 interactive-button ${
              theme === "dark"
                ? "hover:bg-white/10 text-gray-300 hover:text-white"
                : "hover:bg-gray-200/80 text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Settings"
            title="Open settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
        
        {/* Enhanced User Avatar */}
        <div className={`relative group cursor-pointer`} role="button" tabIndex={0} aria-label="User menu" onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}>
          <div className={`size-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${
            theme === "dark"
              ? "border-white/30 hover:border-white/50"
              : "border-gray-300 hover:border-gray-400"
          }`}>
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <div className={`absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 ${
            theme === "dark" ? "border-gray-900" : "border-white"
          }`} aria-label="Online status"></div>
        </div>
      </div>
    </div>

  );
}
