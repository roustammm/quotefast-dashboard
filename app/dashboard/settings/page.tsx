"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Save } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import ProfileSection from './components/ProfileSection';
import NotificationsSection from './components/NotificationsSection';
import SecuritySection from './components/SecuritySection';
import APIKeysSection from './components/APIKeysSection';
import AppearanceSection from './components/AppearanceSection';
import AIPersonalizationSection from './components/AIPersonalizationSection';
import SystemSection from './components/SystemSection';
import { SETTINGS_TABS, SettingsTab } from './utils/constants';

// Force dynamic rendering for pages that use search params
export const dynamic = 'force-dynamic';

// Component that uses useSearchParams must be wrapped in Suspense
function SettingsContent() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams?.get('tab') as SettingsTab;

  // Set initial tab based on URL parameter or default to 'profile'
  const [activeTab, setActiveTab] = useState<SettingsTab>(() => {
    if (tabFromUrl && SETTINGS_TABS.some(tab => tab.id === tabFromUrl)) {
      return tabFromUrl;
    }
    return 'profile';
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update URL when tab changes (for shareable links)
  useEffect(() => {
    if (activeTab !== 'profile') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      window.history.replaceState({}, '', url.toString());
    } else {
      // Remove tab parameter when on profile (default)
      const url = new URL(window.location.href);
      url.searchParams.delete('tab');
      window.history.replaceState({}, '', url.toString());
    }
  }, [activeTab]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Trigger save based on active tab
        const saveButton = document.querySelector('[data-save-button]') as HTMLButtonElement;
        if (saveButton && !saveButton.disabled) {
          saveButton.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Render active section
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'security':
        return <SecuritySection />;
      case 'apiKeys':
        return <APIKeysSection />;
      case 'appearance':
        return <AppearanceSection />;
      case 'aiPersonalization':
        return <AIPersonalizationSection />;
      case 'system':
        return <SystemSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Instellingen</h1>
          <p className="text-gray-400">Beheer je account en voorkeuren</p>
        </div>
        {hasUnsavedChanges && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-300 text-sm">
            <Save className="h-4 w-4" />
            <span>Je hebt onopgeslagen wijzigingen</span>
          </div>
        )}
      </div>

      {/* Settings Tabs */}
      <div className="border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {SETTINGS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Section Content */}
      <div className="animate-fadeIn">
        {renderActiveSection()}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-white font-medium mb-2">Sneltoetsen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-gray-300 text-xs">Ctrl/Cmd</kbd>
            <span className="text-gray-400">+</span>
            <kbd className="px-2 py-1 bg-white/10 rounded text-gray-300 text-xs">S</kbd>
            <span className="text-gray-400">Opslaan</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-gray-300 text-xs">Tab</kbd>
            <span className="text-gray-400">Navigeer door velden</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-gray-500 text-sm pb-8">
        <p>Alle wijzigingen worden automatisch gesynchroniseerd met je account</p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// Main export with Suspense wrapper
export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
