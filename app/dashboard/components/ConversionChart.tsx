"use client";
import { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { Target, TrendingUp } from 'lucide-react';
import { CustomTooltip } from './ChartUtils';

// TODO: Replace with actual data from your API
const data = [
  { week: 'Week 1', visitors: 1200, leads: 180, offers: 45, sales: 12 },
  { week: 'Week 2', visitors: 1350, leads: 210, offers: 52, sales: 15 },
  { week: 'Week 3', visitors: 1180, leads: 195, offers: 48, sales: 13 },
  { week: 'Week 4', visitors: 1420, leads: 225, offers: 58, sales: 18 },
  { week: 'Week 5', visitors: 1580, leads: 245, offers: 65, sales: 22 },
  { week: 'Week 6', visitors: 1650, leads: 260, offers: 72, sales: 25 },
  { week: 'Week 7', visitors: 1720, leads: 275, offers: 78, sales: 28 },
  { week: 'Week 8', visitors: 1890, leads: 295, offers: 85, sales: 32 }
];

const VISITORS_COLOR = "#8b5cf6";
const LEADS_COLOR = "#3b82f6";
const OFFERS_COLOR = "#10b981";
const SALES_COLOR = "#f97316";

function ConversionChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getOverallConversionRate = () => {
    const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
    return ((totalSales / totalVisitors) * 100).toFixed(1);
  };

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
            isDark ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Target className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Conversion Funnel
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Bezoekers → Leads → Offertes → Sales
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            {getOverallConversionRate()}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VISITORS_COLOR} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={VISITORS_COLOR} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={LEADS_COLOR} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={LEADS_COLOR} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="offersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={OFFERS_COLOR} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={OFFERS_COLOR} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={SALES_COLOR} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={SALES_COLOR} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="week" 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Area
              type="monotone"
              dataKey="visitors"
              stackId="1"
              stroke={VISITORS_COLOR}
              strokeWidth={2}
              fill="url(#visitorsGradient)"
            />
            <Area
              type="monotone"
              dataKey="leads"
              stackId="2"
              stroke={LEADS_COLOR}
              strokeWidth={2}
              fill="url(#leadsGradient)"
            />
            <Area
              type="monotone"
              dataKey="offers"
              stackId="3"
              stroke={OFFERS_COLOR}
              strokeWidth={2}
              fill="url(#offersGradient)"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stackId="4"
              stroke={SALES_COLOR}
              strokeWidth={2}
              fill="url(#salesGradient)"
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
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Bezoekers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Offertes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Sales</span>
            </div>
          </div>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Totale conversie: {getOverallConversionRate()}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(ConversionChart);
