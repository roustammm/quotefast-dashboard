"use client";
import { useTheme } from '../../../contexts/ThemeContext';
import { Download, FileText, FileSpreadsheet, Camera, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 backdrop-blur-xl ${
          isDark
            ? 'bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-blue-500/50'
            : 'bg-gray-50/90 border-gray-400/60 text-gray-700 hover:bg-white hover:border-blue-500/50 shadow-sm'
        } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={{ scale: isExporting ? 1 : 1.05 }}
        whileTap={{ scale: isExporting ? 1 : 0.95 }}
      >
        <motion.div
          animate={{ rotate: isExporting ? 360 : 0 }}
          transition={{ duration: 1, repeat: isExporting ? Infinity : 0, ease: "linear" }}
        >
          <Download className="w-4 h-4" />
        </motion.div>
        <span className="text-sm font-medium">
          {isExporting ? 'Exporteren...' : 'Export'}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full right-0 mt-2 w-64 rounded-xl border shadow-xl z-50 backdrop-blur-xl ${
              isDark
                ? 'bg-white/10 border-white/20'
                : 'bg-gray-50/90 border-gray-400/60'
            }`}
          >
            <div className="p-3">
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`px-3 py-2 text-xs font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Export opties
              </motion.div>
              {exportOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={option.action}
                  disabled={isExporting}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-300 ${
                    isDark
                      ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-200/50 hover:text-gray-900'
                  } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: isExporting ? 1 : 1.02, x: 4 }}
                  whileTap={{ scale: isExporting ? 1 : 0.98 }}
                >
                  <motion.div 
                    className={`p-1.5 rounded-lg ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {option.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className={`text-xs ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {option.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
