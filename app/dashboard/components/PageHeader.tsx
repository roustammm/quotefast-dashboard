"use client";
import { useTheme } from '../../../contexts/ThemeContext';
import ExportButton from './ExportButton';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description: string;
  showExport?: boolean;
  showCreateButton?: boolean;
  createButtonText?: string;
  onCreateClick?: () => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  showFilters?: boolean;
  onFilterClick?: () => void;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  showExport = true,
  showCreateButton = false,
  createButtonText = "Nieuw",
  onCreateClick,
  showSearch = false,
  searchPlaceholder = "Zoeken...",
  onSearchChange,
  showFilters = false,
  onFilterClick,
  children
}: PageHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Main Header */}
      <div className={`flex items-center justify-between p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
        isDark
          ? "bg-white/10 border-white/20 hover:bg-white/15"
          : "bg-gray-50/90 border-gray-400/60 hover:bg-gray-100/90 shadow-md"
      }`}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
            isDark ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'
          }`}>
            {title}
          </h1>
          <p className={`mt-2 text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </motion.div>
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {showExport && <ExportButton />}
          {showCreateButton && (
            <motion.button
              onClick={onCreateClick}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 modern-glass-button group ${
                isDark
                  ? 'bg-blue-600/80 hover:bg-blue-600 text-white border-blue-500/30'
                  : 'bg-blue-600/90 hover:bg-blue-700 text-white shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 0.3 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
              <span className="font-medium">{createButtonText}</span>
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-xl ${
                  isDark
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/15 focus:border-blue-500/50'
                    : 'bg-gray-50/90 border-gray-400/60 text-gray-900 placeholder-gray-600 focus:bg-white focus:border-blue-500/50 shadow-sm'
                }`}
              />
            </div>
          )}
          {showFilters && (
            <motion.button
              onClick={onFilterClick}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 backdrop-blur-xl ${
                isDark
                  ? 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/15 hover:border-blue-500/50'
                  : 'bg-gray-50/90 border-gray-400/60 text-gray-700 hover:bg-white hover:border-blue-500/50 shadow-sm'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Custom Content */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
