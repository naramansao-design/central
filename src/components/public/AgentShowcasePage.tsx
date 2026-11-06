import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Bot,
  MessageSquare,
  Mic,
  Camera,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  Sliders,
  ShieldAlert
} from 'lucide-react';

export const AgentShowcasePage: React.FC = () => {
  const { setCurrentView, setDashboardTab } = useApp();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 mb-3">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>Motor de Inteligência Artificial para Negócios</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Atendente IA Especialista no seu Negócio
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Conheça todos os recursos da tecnologia de agentes da Central IA. Apresentamos com total transparência o que já está disponível, o que está em desenvolvimento e o que planejamos para versões futuras.
          </p>
        </div>

        {/* 1. RECURSOS DISPONÍVEIS (VERSÃO ATUAL) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Recursos Disponíveis Agora (Versão 1.0)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 mb-3">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Atendimento Automático com IA
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Responde perguntas de clientes com agilidade, mantendo o contexto da conversa e aplicando a saudação e o tom de voz da sua marca.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Consulta Estrita ao Catálogo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A IA é blindada contra alucinações: preços, estoques e especificações são lidos diretamente do banco de dados oficial da sua empresa.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 mb-3">
                <Mic className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Compreensão de Áudios Recebidos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seu cliente envia áudio no WhatsApp e nossa inteligência multimodal transcreve e entende o pedido como se fosse texto.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-3">
                <Camera className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Envio de Fotos Reais de Produtos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quando o cliente tem interesse em um produto, a IA pode anexar a foto cadastrada no catálogo, aumentando as chances de conversão.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-700 mb-3">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Transferência para Atendente Humano
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identifica regras de exceção (reclamações, pedidos de desconto fora da tabela, dúvidas raras) e transfere o atendimento para sua equipe.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center text-slate-800 mb-3">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Simulador de Teste Pré-Ativação
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Teste o comportamento do seu agente em tempo real antes de colocá-lo para atender clientes reais no WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* 2. RECURSOS EM DESENVOLVIMENTO */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Recursos em Desenvolvimento Ativo (Versão 1.5)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-2">
                <Clock className="w-4 h-4" />
                <span>Em testes alfa internos</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Sugestão Automática de Up-sell & Combos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A IA sugere produtos complementares inteligentes ao cliente (ex: filtro de óleo ao trocar o lubrificante; cabo reforçado ao comprar um carregador).
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-2">
                <Clock className="w-4 h-4" />
                <span>Em integração com Google Calendar</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Agendamento Direto na Agenda da Empresa
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reserva de horários para consultas e serviços em tempo real consultando a grade de disponibilidade dos profissionais da empresa.
              </p>
            </div>
          </div>
        </div>

        {/* 3. RECURSOS FUTUROS PLANEJADOS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-6">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Recursos Futuros (Versão 2.0+)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-1">
                Resposta por Áudio com Voz Sintética Humanizada
              </h4>
              <p>
                O cliente manda áudio e a IA responde também em áudio sintetizado, com tom acolhedor e natural (quando habilitado pelo empresário).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-1">
                Checkout Pix Nativo no WhatsApp
              </h4>
              <p>
                Geração de código Pix copia-e-cola com baixa automática de pedido dentro da própria conversa do WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Dashboard */}
        <div className="p-8 rounded-2xl bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display">
              Deseja configurar o seu agente agora?
            </h3>
            <p className="text-xs text-blue-100 mt-1">
              Acesse a área de configuração do agente no painel e teste com o catálogo da sua empresa.
            </p>
          </div>
          <button
            onClick={() => {
              setDashboardTab('agent');
              setCurrentView('dashboard');
            }}
            className="px-6 py-3 text-xs font-bold text-blue-600 bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-md whitespace-nowrap"
          >
            Abrir Configuração do Agente
          </button>
        </div>

      </div>
    </div>
  );
};
