import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  BarChart3,
  DollarSign,
  MessageSquare,
  Sparkles,
  Mic,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Info
} from 'lucide-react';

export const UsageView: React.FC = () => {
  const { usage, activeOrg } = useApp();

  const msgPct = Math.min(100, Math.round((usage.messagesSent / usage.messagesQuota) * 100));
  const tokenPct = Math.min(100, Math.round((usage.aiTokensUsed / usage.aiTokensQuota) * 100));

  const totalEstimatedCost = 
    usage.costBreakdown.platformBase + 
    usage.costBreakdown.whatsappApiCost + 
    usage.costBreakdown.aiUsageCost;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Consumo, Limites & Custos Estimados
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Empresa: <span className="font-semibold text-slate-700">{activeOrg.name}</span> · 
            Período de Apuração: <span className="font-semibold text-slate-700">{usage.currentPeriod}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs">
          <span className="text-slate-500">Status da Franquia:</span>
          <span className="font-semibold text-emerald-700">Dentro dos Limites</span>
        </div>
      </div>

      {/* Quota Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Messages Quota */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Mensagens com IA</span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
              {usage.messagesSent.toLocaleString('pt-BR')}
            </span>
            <span className="text-xs text-slate-400 tabular-nums">
              de {usage.messagesQuota.toLocaleString('pt-BR')} inclusas
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                msgPct > 80 ? 'bg-amber-500' : 'bg-blue-600'
              }`}
              style={{ width: `${msgPct}%` }}
            ></div>
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>{msgPct}% utilizado</span>
            <span>{usage.messagesQuota - usage.messagesSent} restantes</span>
          </div>
        </div>

        {/* AI Tokens */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Tokens de IA (Gemini)</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
              {(usage.aiTokensUsed / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-slate-400 tabular-nums">
              de {(usage.aiTokensQuota / 1000).toFixed(0)}k de cota
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all"
              style={{ width: `${tokenPct}%` }}
            ></div>
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>{tokenPct}% consumido</span>
            <span>Gemini 3.8 Flash</span>
          </div>
        </div>

        {/* Audio Transcriptions */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Áudios Transcritos</span>
            <Mic className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
              {usage.audioTranscriptionsCount}
            </span>
            <span className="text-xs text-slate-400">
              mensagens de voz
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all"
              style={{ width: `${Math.min(100, (usage.audioTranscriptionsCount / 100) * 100)}%` }}
            ></div>
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Franquia de 100 inclusas</span>
            <span>Sem taxa extra</span>
          </div>
        </div>

      </div>

      {/* Financial Breakdown Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-display">
              Demonstrativo Financeiro do Mês Atual
            </h2>
            <p className="text-xs text-slate-500">
              Discriminação transparente entre software, repasse oficial da Meta e consumo de IA.
            </p>
          </div>

          <div className="text-right">
            <div className="text-[11px] text-slate-400">Custo Total Previsto:</div>
            <div className="text-xl font-bold text-slate-900 font-display tabular-nums">
              R$ {totalEstimatedCost.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 mb-1">Assinatura Central IA</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              R$ {usage.costBreakdown.platformBase.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Plano Central IA Essencial</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 mb-1">Repasse Meta Cloud API</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              R$ {usage.costBreakdown.whatsappApiCost.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Conversas oficiais do WhatsApp</div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500 mb-1">Consumo Extra de IA</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums">
              R$ {usage.costBreakdown.aiUsageCost.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Dentro da franquia inclusa</div>
          </div>
        </div>

        {/* Safety Alarms */}
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Trava de Segurança Ativa:</strong> O sistema nunca gera cobranças surpresa. Caso atinja 95% da franquia, você receberá um alerta para autorizar a extensão ou manter em atendimento manual.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
