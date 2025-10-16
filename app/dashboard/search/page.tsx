"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Search, FileText, Users, Euro, Clock, Filter, SortAsc } from "lucide-react";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useSearchParams } from "next/navigation";

function SearchPageContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search results
  const mockResults = useMemo(() => [
    {
      id: 1,
      type: 'offerte',
      title: 'Website Redesign Offerte',
      description: 'Complete website redesign voor Acme Corp',
      date: '2024-01-15',
      status: 'Actief',
      value: '€2,500'
    },
    {
      id: 2,
      type: 'klant',
      title: 'John Smith',
      description: 'Contactpersoon bij Acme Corp',
      date: '2024-01-10',
      status: 'Actief',
      value: '€5,200'
    },
    {
      id: 3,
      type: 'factuur',
      title: 'Factuur #2024-001',
      description: 'Website development services',
      date: '2024-01-08',
      status: 'Betaald',
      value: '€1,800'
    },
    {
      id: 4,
      type: 'project',
      title: 'E-commerce Platform',
      description: 'Online shop development project',
      date: '2024-01-05',
      status: 'In Progress',
      value: '€8,500'
    }
  ], []);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, mockResults]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'offerte': return <FileText className="h-4 w-4 text-blue-400" />;
      case 'klant': return <Users className="h-4 w-4 text-green-400" />;
      case 'factuur': return <Euro className="h-4 w-4 text-yellow-400" />;
      case 'project': return <FileText className="h-4 w-4 text-purple-400" />;
      default: return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actief': return 'text-green-400';
      case 'Betaald': return 'text-blue-400';
      case 'In Progress': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-white">Zoeken</h1>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-secondary-white" />
          <SortAsc className="h-4 w-4 text-secondary-white" />
        </div>
      </div>

      {/* Search Input */}
      <Card className={`${theme === "dark" ? "bg-white/10 border-white/20" : "bg-white border-gray-200"} backdrop-blur-md`}>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-white" />
            <input
              type="text"
              placeholder="Zoek in offertes, klanten, facturen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : searchQuery ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-white">
              {searchResults.length} resultaten voor &quot;{searchQuery}&quot;
            </h2>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid gap-4">
              {searchResults.map((result) => (
                <Card key={result.id} className={`${theme === "dark" ? "bg-white/10 border-white/20" : "bg-white border-gray-200"} backdrop-blur-md hover:bg-white/15 transition-colors cursor-pointer`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {getTypeIcon(result.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-primary-white mb-1">
                            {result.title}
                          </h3>
                          <p className="text-secondary-white mb-2">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-secondary-white" />
                              <span className="text-secondary-white">{result.date}</span>
                            </div>
                            <span className={`font-medium ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                            <span className="text-secondary-white">
                              {result.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className={`${theme === "dark" ? "bg-white/10 border-white/20" : "bg-white border-gray-200"} backdrop-blur-md`}>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-secondary-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-white mb-2">
                  Geen resultaten gevonden
                </h3>
                <p className="text-secondary-white">
                  Probeer andere zoektermen of controleer de spelling.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className={`${theme === "dark" ? "bg-white/10 border-white/20" : "bg-white border-gray-200"} backdrop-blur-md`}>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-secondary-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary-white mb-2">
              Zoek in je dashboard
            </h3>
            <p className="text-secondary-white">
              Voer een zoekterm in om te zoeken in offertes, klanten, facturen en projecten.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Force dynamic rendering for pages that use search params
export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading search...</div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}

