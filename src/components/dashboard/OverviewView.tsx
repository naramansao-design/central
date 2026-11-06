import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  MessageSquare,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Smartphone,
  ArrowRight,
  TrendingUp,
  UserCheck,
  Package,
  Sliders,
  Clock,
  Sparkles
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    activeOrg,
    conversations,
    deals,
    products,
    agentSettings,
    setDashboardTab,
    takeoverConversationHuman,
    setActiveConversationId
  } = useApp();

  // Real calculated metrics for the active organization
  const totalConversations = conversations.length;
  const wonDeals = deals.filter(d => d.stage === 'won');
  const totalWonValue = wonDeals.reduce((acc, curr) => acc + curr.value, 0);

  const proposalDeals = deals.filter(d => d.stage === 'proposal_sent' || d.stage === 'negotiation');
  const totalPipelineValue = proposalDeals.reduce((acc, curr) => acc + curr.value, 0);

  // Conversations that need human attention
  const needsHumanConvs = conversations.filter(c => c.status === 'needs_human' || !c.aiActive);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Visão Geral — {activeOrg.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Segmento: <span className="font-medium text-slate-700">{activeOrg.segment}</span> · Plano Essencial
          </p>
        </div>

        {/* Quick Connection Indicators */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600">WhatsApp:</span>
            <span className="font-semibold text-slate-900">
              {activeOrg.whatsappNumber || 'Conectado'}
            </span>
          </div>

          {/* AI Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs">
            <span className={`w-2 h-2 rounded-full ${agentSettings.active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            <span className="text-slate-600">IA ({agentSettings.agentName.split(' ')[0]}):</span>
            <span className={`font-semibold ${agentSettings.active ? 'text-emerald-700' : 'text-slate-500'}`}>
              {agentSettings.active ? 'Ativa' : 'Pausada'}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric 1: Conversas Atendidas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Conversas Atendidas</span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
            {totalConversations}
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>Canal: WhatsApp Cloud API</span>
          </div>
        </div>

        {/* Metric 2: Orçamentos em Aberto */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Orçamentos Registrados</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
            R$ {totalPipelineValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {proposalDeals.length} propostas em negociação no CRM
          </div>
        </div>

        {/* Metric 3: Vendas Confirmadas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Vendas Concluídas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-display tabular-nums">
            R$ {totalWonValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {wonDeals.length} vendas registradas neste período
          </div>
        </div>

      </div>

      {/* Main Grid: Needs Human Attention Queue + Quick Setup Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Queue of conversations needing human intervention */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 font-display">
                Conversas que Precisam de Atendimento Humano
              </h2>
            </div>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 tabular-nums">
              {needsHumanConvs.length} pendentes
            </span>
          </div>

          {needsHumanConvs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="font-medium text-slate-800">Tudo sob controle!</p>
              <p className="mt-1">Não há conversas retidas ou necessitando de intervenção humana no momento.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {needsHumanConvs.map(conv => (
                <div
                  key={conv.id}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {conv.contact.name}
                      </span>
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        {conv.contact.phone}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate mt-1">
                      Última mensagem: {conv.lastMessage.content}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-amber-700 mt-1">
                      <span>Motivo: {conv.aiActive ? 'Pendente de resposta' : 'IA pausada / Solicitação humana'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveConversationId(conv.id);
                      setDashboardTab('conversations');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 rounded-md transition-colors shrink-0 whitespace-nowrap"
                  >
                    Abrir Conversa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick System Setup Shortcuts */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 font-display">
            Atalhos para Configuração do Sistema
          </h2>

          <div className="space-y-2.5">
            <button
              onClick={() => setDashboardTab('products')}
              className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Gerenciar Produtos & Serviços
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {products.length} itens cadastrados no catálogo oficial
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={() => setDashboardTab('agent')}
              className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Ajustar Regras e Tom do Agente
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Horários, mensagem de saudação e restrições
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={() => setDashboardTab('crm')}
              className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Funil de Oportunidades (CRM)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Mover negócios entre as 6 etapas de venda
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={() => setDashboardTab('whatsapp')}
              className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Conexão WhatsApp Cloud API
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Credenciais Meta, Webhook e número conectado
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
