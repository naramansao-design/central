import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Users,
  Plus,
  DollarSign,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  X,
  Building,
  User
} from 'lucide-react';
import { Deal } from '../../types/index.ts';

export const CrmView: React.FC = () => {
  const { deals, updateDealStage, createDeal, conversations, activeOrg, showToast } = useApp();

  const [newDealModalOpen, setNewDealModalOpen] = useState(false);
  const [dealTitle, setDealTitle] = useState('');
  const [dealValue, setDealValue] = useState<number>(300);
  const [dealStage, setDealStage] = useState<Deal['stage']>('lead');
  const [dealContactId, setDealContactId] = useState('');

  // 6 CRM Stages
  const stages: Array<{ id: Deal['stage']; title: string; color: string; border: string }> = [
    { id: 'lead', title: '1. Novo Contato', color: 'bg-slate-100 text-slate-700', border: 'border-slate-200' },
    { id: 'in_service', title: '2. Em Atendimento', color: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
    { id: 'negotiation', title: '3. Em Negociação', color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-200' },
    { id: 'proposal_sent', title: '4. Orçamento Enviado', color: 'bg-amber-50 text-amber-700', border: 'border-amber-200' },
    { id: 'won', title: '5. Venda Concluída', color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200' },
    { id: 'lost', title: '6. Perdido', color: 'bg-red-50 text-red-700', border: 'border-red-200' },
  ];

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle.trim()) {
      showToast('Por favor, informe o título da oportunidade.');
      return;
    }

    createDeal({
      title: dealTitle.trim(),
      value: Number(dealValue) || 0,
      stage: dealStage,
      contactId: dealContactId || (conversations[0]?.contactId || 'ct-default'),
      priority: 'medium'
    });

    setDealTitle('');
    setDealValue(300);
    setNewDealModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Funil de Vendas e Oportunidades (CRM)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Empresa: <span className="font-semibold text-slate-700">{activeOrg.name}</span> · 
            Acompanhe o ciclo de cada cliente atendido pela IA ou pela equipe humana.
          </p>
        </div>

        <button
          onClick={() => setNewDealModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nova Oportunidade</span>
        </button>
      </div>

      {/* 6-Stage Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto min-h-[500px]">
        {stages.map(st => {
          const stageDeals = deals.filter(d => d.stage === st.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={st.id}
              className="bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between shadow-2xs"
            >
              {/* Stage Header */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 truncate">
                    {st.title}
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 tabular-nums">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-slate-500 my-2 tabular-nums">
                  Total: R$ {stageTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>

                {/* Cards List */}
                <div className="space-y-2 mt-3">
                  {stageDeals.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                      Nenhum item nesta etapa
                    </div>
                  ) : (
                    stageDeals.map(deal => {
                      const relatedConv = conversations.find(c => c.contactId === deal.contactId);
                      return (
                        <div
                          key={deal.id}
                          className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200/80 transition-colors shadow-2xs space-y-2"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900 leading-snug">
                              {deal.title}
                            </span>
                          </div>

                          <div className="text-xs font-extrabold text-blue-700 tabular-nums">
                            R$ {deal.value.toFixed(2)}
                          </div>

                          {relatedConv && (
                            <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              <span>{relatedConv.contact.name}</span>
                            </div>
                          )}

                          {/* Quick Stage Mover Selector */}
                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Mover:</span>
                            <select
                              value={deal.stage}
                              onChange={e => updateDealStage(deal.id, e.target.value as any)}
                              className="text-[10px] bg-white border border-slate-200 rounded px-1 py-0.5 text-slate-700"
                            >
                              <option value="lead">1. Lead</option>
                              <option value="in_service">2. Atendimento</option>
                              <option value="negotiation">3. Negociação</option>
                              <option value="proposal_sent">4. Orçamento</option>
                              <option value="won">5. Concluída</option>
                              <option value="lost">6. Perdido</option>
                            </select>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Quick Add link at bottom of column */}
              <button
                onClick={() => {
                  setDealStage(st.id);
                  setNewDealModalOpen(true);
                }}
                className="mt-4 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Adicionar</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal: Nova Oportunidade */}
      {newDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Criar Nova Oportunidade de Venda
              </h3>
              <button
                onClick={() => setNewDealModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Título da Oportunidade *
                </label>
                <input
                  type="text"
                  required
                  value={dealTitle}
                  onChange={e => setDealTitle(e.target.value)}
                  placeholder="Ex: Troca de pastilhas Renegade"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Valor Estimado (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={dealValue}
                  onChange={e => setDealValue(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 tabular-nums focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Etapa Inicial no Funil
                </label>
                <select
                  value={dealStage}
                  onChange={e => setDealStage(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                >
                  <option value="lead">1. Novo Contato (Lead)</option>
                  <option value="in_service">2. Em Atendimento</option>
                  <option value="negotiation">3. Em Negociação</option>
                  <option value="proposal_sent">4. Orçamento Enviado</option>
                  <option value="won">5. Venda Concluída</option>
                  <option value="lost">6. Perdido</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vincular ao Contato
                </label>
                <select
                  value={dealContactId}
                  onChange={e => setDealContactId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                >
                  {conversations.map(c => (
                    <option key={c.contactId} value={c.contactId}>
                      {c.contact.name} ({c.contact.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewDealModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Criar Oportunidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
