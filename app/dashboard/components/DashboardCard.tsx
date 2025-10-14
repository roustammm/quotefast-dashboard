"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useTheme } from "../../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  growth,
  icon,
  progress,
  trend = "up",
  delay = 0,
  description,
  isLoading = false
}: {
  title: string;
  value: string | number;
  growth?: string;
  icon?: React.ReactNode;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  delay?: number;
  description?: string;
  isLoading?: boolean;
}) {
  const { theme } = useTheme();
  const [displayValue, setDisplayValue] = useState<string | number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animate value count-up (alleen als niet loading)
  useEffect(() => {
    if (isLoading) return;

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
  }, [value, delay, isLoading]);
  
  const isPositiveGrowth = growth && trend === "up";
  const isNegativeGrowth = growth && trend === "down";

  // Loading skeleton met shimmer
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className="relative"
      >
        <Card className="glass-card-premium p-6 rounded-2xl min-h-[200px] overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-20 loading-skeleton"></div>
              <div className="w-8 h-8 bg-muted rounded-full loading-skeleton"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-8 bg-muted rounded loading-skeleton"></div>
            <div className="h-4 bg-muted rounded w-16 loading-skeleton"></div>
            <div className="h-3 bg-muted rounded w-24 loading-skeleton"></div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: isVisible ? -5 : 0, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer card-hover-lift"
        role="article"
        aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
      <Card className={`glass-card-premium p-6 rounded-2xl min-h-[200px] transition-all duration-300 ${
        isHovered ? 'shadow-lg shadow-purple-500/25 border-purple-500/20 ring-2 ring-purple-500/20' : 'dashboard-card-enhanced'
      }`}>
        {/* Subtiele top border gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle
              id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-sm font-semibold text-card-foreground/90 leading-tight"
            >
              {title}
            </CardTitle>
            {icon && (
              <motion.div 
                className="p-2 glass-card rounded-xl flex-shrink-0 card-glow"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                aria-hidden="true"
              >
                <div className="card-icon-gradient">
                {icon}
              </div>
              </motion.div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col justify-between h-full relative z-10 space-y-4">
          <div className="space-y-3">
            {/* Value display met count-up animatie */}
            <motion.div 
              key={displayValue}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-baseline gap-2"
            >
              <span
                className="text-3xl md:text-4xl font-bold tabular-nums text-card-foreground value-display pulse-glow"
                aria-label={`Current value: ${displayValue}`}
              >
                {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
              </span>
              {progress !== undefined && (
                <span className="text-xs text-muted-foreground">({progress}%)</span>
              )}
            </motion.div>

            {/* Growth indicator */}
              {growth && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className={`growth-indicator ${isPositiveGrowth ? "positive" : isNegativeGrowth ? "negative" : ""}`}
                  aria-label={`Growth: ${growth} ${trend === "up" ? "increase" : "decrease"}`}
                >
                {isPositiveGrowth && <TrendingUp className="h-3 w-3 flex-shrink-0" aria-hidden="true" />}
                {isNegativeGrowth && <TrendingDown className="h-3 w-3 flex-shrink-0" aria-hidden="true" />}
                <span className="whitespace-nowrap">{growth}</span>
              </motion.div>
            )}
            
            {/* Progress bar als progress prop bestaat */}
            {progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Voortgang</span>
                  <span className="text-card-foreground font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div 
                    className="progress-enhanced h-2 bg-accent-gradient rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <div className="progress-bar-animated absolute inset-0"></div>
                  </motion.div>
                </div>
                </div>
              )}
            
            {/* Description */}
            {description && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* CTA button - alleen zichtbaar op hover */}
          <motion.div 
            className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="modern-glass-button inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Bekijk meer details"
            >
              <span>Meer details</span>
              <ArrowRight className="h-3 w-3" />
            </motion.button>
          </motion.div>
        </CardContent>

        {/* Subtiele background overlay voor diepte */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        
        {/* Shimmer effect op hover */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: -100 }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: 1, ease: "linear" }}
          />
        )}
      </Card>
    </motion.div>
  );
}
