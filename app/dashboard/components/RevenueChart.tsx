"use client";
import { memo } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { TrendingUp, Euro } from 'lucide-react';
import { CustomTooltip } from './ChartUtils';

// TODO: Replace with actual data from your API
const data = [
  { month: 'Jan', revenue: 12000, offers: 45 },
  { month: 'Feb', revenue: 19000, offers: 67 },
  { month: 'Mar', revenue: 30000, offers: 89 },
  { month: 'Apr', revenue: 28000, offers: 76 },
  { month: 'May', revenue: 35000, offers: 95 },
  { month: 'Jun', revenue: 42000, offers: 112 },
  { month: 'Jul', revenue: 38000, offers: 98 },
  { month: 'Aug', revenue: 45000, offers: 125 },
  { month: 'Sep', revenue: 52000, offers: 142 },
  { month: 'Oct', revenue: 48000, offers: 118 },
  { month: 'Nov', revenue: 55000, offers: 156 },
  { month: 'Dec', revenue: 62000, offers: 178 }
];

const REVENUE_COLOR = "#3b82f6";
const OFFERS_COLOR = "#10b981";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

function RevenueChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`chart-container rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700/30 hover:border-gray-600/50' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isDark ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <TrendingUp className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Revenue Growth
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Maandelijkse omzet en offertes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Euro className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            +24%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={REVENUE_COLOR} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={REVENUE_COLOR} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="offersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={OFFERS_COLOR} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={OFFERS_COLOR} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="month" 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} formatter={formatCurrency} />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={REVENUE_COLOR}
              strokeWidth={3}
              fill="url(#revenueGradient)"
              dot={{ fill: REVENUE_COLOR, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: REVENUE_COLOR, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="offers"
              stroke={OFFERS_COLOR}
              strokeWidth={2}
              dot={{ fill: OFFERS_COLOR, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: OFFERS_COLOR, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer */}
      <div className={`mt-4 pt-4 border-t ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Offers</span>
            </div>
          </div>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Laatste update: 2 minuten geleden
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(RevenueChart);
