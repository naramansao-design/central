import React from 'react';
import { useApp, PublicView } from '../../context/AppContext.tsx';
import { Bot, ArrowRight, Building2, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    setAuthModalOpen, 
    activeOrg, 
    organizations, 
    switchOrganization 
  } = useApp();

  const [orgDropdownOpen, setOrgDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0">
              CENTRAL IA
            </span>
          </button>

          {/* Quick Tenant Switcher Badge (when exploring) */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
              title="Empresa ativa na sessão multi-tenant"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium truncate max-w-[130px]">{activeOrg.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {orgDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Alternar Empresa (Multiempresa)
                </div>
                {organizations.map(org => (
                  <button
                    key={org.id}
                    onClick={() => {
                      switchOrganization(org.id);
                      setOrgDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex flex-col hover:bg-slate-50 transition-colors ${
                      org.id === activeOrg.id ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <span>{org.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{org.segment}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentView('landing')}
            className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'landing' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Início
          </button>
          <button
            onClick={() => setCurrentView('agent-showcase')}
            className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'agent-showcase' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Atendente IA
          </button>
          <button
            onClick={() => setCurrentView('websites')}
            className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'websites' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Criação de Sites
          </button>
          <button
            onClick={() => setCurrentView('pricing')}
            className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'pricing' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Preços
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'dashboard' ? (
            <button
              onClick={() => setCurrentView('landing')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Voltar ao Site
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20 whitespace-nowrap shrink-0"
            >
              <span>Abrir Painel do Empresário</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
