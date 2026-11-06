import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Bot,
  Save,
  RotateCcw,
  Sparkles,
  Send,
  ShieldAlert,
  Clock,
  MessageSquare,
  HelpCircle,
  Package,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AgentSettings } from '../../types/index.ts';

export const AgentSettingsView: React.FC = () => {
  const {
    agentSettings,
    updateAgentSettings,
    simulatorMessages,
    isSimulatorLoading,
    sendSimulatorMessage,
    resetSimulator,
    products,
    activeOrg
  } = useApp();

  // Local form state
  const [formData, setFormData] = useState<AgentSettings>({ ...agentSettings });
  const [simInput, setSimInput] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAgentSettings(formData);
  };

  const handleSendSim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim() || isSimulatorLoading) return;
    const text = simInput.trim();
    setSimInput('');
    await sendSimulatorMessage(text);
  };

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Meu Agente de Inteligência Artificial
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure as instruções, tom de voz, regras de negócio e teste o comportamento do seu agente em tempo real.
          </p>
        </div>

        {/* Global Agent Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={e => {
                const nextActive = e.target.checked;
                setFormData(prev => ({ ...prev, active: nextActive }));
                updateAgentSettings({ active: nextActive });
              }}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className={formData.active ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
              {formData.active ? 'Agente Ativo para Clientes' : 'Agente Pausado Geral'}
            </span>
          </label>
        </div>
      </div>

      {/* 2-Column Grid: Form Settings (Left) vs Real-time Gemini Simulator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Agent Configuration Form (Width: 7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
          
          {/* Basic Identity */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span>Identidade e Apresentação</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome do Agente
                </label>
                <input
                  type="text"
                  value={formData.agentName}
                  onChange={e => setFormData({ ...formData, agentName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome Comercial da Empresa
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Segmento de Atuação
                </label>
                <input
                  type="text"
                  value={formData.segment}
                  onChange={e => setFormData({ ...formData, segment: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Personalidade
                </label>
                <select
                  value={formData.personality}
                  onChange={e => setFormData({ ...formData, personality: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                >
                  <option value="consultative">Consultivo (Explica e orienta)</option>
                  <option value="professional">Profissional & Direto</option>
                  <option value="warm">Acolhedor & Empático</option>
                  <option value="concise">Objetivo & Rápido</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tom de Voz e Estilo de Comunicação
              </label>
              <input
                type="text"
                value={formData.toneOfVoice}
                onChange={e => setFormData({ ...formData, toneOfVoice: e.target.value })}
                placeholder="Ex: Cordial, objetivo e educado. Sem gírias."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mensagem de Saudação Inicial
              </label>
              <textarea
                rows={2}
                value={formData.greetingMessage}
                onChange={e => setFormData({ ...formData, greetingMessage: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Custom Business Rules & Instructions */}
          <div className="space-y-4 pt-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Instruções e Regras da Empresa</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instruções Personalizadas de Atendimento
              </label>
              <p className="text-[11px] text-slate-500 mb-1.5">
                Explique à IA o que ela deve perguntar, como qualificar o cliente e o que enfatizar.
              </p>
              <textarea
                rows={4}
                value={formData.customInstructions}
                onChange={e => setFormData({ ...formData, customInstructions: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden font-mono"
              />
            </div>

            {/* Transfer Rules */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gatilhos de Transferência para Atendente Humano
              </label>
              <p className="text-[11px] text-slate-500 mb-1.5">
                Situações em que o robô deve pedir desculpas e passar imediatamente para um atendente de carne e osso.
              </p>
              <textarea
                rows={3}
                value={formData.transferRules.join('\n')}
                onChange={e => setFormData({ ...formData, transferRules: e.target.value.split('\n').filter(Boolean) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Anti-Hallucination Restrictions */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                <span>Restrições Inegociáveis & Salvaguardas Anti-Alucinação</span>
              </label>
              <textarea
                rows={3}
                value={formData.restrictions.join('\n')}
                onChange={e => setFormData({ ...formData, restrictions: e.target.value.split('\n').filter(Boolean) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Capabilities Toggles */}
          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Horários e Recursos Habilitados</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <input
                  type="checkbox"
                  checked={formData.sendProductPhotos}
                  onChange={e => setFormData({ ...formData, sendProductPhotos: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <div>
                  <div className="font-semibold text-slate-900">Envio de Fotos de Produtos</div>
                  <div className="text-[11px] text-slate-500">Anexa fotos reais cadastradas no catálogo</div>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <input
                  type="checkbox"
                  checked={formData.transcribeAudios}
                  onChange={e => setFormData({ ...formData, transcribeAudios: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <div>
                  <div className="font-semibold text-slate-900">Transcrição de Áudios</div>
                  <div className="text-[11px] text-slate-500">Processa mensagens de voz recebidas com IA</div>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Horário Oficial de Atendimento
              </label>
              <input
                type="text"
                value={formData.businessHours.weekdays}
                onChange={e => setFormData({
                  ...formData,
                  businessHours: { ...formData.businessHours, weekdays: e.target.value }
                })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Configurações do Agente</span>
            </button>
          </div>

        </form>

        {/* Right Column: Live Interactive Agent Simulator (Width: 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col h-[650px] sticky top-20">
          
          {/* Simulator Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Simulador de Teste Pré-Ativação
                </h3>
                <p className="text-[11px] text-slate-500">
                  Conectado ao Gemini 3.8 Flash com o catálogo da {activeOrg.name}
                </p>
              </div>
            </div>

            <button
              onClick={resetSimulator}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded transition-colors"
              title="Reiniciar simulador"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Catalog Grounding Indicator */}
          <div className="my-2 p-2 bg-blue-50/70 rounded-lg border border-blue-100 text-[11px] text-blue-900 flex items-center justify-between">
            <span>Catálogo ativo no contexto:</span>
            <span className="font-bold tabular-nums">{products.length} itens disponíveis</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-slate-50/60 rounded-lg border border-slate-100 my-2">
            {simulatorMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                  {msg.role === 'user' ? 'Você (Cliente Teste)' : formData.agentName}
                </span>

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.content}</p>

                  {/* If product references were returned */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                      {msg.products.map(p => (
                        <div key={p.id} className="flex items-center gap-2 p-1.5 rounded bg-slate-50 border border-slate-200 text-slate-800">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div className="text-[11px] truncate">
                            <div className="font-bold">{p.name}</div>
                            <div className="text-emerald-700 font-semibold tabular-nums">
                              R$ {p.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isSimulatorLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>O agente está formulando a resposta...</span>
              </div>
            )}
          </div>

          {/* Simulator Input Form */}
          <form onSubmit={handleSendSim} className="flex gap-2 pt-1">
            <input
              type="text"
              value={simInput}
              onChange={e => setSimInput(e.target.value)}
              placeholder="Digite uma pergunta para testar a IA..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={!simInput.trim() || isSimulatorLoading}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
