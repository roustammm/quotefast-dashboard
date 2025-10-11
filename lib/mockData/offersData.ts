export interface Offer {
  id: string;
  title: string;
  client: string;
  clientEmail: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdDate: string;
  sentDate?: string;
  acceptedDate?: string;
  dueDate: string;
  description: string;
  items: Array<{
    name: string;
    description: string;
    quantity: number;
    price: number;
  }>;
  notes?: string;
  version: number;
  createdBy: string;
}

export const mockOffers: Offer[] = [
  {
    id: 'QF-2024-001',
    title: 'Website Ontwikkeling',
    client: 'ABC Bedrijf',
    clientEmail: 'contact@abcbedrijf.nl',
    amount: 2500,
    status: 'accepted',
    createdDate: '2024-01-15',
    sentDate: '2024-01-16',
    acceptedDate: '2024-01-20',
    dueDate: '2024-02-15',
    description: 'Ontwikkeling van een moderne website met CMS',
    items: [
      { name: 'Website Design', description: 'Responsive design en UI/UX', quantity: 1, price: 800 },
      { name: 'Frontend Development', description: 'React/Next.js implementatie', quantity: 1, price: 1200 },
      { name: 'Backend Development', description: 'API en database setup', quantity: 1, price: 500 }
    ],
    notes: 'Klant wil extra SEO optimalisatie',
    version: 2,
    createdBy: 'Jan de Vries'
  },
  {
    id: 'QF-2024-002',
    title: 'Logo Design',
    client: 'Maria Jansen',
    clientEmail: 'maria@jansen.nl',
    amount: 450,
    status: 'accepted',
    createdDate: '2024-01-10',
    sentDate: '2024-01-11',
    acceptedDate: '2024-01-14',
    dueDate: '2024-01-25',
    description: 'Modern logo design voor startup',
    items: [
      { name: 'Logo Design', description: '3 concepten + 2 revisies', quantity: 1, price: 300 },
      { name: 'Brand Guidelines', description: 'Kleuren en typografie', quantity: 1, price: 150 }
    ],
    version: 1,
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'QF-2024-003',
    title: 'E-commerce Platform',
    client: 'TechStart',
    clientEmail: 'info@techstart.nl',
    amount: 8500,
    status: 'sent',
    createdDate: '2024-01-20',
    sentDate: '2024-01-22',
    dueDate: '2024-02-20',
    description: 'Volledig e-commerce platform met payment integratie',
    items: [
      { name: 'Platform Development', description: 'Custom e-commerce oplossing', quantity: 1, price: 5000 },
      { name: 'Payment Integration', description: 'Stripe en iDEAL integratie', quantity: 1, price: 1500 },
      { name: 'Admin Dashboard', description: 'Beheer interface', quantity: 1, price: 2000 }
    ],
    notes: 'Hoge prioriteit project',
    version: 1,
    createdBy: 'Mike Chen'
  },
  {
    id: 'QF-2024-004',
    title: 'Mobile App Development',
    client: 'RetailPlus',
    clientEmail: 'dev@retailplus.nl',
    amount: 12000,
    status: 'draft',
    createdDate: '2024-01-25',
    dueDate: '2024-03-15',
    description: 'iOS en Android app voor retail management',
    items: [
      { name: 'iOS App', description: 'Native iOS ontwikkeling', quantity: 1, price: 6000 },
      { name: 'Android App', description: 'Native Android ontwikkeling', quantity: 1, price: 5000 },
      { name: 'Backend API', description: 'REST API voor apps', quantity: 1, price: 1000 }
    ],
    version: 1,
    createdBy: 'Emma Wilson'
  },
  {
    id: 'QF-2024-005',
    title: 'Data Analytics Dashboard',
    client: 'DataCorp',
    clientEmail: 'analytics@datacorp.nl',
    amount: 3200,
    status: 'rejected',
    createdDate: '2024-01-18',
    sentDate: '2024-01-19',
    dueDate: '2024-02-18',
    description: 'Dashboard voor data visualisatie en rapportage',
    items: [
      { name: 'Dashboard Development', description: 'React dashboard met charts', quantity: 1, price: 2000 },
      { name: 'Data Integration', description: 'API koppelingen', quantity: 1, price: 800 },
      { name: 'Reporting Module', description: 'Automatische rapporten', quantity: 1, price: 400 }
    ],
    notes: 'Klant vond prijs te hoog',
    version: 1,
    createdBy: 'Alex Rodriguez'
  },
  {
    id: 'QF-2024-006',
    title: 'Brand Identity Package',
    client: 'StartupXYZ',
    clientEmail: 'hello@startupxyz.nl',
    amount: 1800,
    status: 'expired',
    createdDate: '2024-01-05',
    sentDate: '2024-01-06',
    dueDate: '2024-01-20',
    description: 'Complete brand identity voor nieuwe startup',
    items: [
      { name: 'Logo Design', description: '5 concepten + 3 revisies', quantity: 1, price: 600 },
      { name: 'Brand Guidelines', description: 'Uitgebreide style guide', quantity: 1, price: 400 },
      { name: 'Business Cards', description: 'Design en print files', quantity: 1, price: 200 },
      { name: 'Letterhead', description: 'Briefpapier design', quantity: 1, price: 200 },
      { name: 'Social Media Kit', description: 'Templates voor social media', quantity: 1, price: 400 }
    ],
    version: 1,
    createdBy: 'Lisa Park'
  },
  {
    id: 'QF-2024-007',
    title: 'Website Redesign',
    client: 'GlobalTech',
    clientEmail: 'marketing@globaltech.nl',
    amount: 4200,
    status: 'sent',
    createdDate: '2024-01-28',
    sentDate: '2024-01-29',
    dueDate: '2024-02-28',
    description: 'Complete redesign van bestaande website',
    items: [
      { name: 'UX Research', description: 'Gebruikersonderzoek en wireframes', quantity: 1, price: 800 },
      { name: 'UI Design', description: 'Modern design systeem', quantity: 1, price: 1200 },
      { name: 'Frontend Development', description: 'React implementatie', quantity: 1, price: 1500 },
      { name: 'Content Migration', description: 'Bestaande content overzetten', quantity: 1, price: 700 }
    ],
    version: 1,
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'QF-2024-008',
    title: 'API Development',
    client: 'Innovate Solutions',
    clientEmail: 'tech@innovatesolutions.nl',
    amount: 2800,
    status: 'accepted',
    createdDate: '2024-01-12',
    sentDate: '2024-01-13',
    acceptedDate: '2024-01-17',
    dueDate: '2024-02-12',
    description: 'REST API voor integratie met externe systemen',
    items: [
      { name: 'API Design', description: 'OpenAPI specificatie', quantity: 1, price: 400 },
      { name: 'Backend Development', description: 'Node.js API implementatie', quantity: 1, price: 1800 },
      { name: 'Documentation', description: 'API documentatie', quantity: 1, price: 300 },
      { name: 'Testing', description: 'Unit en integration tests', quantity: 1, price: 300 }
    ],
    version: 1,
    createdBy: 'Mike Chen'
  }
];

export const getOffersByStatus = (status: Offer['status']) => {
  return mockOffers.filter(offer => offer.status === status);
};

export const getTotalOffersValue = () => {
  return mockOffers.reduce((total, offer) => total + offer.amount, 0);
};

export const getAcceptedOffersValue = () => {
  return mockOffers
    .filter(offer => offer.status === 'accepted')
    .reduce((total, offer) => total + offer.amount, 0);
};

export const getOffersStats = () => {
  const total = mockOffers.length;
  const accepted = mockOffers.filter(o => o.status === 'accepted').length;
  const sent = mockOffers.filter(o => o.status === 'sent').length;
  const draft = mockOffers.filter(o => o.status === 'draft').length;
  const rejected = mockOffers.filter(o => o.status === 'rejected').length;
  const expired = mockOffers.filter(o => o.status === 'expired').length;
  
  const totalValue = getTotalOffersValue();
  const acceptedValue = getAcceptedOffersValue();
  const acceptanceRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
  const avgValue = total > 0 ? Math.round(totalValue / total) : 0;
  
  return {
    total,
    accepted,
    sent,
    draft,
    rejected,
    expired,
    totalValue,
    acceptedValue,
    acceptanceRate,
    avgValue
  };
};
