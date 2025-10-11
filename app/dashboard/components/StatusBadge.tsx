"use client";
import { useTheme } from '../../../contexts/ThemeContext';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'draft' | 'sent' | 'accepted' | 'rejected' | 'paid' | 'unpaid' | 'overdue' | 'online' | 'offline' | 'away';
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export default function StatusBadge({ 
  status, 
  size = 'md', 
  showDot = true, 
  className = '' 
}: StatusBadgeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'accepted':
      case 'paid':
      case 'online':
        return {
          text: status === 'active' ? 'Actief' : status === 'completed' ? 'Voltooid' : status === 'accepted' ? 'Geaccepteerd' : status === 'paid' ? 'Betaald' : 'Online',
          bgColor: isDark ? 'bg-green-500/20' : 'bg-green-100',
          textColor: isDark ? 'text-green-400' : 'text-green-700',
          dotColor: 'bg-green-500'
        };
      case 'inactive':
      case 'cancelled':
      case 'rejected':
      case 'offline':
        return {
          text: status === 'inactive' ? 'Inactief' : status === 'cancelled' ? 'Geannuleerd' : status === 'rejected' ? 'Afgewezen' : 'Offline',
          bgColor: isDark ? 'bg-red-500/20' : 'bg-red-100',
          textColor: isDark ? 'text-red-400' : 'text-red-700',
          dotColor: 'bg-red-500'
        };
      case 'pending':
      case 'draft':
      case 'sent':
      case 'unpaid':
      case 'away':
        return {
          text: status === 'pending' ? 'In behandeling' : status === 'draft' ? 'Concept' : status === 'sent' ? 'Verzonden' : status === 'unpaid' ? 'Onbetaald' : 'Afwezig',
          bgColor: isDark ? 'bg-yellow-500/20' : 'bg-yellow-100',
          textColor: isDark ? 'text-yellow-400' : 'text-yellow-700',
          dotColor: 'bg-yellow-500'
        };
      case 'overdue':
        return {
          text: 'Vervallen',
          bgColor: isDark ? 'bg-orange-500/20' : 'bg-orange-100',
          textColor: isDark ? 'text-orange-400' : 'text-orange-700',
          dotColor: 'bg-orange-500'
        };
      default:
        return {
          text: status,
          bgColor: isDark ? 'bg-gray-500/20' : 'bg-gray-100',
          textColor: isDark ? 'text-gray-400' : 'text-gray-700',
          dotColor: 'bg-gray-500'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]} ${config.bgColor} ${config.textColor} ${className}`}>
      {showDot && (
        <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      )}
      {config.text}
    </span>
  );
}
