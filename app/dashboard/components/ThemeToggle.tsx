"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className={`relative p-2 rounded-xl border transition-all duration-200 group backdrop-blur-md ${
          theme === "dark"
            ? "bg-gray-800/60 hover:bg-gray-700/70 border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl"
            : "bg-gray-100/80 hover:bg-gray-200/90 border-gray-400 shadow-sm border-opacity-60"
        }`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            theme === "light" 
              ? "opacity-100 rotate-0 scale-100 text-yellow-500" 
              : "opacity-0 rotate-90 scale-75 text-yellow-400"
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            theme === "dark" 
              ? "opacity-100 rotate-0 scale-100 text-blue-300" 
              : "opacity-0 -rotate-90 scale-75 text-blue-500"
          }`}
        />
      </div>
      
        {/* Ripple effect */}
        <div className={`absolute inset-0 rounded-xl scale-0 group-active:scale-100 transition-transform duration-150 ${
          theme === "dark" ? "bg-white/20" : "bg-gray-300"
        }`} />
      </button>
      
      {/* Custom tooltip */}
      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 tooltip-transition tooltip tooltip-enhanced tooltip-pointer-events-none whitespace-nowrap z-50 backdrop-blur-md ${
        theme === "dark"
          ? "bg-gray-800/80 text-white border border-gray-600/50 shadow-xl"
          : "bg-white/90 text-gray-800 border border-gray-300/60 shadow-lg"
      }`} role="tooltip">
        Switch to {theme === "dark" ? "light" : "dark"} theme
        <span className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${
          theme === "dark"
            ? "border-t-gray-800/80"
            : "border-t-white/90"
        }`}></span>
      </span>
    </div>
  );
}
