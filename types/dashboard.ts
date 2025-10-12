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
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  created_at: string;
  updated_at: string;
  customers?: Customer;
  // Extended fields for mock data compatibility
  invoiceNumber?: string;
  client?: string;
  clientEmail?: string;
  amount?: number;
  createdDate?: string;
  sentDate?: string;
  paidDate?: string;
  dueDate?: string;
  description?: string;
  items?: Array<{
    name: string;
    description: string;
    quantity: number;
    price: number;
    tax: number;
  }>;
  subtotal?: number;
  tax?: number;
  notes?: string;
  paymentMethod?: string;
  createdBy?: string;
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
