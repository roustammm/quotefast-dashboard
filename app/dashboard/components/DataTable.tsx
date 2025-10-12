"use client";
import { memo, useState, useCallback, useMemo } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { ChevronUp, ChevronDown, MoreHorizontal, CheckSquare, Square } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
  width?: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onRowClick?: (row: any) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onBulkAction?: (action: string, selectedRows: any[]) => void;
  bulkActions?: Array<{
    label: string;
    action: string;
    icon?: React.ReactNode;
  }>;
  selectable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

function DataTable({
  data,
  columns,
  onRowClick,
  onSort,
  onBulkAction,
  bulkActions = [],
  selectable = false,
  loading = false,
  emptyMessage = "Geen data beschikbaar",
  className = ""
}: DataTableProps) {
  const { theme } = useTheme();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const isDark = theme === 'dark';

  const handleSort = useCallback((column: string) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort?.(column, newDirection);
  }, [sortColumn, sortDirection, onSort]);

  const handleSelectAll = useCallback(() => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((_, index) => index.toString())));
    }
  }, [selectedRows.size, data]);

  const handleSelectRow = useCallback((index: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  }, [selectedRows]);

  const handleBulkAction = useCallback((action: string) => {
    const selectedData = data.filter((_, index) => selectedRows.has(index.toString()));
    onBulkAction?.(action, selectedData);
  }, [data, selectedRows, onBulkAction]);

  const renderCell = useMemo(() => {
    const renderCellFunction = (column: Column, row: any, value: any) => {
    if (column.render) {
      return column.render(value, row);
    }
    
    // Special handling for common data types
    if (column.key.includes('status')) {
      return <StatusBadge status={value} size="sm" />;
    }
    
    if (column.key.includes('date') || column.key.includes('Date')) {
      return new Date(value).toLocaleDateString('nl-NL');
    }
    
    if (column.key.includes('amount') || column.key.includes('price') || column.key.includes('value')) {
      return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
      }).format(value);
    }
    
    return value;
    };
    return renderCellFunction;
  }, []);

  if (loading) {
    return (
      <div className={`rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700/30' : 'bg-white border-gray-200'}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Laden...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700/30' : 'bg-white border-gray-200'}`}>
        <div className="p-8 text-center">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700/30' : 'bg-white border-gray-200'} ${className}`}>
      {/* Bulk Actions */}
      {selectable && selectedRows.size > 0 && bulkActions.length > 0 && (
        <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700/30 bg-gray-800/30' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedRows.size} item(s) geselecteerd
            </span>
            <div className="flex items-center gap-2">
              {bulkActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleBulkAction(action.action)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                    isDark
                      ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDark ? 'border-gray-700/30' : 'border-gray-200'}`}>
              {selectable && (
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={handleSelectAll}
                    className={`p-1 rounded transition-colors ${
                      isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                    }`}
                  >
                    {selectedRows.size === data.length ? (
                      <CheckSquare className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className={`flex items-center gap-1 hover:opacity-70 transition-opacity ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {column.label}
                      {sortColumn === column.key && (
                        sortDirection === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              <th className="px-4 py-3 text-right">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Acties
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={`border-b transition-colors ${
                  isDark 
                    ? 'border-gray-700/20 hover:bg-gray-700/30' 
                    : 'border-gray-200 hover:bg-gray-50'
                } ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRow(index.toString());
                      }}
                      className={`p-1 rounded transition-colors ${
                        isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                      }`}
                    >
                      {selectedRows.has(index.toString()) ? (
                        <CheckSquare className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {renderCell(column, row, row[column.key])}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className={`p-1 rounded transition-colors ${
                      isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                    }`}
                    aria-label="Meer opties"
                    title="Meer opties"
                  >
                    <MoreHorizontal className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(DataTable);
