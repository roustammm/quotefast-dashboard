// TypeScript types voor dashboard data
export interface DashboardData {
  offersSent: number;
  avgOfferValue: string;
  activeCustomers: number;
  aiGenerations: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  customer_id: string;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  created_at: string;
  updated_at: string;
  customers?: Customer;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
  trend: string;
  color: 'blue' | 'emerald' | 'purple' | 'amber';
  href?: string;
}
