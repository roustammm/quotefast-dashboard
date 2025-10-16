import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  trend: number;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

const colorClasses = {
  blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  green: 'from-green-500/20 to-green-600/20 border-green-500/30',
  orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
};

export default function StatsCard({ title, value, trend, icon, color }: StatsCardProps) {
  const isPositive = trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-6 ${colorClasses[color]}`}
    >
      {/* Background Glow Effect */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      
      <div className="relative">
        {/* Icon */}
        <div className="mb-4 inline-flex rounded-xl bg-white/10 p-3">
          {icon}
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-gray-400">{title}</p>

        {/* Value & Trend */}
        <div className="mt-2 flex items-end justify-between">
          <h3 className="text-4xl font-bold text-white">{value}</h3>
          
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        </div>

        {/* Mini Sparkline (optional) */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.abs(trend) * 5}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-full ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
