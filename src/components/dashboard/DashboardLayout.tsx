import React, { useState } from 'react';
import { useApp, DashboardTab } from '../../context/AppContext.tsx';
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  Package,
  Users,
  Zap,
  Smartphone,
  BarChart3,
  Settings,
  Building2,
  ChevronDown,
  Plus,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
  Bell
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const {
    dashboardTab,
    setDashboardTab,
    setCurrentView,
    activeOrg,
    organizations,
    switchOrganization,
    createNewOrganization,
    user,
    conversations
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [newOrgModalOpen, setNewOrgModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSegment, setNewOrgSegment] = useState('');

  // Unread or Needs Human count
  const needsHumanCount = conversations.filter(c => c.status === 'needs_human' || !c.aiActive).length;

  const navItems: Array<{ id: DashboardTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }> = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'conversations', label: 'Conversas', icon: MessageSquare, badge: needsHumanCount },
    { id: 'agent', label: 'Meu Agente IA', icon: Bot },
    { id: 'products', label: 'Produtos e Serviços', icon: Package },
    { id: 'crm', label: 'Clientes / CRM', icon: Users },
    { id: 'automations', label: 'Automações', icon: Zap },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
    { id: 'usage', label: 'Consumo & Custos', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOrgName.trim()) {
      createNewOrganization(newOrgName.trim(), newOrgSegment.trim() || 'Comércio Geral');
      setNewOrgName('');
      setNewOrgSegment('');
      setNewOrgModalOpen(false);
      setOrgDropdownOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar Contract for Dashboard */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 sm:px-6">
        
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="font-bold text-blue-600 font-display">CENTRAL IA</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[140px] sm:max-w-none">
              {activeOrg.name}
            </span>
            <span aria-hidden="true" className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-slate-700 capitalize">
              {navItems.find(i => i.id === dashboardTab)?.label}
            </span>
          </div>
        </div>

        {/* Right: Tenant Switcher, Public Site Link & User Profile */}
        <div className="flex items-center gap-3">
          {/* Organization Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors font-medium border border-slate-200/60"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="max-w-[120px] sm:max-w-[160px] truncate">{activeOrg.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {orgDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Organizações Cadastradas
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
                    <span className="font-medium">{org.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{org.segment}</span>
                  </button>
                ))}

                <div className="my-1 border-t border-slate-100"></div>

                <button
                  onClick={() => {
                    setNewOrgModalOpen(true);
                    setOrgDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2 font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Cadastrar Nova Empresa</span>
                </button>
              </div>
            )}
          </div>

          {/* Link back to public site */}
          <button
            onClick={() => setCurrentView('landing')}
            className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors px-2 py-1"
            title="Ir para o site comercial"
          >
            <span>Ver Site</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              RM
            </div>
            <span className="hidden md:inline text-xs font-medium text-slate-700">
              {user.name.split(' ')[0]}
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`
            fixed md:static inset-y-14 left-0 z-20 w-60 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {/* Navigation Menu */}
          <nav className="p-3 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = dashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setDashboardTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left
                    ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 tabular-nums">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-200 space-y-2">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-900">Plano Essencial</span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase">Ativo</span>
              </div>
              <p className="text-[11px] text-slate-500">
                R$ 200/mês · Franquia de IA ativa
              </p>
            </div>

            <button
              onClick={() => setCurrentView('landing')}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 rounded-md transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair para Home</span>
            </button>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Modal: Cadastrar Nova Empresa (Multiempresa) */}
      {newOrgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Cadastrar Nova Empresa (Multiempresa)
              </h3>
              <button
                onClick={() => setNewOrgModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Adicione uma nova organização ao seu plano SaaS. Ela terá catálogo, conversas, configurações de agente e WhatsApp isolados de forma independente.
            </p>

            <form onSubmit={handleCreateOrg} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={newOrgName}
                  onChange={e => setNewOrgName(e.target.value)}
                  placeholder="Ex: Bella Moda Feminina"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Segmento de Atuação
                </label>
                <input
                  type="text"
                  value={newOrgSegment}
                  onChange={e => setNewOrgSegment(e.target.value)}
                  placeholder="Ex: Vestuário e Acessórios"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewOrgModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Criar Empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
