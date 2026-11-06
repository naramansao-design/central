import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/common/Header.tsx';
import { Footer } from './components/common/Footer.tsx';
import { LandingPage } from './components/public/LandingPage.tsx';
import { AgentShowcasePage } from './components/public/AgentShowcasePage.tsx';
import { WebsitesServicePage } from './components/public/WebsitesServicePage.tsx';
import { PricingPage } from './components/public/PricingPage.tsx';
import { DashboardLayout } from './components/dashboard/DashboardLayout.tsx';
import { OverviewView } from './components/dashboard/OverviewView.tsx';
import { ConversationsView } from './components/dashboard/ConversationsView.tsx';
import { AgentSettingsView } from './components/dashboard/AgentSettingsView.tsx';
import { ProductsView } from './components/dashboard/ProductsView.tsx';
import { CrmView } from './components/dashboard/CrmView.tsx';
import { AutomationsView } from './components/dashboard/AutomationsView.tsx';
import { WhatsAppView } from './components/dashboard/WhatsAppView.tsx';
import { UsageView } from './components/dashboard/UsageView.tsx';
import { SettingsView } from './components/dashboard/SettingsView.tsx';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, dashboardTab, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
      {/* If in Dashboard mode */}
      {currentView === 'dashboard' ? (
        <DashboardLayout>
          {dashboardTab === 'overview' && <OverviewView />}
          {dashboardTab === 'conversations' && <ConversationsView />}
          {dashboardTab === 'agent' && <AgentSettingsView />}
          {dashboardTab === 'products' && <ProductsView />}
          {dashboardTab === 'crm' && <CrmView />}
          {dashboardTab === 'automations' && <AutomationsView />}
          {dashboardTab === 'whatsapp' && <WhatsAppView />}
          {dashboardTab === 'usage' && <UsageView />}
          {dashboardTab === 'settings' && <SettingsView />}
        </DashboardLayout>
      ) : (
        /* Public commercial site mode */
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            {currentView === 'landing' && <LandingPage />}
            {currentView === 'agent-showcase' && <AgentShowcasePage />}
            {currentView === 'websites' && <WebsitesServicePage />}
            {currentView === 'pricing' && <PricingPage />}
          </main>
          <Footer />
        </div>
      )}

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
