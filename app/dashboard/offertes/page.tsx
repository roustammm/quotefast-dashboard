"use client";
import { useState, useEffect } from 'react';
import { useTheme } from "../../../contexts/ThemeContext";
import { useAIPersonalization } from "../../../contexts/AIPersonalizationContext";
import { getPersonalizedTemplates } from "../../../lib/aiPersonalization";
import DashboardCard from "../components/DashboardCard";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import OfferStatusChart from "../components/OfferStatusChart";
import OfferTimelineChart from "../components/OfferTimelineChart";
import { logger } from '../../../lib/logger';
import OfferDetailsModal from "../components/OfferDetailsModal";
import { mockOffers, getOffersStats } from "../../../lib/mockData/offersData";
import { FileText, Euro, Target, Clock, Users, Zap } from 'lucide-react';

export default function OffertesPage() {
  const { theme } = useTheme();
  const { onboardingData } = useAIPersonalization();
  const [offers, setOffers] = useState(mockOffers);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const stats = getOffersStats();
  
  // Get personalized templates based on onboarding data
  const personalizedTemplates = onboardingData ? getPersonalizedTemplates(onboardingData) : [];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'id',
      label: 'Offerte ID',
      sortable: true,
      width: '120px'
    },
    {
      key: 'title',
      label: 'Titel',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.client}</p>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Bedrag',
      sortable: true,
      render: (value: number) => new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR'
      }).format(value)
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true
    },
    {
      key: 'createdDate',
      label: 'Aangemaakt',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('nl-NL')
    },
    {
      key: 'dueDate',
      label: 'Vervaldatum',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('nl-NL')
    }
  ];

  const bulkActions = [
    { label: 'Exporteer geselecteerde', action: 'export', icon: <FileText className="w-4 h-4" /> },
    { label: 'Verstuur herinnering', action: 'remind', icon: <Clock className="w-4 h-4" /> },
    { label: 'Markeer als verzonden', action: 'send', icon: <Zap className="w-4 h-4" /> }
  ];

  const handleRowClick = (offer: any) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleBulkAction = (action: string, selectedRows: any[]) => {
    logger.info(`Bulk action: ${action}`, 'offertes', { selectedRows });
    // Implement bulk actions
  };

  const handleCreateOffer = () => {
    logger.info('Create new offer', 'offertes');
    // Implement create offer
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Offertes"
        description="Beheer je offertes en prijsvoorstellen"
        showCreateButton={true}
        createButtonText="Nieuwe Offerte"
        onCreateClick={handleCreateOffer}
        showSearch={true}
        searchPlaceholder="Zoek offertes..."
        onSearchChange={setSearchTerm}
        showFilters={true}
        onFilterClick={() => logger.info('Filter clicked', 'offertes')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardCard
          title="Totaal Offertes"
          value={stats.total}
          growth="15%"
          icon={<FileText className="h-5 w-5" />}
          progress={75}
          delay={0}
        />
        <DashboardCard
          title="Geaccepteerd"
          value={stats.accepted}
          growth="22%"
          icon={<Target className="h-5 w-5" />}
          progress={stats.acceptanceRate}
          delay={100}
        />
        <DashboardCard
          title="Verzonden"
          value={stats.sent}
          growth="8%"
          icon={<Clock className="h-5 w-5" />}
          progress={60}
          delay={200}
        />
        <DashboardCard
          title="Concept"
          value={stats.draft}
          growth="-5%"
          trend="down"
          icon={<FileText className="h-5 w-5" />}
          progress={40}
          delay={300}
        />
        <DashboardCard
          title="Gem. Waarde"
          value={`€${stats.avgValue.toLocaleString()}`}
          growth="12%"
          icon={<Euro className="h-5 w-5" />}
          progress={68}
          delay={400}
        />
        <DashboardCard
          title="Acceptatie Ratio"
          value={`${stats.acceptanceRate}%`}
          growth="8%"
          icon={<Target className="h-5 w-5" />}
          progress={stats.acceptanceRate}
          delay={500}
        />
      </div>

      {/* AI Personalisatie Sectie */}
      {onboardingData && personalizedTemplates.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Aanbevolen Templates voor {onboardingData.companyName}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Gebaseerd op je bedrijfstype ({onboardingData.industry}) en teamgrootte ({onboardingData.teamSize})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalizedTemplates.slice(0, 3).map((template, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {template.category}
                  </span>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                    Gebruik Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <OfferStatusChart />
        <OfferTimelineChart />
      </div>

      {/* Offers Table */}
      <DataTable
        data={filteredOffers}
        columns={columns}
        onRowClick={handleRowClick}
        onBulkAction={handleBulkAction}
        bulkActions={bulkActions}
        selectable={true}
        emptyMessage="Geen offertes gevonden"
      />

      {/* Offer Details Modal */}
      <OfferDetailsModal
        offer={selectedOffer}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOffer(null);
        }}
        onEdit={(offer) => logger.info('Edit offer', 'offertes', { offer })}
        onSend={(offer) => logger.info('Send offer', 'offertes', { offer })}
        onDownload={(offer) => logger.info('Download offer', 'offertes', { offer })}
      />
    </div>
  );
}
