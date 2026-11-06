import React, { createContext, useContext, useState } from 'react';
import {
  Organization,
  UserProfile,
  Contact,
  Conversation,
  Message,
  Product,
  AgentSettings,
  Deal,
  AutomationRule,
  UsageLedger,
  AuditLog
} from '../types/index.ts';
import {
  initialUser,
  initialOrganizations,
  initialAgentSettings,
  initialProducts,
  initialContacts,
  initialConversations,
  initialMessages,
  initialDeals,
  initialAutomations,
  initialUsage,
  initialAuditLogs
} from '../data/mockDatabase.ts';

export type PublicView = 'landing' | 'agent-showcase' | 'websites' | 'pricing';
export type DashboardTab = 
  | 'overview' 
  | 'conversations' 
  | 'agent' 
  | 'products' 
  | 'crm' 
  | 'automations' 
  | 'whatsapp' 
  | 'usage' 
  | 'settings';

interface AppContextType {
  // Navigation
  currentView: PublicView | 'dashboard';
  setCurrentView: (view: PublicView | 'dashboard') => void;
  dashboardTab: DashboardTab;
  setDashboardTab: (tab: DashboardTab) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // User & Organizations (Multi-tenant)
  user: UserProfile;
  organizations: Organization[];
  activeOrg: Organization;
  switchOrganization: (orgId: string) => void;
  createNewOrganization: (name: string, segment: string) => void;

  // Conversations & Chat
  conversations: Conversation[];
  activeConversation: Conversation | null;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  messages: Message[];
  sendMessage: (content: string, type?: 'text' | 'image' | 'audio', mediaUrl?: string) => Promise<void>;
  simulateIncomingMessage: (customerText: string, asAudio?: boolean) => Promise<void>;
  toggleAiForConversation: (conversationId: string) => void;
  takeoverConversationHuman: (conversationId: string) => void;
  updateConversationStatus: (conversationId: string, status: Conversation['status']) => void;

  // Products & Services
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'organizationId'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Agent Settings & Simulator
  agentSettings: AgentSettings;
  updateAgentSettings: (settings: Partial<AgentSettings>) => void;
  simulatorMessages: { role: 'user' | 'assistant'; content: string; time: string; products?: Product[] }[];
  isSimulatorLoading: boolean;
  sendSimulatorMessage: (text: string) => Promise<void>;
  resetSimulator: () => void;

  // CRM Deals
  deals: Deal[];
  updateDealStage: (dealId: string, newStage: Deal['stage']) => void;
  createDeal: (deal: Omit<Deal, 'id' | 'organizationId' | 'createdAt'>) => void;

  // Automations
  automations: AutomationRule[];
  toggleAutomation: (ruleId: string) => void;

  // Usage & Audits
  usage: UsageLedger;
  auditLogs: AuditLog[];

  // Toast / System notice
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Views
  const [currentView, setCurrentView] = useState<PublicView | 'dashboard'>('landing');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // User & Multi-tenant State
  const [user] = useState<UserProfile>(initialUser);
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [activeOrgId, setActiveOrgId] = useState<string>('org-precision');

  const activeOrg = organizations.find(o => o.id === activeOrgId) || organizations[0];

  // Multi-tenant database states scoped by organization
  const [allAgentSettings, setAllAgentSettings] = useState(initialAgentSettings);
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [allConversations, setAllConversations] = useState(initialConversations);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const [allDeals, setAllDeals] = useState(initialDeals);
  const [allAutomations, setAllAutomations] = useState(initialAutomations);
  const [allUsage, setAllUsage] = useState(initialUsage);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  // Active items for current organization
  const conversations = allConversations[activeOrgId] || [];
  const products = allProducts[activeOrgId] || [];
  const deals = allDeals[activeOrgId] || [];
  const automations = allAutomations[activeOrgId] || [];
  const usage = allUsage[activeOrgId] || {
    organizationId: activeOrgId,
    currentPeriod: 'Novembro / 2026',
    planMonthlyFee: 200,
    messagesSent: 0,
    messagesQuota: 2000,
    aiTokensUsed: 0,
    aiTokensQuota: 500000,
    audioTranscriptionsCount: 0,
    estimatedExtraCost: 0,
    costBreakdown: { platformBase: 200, whatsappApiCost: 0, aiUsageCost: 0 }
  };
  const agentSettings = allAgentSettings[activeOrgId] || initialAgentSettings['org-precision'];

