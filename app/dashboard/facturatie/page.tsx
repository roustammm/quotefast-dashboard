"use client";
import { useState, useEffect } from 'react';
import { useTheme } from "../../../contexts/ThemeContext";
import DashboardCard from "../components/DashboardCard";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import InvoiceChart from "../components/InvoiceChart";
import PaymentStatusChart from "../components/PaymentStatusChart";
import { mockInvoices, getInvoicesStats } from "../../../lib/mockData/invoicesData";
import { FileText, Euro, CheckCircle, Clock, AlertTriangle, Send } from 'lucide-react';

export default function FacturatiePage() {
  const { theme } = useTheme();
  const [invoices, setInvoices] = useState(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const stats = getInvoicesStats();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'invoiceNumber',
      label: 'Factuur #',
      sortable: true,
      width: '120px'
    },
    {
      key: 'client',
      label: 'Klant',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.clientEmail}</p>
        </div>
      )
    },
    {
      key: 'total',
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
    { label: 'Verstuur herinnering', action: 'remind', icon: <Send className="w-4 h-4" /> },
    { label: 'Markeer als betaald', action: 'markPaid', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const handleRowClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleBulkAction = (action: string, selectedRows: any[]) => {
    console.log(`Bulk action: ${action}`, selectedRows);
    // Implement bulk actions
  };

  const handleCreateInvoice = () => {
    console.log('Create new invoice');
    // Implement create invoice
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
        title="Facturatie"
        description="Beheer je facturen en betalingen"
        showCreateButton={true}
        createButtonText="Nieuwe Factuur"
        onCreateClick={handleCreateInvoice}
        showSearch={true}
        searchPlaceholder="Zoek facturen..."
        onSearchChange={setSearchTerm}
        showFilters={true}
        onFilterClick={() => console.log('Filter clicked')}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardCard
          title="Totaal Facturen"
          value={stats.total}
          growth="18%"
          icon={<FileText className="h-5 w-5" />}
          progress={75}
          delay={0}
        />
        <DashboardCard
          title="Betaald"
          value={stats.paid}
          growth="25%"
          icon={<CheckCircle className="h-5 w-5" />}
          progress={Math.round((stats.paid / stats.total) * 100)}
          delay={100}
        />
        <DashboardCard
          title="Openstaand"
          value={stats.sent + stats.overdue}
          growth="-5%"
          trend="down"
          icon={<Clock className="h-5 w-5" />}
          progress={Math.round(((stats.sent + stats.overdue) / stats.total) * 100)}
          delay={200}
        />
        <DashboardCard
          title="Vervallen"
          value={stats.overdue}
          growth="0%"
          icon={<AlertTriangle className="h-5 w-5" />}
          progress={Math.round((stats.overdue / stats.total) * 100)}
          delay={300}
        />
        <DashboardCard
          title="Totaal Bedrag"
          value={`€${(stats.totalValue / 1000).toFixed(0)}k`}
          growth="22%"
          icon={<Euro className="h-5 w-5" />}
          progress={85}
          delay={400}
        />
        <DashboardCard
          title="Betaald Bedrag"
          value={`€${(stats.paidValue / 1000).toFixed(0)}k`}
          growth="28%"
          icon={<CheckCircle className="h-5 w-5" />}
          progress={Math.round((stats.paidValue / stats.totalValue) * 100)}
          delay={500}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <InvoiceChart />
        <PaymentStatusChart />
      </div>

      {/* Invoices Table */}
      <DataTable
        data={filteredInvoices}
        columns={columns}
        onRowClick={handleRowClick}
        onBulkAction={handleBulkAction}
        bulkActions={bulkActions}
        selectable={true}
        emptyMessage="Geen facturen gevonden"
      />
    </div>
  );
}
