"use client";
import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { FileText, TrendingUp } from 'lucide-react';
import { CustomTooltip } from './ChartUtils';

// TODO: Replace with actual data from your API
const data = [
  { month: 'Jan', sent: 45, accepted: 28, pending: 12, rejected: 5 },
  { month: 'Feb', sent: 67, accepted: 42, pending: 18, rejected: 7 },
  { month: 'Mar', sent: 89, accepted: 58, pending: 22, rejected: 9 },
  { month: 'Apr', sent: 76, accepted: 48, pending: 19, rejected: 9 },
  { month: 'May', sent: 95, accepted: 62, pending: 24, rejected: 9 },
  { month: 'Jun', sent: 112, accepted: 78, pending: 26, rejected: 8 },
  { month: 'Jul', sent: 98, accepted: 65, pending: 25, rejected: 8 },
  { month: 'Aug', sent: 125, accepted: 89, pending: 28, rejected: 8 },
  { month: 'Sep', sent: 142, accepted: 98, pending: 32, rejected: 12 },
  { month: 'Oct', sent: 118, accepted: 82, pending: 28, rejected: 8 },
  { month: 'Nov', sent: 156, accepted: 108, pending: 35, rejected: 13 },
  { month: 'Dec', sent: 178, accepted: 125, pending: 38, rejected: 15 }
];

const SENT_COLOR = "#10b981";
const ACCEPTED_COLOR = "#3b82f6";
const PENDING_COLOR = "#f59e0b";
const REJECTED_COLOR = "#ef4444";

function OffersChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getAcceptanceRate = (month: string) => {
    const monthData = data.find(d => d.month === month);
    if (monthData) {
      return Math.round((monthData.accepted / monthData.sent) * 100);
    }
    return 0;
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
            isDark ? 'bg-green-500/20' : 'bg-green-100'
          }`}>
            <FileText className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Offertes Overzicht
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Maandelijkse offerte statistieken
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {getAcceptanceRate('Dec')}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Bar dataKey="sent" stackId="a" fill={SENT_COLOR} radius={[0, 0, 0, 0]} />
            <Bar dataKey="accepted" stackId="a" fill={ACCEPTED_COLOR} radius={[0, 0, 0, 0]} />
            <Bar dataKey="pending" stackId="a" fill={PENDING_COLOR} radius={[0, 0, 0, 0]} />
            <Bar dataKey="rejected" stackId="a" fill={REJECTED_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer */}
      <div className={`mt-4 pt-4 border-t ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Verstuurd</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Geaccepteerd</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>In behandeling</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Afgewezen</span>
            </div>
          </div>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Acceptatie ratio: {getAcceptanceRate('Dec')}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(OffersChart);
