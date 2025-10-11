"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardCard({
  title,
  value,
  growth,
  icon,
  progress,
  trend = "up",
  delay = 0,
}: {
  title: string;
  value: string | number;
  growth?: string;
  icon?: React.ReactNode;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}) {
  const { theme } = useTheme();
  const [displayValue, setDisplayValue] = useState<string | number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number } | null>(null);
  
  // Animate value count-up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (typeof value === 'number') {
        const duration = 800;
        const steps = 30;
        const increment = value / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);
        
        return () => clearInterval(counter);
      } else {
        setDisplayValue(value);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  const isPositiveGrowth = growth && trend === "up";
  const isNegativeGrowth = growth && trend === "down";

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRippleEffect({ x, y });
    setIsExpanded(!isExpanded);
    
    // Clear ripple effect after animation
    setTimeout(() => setRippleEffect(null), 600);
  };
  
  return (
    <Card
      className={`dashboard-card-enhanced card-hover-lift card-content-fade-in cursor-pointer transition-all duration-300 ${
        theme === "dark" ? "dark" : "light"
      } ${isHovered ? 'card-glow' : ''} ${isExpanded ? 'scale-105 shadow-2xl' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      role="article"
      aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Ripple Effect */}
      {rippleEffect && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${rippleEffect.x}px ${rippleEffect.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
            animation: 'ripple 0.6s ease-out'
          }}
        />
      )}
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/60 to-purple-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {title}
          </CardTitle>
          {icon && (
            <div className={`card-icon-gradient ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`} aria-hidden="true">
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main value display */}
        <div className="flex items-end gap-3">
          <span
            className={`value-display value-count-up text-4xl font-bold tabular-nums ${
              theme === "dark" ? "text-white" : "text-gray-900"
            } ${isVisible ? "glow" : ""}`}
            aria-label={`Current value: ${displayValue}`}
          >
            {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
          </span>
          
          {/* Growth indicator */}
          {growth && (
            <div
              className={`growth-indicator ${
                isPositiveGrowth ? "positive" : isNegativeGrowth ? "negative" : ""
              }`}
              aria-label={`Growth: ${growth} ${trend === "up" ? "increase" : "decrease"}`}
            >
              {isPositiveGrowth && <TrendingUp className="h-3 w-3" aria-hidden="true" />}
              {isNegativeGrowth && <TrendingDown className="h-3 w-3" aria-hidden="true" />}
              <span>{growth}</span>
            </div>
          )}
        </div>
        
        {/* Progress bar */}
        {progress !== undefined && (
          <div className="space-y-2">
            <div className={`flex justify-between text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              <span>Progress</span>
              <span aria-label={`Progress: ${progress} percent`}>{progress}%</span>
            </div>
            <div
              className={`progress-enhanced h-2 ${
                theme === "dark" ? "bg-white/10" : "bg-gray-200"
              }`}
              role="progressbar"
              aria-label={`Progress indicator: ${progress}% complete`}
            >
              <div
                className="progress-bar-animated h-full rounded-full"
                style={{
                  width: isVisible ? `${progress}%` : '0%',
                  transitionDelay: `${delay + 300}ms`
                }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Optional additional content slot */}
        <div className={`pt-2 border-t transition-all duration-300 ${
          theme === "dark" ? "border-white/10" : "border-gray-200"
        } ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
          <div className={`text-xs transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Last updated: Just now
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Vorige periode
                </span>
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
                  {typeof value === 'number' ? Math.floor(value * 0.85).toLocaleString() : value}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Doel deze maand
                </span>
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
                  {typeof value === 'number' ? Math.floor(value * 1.2).toLocaleString() : value}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Status
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  trend === 'up' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : trend === 'down'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                }`}>
                  {trend === 'up' ? 'Groeiend' : trend === 'down' ? 'Dalend' : 'Stabiel'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
