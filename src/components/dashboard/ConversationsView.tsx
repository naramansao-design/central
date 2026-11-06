import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Search,
  Bot,
  UserCheck,
  Send,
  Paperclip,
  Mic,
  Play,
  Pause,
  AlertCircle,
  Check,
  CheckCheck,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Tag,
  DollarSign,
  ChevronRight,
  Sliders,
  Image as ImageIcon,
  MessageSquare,
  Volume2
} from 'lucide-react';
import { Conversation, Message } from '../../types/index.ts';

export const ConversationsView: React.FC = () => {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    messages,
    sendMessage,
    simulateIncomingMessage,
    toggleAiForConversation,
    takeoverConversationHuman,
    updateConversationStatus,
    activeOrg,
    user,
    products,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'needs_human' | 'open' | 'ai_active'>('all');
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [simulateModalOpen, setSimulateModalOpen] = useState(false);
  const [simText, setSimText] = useState('');
  const [simAsAudio, setSimAsAudio] = useState(false);

  // Audio player simulation state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.contact.phone.includes(searchQuery) ||
      conv.contact.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterMode === 'needs_human') {
      return conv.status === 'needs_human' || !conv.aiActive;
    }
    if (filterMode === 'open') {
      return conv.status === 'open';
    }
    if (filterMode === 'ai_active') {
      return conv.aiActive;
    }
    return true;
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const text = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);
    await sendMessage(text, 'text');
    setIsSending(false);
  };

  const handleSimulateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simText.trim()) return;

    const text = simText.trim();
    const asAudio = simAsAudio;
    setSimulateModalOpen(false);
    setSimText('');
    setSimAsAudio(false);

    showToast(asAudio ? 'Simulando áudio recebido pelo WhatsApp...' : 'Simulando mensagem recebida pelo WhatsApp...');
    await simulateIncomingMessage(text, asAudio);
  };

  // Helper to get status icon for outgoing messages
  const renderMessageStatus = (status: Message['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3 text-slate-400" />;
      case 'sent':
        return <Check className="w-3 h-3 text-slate-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-slate-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      
      {/* 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ======================================================== */}
        {/* COLUMN 1: CONVERSATIONS LIST (Width: 320px)             */}
        {/* ======================================================== */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          
          {/* Header & Search */}
          <div className="p-3 border-b border-slate-200 space-y-2 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Caixa de Atendimento
              </h2>
              <button
                onClick={() => setSimulateModalOpen(true)}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded transition-colors"
                title="Simular cliente enviando mensagem ou áudio"
              >
                + Simular Mensagem
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, telefone ou tag..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pt-1">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'needs_human', label: 'Humano' },
                { id: 'open', label: 'Abertas' },
                { id: 'ai_active', label: 'IA Ativa' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterMode(f.id as any)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                    filterMode === f.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                Nenhuma conversa encontrada.
              </div>
            ) : (
              filteredConversations.map(conv => {
                const isSelected = conv.id === activeConversationId;
                const isNeedsHuman = conv.status === 'needs_human' || !conv.aiActive;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full p-3 text-left transition-colors flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-blue-50/80 border-l-3 border-blue-600'
                        : 'hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate max-w-[170px]">
                        {conv.contact.name}
                      </span>
                      <span className="text-[10px] text-slate-400 tabular-nums">
                        {new Date(conv.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate leading-relaxed">
                      {conv.lastMessage.type === 'audio' ? (
                        <span className="flex items-center gap-1 text-purple-600 font-medium">
                          <Mic className="w-3 h-3" />
                          <span>Áudio recebido ({conv.lastMessage.audioDurationSeconds || 24}s)</span>
                        </span>
                      ) : (
                        conv.lastMessage.content
                      )}
                    </p>

                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-slate-400 tabular-nums">
                        {conv.contact.phone}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {conv.aiActive ? (
                          <span className="flex items-center gap-1 text-blue-600 font-semibold">
                            <Bot className="w-3 h-3" />
                            <span>IA</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-600 font-semibold">
                            <UserCheck className="w-3 h-3" />
                            <span>Humano</span>
                          </span>
                        )}
                        {conv.unreadCount > 0 && (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[9px]">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* COLUMN 2: CHAT TIMELINE (Center)                         */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col bg-slate-100/50">
          {activeConversation ? (
            <>
              {/* Chat Top Banner */}
              <div className="h-14 px-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {activeConversation.contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">
                        {activeConversation.contact.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        {activeConversation.contact.phone}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Canal: <span className="font-medium text-slate-700">WhatsApp Oficial</span> · 
                      Status: <span className="font-medium text-slate-700 capitalize">{activeConversation.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* AI / Human Control Action Buttons */}
                <div className="flex items-center gap-2">
                  {activeConversation.aiActive ? (
                    <button
                      onClick={() => toggleAiForConversation(activeConversation.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                      title="Pausar o agente inteligente para este cliente"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pausar IA</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleAiForConversation(activeConversation.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                      title="Reativar atendimento pelo agente de IA"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Ativar IA</span>
                    </button>
                  )}

                  <button
                    onClick={() => takeoverConversationHuman(activeConversation.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                    title="Assumir o atendimento como atendente humano"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Assumir Atendimento</span>
                  </button>
                </div>
              </div>

              {/* Messages Timeline */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => {
                  const isCustomer = msg.sender === 'customer';
                  const isAi = msg.sender === 'ai';
                  const isHuman = msg.sender === 'human_attendant';
                  const isSystem = msg.sender === 'system';

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="inline-block px-3 py-1 text-[11px] font-medium text-slate-500 bg-slate-200/60 rounded-md">
                          {msg.content}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                    >
                      {/* Sender label */}
                      <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                        {isCustomer ? activeConversation.contact.name : isAi ? 'IA (Assistente Virtual)' : msg.senderName || 'Atendente'}
                      </span>

                      {/* Bubble */}
                      <div
                        className={`max-w-[75%] rounded-2xl p-3 shadow-2xs text-xs leading-relaxed ${
                          isCustomer
                            ? 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                            : isAi
                            ? 'bg-blue-600 text-white rounded-br-xs'
                            : 'bg-slate-900 text-white rounded-br-xs'
                        }`}
                      >
                        {/* Audio message presentation */}
                        {msg.type === 'audio' ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 pb-1 border-b border-slate-200/40">
                              <button
                                onClick={() => setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                  isCustomer ? 'bg-purple-100 text-purple-700' : 'bg-white/20 text-white'
                                }`}
                              >
                                {playingAudioId === msg.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                              </button>
                              <div className="flex-1">
                                <div className="text-[11px] font-semibold">
                                  Mensagem de Áudio ({msg.audioDurationSeconds || 24}s)
                                </div>
                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                                  <div className={`h-full ${playingAudioId === msg.id ? 'w-3/4 bg-purple-600 animate-pulse' : 'w-1/3 bg-slate-400'}`}></div>
                                </div>
                              </div>
                            </div>

                            {msg.audioTranscription && (
                              <div className="text-[11px] bg-slate-50/80 p-2 rounded text-slate-700 border border-slate-200/50">
                                <span className="font-bold text-slate-900 block mb-0.5 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-purple-600" />
                                  <span>Transcrição Automática por IA:</span>
                                </span>
                                "{msg.audioTranscription}"
                              </div>
                            )}
                          </div>
                        ) : (
                          <p>{msg.content}</p>
                        )}

                        {/* Product attachments preview */}
                        {msg.productReferences && msg.productReferences.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-white/20 space-y-1.5">
                            {msg.productReferences.map(pid => {
                              const prod = products.find(p => p.id === pid);
                              if (!prod) return null;
                              return (
                                <div key={pid} className="flex items-center gap-2 p-1.5 rounded bg-white/10 text-white">
                                  <img
                                    src={prod.imageUrl}
                                    alt={prod.name}
                                    referrerPolicy="no-referrer"
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                  <div className="min-w-0 flex-1 text-[11px]">
                                    <div className="font-semibold truncate">{prod.name}</div>
                                    <div className="text-white/80 tabular-nums">R$ {prod.price.toFixed(2)}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Metadata / Time / Status */}
                        <div
                          className={`flex items-center justify-end gap-1.5 mt-1.5 text-[10px] ${
                            isCustomer ? 'text-slate-400' : 'text-white/70'
                          }`}
                        >
                          <span className="tabular-nums">
                            {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {!isCustomer && renderMessageStatus(msg.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Digite uma mensagem manual para o cliente no WhatsApp..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isSending}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors shadow-xs"
                    title="Enviar mensagem"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>Mensagens manuais pausam a IA nesta conversa para evitar respostas simultâneas.</span>
                  <span>WhatsApp Cloud API Conectada</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <MessageSquare className="w-10 h-10 mb-2 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">Nenhuma conversa selecionada</p>
              <p className="text-xs">Escolha um contato na coluna à esquerda para iniciar o atendimento.</p>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* COLUMN 3: CONTACT & CRM DETAILS (Right: 280px)           */}
        {/* ======================================================== */}
        {activeConversation && (
          <div className="w-72 border-l border-slate-200 bg-white p-4 overflow-y-auto space-y-5">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Dados do Contato
              </h3>

              <div className="text-center pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold text-base flex items-center justify-center mx-auto mb-2">
                  {activeConversation.contact.name.slice(0, 2).toUpperCase()}
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {activeConversation.contact.name}
                </h4>
                <div className="text-xs text-slate-500 tabular-nums">
                  {activeConversation.contact.phone}
                </div>
                {activeConversation.contact.email && (
                  <div className="text-xs text-slate-400">
                    {activeConversation.contact.email}
                  </div>
                )}
              </div>
            </div>

            {/* Stage in CRM */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Etapa no CRM
              </label>
              <select
                value={activeConversation.contact.stage}
                onChange={e => {
                  activeConversation.contact.stage = e.target.value as any;
                  showToast('Etapa do CRM atualizada.');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
              >
                <option value="lead">1. Novo Contato (Lead)</option>
                <option value="in_service">2. Em Atendimento</option>
                <option value="negotiation">3. Em Negociação</option>
                <option value="proposal_sent">4. Orçamento Enviado</option>
                <option value="won">5. Venda Concluída</option>
                <option value="lost">6. Perdido</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tags do Cliente
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activeConversation.contact.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Deal Value */}
            {activeConversation.contact.dealValue !== undefined && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-[11px] text-emerald-800 font-medium">
                  Valor Estimado da Oportunidade:
                </div>
                <div className="text-lg font-bold text-emerald-700 font-display tabular-nums">
                  R$ {activeConversation.contact.dealValue.toFixed(2)}
                </div>
              </div>
            )}

            {/* Internal Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notas Internas da Equipe
              </label>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                {activeConversation.contact.notes || 'Sem observações cadastradas para este contato.'}
              </p>
            </div>

            {/* Opt-in / LGPD status */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
              <div>Consentimento LGPD: <span className="text-emerald-600 font-semibold">Confirmado</span></div>
              <div>Janela de 24h Meta: <span className="text-slate-600">Aberta</span></div>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Simular Mensagem do Cliente */}
      {simulateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Simular Mensagem de Cliente via WhatsApp
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Envie uma mensagem fictícia para testar como o motor da Central IA processa textos e mensagens de voz em tempo real.
            </p>

            <form onSubmit={handleSimulateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Texto da Mensagem ou Conteúdo do Áudio *
                </label>
                <textarea
                  required
                  rows={3}
                  value={simText}
                  onChange={e => setSimText(e.target.value)}
                  placeholder="Ex: Boa tarde, vocês têm pastilha de freio para Civic 2021?"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={simAsAudio}
                    onChange={e => setSimAsAudio(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Simular como Mensagem de Áudio (dispara transcrição IA)</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSimulateModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  Simular Recebimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
