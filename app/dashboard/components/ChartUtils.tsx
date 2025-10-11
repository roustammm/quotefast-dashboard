"use client";
import { memo } from 'react';

export const CustomTooltip = memo(({ active, payload, label, isDark, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-lg shadow-lg border ${
        isDark 
          ? 'bg-gray-800 border-gray-600 text-white' 
          : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <p className="font-semibold mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm">{item.name}: {formatter ? formatter(item.value) : item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
});

export const CustomLegend = memo(({ payload, isDark }: any) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
});
