import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Info,
  ArrowRight
} from 'lucide-react';

export const AutomationsView: React.FC = () => {
  const { automations, toggleAutomation, activeOrg } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Automações de Atendimento & Vendas
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Empresa: <span className="font-semibold text-slate-700">{activeOrg.name}</span> · 
            Regras de engajamento em conformidade estrita com as janelas oficiais da Meta e LGPD.
          </p>
        </div>
      </div>

      {/* Meta Compliance Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-relaxed">
          <span className="font-bold">Política Anti-Spam & Janela de 24 Horas:</span> Todas as automações respeitam o consentimento (opt-in) e a janela de atendimento do WhatsApp. Disparos frios e mensagens em massa não solicitadas são bloqueados por design para proteger a reputação do seu número comercial.
        </div>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map(rule => (
          <div
            key={rule.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  {rule.name}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  rule.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {rule.enabled ? 'Ativa' : 'Pausada'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                {rule.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Ação: {rule.actionDetails}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  Executada {rule.executionCount} vezes
                </span>
              </div>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => toggleAutomation(rule.id)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border shrink-0 self-start sm:self-center"
              style={{
                borderColor: rule.enabled ? '#bbf7d0' : '#e2e8f0',
                backgroundColor: rule.enabled ? '#f0fdf4' : '#f8fafc',
                color: rule.enabled ? '#15803d' : '#64748b'
              }}
            >
              {rule.enabled ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Habilitada</span>
                </>
              ) : (
                <span>Desabilitada</span>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Rules Builder Architecture */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Estrutura de Gatilhos Disponíveis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
            <div className="font-bold text-slate-900 mb-1">1. Entrada de Mensagem</div>
            <div>Identifica cliente novo, cadastra no CRM e saúda no tom configurado.</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
            <div className="font-bold text-slate-900 mb-1">2. Orçamento sem Resposta</div>
            <div>Envia mensagem sutil de acompanhamento antes de expirar as 24 horas.</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
            <div className="font-bold text-slate-900 mb-1">3. Confirmação de Venda</div>
            <div>Gera registro no histórico e emite aviso à equipe de entrega/execução.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
