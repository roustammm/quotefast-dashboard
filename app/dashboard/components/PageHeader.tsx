"use client";
import { useTheme } from '../../../contexts/ThemeContext';
import ExportButton from './ExportButton';
import { Plus, Search, Filter, Download } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {showExport && <ExportButton />}
          {showCreateButton && (
            <button
              onClick={onCreateClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              {createButtonText}
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700/30 text-white placeholder-gray-400 focus:border-gray-600/50'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-300'
                }`}
              />
            </div>
          )}
          {showFilters && (
            <button
              onClick={onFilterClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700/30 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          )}
        </div>
      )}

      {/* Custom Content */}
      {children}
    </div>
  );
}
