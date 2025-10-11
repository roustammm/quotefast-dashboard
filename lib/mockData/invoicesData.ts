import { Invoice } from '../../types/dashboard';

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    customer_id: 'customer-1',
    total: 3025,
    status: 'paid',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    invoiceNumber: '2024-001',
    client: 'ABC Bedrijf',
    clientEmail: 'contact@abcbedrijf.nl',
    amount: 2500,
    createdDate: '2024-01-15',
    sentDate: '2024-01-16',
    paidDate: '2024-01-20',
    dueDate: '2024-02-15',
    description: 'Website Ontwikkeling - Fase 1',
    items: [
      { name: 'Website Design', description: 'Responsive design en UI/UX', quantity: 1, price: 800, tax: 168 },
      { name: 'Frontend Development', description: 'React/Next.js implementatie', quantity: 1, price: 1200, tax: 252 },
      { name: 'Backend Development', description: 'API en database setup', quantity: 1, price: 500, tax: 105 }
    ],
    subtotal: 2500,
    tax: 525,
    notes: 'Project afgerond volgens planning',
    paymentMethod: 'iDEAL',
    createdBy: 'Jan de Vries'
  },
  {
    id: 'INV-2024-002',
    customer_id: 'customer-2',
    total: 544.5,
    status: 'paid',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-14T15:30:00Z',
    invoiceNumber: '2024-002',
    client: 'Maria Jansen',
    clientEmail: 'maria@jansen.nl',
    amount: 450,
    createdDate: '2024-01-10',
    sentDate: '2024-01-11',
    paidDate: '2024-01-14',
    dueDate: '2024-01-25',
    description: 'Logo Design Project',
    items: [
      { name: 'Logo Design', description: '3 concepten + 2 revisies', quantity: 1, price: 300, tax: 63 },
      { name: 'Brand Guidelines', description: 'Kleuren en typografie', quantity: 1, price: 150, tax: 31.5 }
    ],
    subtotal: 450,
    tax: 94.5,
    paymentMethod: 'Credit Card',
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'INV-2024-003',
    customer_id: 'customer-3',
    total: 10285,
    status: 'sent',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
    invoiceNumber: '2024-003',
    client: 'TechStart',
    clientEmail: 'info@techstart.nl',
    amount: 8500,
    createdDate: '2024-01-20',
    sentDate: '2024-01-21',
    dueDate: '2024-02-20',
    description: 'E-commerce Platform Development',
    items: [
      { name: 'Platform Development', description: 'Volledige e-commerce oplossing', quantity: 1, price: 6000, tax: 1260 },
      { name: 'Payment Integration', description: 'Stripe en iDEAL integratie', quantity: 1, price: 1500, tax: 315 },
      { name: 'SEO Optimization', description: 'Zoekmachine optimalisatie', quantity: 1, price: 1000, tax: 210 }
    ],
    subtotal: 8500,
    tax: 1785,
    notes: 'Project in uitvoering',
    paymentMethod: 'Bank Transfer',
    createdBy: 'Mike Chen'
  },
  {
    id: 'INV-2024-004',
    customer_id: 'customer-4',
    total: 1200,
    status: 'draft',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z',
    invoiceNumber: '2024-004',
    client: 'Local Bakery',
    clientEmail: 'info@localbakery.nl',
    amount: 1000,
    createdDate: '2024-01-25',
    dueDate: '2024-02-25',
    description: 'Website Redesign',
    items: [
      { name: 'Website Redesign', description: 'Moderne responsive website', quantity: 1, price: 800, tax: 168 },
      { name: 'Content Management', description: 'CMS setup en training', quantity: 1, price: 200, tax: 42 }
    ],
    subtotal: 1000,
    tax: 210,
    notes: 'Concept klaar voor review',
    createdBy: 'Emma Wilson'
  },
  {
    id: 'INV-2024-005',
    customer_id: 'customer-5',
    total: 1800,
    status: 'overdue',
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z',
    invoiceNumber: '2024-005',
    client: 'Fitness Center',
    clientEmail: 'admin@fitnesscenter.nl',
    amount: 1500,
    createdDate: '2024-01-05',
    sentDate: '2024-01-06',
    dueDate: '2024-01-20',
    description: 'Mobile App Development',
    items: [
      { name: 'Mobile App', description: 'iOS en Android app', quantity: 1, price: 1200, tax: 252 },
      { name: 'Backend API', description: 'REST API voor app', quantity: 1, price: 300, tax: 63 }
    ],
    subtotal: 1500,
    tax: 315,
    notes: 'Betaling achterstallig',
    paymentMethod: 'Bank Transfer',
    createdBy: 'Alex Rodriguez'
  },
  {
    id: 'INV-2024-006',
    customer_id: 'customer-6',
    total: 600,
    status: 'cancelled',
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    invoiceNumber: '2024-006',
    client: 'Startup Inc',
    clientEmail: 'contact@startupinc.nl',
    amount: 500,
    createdDate: '2024-01-12',
    sentDate: '2024-01-13',
    dueDate: '2024-01-27',
    description: 'Consulting Services',
    items: [
      { name: 'Business Consulting', description: 'Strategie en planning', quantity: 1, price: 400, tax: 84 },
      { name: 'Market Research', description: 'Marktanalyse rapport', quantity: 1, price: 100, tax: 21 }
    ],
    subtotal: 500,
    tax: 105,
    notes: 'Project geannuleerd door klant',
    createdBy: 'Lisa Park'
  },
  {
    id: 'INV-2024-007',
    customer_id: 'customer-7',
    total: 2400,
    status: 'sent',
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
    invoiceNumber: '2024-007',
    client: 'Restaurant Group',
    clientEmail: 'info@restaurantgroup.nl',
    amount: 2000,
    createdDate: '2024-01-18',
    sentDate: '2024-01-19',
    dueDate: '2024-02-18',
    description: 'Online Ordering System',
    items: [
      { name: 'Ordering System', description: 'Online bestelsysteem', quantity: 1, price: 1500, tax: 315 },
      { name: 'Payment Gateway', description: 'Betaling integratie', quantity: 1, price: 500, tax: 105 }
    ],
    subtotal: 2000,
    tax: 420,
    notes: 'Systeem live gegaan',
    paymentMethod: 'iDEAL',
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'INV-2024-008',
    customer_id: 'customer-8',
    total: 3600,
    status: 'paid',
    created_at: '2024-01-08T10:00:00Z',
    updated_at: '2024-01-12T15:30:00Z',
    invoiceNumber: '2024-008',
    client: 'Retail Chain',
    clientEmail: 'it@retailchain.nl',
    amount: 3000,
    createdDate: '2024-01-08',
    sentDate: '2024-01-09',
    paidDate: '2024-01-12',
    dueDate: '2024-02-08',
    description: 'Inventory Management System',
    items: [
      { name: 'Inventory System', description: 'Voorraadbeheer systeem', quantity: 1, price: 2000, tax: 420 },
      { name: 'Reporting Dashboard', description: 'Rapportage dashboard', quantity: 1, price: 1000, tax: 210 }
    ],
    subtotal: 3000,
    tax: 630,
    notes: 'Implementatie succesvol',
    paymentMethod: 'Bank Transfer',
    createdBy: 'Mike Chen'
  }
];

export function getInvoicesStats() {
  const total = mockInvoices.length;
  const paid = mockInvoices.filter(i => i.status === 'paid').length;
  const pending = mockInvoices.filter(i => i.status === 'sent').length;
  const overdue = mockInvoices.filter(i => i.status === 'overdue').length;
  const draft = mockInvoices.filter(i => i.status === 'draft').length;
  const cancelled = mockInvoices.filter(i => i.status === 'cancelled').length;

  const totalRevenue = mockInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + (i.total || 0), 0);

  const avgInvoiceValue = paid > 0 ? totalRevenue / paid : 0;

  return {
    total,
    paid,
    pending,
    overdue,
    draft,
    cancelled,
    totalRevenue,
    avgInvoiceValue
  };
}