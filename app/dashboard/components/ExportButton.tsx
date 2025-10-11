"use client";
import { useTheme } from '../../../contexts/ThemeContext';
import { Download, FileText, FileSpreadsheet, Camera, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ExportButtonProps {
  className?: string;
}

export default function ExportButton({ className = '' }: ExportButtonProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  const isDark = theme === 'dark';

  const exportOptions = [
    {
      id: 'csv',
      label: 'Export naar CSV',
      description: 'Download data als spreadsheet',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      action: () => exportToCSV()
    },
    {
      id: 'pdf',
      label: 'Export naar PDF',
      description: 'Download rapport als PDF',
      icon: <FileText className="w-4 h-4" />,
      action: () => exportToPDF()
    },
    {
      id: 'screenshot',
      label: 'Screenshot',
      description: 'Maak screenshot van dashboard',
      icon: <Camera className="w-4 h-4" />,
      action: () => takeScreenshot()
    }
  ];

  const exportToCSV = async () => {
    setIsExporting(true);
    
    // Simulate CSV export
    const csvData = [
      ['Metric', 'Value', 'Growth', 'Progress'],
      ['Executions', '340', '204%', '75%'],
      ['Projects', '12', '18%', '60%'],
      ['Team Reviews', '5', '-12%', '40%'],
      ['Active Users', '1284', '8%', '82%'],
      ['Revenue', '$45.2K', '32%', '91%'],
      ['Conversion', '3.2%', '-5%', '28%'],
      ['Avg Response', '1.2s', '15%', '67%'],
      ['Offers Sent', '127', '24%', '76%'],
      ['Avg Offer Value', '€2,450', '12%', '68%'],
      ['Acceptance Rate', '67%', '8%', '67%'],
      ['Open Offers', '23', '-3%', '45%'],
      ['Active Customers', '89', '15%', '89%'],
      ['AI Generations', '45', '42%', '78%']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `quotefast-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsExporting(false);
      setIsOpen(false);
    }, 1000);
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    
    // Simulate PDF export
    setTimeout(() => {
      alert('PDF export functionaliteit zou hier geïmplementeerd worden met een library zoals jsPDF of Puppeteer');
      setIsExporting(false);
      setIsOpen(false);
    }, 1500);
  };

  const takeScreenshot = async () => {
    setIsExporting(true);
    
    try {
      // Use html2canvas or similar library for screenshot
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // For demo purposes, we'll simulate the screenshot
      setTimeout(() => {
        alert('Screenshot functionaliteit zou hier geïmplementeerd worden met html2canvas');
        setIsExporting(false);
        setIsOpen(false);
      }, 1000);
    } catch (error) {
      console.error('Screenshot failed:', error);
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={buttonRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
          isDark
            ? 'bg-gray-800/50 border-gray-700/30 text-white hover:bg-gray-700/50 hover:border-gray-600/50'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
        } ${isExporting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
      >
        <Download className={`w-4 h-4 ${isExporting ? 'animate-spin' : ''}`} />
        <span className="text-sm font-medium">
          {isExporting ? 'Exporteren...' : 'Export'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 w-64 rounded-lg border shadow-lg z-50 ${
          isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="p-2">
            <div className={`px-3 py-2 text-xs font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Export opties
            </div>
            {exportOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                disabled={isExporting}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                  isDark
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`p-1 rounded ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {option.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
