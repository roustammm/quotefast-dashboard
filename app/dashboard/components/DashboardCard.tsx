"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  growth,
  icon,
  progress,
  trend = "up",
  delay = 0,
  description
}: {
  title: string;
  value: string | number;
  growth?: string;
  icon?: React.ReactNode;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  delay?: number;
  description?: string;
}) {
  const { theme } = useTheme();
  const [displayValue, setDisplayValue] = useState<string | number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animate value count-up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (typeof value === 'number') {
        const duration = 1200;
        const steps = 40;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer"
    >
      <Card
        className={`relative overflow-hidden transition-all duration-300 ${
          theme === "dark" 
            ? "bg-slate-800/50 border-slate-700/50 backdrop-blur-sm" 
            : "bg-white/80 border-gray-200/80 backdrop-blur-sm"
        } ${isHovered ? 'shadow-lg shadow-purple-500/10 border-purple-500/50' : ''}`}
        role="article"
        aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle
              id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className={`text-sm font-medium ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {title}
            </CardTitle>
            {icon && (
              <div className="p-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg" aria-hidden="true">
                {icon}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-4xl font-bold tabular-nums ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
                aria-label={`Current value: ${displayValue}`}
              >
                {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              {growth && (
                <div
                  className={`flex items-center text-xs font-semibold ${
                    isPositiveGrowth ? "text-green-400" : isNegativeGrowth ? "text-red-400" : "text-slate-400"
                  }`}
                  aria-label={`Growth: ${growth} ${trend === "up" ? "increase" : "decrease"}`}
                >
                  {isPositiveGrowth && <TrendingUp className="h-3 w-3 mr-1" aria-hidden="true" />}
                  {isNegativeGrowth && <TrendingDown className="h-3 w-3 mr-1" aria-hidden="true" />}
                  <span>{growth}</span>
                </div>
              )}
            </div>
            
            {description && (
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {description}
              </p>
            )}
          </div>

          <motion.div 
            className="flex items-center justify-end text-xs mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Meer details</span>
            <ArrowRight className={`h-3 w-3 ml-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
