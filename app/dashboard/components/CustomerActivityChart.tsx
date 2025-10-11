"use client";
import { memo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { Users, Activity } from 'lucide-react';
import { CustomTooltip, CustomLegend } from './ChartUtils';

// TODO: Replace with actual data from your API
const data = [
  { name: 'Nieuwe Klanten', value: 45, color: '#10b981' },
  { name: 'Actieve Klanten', value: 120, color: '#3b82f6' },
  { name: 'Inactieve Klanten', value: 25, color: '#f59e0b' },
  { name: 'VIP Klanten', value: 15, color: '#8b5cf6' }
];

// TODO: Replace with actual data from your API
const activityData = [
  { name: 'Offerte Aanvragen', value: 35, color: '#10b981' },
  { name: 'Factuur Betalingen', value: 28, color: '#3b82f6' },
  { name: 'Support Tickets', value: 18, color: '#f59e0b' },
  { name: 'Account Updates', value: 12, color: '#8b5cf6' },
  { name: 'Login Activiteit', value: 7, color: '#ef4444' }
];

function CustomerActivityChart() {
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
            <Users className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Klant Segmentatie
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Klant verdeling en activiteit
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            205
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segmentation Chart */}
        <div>
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Klant Types
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip isDark={isDark} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend payload={data} isDark={isDark} />
        </div>

        {/* Activity Chart */}
        <div>
          <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Recente Activiteit
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip isDark={isDark} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend payload={activityData} isDark={isDark} />
        </div>
      </div>

      {/* Chart Footer */}
      <div className={`mt-6 pt-4 border-t ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Top Klant Type
            </div>
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Actieve Klanten (58.5%)
            </div>
          </div>
          <div>
            <div className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Meest Actief
            </div>
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Offerte Aanvragen (35%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerActivityChart);
