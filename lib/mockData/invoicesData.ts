export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  clientEmail: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  createdDate: string;
  sentDate?: string;
  paidDate?: string;
  dueDate: string;
  description: string;
  items: Array<{
    name: string;
    description: string;
    quantity: number;
    price: number;
    tax: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  paymentMethod?: string;
  createdBy: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    invoiceNumber: '2024-001',
    client: 'ABC Bedrijf',
    clientEmail: 'contact@abcbedrijf.nl',
    amount: 2500,
    status: 'paid',
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
    total: 3025,
    paymentMethod: 'iDEAL',
    createdBy: 'Jan de Vries'
  },
  {
    id: 'INV-2024-002',
    invoiceNumber: '2024-002',
    client: 'Maria Jansen',
    clientEmail: 'maria@jansen.nl',
    amount: 450,
    status: 'paid',
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
    total: 544.5,
    paymentMethod: 'Credit Card',
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'INV-2024-003',
    invoiceNumber: '2024-003',
    client: 'TechStart',
    clientEmail: 'info@techstart.nl',
    amount: 8500,
    status: 'sent',
    createdDate: '2024-01-20',
    sentDate: '2024-01-22',
    dueDate: '2024-02-20',
    description: 'E-commerce Platform Development',
    items: [
      { name: 'Platform Development', description: 'Custom e-commerce oplossing', quantity: 1, price: 5000, tax: 1050 },
      { name: 'Payment Integration', description: 'Stripe en iDEAL integratie', quantity: 1, price: 1500, tax: 315 },
      { name: 'Admin Dashboard', description: 'Beheer interface', quantity: 1, price: 2000, tax: 420 }
    ],
    subtotal: 8500,
    tax: 1785,
    total: 10285,
    createdBy: 'Mike Chen'
  },
  {
    id: 'INV-2024-004',
    invoiceNumber: '2024-004',
    client: 'RetailPlus',
    clientEmail: 'dev@retailplus.nl',
    amount: 12000,
    status: 'draft',
    createdDate: '2024-01-25',
    dueDate: '2024-03-15',
    description: 'Mobile App Development - iOS & Android',
    items: [
      { name: 'iOS App', description: 'Native iOS ontwikkeling', quantity: 1, price: 6000, tax: 1260 },
      { name: 'Android App', description: 'Native Android ontwikkeling', quantity: 1, price: 5000, tax: 1050 },
      { name: 'Backend API', description: 'REST API voor apps', quantity: 1, price: 1000, tax: 210 }
    ],
    subtotal: 12000,
    tax: 2520,
    total: 14520,
    createdBy: 'Emma Wilson'
  },
  {
    id: 'INV-2024-005',
    invoiceNumber: '2024-005',
    client: 'DataCorp',
    clientEmail: 'analytics@datacorp.nl',
    amount: 3200,
    status: 'overdue',
    createdDate: '2024-01-18',
    sentDate: '2024-01-19',
    dueDate: '2024-01-18',
    description: 'Data Analytics Dashboard',
    items: [
      { name: 'Dashboard Development', description: 'React dashboard met charts', quantity: 1, price: 2000, tax: 420 },
      { name: 'Data Integration', description: 'API koppelingen', quantity: 1, price: 800, tax: 168 },
      { name: 'Reporting Module', description: 'Automatische rapporten', quantity: 1, price: 400, tax: 84 }
    ],
    subtotal: 3200,
    tax: 672,
    total: 3872,
    createdBy: 'Alex Rodriguez'
  },
  {
    id: 'INV-2024-006',
    invoiceNumber: '2024-006',
    client: 'StartupXYZ',
    clientEmail: 'hello@startupxyz.nl',
    amount: 1800,
    status: 'cancelled',
    createdDate: '2024-01-05',
    sentDate: '2024-01-06',
    dueDate: '2024-01-20',
    description: 'Brand Identity Package',
    items: [
      { name: 'Logo Design', description: '5 concepten + 3 revisies', quantity: 1, price: 600, tax: 126 },
      { name: 'Brand Guidelines', description: 'Uitgebreide style guide', quantity: 1, price: 400, tax: 84 },
      { name: 'Business Cards', description: 'Design en print files', quantity: 1, price: 200, tax: 42 },
      { name: 'Letterhead', description: 'Briefpapier design', quantity: 1, price: 200, tax: 42 },
      { name: 'Social Media Kit', description: 'Templates voor social media', quantity: 1, price: 400, tax: 84 }
    ],
    subtotal: 1800,
    tax: 378,
    total: 2178,
    createdBy: 'Lisa Park'
  },
  {
    id: 'INV-2024-007',
    invoiceNumber: '2024-007',
    client: 'GlobalTech',
    clientEmail: 'marketing@globaltech.nl',
    amount: 4200,
    status: 'sent',
    createdDate: '2024-01-28',
    sentDate: '2024-01-29',
    dueDate: '2024-02-28',
    description: 'Website Redesign Project',
    items: [
      { name: 'UX Research', description: 'Gebruikersonderzoek en wireframes', quantity: 1, price: 800, tax: 168 },
      { name: 'UI Design', description: 'Modern design systeem', quantity: 1, price: 1200, tax: 252 },
      { name: 'Frontend Development', description: 'React implementatie', quantity: 1, price: 1500, tax: 315 },
      { name: 'Content Migration', description: 'Bestaande content overzetten', quantity: 1, price: 700, tax: 147 }
    ],
    subtotal: 4200,
    tax: 882,
    total: 5082,
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'INV-2024-008',
    invoiceNumber: '2024-008',
    client: 'Innovate Solutions',
    clientEmail: 'tech@innovatesolutions.nl',
    amount: 2800,
    status: 'paid',
    createdDate: '2024-01-12',
    sentDate: '2024-01-13',
    paidDate: '2024-01-17',
    dueDate: '2024-02-12',
    description: 'API Development & Integration',
    items: [
      { name: 'API Design', description: 'OpenAPI specificatie', quantity: 1, price: 400, tax: 84 },
      { name: 'Backend Development', description: 'Node.js API implementatie', quantity: 1, price: 1800, tax: 378 },
      { name: 'Documentation', description: 'API documentatie', quantity: 1, price: 300, tax: 63 },
      { name: 'Testing', description: 'Unit en integration tests', quantity: 1, price: 300, tax: 63 }
    ],
    subtotal: 2800,
    tax: 588,
    total: 3388,
    paymentMethod: 'Bank Transfer',
    createdBy: 'Mike Chen'
  }
];

