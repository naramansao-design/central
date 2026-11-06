import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Check,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Info,
  DollarSign,
  TrendingUp,
  Percent
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { setCurrentView } = useApp();

  // Calculator State
  const [estimatedMonthlyLeads, setEstimatedMonthlyLeads] = useState(150);
  const [averageTicket, setAverageTicket] = useState(250);
  const [currentConversionRate, setCurrentConversionRate] = useState(10); // 10%
  const [improvedConversionRate, setImprovedConversionRate] = useState(15); // 15% with fast response

  const currentRevenue = estimatedMonthlyLeads * (currentConversionRate / 100) * averageTicket;
  const improvedRevenue = estimatedMonthlyLeads * (improvedConversionRate / 100) * averageTicket;
  const additionalMonthlyGain = improvedRevenue - currentRevenue;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 mb-3">
            <DollarSign className="w-3.5 h-3.5 text-blue-600" />
            <span>Transparência Total & Sem Pegadinhas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Planos e Estrutura de Custos
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Entenda claramente a assinatura do software, a franquia de IA e o funcionamento das tarifas oficiais da Meta WhatsApp Cloud API.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card: Central IA Essencial */}
          <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-md relative flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-md mb-4">
                Plano Base Inicial
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                CENTRAL IA ESSENCIAL
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Ideal para oficinas, clínicas, comércios locais e prestadores de serviço individuais.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900 font-display tabular-nums">
                  R$ 200
                </span>
                <span className="text-xs text-slate-500">/mês</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-6 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">Franquia Mensal Inclusa:</div>
                <div>• Até 2.000 mensagens com inteligência artificial</div>
                <div>• Até 100 transcrições de mensagens de áudio</div>
                <div>• 1 Número de WhatsApp Conectado</div>
                <div>• Catálogo com até 50 produtos/serviços ativos</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Atendimento automático 24h sem interrupção</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Envio de fotos reais de produtos cadastrados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Caixa de entrada com transferência para humanos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CRM Kanban integrado (6 etapas de venda)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pausa instantânea da IA em qualquer conversa</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Assinar Plano Essencial
            </button>
          </div>

          {/* Card: Custom / Enterprise */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider rounded-md mb-4">
                Para Múltiplas Unidades
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                CENTRAL IA MULTIEMPRESA
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Para redes, franquias, agências ou empresas com mais de um CNPJ e múltiplos números.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900 font-display">
                  Sob Medida
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-6 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">Personalização de Limites:</div>
                <div>• Franquia de mensagens e tokens ajustada ao seu volume</div>
                <div>• Múltiplas organizações e números de WhatsApp</div>
                <div>• Treinamento sob medida com regras complexas</div>
                <div>• Atendimento prioritário e suporte dedicado</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Painel unificado multiempresa com isolamento estrito</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Implantação assistida e importação de catálogo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Exportação de relatórios gerenciais personalizados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SLA contratual de suporte técnico</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentView('websites')}
              className="w-full py-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Falar com Consultor
            </button>
          </div>

        </div>

        {/* Breakdown of WhatsApp Meta Platform Official Costs */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Como Funcionam os Custos Oficiais do WhatsApp (Meta)</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 font-display mb-3">
            Transparência: Custos de Infraestrutura da Meta Separados da Assinatura
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            Para garantir conformidade oficial e segurança jurídica, a Central IA não mascara ou superfatura as taxas cobradas diretamente pela Meta (Facebook). 
            Todas as empresas do mundo que utilizam a API oficial operam sob a tabela oficial da Meta por janela de conversa de 24 horas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 mb-1">Conversas de Atendimento (Serviço)</div>
              <div className="text-slate-500 mb-2">Iniciadas pelo cliente que envia mensagem para sua empresa.</div>
              <div className="font-semibold text-emerald-700">~ R$ 0,05 a R$ 0,08 por janela de 24h</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 mb-1">Primeiras 1.000 Conversas Mensais</div>
              <div className="text-slate-500 mb-2">Benefício oficial concedido pela Meta por conta de WhatsApp.</div>
              <div className="font-semibold text-blue-700">Isentas de cobrança direta da Meta</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 mb-1">Conversas de Marketing / Notificação</div>
              <div className="text-slate-500 mb-2">Iniciadas pela empresa através de templates pré-aprovados.</div>
              <div className="font-semibold text-amber-700">Tarifadas por disparo aprovado</div>
            </div>
          </div>
        </div>

        {/* Interactive ROI Calculator for Brazilian PMEs */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Simulador de Retorno Sobre Investimento (ROI)</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
            Calcule o impacto da agilidade de resposta no faturamento da sua empresa
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Empresas que respondem em menos de 2 minutos convertem em média 30% a 50% mais orçamentos no WhatsApp.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-700 mb-1">
                  <span>Mensagens / Clientes recebidos por mês:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{estimatedMonthlyLeads} contatos</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="1000"
                  step="10"
                  value={estimatedMonthlyLeads}
                  onChange={e => setEstimatedMonthlyLeads(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 mb-1">
                  <span>Ticket médio do seu produto ou serviço (R$):</span>
                  <span className="font-bold text-slate-900 tabular-nums">R$ {averageTicket},00</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={averageTicket}
                  onChange={e => setAverageTicket(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Conversão Atual estimada (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={currentConversionRate}
                    onChange={e => setCurrentConversionRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Conversão com Central IA (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={improvedConversionRate}
                    onChange={e => setImprovedConversionRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-blue-50/70 rounded-xl border border-blue-100 p-6 text-center space-y-3">
              <div className="text-xs text-blue-800 font-medium">
                Potencial de Ganho Adicional Mensal:
              </div>
              <div className="text-3xl font-extrabold text-blue-700 font-display tabular-nums">
                + R$ {additionalMonthlyGain.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-blue-900/80 leading-relaxed">
                Mais do que paga a mensalidade de R$ 200/mês do Plano Essencial já no primeiro mês de uso.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
