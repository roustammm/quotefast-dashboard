"use client";
import React, { memo, useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  User, 
  Euro, 
  AlertCircle, 
  MessageSquare,
  Settings,
  Bell
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'offer_sent' | 'offer_accepted' | 'offer_rejected' | 'payment_received' | 'customer_created' | 'support_ticket' | 'system_update';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  amount?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
}

// TODO: Replace with actual data from your API
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'offer_sent',
    title: 'Offerte verzonden',
    description: 'Offerte #QF-2024-001 verzonden naar ABC Bedrijf',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minuten geleden
    user: 'Jan de Vries',
    status: 'success'
  },
  {
    id: '2',
    type: 'payment_received',
    title: 'Betaling ontvangen',
    description: '€2,450 ontvangen van XYZ B.V.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minuten geleden
    amount: '€2,450',
    status: 'success'
  },
  {
    id: '3',
    type: 'offer_accepted',
    title: 'Offerte geaccepteerd',
    description: 'Offerte #QF-2024-002 geaccepteerd door TechCorp',
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minuten geleden
    user: 'TechCorp',
    status: 'success'
  },
  {
    id: '4',
    type: 'customer_created',
    title: 'Nieuwe klant',
    description: 'Nieuwe klant geregistreerd: Innovate Solutions',
    timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 minuten geleden
    user: 'Innovate Solutions',
    status: 'info'
  },
  {
    id: '5',
    type: 'support_ticket',
    title: 'Support ticket',
    description: 'Nieuw support ticket van GlobalTech',
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minuten geleden
    user: 'GlobalTech',
    status: 'warning'
  },
  {
    id: '6',
    type: 'offer_rejected',
    title: 'Offerte afgewezen',
    description: 'Offerte #QF-2024-003 afgewezen door StartupXYZ',
    timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 minuten geleden
    user: 'StartupXYZ',
    status: 'error'
  },
  {
    id: '7',
    type: 'system_update',
    title: 'Systeem update',
    description: 'AI model geüpdatet naar versie 2.1',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minuten geleden
    status: 'info'
  },
  {
    id: '8',
    type: 'payment_received',
    title: 'Betaling ontvangen',
    description: '€1,890 ontvangen van DesignStudio',
    timestamp: new Date(Date.now() - 58 * 60 * 1000), // 58 minuten geleden
    amount: '€1,890',
    status: 'success'
  }
];

const REAL_TIME_UPDATE_INTERVAL = 30000;
const NEW_ACTIVITY_PROBABILITY = 0.7;
const MAX_ACTIVITIES = 9;

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'offer_sent':
      return <FileText className="w-4 h-4" />;
    case 'offer_accepted':
      return <CheckCircle className="w-4 h-4" />;
    case 'offer_rejected':
      return <AlertCircle className="w-4 h-4" />;
    case 'payment_received':
      return <Euro className="w-4 h-4" />;
    case 'customer_created':
      return <User className="w-4 h-4" />;
    case 'support_ticket':
      return <MessageSquare className="w-4 h-4" />;
    case 'system_update':
      return <Settings className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getStatusColor = (status: Activity['status']) => {
  switch (status) {
    case 'success':
      return 'text-green-500 bg-green-500/10 border-green-500/20';
    case 'warning':
      return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'error':
      return 'text-red-500 bg-red-500/10 border-red-500/20';
    case 'info':
      return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    default:
      return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  }
};

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Net nu';
  if (diffInMinutes < 60) return `${diffInMinutes} min geleden`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} uur geleden`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} dag${diffInDays > 1 ? 'en' : ''} geleden`;
};

function ActivityFeed() {
  const { theme } = useTheme();
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isVisible, setIsVisible] = useState(false);
  
  const isDark = theme === 'dark';

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add a new random activity every 30 seconds
      if (Math.random() > NEW_ACTIVITY_PROBABILITY) {
        const newActivity: Activity = {
          id: Date.now().toString(),
          type: 'offer_sent',
          title: 'Offerte verzonden',
          description: `Offerte #QF-2024-${Math.floor(Math.random() * 1000)} verzonden naar Klant ${Math.floor(Math.random() * 100)}`,
          timestamp: new Date(),
          user: `Klant ${Math.floor(Math.random() * 100)}`,
          status: 'success'
        };
        
        setActivities(prev => [newActivity, ...prev.slice(0, MAX_ACTIVITIES)]);
      }
    }, REAL_TIME_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`activity-feed rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700/30 hover:border-gray-600/50' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isDark ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Bell className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recente Activiteit
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Live updates van je QuoteFast account
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
        }`}>
          Live
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`activity-item flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
              isDark 
                ? 'bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Icon */}
            <div className={`p-2 rounded-lg border ${getStatusColor(activity.status)}`}>
              {getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {activity.title}
                  </h4>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.description}
                  </p>
                  {activity.user && (
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {activity.user}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  {activity.amount && (
                    <span className={`text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      {activity.amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`mt-6 pt-4 border-t ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between text-sm">
          <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {activities.length} activiteiten
          </span>
          <button className={`text-blue-500 hover:text-blue-600 transition-colors ${
            isDark ? 'hover:text-blue-400' : 'hover:text-blue-700'
          }`}>
            Bekijk alle activiteiten
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ActivityFeed);