export const getInvoicesByStatus = (status: Invoice['status']) => {
  return mockInvoices.filter(invoice => invoice.status === status);
};

export const getTotalInvoicesValue = () => {
  return mockInvoices.reduce((total, invoice) => total + invoice.total, 0);
};

export const getPaidInvoicesValue = () => {
  return mockInvoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((total, invoice) => total + invoice.total, 0);
};

export const getUnpaidInvoicesValue = () => {
  return mockInvoices
    .filter(invoice => invoice.status === 'sent' || invoice.status === 'overdue')
    .reduce((total, invoice) => total + invoice.total, 0);
};

export const getInvoicesStats = () => {
  const total = mockInvoices.length;
  const paid = mockInvoices.filter(i => i.status === 'paid').length;
  const sent = mockInvoices.filter(i => i.status === 'sent').length;
  const draft = mockInvoices.filter(i => i.status === 'draft').length;
  const overdue = mockInvoices.filter(i => i.status === 'overdue').length;
  const cancelled = mockInvoices.filter(i => i.status === 'cancelled').length;
  
  const totalValue = getTotalInvoicesValue();
  const paidValue = getPaidInvoicesValue();
  const unpaidValue = getUnpaidInvoicesValue();
  const avgValue = total > 0 ? Math.round(totalValue / total) : 0;
  
  return {
    total,
    paid,
    sent,
    draft,
    overdue,
    cancelled,
    totalValue,
    paidValue,
    unpaidValue,
    avgValue
  };
};
