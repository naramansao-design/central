export type UserRole = 'owner' | 'admin' | 'attendant' | 'supervisor';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  phone?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  segment: string;
  document?: string; // CNPJ
  plan: 'essencial' | 'pro' | 'enterprise';
  createdAt: string;
  status: 'active' | 'trial' | 'suspended';
  whatsappNumber?: string;
  whatsappStatus: 'connected' | 'disconnected' | 'pending';
}

export interface Membership {
  id: string;
  organizationId: string;
  userId: string;
  role: UserRole;
}

export interface Contact {
  id: string;
  organizationId: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  tags: string[];
  notes?: string;
  stage: 'lead' | 'in_service' | 'negotiation' | 'proposal_sent' | 'won' | 'lost';
  dealValue?: number;
  lastInteraction: string;
  assignedAttendantId?: string;
  consentOptIn: boolean;
  optInDate?: string;
}

export type MessageType = 'text' | 'image' | 'audio' | 'document' | 'interactive';
export type MessageSender = 'customer' | 'ai' | 'human_attendant' | 'system';
export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
  id: string;
  conversationId: string;
  organizationId: string;
  sender: MessageSender;
  senderName?: string;
  type: MessageType;
  content: string;
  mediaUrl?: string;
  mediaCaption?: string;
  audioDurationSeconds?: number;
  audioTranscription?: string;
  timestamp: string;
  status: MessageStatus;
  productReferences?: string[]; // IDs of products mentioned or shown
  aiMetadata?: {
    model: string;
    tokensUsed?: number;
    latencyMs?: number;
    confidence?: number;
  };
}

export interface Conversation {
  id: string;
  organizationId: string;
  contactId: string;
  contact: Contact;
  status: 'open' | 'closed' | 'waiting_customer' | 'needs_human';
  aiActive: boolean;
  assignedTo?: string; // Attendant Name/ID
  unreadCount: number;
  lastMessage: Message;
  updatedAt: string;
  channel: 'whatsapp_official' | 'web_simulator';
}

export interface Product {
  id: string;
  organizationId: string;
  name: string;
  sku?: string;
  category: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  imageUrl: string;
  inStock: boolean;
  stockQuantity?: number;
  active: boolean;
  variations?: string[];
  keySpecs?: Record<string, string>;
}

export interface AgentSettings {
  organizationId: string;
  agentName: string;
  businessName: string;
  segment: string;
  personality: 'professional' | 'warm' | 'consultative' | 'concise';
  toneOfVoice: string;
  greetingMessage: string;
  businessHours: {
    enabled: boolean;
    weekdays: string;
    hours: string;
    outOfHoursMessage: string;
  };
  customInstructions: string;
  transferRules: string[];
  restrictions: string[]; // Anti-hallucination, no unlisted discounts, etc.
  active: boolean;
  sendProductPhotos: boolean;
  transcribeAudios: boolean;
}

export interface Deal {
  id: string;
  organizationId: string;
  contactId: string;
  title: string;
  value: number;
  stage: 'lead' | 'in_service' | 'negotiation' | 'proposal_sent' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  expectedCloseDate?: string;
  notes?: string;
}

export interface AutomationRule {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  trigger: 'first_message' | 'inactive_24h' | 'quote_sent' | 'deal_won';
  action: 'assign_agent' | 'send_followup' | 'update_stage' | 'notify_team';
  actionDetails: string;
  enabled: boolean;
  executionCount: number;
}

export interface UsageLedger {
  organizationId: string;
  currentPeriod: string; // e.g. "Novembro/2026"
  planMonthlyFee: number;
  messagesSent: number;
  messagesQuota: number;
  aiTokensUsed: number;
  aiTokensQuota: number;
  audioTranscriptionsCount: number;
  estimatedExtraCost: number;
  costBreakdown: {
    platformBase: number;
    whatsappApiCost: number; // Meta pass-through
    aiUsageCost: number;
  };
}

export interface AuditLog {
  id: string;
  organizationId: string;
  timestamp: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress?: string;
}