  // Active Conversation in Inbox
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    conversations[0]?.id || null
  );

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;
  const messages = activeConversationId ? (allMessages[activeConversationId] || []) : [];

  // Agent Simulator State
  const [simulatorMessages, setSimulatorMessages] = useState<{ role: 'user' | 'assistant'; content: string; time: string; products?: Product[] }[]>([
    {
      role: 'assistant',
      content: agentSettings.greetingMessage,
      time: 'Agora'
    }
  ]);
  const [isSimulatorLoading, setIsSimulatorLoading] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch active organization (Full Multi-Tenant separation)
  const switchOrganization = (orgId: string) => {
    const target = organizations.find(o => o.id === orgId);
    if (target) {
      setActiveOrgId(orgId);
      const targetConvs = allConversations[orgId] || [];
      setActiveConversationId(targetConvs[0]?.id || null);
      
      const targetAgent = allAgentSettings[orgId] || initialAgentSettings['org-precision'];
      setSimulatorMessages([
        {
          role: 'assistant',
          content: targetAgent.greetingMessage,
          time: 'Agora'
        }
      ]);
      showToast(`Empresa alternada para: ${target.name}`);
    }
  };

  // Create new organization
  const createNewOrganization = (name: string, segment: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newId = `org-${Date.now()}`;
    const newOrg: Organization = {
      id: newId,
      name,
      slug,
      segment,
      plan: 'essencial',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      whatsappStatus: 'pending'
    };

    setOrganizations(prev => [...prev, newOrg]);
    
    // Initialize empty records for new tenant
    setAllAgentSettings(prev => ({
      ...prev,
      [newId]: {
        organizationId: newId,
        agentName: `Assistente ${name}`,
        businessName: name,
        segment,
        personality: 'professional',
        toneOfVoice: 'Cordial, prestativo e profissional.',
        greetingMessage: `Olá! Bem-vindo(a) à ${name}. Como posso te ajudar hoje?`,
        businessHours: {
          enabled: true,
          weekdays: 'Segunda a Sexta das 08h às 18h',
          hours: '08:00 - 18:00',
          outOfHoursMessage: 'Recebemos sua mensagem fora do nosso horário de atendimento e responderemos em breve!'
        },
        customInstructions: `Atenda aos clientes da ${name} tirando dúvidas e apresentando produtos do catálogo.`,
        transferRules: ['Cliente pede atendente humano'],
        restrictions: ['Nunca invente preços ou prazos.'],
        active: true,
        sendProductPhotos: true,
        transcribeAudios: true
      }
    }));

    setAllProducts(prev => ({ ...prev, [newId]: [] }));
    setAllConversations(prev => ({ ...prev, [newId]: [] }));
    setAllDeals(prev => ({ ...prev, [newId]: [] }));
    setAllAutomations(prev => ({ ...prev, [newId]: [] }));
    setAllUsage(prev => ({
      ...prev,
      [newId]: {
        organizationId: newId,
        currentPeriod: 'Novembro / 2026',
        planMonthlyFee: 200,
        messagesSent: 0,
        messagesQuota: 2000,
        aiTokensUsed: 0,
        aiTokensQuota: 500000,
        audioTranscriptionsCount: 0,
        estimatedExtraCost: 0,
        costBreakdown: { platformBase: 200, whatsappApiCost: 0, aiUsageCost: 0 }
      }
    }));

    setActiveOrgId(newId);
    showToast(`Empresa "${name}" criada com sucesso!`);
  };

  // Send message in current conversation
  const sendMessage = async (content: string, type: 'text' | 'image' | 'audio' = 'text', mediaUrl?: string) => {
    if (!activeConversationId) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      organizationId: activeOrgId,
      sender: 'human_attendant',
      senderName: user.name,
      type,
      content,
      mediaUrl,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setAllMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMsg]
    }));

    // Update conversation lastMessage and timestamp
    setAllConversations(prev => {
      const orgConvs = prev[activeOrgId] || [];
      const updated = orgConvs.map(c => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            lastMessage: newMsg,
            updatedAt: newMsg.timestamp,
            // If human attendant answered, disable AI for this specific thread
            aiActive: false
          };
        }
        return c;
      });
      return { ...prev, [activeOrgId]: updated };
    });

    // Record audit log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      organizationId: activeOrgId,
      timestamp: new Date().toISOString(),
      userEmail: user.email,
      action: 'HUMAN_MESSAGE_SENT',
      details: `Mensagem enviada por ${user.name} na conversa ${activeConversationId}`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Simulate WhatsApp delivery status change after 500ms
    setTimeout(() => {
      setAllMessages(prev => {
        const convMsgs = prev[activeConversationId] || [];
        return {
          ...prev,
          [activeConversationId]: convMsgs.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)
        };
      });
    }, 600);
  };

  // Simulate an incoming customer WhatsApp message and trigger AI engine
  const simulateIncomingMessage = async (customerText: string, asAudio = false) => {
    if (!activeConversationId || !activeConversation) return;

    const convId = activeConversationId;
    const customerMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      organizationId: activeOrgId,
      sender: 'customer',
      senderName: activeConversation.contact.name,
      type: asAudio ? 'audio' : 'text',
      content: asAudio ? '[Mensagem de Áudio: 18s]' : customerText,
      audioDurationSeconds: asAudio ? 18 : undefined,
      audioTranscription: asAudio ? customerText : undefined,
      timestamp: new Date().toISOString(),
      status: 'delivered'
    };

    setAllMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), customerMsg]
    }));

    setAllConversations(prev => {
      const orgConvs = prev[activeOrgId] || [];
      return {
        ...prev,
        [activeOrgId]: orgConvs.map(c => c.id === convId ? { ...c, lastMessage: customerMsg, updatedAt: customerMsg.timestamp } : c)
      };
    });

    // If AI is active on this conversation, invoke server-side Gemini
    if (activeConversation.aiActive) {
      try {
        const response = await fetch('/api/ai/agent-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: customerText,
            conversationHistory: allMessages[convId] || [],
            agentSettings,
            catalogProducts: products,
            customerName: activeConversation.contact.name
          })
        });

        const data = await response.json();
        const aiReply = data.reply || 'Olá! Como posso ajudar você hoje?';

        const aiMsg: Message = {
          id: `msg-ai-${Date.now()}`,
          conversationId: convId,
          organizationId: activeOrgId,
          sender: 'ai',
          senderName: `${agentSettings.agentName} (IA)`,
          type: 'text',
          content: aiReply,
          timestamp: new Date().toISOString(),
          status: 'delivered',
          productReferences: (data.suggestedProducts || []).map((p: any) => p.id),
          aiMetadata: {
            model: 'gemini-3.8-flash',
            latencyMs: data.latencyMs,
            tokensUsed: data.tokensUsed
          }
        };

        setAllMessages(prev => ({
          ...prev,
          [convId]: [...(prev[convId] || []), aiMsg]
        }));

        setAllConversations(prev => {
          const orgConvs = prev[activeOrgId] || [];
          return {
            ...prev,
            [activeOrgId]: orgConvs.map(c => {
              if (c.id === convId) {
                return {
                  ...c,
                  lastMessage: aiMsg,
                  status: data.shouldTransferToHuman ? 'needs_human' : c.status,
                  aiActive: data.shouldTransferToHuman ? false : c.aiActive,
                  updatedAt: aiMsg.timestamp
                };
              }
              return c;
            })
          };
        });

        // Update usage ledger
        setAllUsage(prev => {
          const current = prev[activeOrgId];
          if (!current) return prev;
          return {
            ...prev,
            [activeOrgId]: {
              ...current,
              messagesSent: current.messagesSent + 1,
              aiTokensUsed: current.aiTokensUsed + (data.tokensUsed || 300)
            }
          };
        });

      } catch (err) {
        console.error('Failed to get AI reply:', err);
      }
    }
  };

  // Toggle AI on/off for conversation
  const toggleAiForConversation = (conversationId: string) => {
    setAllConversations(prev => {
      const orgConvs = prev[activeOrgId] || [];
      return {
        ...prev,
        [activeOrgId]: orgConvs.map(c => {
          if (c.id === conversationId) {
            const nextState = !c.aiActive;
            showToast(nextState ? 'IA ativada nesta conversa.' : 'IA pausada. Atendimento sob controle manual.');
            return { ...c, aiActive: nextState, status: nextState ? 'open' : 'needs_human' };
          }
          return c;
        })
      };
    });
  };

  // Human Takeover
  const takeoverConversationHuman = (conversationId: string) => {
    setAllConversations(prev => {
      const orgConvs = prev[activeOrgId] || [];
      return {
        ...prev,
        [activeOrgId]: orgConvs.map(c => {
          if (c.id === conversationId) {
            showToast(`Você assumiu o atendimento de ${c.contact.name}.`);
            return {
              ...c,
              aiActive: false,
              assignedTo: user.name,
              status: 'open'
            };
          }
          return c;
        })
      };
    });

    const sysMsg: Message = {
      id: `msg-sys-${Date.now()}`,
      conversationId,
      organizationId: activeOrgId,
      sender: 'system',
      type: 'text',
      content: `Atendimento assumido pelo atendente humano: ${user.name}. A IA foi pausada automaticamente.`,
      timestamp: new Date().toISOString(),
      status: 'read'
    };

    setAllMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), sysMsg]
    }));
  };

  // Update conversation status
  const updateConversationStatus = (conversationId: string, status: Conversation['status']) => {
    setAllConversations(prev => {
      const orgConvs = prev[activeOrgId] || [];
      return {
        ...prev,
        [activeOrgId]: orgConvs.map(c => c.id === conversationId ? { ...c, status } : c)
      };
    });
    showToast('Status da conversa atualizado.');
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'organizationId'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      organizationId: activeOrgId
    };
    setAllProducts(prev => ({
      ...prev,
      [activeOrgId]: [newProduct, ...(prev[activeOrgId] || [])]
    }));
    showToast(`Produto "${newProduct.name}" adicionado ao catálogo!`);
  };

  const updateProduct = (updated: Product) => {
    setAllProducts(prev => ({
      ...prev,
      [activeOrgId]: (prev[activeOrgId] || []).map(p => p.id === updated.id ? updated : p)
    }));
    showToast(`Produto "${updated.name}" atualizado.`);
  };

  const deleteProduct = (productId: string) => {
    setAllProducts(prev => ({
      ...prev,
      [activeOrgId]: (prev[activeOrgId] || []).filter(p => p.id !== productId)
    }));
    showToast('Produto removido do catálogo.');
  };

  // Agent Settings
  const updateAgentSettings = (updated: Partial<AgentSettings>) => {
    setAllAgentSettings(prev => ({
      ...prev,
      [activeOrgId]: { ...prev[activeOrgId], ...updated }
    }));
    showToast('Configurações do agente salvas com sucesso!');
  };

  // Agent Simulator
  const sendSimulatorMessage = async (text: string) => {
    if (!text.trim() || isSimulatorLoading) return;

    const userMsg = {
      role: 'user' as const,
      content: text,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setSimulatorMessages(prev => [...prev, userMsg]);
    setIsSimulatorLoading(true);

    try {
      const response = await fetch('/api/ai/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: simulatorMessages.map(m => ({
            sender: m.role === 'user' ? 'customer' : 'ai',
            content: m.content
          })),
          agentSettings,
          catalogProducts: products,
          customerName: 'Cliente Teste'
        })
      });

      const data = await response.json();
      const assistantMsg = {
        role: 'assistant' as const,
        content: data.reply || 'Olá! Sou seu assistente virtual. Como posso ajudar?',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        products: data.suggestedProducts
      };

      setSimulatorMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setSimulatorMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpe, ocorreu uma instabilidade momentânea na conexão com o modelo de IA. Verifique sua chave ou tente novamente.',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSimulatorLoading(false);
    }
  };

  const resetSimulator = () => {
    setSimulatorMessages([
      {
        role: 'assistant',
        content: agentSettings.greetingMessage,
        time: 'Agora'
      }
    ]);
    showToast('Simulador de agente reiniciado.');
  };

  // CRM Deal Stage Change
  const updateDealStage = (dealId: string, newStage: Deal['stage']) => {
    setAllDeals(prev => {
      const orgDeals = prev[activeOrgId] || [];
      return {
        ...prev,
        [activeOrgId]: orgDeals.map(d => d.id === dealId ? { ...d, stage: newStage } : d)
      };
    });
  };

  const createDeal = (dealData: Omit<Deal, 'id' | 'organizationId' | 'createdAt'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      organizationId: activeOrgId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAllDeals(prev => ({
      ...prev,
      [activeOrgId]: [newDeal, ...(prev[activeOrgId] || [])]
    }));
    showToast(`Oportunidade "${newDeal.title}" criada no CRM!`);
  };

  // Automations Toggle
  const toggleAutomation = (ruleId: string) => {
    setAllAutomations(prev => {
      const orgAutos = prev[activeOrgId] || [];
      return {
        ...prev,
        [activeOrgId]: orgAutos.map(a => a.id === ruleId ? { ...a, enabled: !a.enabled } : a)
      };
    });
    showToast('Regra de automação atualizada.');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        dashboardTab,
        setDashboardTab,
        authModalOpen,
        setAuthModalOpen,
        user,
        organizations,
        activeOrg,
        switchOrganization,
        createNewOrganization,
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
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        agentSettings,
        updateAgentSettings,
        simulatorMessages,
        isSimulatorLoading,
        sendSimulatorMessage,
        resetSimulator,
        deals,
        updateDealStage,
        createDeal,
        automations,
        toggleAutomation,
        usage,
        auditLogs,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
