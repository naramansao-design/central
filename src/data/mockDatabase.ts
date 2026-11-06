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

// User Profile (logged-in entrepreneur)
export const initialUser: UserProfile = {
  id: 'usr-001',
  name: 'Rodrigo Medeiros',
  email: 'rodrigo@precisionauto.com.br',
  role: 'owner',
  phone: '+55 11 98765-4321',
  avatarUrl: '/src/assets/images/avatar_ia_specialist_1793814570843.jpg'
};

// Available Multi-Tenant Organizations
export const initialOrganizations: Organization[] = [
  {
    id: 'org-precision',
    name: 'Precision Auto Center',
    slug: 'precision-auto',
    segment: 'Oficina Mecânica & Autopeças',
    document: '42.189.901/0001-44',
    plan: 'essencial',
    createdAt: '2026-08-15',
    status: 'active',
    whatsappNumber: '+55 11 94002-8922',
    whatsappStatus: 'connected'
  },
  {
    id: 'org-marcella',
    name: 'Dra. Marcella Estética',
    slug: 'marcella-estetica',
    segment: 'Clínica de Estética & Skincare',
    document: '38.992.100/0001-08',
    plan: 'essencial',
    createdAt: '2026-09-01',
    status: 'active',
    whatsappNumber: '+55 19 99881-2244',
    whatsappStatus: 'connected'
  },
  {
    id: 'org-graonobre',
    name: 'Grão Nobre Empório & Café',
    slug: 'grao-nobre',
    segment: 'Cafés Especiais & Empório',
    document: '51.340.812/0001-92',
    plan: 'essencial',
    createdAt: '2026-10-10',
    status: 'active',
    whatsappNumber: '+55 41 99123-7766',
    whatsappStatus: 'connected'
  }
];

// Agent configurations per Organization
export const initialAgentSettings: Record<string, AgentSettings> = {
  'org-precision': {
    organizationId: 'org-precision',
    agentName: 'Apolo (Assistente Precision)',
    businessName: 'Precision Auto Center',
    segment: 'Oficina Mecânica & Autopeças',
    personality: 'consultative',
    toneOfVoice: 'Cordial, técnico e direto ao ponto. Explica serviços com clareza sem jargões confusos.',
    greetingMessage: 'Olá! Sou o Apolo, assistente virtual da Precision Auto Center. Como posso ajudar com seu veículo hoje?',
    businessHours: {
      enabled: true,
      weekdays: 'Segunda a Sexta das 08h às 18h | Sábados das 08h às 12h',
      hours: '08:00 - 18:00',
      outOfHoursMessage: 'Recebemos sua mensagem fora do nosso horário de oficina. Já anotei sua solicitação e nossa equipe técnica responderá no primeiro horário útil!'
    },
    customInstructions: `Você é o atendente de vendas e orçamentos da Precision Auto Center.
Você deve SEMPRE consultar o catálogo cadastrado antes de informar preços.
Caso o cliente pergunte sobre serviços que dependem de diagnóstico prévio (como barulho no motor ou câmbio), explique que é necessária avaliação presencial gratuita.
Sempre identifique o modelo, ano e motorização do veículo para orçamentos de peças.
Quando o cliente demonstrar urgência ou solicitar desconto não autorizado, informe educadamente que você irá transferir para nosso consultor humano responsável.`,
    transferRules: [
      'Cliente solicita desconto maior que o anunciado',
      'Cliente relata insatisfação ou reclamação de serviço anterior',
      'Cliente pede para falar com gerente ou mecânico chefe',
      'Dúvidas sobre garantia de serviços executados há mais de 30 dias'
    ],
    restrictions: [
      'NUNCA invente preços de serviços ou peças que não estão no catálogo.',
      'NUNCA prometa prazos de entrega inferiores a 4 horas sem confirmação do chefe de oficina.',
      'NUNCA forneça dados bancários pessoais; apenas chave Pix oficial da empresa.',
      'Sempre se identifique como assistente virtual.'
    ],
    active: true,
    sendProductPhotos: true,
    transcribeAudios: true
  },
  'org-marcella': {
    organizationId: 'org-marcella',
    agentName: 'Sofia (Atendente Dra. Marcella)',
    businessName: 'Dra. Marcella Estética',
    segment: 'Clínica de Estética & Skincare',
    personality: 'warm',
    toneOfVoice: 'Acolhedora, elegante, atenciosa e esclarecedora.',
    greetingMessage: 'Olá! Sou a Sofia, assistente virtual da Dra. Marcella Estética. É um prazer falar com você! Como posso cuidar do seu bem-estar hoje?',
    businessHours: {
      enabled: true,
      weekdays: 'Segunda a Sexta das 09h às 19h | Sábado das 09h às 14h',
      hours: '09:00 - 19:00',
      outOfHoursMessage: 'Agradecemos o contato! Nossa clínica está fechada no momento, mas deixamos seu horário pré-registrado na fila de agendamento.'
    },
    customInstructions: `Você atende clientes interessados em procedimentos estéticos faciais e corporais e produtos da linha homecare da Dra. Marcella.
Explique os benefícios de cada procedimento e consulte os valores do catálogo.
Recomende sempre uma consulta de avaliação facial prévia com a Dra. Marcella para indicar o plano ideal.`,
    transferRules: [
      'Dúvidas médicas pós-operatórias ou pós-procedimento imediato',
      'Casos de intercorrências ou alergias',
      'Negociação de pacotes anuais'
    ],
    restrictions: [
      'NUNCA prescreva medicamentos controlados.',
      'NUNCA garanta resultados estéticos sem avaliação clínica presencial.',
      'Não altere valores de protocolos sem autorização da coordenação.'
    ],
    active: true,
    sendProductPhotos: true,
    transcribeAudios: true
  },
  'org-graonobre': {
    organizationId: 'org-graonobre',
    agentName: 'Barista Virtual Grão Nobre',
    businessName: 'Grão Nobre Empório & Café',
    segment: 'Cafés Especiais & Empório',
    personality: 'professional',
    toneOfVoice: 'Apaixonado por café, prestativo e detalhista nas notas sensoriais.',
    greetingMessage: 'Olá, amante de café! Bem-vindo ao Grão Nobre. Sou o Barista Virtual. Procurando um café especial ou método de preparo?',
    businessHours: {
      enabled: true,
      weekdays: 'Segunda a Sábado das 08h às 20h',
      hours: '08:00 - 20:00',
      outOfHoursMessage: 'Nosso empório está descansando agora. Os pedidos feitos fora de hora serão processados às 08h do próximo dia!'
    },
    customInstructions: `Auxilie o cliente a escolher o grão ideal com base nas notas sensoriais (frutado, achocolatado, floral) e método de preparo (filtrado, espresso, prensa francesa). Ofereça fotos dos pacotes e moagem sob medida.`,
    transferRules: [
      'Pedidos corporativos acima de 20kg',
      'Eventos e degustações guiadas'
    ],
    restrictions: [
      'Não prometa frete grátis fora das regras do site.',
      'Informe sempre a data da torra fresca indicada no catálogo.'
    ],
    active: true,
    sendProductPhotos: true,
    transcribeAudios: true
  }
};

// Products per Organization
export const initialProducts: Record<string, Product[]> = {
  'org-precision': [
    {
      id: 'prod-p1',
      organizationId: 'org-precision',
      name: 'Troca de Óleo 5W30 Sintético + Filtro de Óleo',
      sku: 'SRV-OLEO-5W30',
      category: 'Serviços Preventivos',
      description: 'Troca completa com 4 litros de lubrificante 100% sintético API SP e filtro de óleo original. Inclui check-up de 21 itens de segurança.',
      price: 289.00,
      promotionalPrice: 249.00,
      imageUrl: '/src/assets/images/central_ia_hero_mockup_1793814568875.jpg',
      inStock: true,
      stockQuantity: 45,
      active: true,
      variations: ['4 Litros (Padrão)', '5 Litros (Motores maiores)'],
      keySpecs: {
        'Tempo estimado': '45 minutos',
        'Garantia': '3 meses ou 10.000 km',
        'Viscosidade': '5W30 Sintético'
      }
    },
    {
      id: 'prod-p2',
      organizationId: 'org-precision',
      name: 'Pastilhas de Freio Cerâmica Dianteiras (Par)',
      sku: 'PEC-FREIO-CER-01',
      category: 'Freios e Suspensão',
      description: 'Pastilhas cerâmicas de alta durabilidade, frenagem silenciosa e sem acúmulo de fuligem nas rodas. Instalação com mão de obra inclusa.',
      price: 360.00,
      imageUrl: '/src/assets/images/central_ia_hero_mockup_1793814568875.jpg',
      inStock: true,
      stockQuantity: 14,
      active: true,
      variations: ['Aro 14-15', 'Aro 16-18'],
      keySpecs: {
        'Material': 'Composto cerâmico premium',
        'Ruído': 'Zero ruído com placa anti-vibração'
      }
    },
    {
      id: 'prod-p3',
      organizationId: 'org-precision',
      name: 'Alinhamento 3D Computadorizado + Balanceamento 4 Rodas',
      sku: 'SRV-ALINHA-3D',
      category: 'Geometria e Pneus',
      description: 'Calibração milimétrica por laser das rodas dianteiras e traseiras com pesos adesivos de balanceamento para eliminar vibrações ao volante.',
      price: 160.00,
      promotionalPrice: 139.00,
      imageUrl: '/src/assets/images/central_ia_hero_mockup_1793814568875.jpg',
      inStock: true,
      stockQuantity: 99,
      active: true,
      keySpecs: {
        'Tecnologia': 'Câmeras CCD digitais 3D',
        'Tempo': '40 minutos'
      }
    },
    {
      id: 'prod-p4',
      organizationId: 'org-precision',
      name: 'Higienização de Ar-Condicionado com Ozônio (Oxi-Sanitização)',
      sku: 'SRV-AR-OZONIO',
      category: 'Ar-Condicionado & Conforto',
      description: 'Eliminação de 99,9% de fungos, bactérias e maus odores no duto do ar-condicionado através de gerador de ozônio medicinal. Acompanha filtro de cabine novo.',
      price: 180.00,
      imageUrl: '/src/assets/images/central_ia_hero_mockup_1793814568875.jpg',
      inStock: true,
      stockQuantity: 28,
      active: true
    }
  ],
  'org-marcella': [
    {
      id: 'prod-m1',
      organizationId: 'org-marcella',
      name: 'Sérum Facial Radiance Boost Facial (50ml)',
      sku: 'COSM-SERUM-RAD-50',
      category: 'Homecare & Cosméticos',
      description: 'Sérum concentrado formulado pela Dra. Marcella com Ácido Hialurônico duplo peso molecular, Vitamina C pura a 15% e óleos botânicos orgânicos.',
      price: 189.90,
      promotionalPrice: 169.90,
      imageUrl: '/src/assets/images/catalog_product_skincare_1793814569482.jpg',
      inStock: true,
      stockQuantity: 62,
      active: true,
      keySpecs: {
        'Volume': '50ml',
        'Indicação': 'Todos os tipos de pele',
        'Textura': 'Toque seco e rápida absorção'
      }
    },
    {
      id: 'prod-m2',
      organizationId: 'org-marcella',
      name: 'Limpeza de Pele Profunda com Peeling Ultrassônico',
      sku: 'CLIN-LIMP-PELE-01',
      category: 'Procedimentos Faciais',
      description: 'Remoção de cravos e impurezas, emoliência biológica sem dor, hidratação com máscara de ouro e fototerapia LED cicatrizante.',
      price: 240.00,
      imageUrl: '/src/assets/images/catalog_product_skincare_1793814569482.jpg',
      inStock: true,
      stockQuantity: 99,
      active: true,
      keySpecs: {
        'Duração': '1h 30min',
        'Profissional': 'Biomédica Esteta'
      }
    }
  ],
  'org-graonobre': [
    {
      id: 'prod-g1',
      organizationId: 'org-graonobre',
      name: 'Café Especial Colombia Huila 340g (Torra Média)',
      sku: 'CAF-HUILA-340',
      category: 'Grãos Especiais',
      description: 'Lote selecionado da região de Huila, notas de chocolate ao leite, cereja madura e amêndoas tostadas. Pontuação SCA: 86 pontos.',
      price: 54.00,
      imageUrl: '/src/assets/images/catalog_product_coffee_1793814567911.jpg',
      inStock: true,
      stockQuantity: 38,
      active: true,
      variations: ['Grãos Inteiros', 'Moído para Filtro', 'Moído para Prensa', 'Moído para Espresso'],
      keySpecs: {
        'Origem': 'Huila, Colômbia',
        'Altitude': '1.750m',
        'Processo': 'Lavado'
      }
    }
  ]
};

// Contacts per Organization
export const initialContacts: Record<string, Contact[]> = {
  'org-precision': [
    {
      id: 'ct-p1',
      organizationId: 'org-precision',
      name: 'Carlos Eduardo Silveira',
      phone: '+55 11 98112-3344',
      email: 'carlos.silveira@gmail.com',
      avatarUrl: '',
      tags: ['Honda Civic 2021', 'Troca de Óleo', 'Cliente Recorrente'],
      stage: 'negotiation',
      dealValue: 249.00,
      notes: 'Cliente perguntou sobre óleo 5W30 e pastilhas dianteiras. Deseja agendar para quinta-feira pela manhã.',
      lastInteraction: '2026-11-04T12:30:00Z',
      consentOptIn: true,
      optInDate: '2026-10-01'
    },
    {
      id: 'ct-p2',
      organizationId: 'org-precision',
      name: 'Patrícia Albuquerque',
      phone: '+55 11 97233-8899',
      email: 'patricia.albuquerque@outlook.com',
      avatarUrl: '',
      tags: ['Jeep Renegade', 'Freios', 'Áudio Recebido'],
      stage: 'in_service',
      dealValue: 520.00,
      notes: 'Enviou áudio de 24 segundos com barulho ao frear na descida. O Apolo transcreveu e sugeriu revisão de pastilhas.',
      lastInteraction: '2026-11-04T13:10:00Z',
      consentOptIn: true,
      optInDate: '2026-11-04'
    },
    {
      id: 'ct-p3',
      organizationId: 'org-precision',
      name: 'Marcos Vinicius Toledo',
      phone: '+55 11 99455-6677',
      email: 'm.toledo@empresa.com.br',
      avatarUrl: '',
      tags: ['Frota Comercial', 'Orçamento', 'Humano Solicitado'],
      stage: 'proposal_sent',
      dealValue: 1850.00,
      notes: 'Solicitou revisão para 3 Fiorinos da empresa. Precisa de faturamento para 28 dias via boleto.',
      lastInteraction: '2026-11-04T10:15:00Z',
      assignedAttendantId: 'usr-001',
      consentOptIn: true,
      optInDate: '2026-09-15'
    },
    {
      id: 'ct-p4',
      organizationId: 'org-precision',
      name: 'Beatriz Zanetti',
      phone: '+55 11 98877-1122',
      tags: ['Toyota Corolla', 'Higienização'],
      stage: 'won',
      dealValue: 180.00,
      notes: 'Realizou higienização com ozônio e check-up. Muito satisfeita com a agilidade.',
      lastInteraction: '2026-11-03T16:45:00Z',
      consentOptIn: true
    }
  ],
  'org-marcella': [
    {
      id: 'ct-m1',
      organizationId: 'org-marcella',
      name: 'Juliana Camargo',
      phone: '+55 19 98711-2233',
      tags: ['Sérum Facial', 'Entrega Domiciliar'],
      stage: 'negotiation',
      dealValue: 169.90,
      lastInteraction: '2026-11-04T11:00:00Z',
      consentOptIn: true
    }
  ],
  'org-graonobre': [
    {
      id: 'ct-g1',
      organizationId: 'org-graonobre',
      name: 'Lucas Ferreira Mendes',
      phone: '+55 41 99882-3344',
      tags: ['Café Huila', 'Prensa Francesa'],
      stage: 'won',
      dealValue: 108.00,
      lastInteraction: '2026-11-04T09:20:00Z',
      consentOptIn: true
    }
  ]
};

// Realistic Conversations & Messages per Organization
export const initialConversations: Record<string, Conversation[]> = {
  'org-precision': [
    {
      id: 'conv-p1',
      organizationId: 'org-precision',
      contactId: 'ct-p1',
      contact: {
        id: 'ct-p1',
        organizationId: 'org-precision',
        name: 'Carlos Eduardo Silveira',
        phone: '+55 11 98112-3344',
        email: 'carlos.silveira@gmail.com',
        tags: ['Honda Civic 2021', 'Troca de Óleo'],
        stage: 'negotiation',
        dealValue: 249.00,
        lastInteraction: '2026-11-04T12:30:00Z',
        consentOptIn: true
      },
      status: 'open',
      aiActive: true,
      unreadCount: 0,
      channel: 'whatsapp_official',
      updatedAt: '2026-11-04T12:30:00Z',
      lastMessage: {
        id: 'msg-p1-4',
        conversationId: 'conv-p1',
        organizationId: 'org-precision',
        sender: 'ai',
        senderName: 'Apolo (IA)',
        type: 'text',
        content: 'Perfeito, Carlos! Nosso pacote de Troca de Óleo 5W30 Sintético + Filtro está em promoção de R$ 289,00 por R$ 249,00. Inclui também a checagem gratuita de 21 itens de segurança (freios, suspensão e fluidos). Deseja reservar para quinta-feira às 09h30?',
        timestamp: '2026-11-04T12:30:00Z',
        status: 'delivered',
        productReferences: ['prod-p1']
      }
    },
    {
      id: 'conv-p2',
      organizationId: 'org-precision',
      contactId: 'ct-p2',
      contact: {
        id: 'ct-p2',
        organizationId: 'org-precision',
        name: 'Patrícia Albuquerque',
        phone: '+55 11 97233-8899',
        tags: ['Jeep Renegade', 'Freios', 'Áudio Recebido'],
        stage: 'in_service',
        dealValue: 520.00,
        lastInteraction: '2026-11-04T13:10:00Z',
        consentOptIn: true
      },
      status: 'open',
      aiActive: true,
      unreadCount: 1,
      channel: 'whatsapp_official',
      updatedAt: '2026-11-04T13:10:00Z',
      lastMessage: {
        id: 'msg-p2-3',
        conversationId: 'conv-p2',
        organizationId: 'org-precision',
        sender: 'customer',
        senderName: 'Patrícia Albuquerque',
        type: 'audio',
        content: '[Mensagem de Áudio: 24s]',
        mediaUrl: '',
        audioDurationSeconds: 24,
        audioTranscription: 'Oi bom dia, meu Renegade começou a fazer um chiado agudo na roda dianteira direita quando piso no freio devagar. Queria saber se vocês têm a pastilha de cerâmica pronta entrega e quanto fica.',
        timestamp: '2026-11-04T13:10:00Z',
        status: 'delivered'
      }
    },
    {
      id: 'conv-p3',
      organizationId: 'org-precision',
      contactId: 'ct-p3',
      contact: {
        id: 'ct-p3',
        organizationId: 'org-precision',
        name: 'Marcos Vinicius Toledo',
        phone: '+55 11 99455-6677',
        tags: ['Frota Comercial', 'Humano Solicitado'],
        stage: 'proposal_sent',
        dealValue: 1850.00,
        lastInteraction: '2026-11-04T10:15:00Z',
        consentOptIn: true
      },
      status: 'needs_human',
      aiActive: false,
      assignedTo: 'Rodrigo Medeiros',
      unreadCount: 0,
      channel: 'whatsapp_official',
      updatedAt: '2026-11-04T10:15:00Z',
      lastMessage: {
        id: 'msg-p3-5',
        conversationId: 'conv-p3',
        organizationId: 'org-precision',
        sender: 'human_attendant',
        senderName: 'Rodrigo Medeiros (Gerente)',
        type: 'text',
        content: 'Marcos, já elaborei a proposta para os 3 veículos da sua frota com condição faturada em 28 dias conforme conversamos. O PDF com os valores detalhados está anexo. Qualquer dúvida estou à disposição!',
        timestamp: '2026-11-04T10:15:00Z',
        status: 'read'
      }
    }
  ]
};

// Initial Messages History for Conversations
export const initialMessages: Record<string, Message[]> = {
  'conv-p1': [
    {
      id: 'msg-p1-1',
      conversationId: 'conv-p1',
      organizationId: 'org-precision',
      sender: 'customer',
      senderName: 'Carlos Eduardo Silveira',
      type: 'text',
      content: 'Boa tarde! Vocês trocam óleo de Civic 2021?',
      timestamp: '2026-11-04T12:28:10Z',
      status: 'read'
    },
    {
      id: 'msg-p1-2',
      conversationId: 'conv-p1',
      organizationId: 'org-precision',
      sender: 'ai',
      senderName: 'Apolo (IA)',
      type: 'text',
      content: 'Olá, Carlos! Boa tarde. Sim, somos especialistas em Honda! Para o Civic 2021, o lubrificante homologado é o 5W30 100% Sintético.',
      timestamp: '2026-11-04T12:28:16Z',
      status: 'read',
      aiMetadata: { model: 'gemini-3.8-flash', latencyMs: 640 }
    },
    {
      id: 'msg-p1-3',
      conversationId: 'conv-p1',
      organizationId: 'org-precision',
      sender: 'customer',
      senderName: 'Carlos Eduardo Silveira',
      type: 'text',
      content: 'Legal, quanto tá saindo o pacote com o filtro?',
      timestamp: '2026-11-04T12:29:20Z',
      status: 'read'
    },
    {
      id: 'msg-p1-4',
      conversationId: 'conv-p1',
      organizationId: 'org-precision',
      sender: 'ai',
      senderName: 'Apolo (IA)',
      type: 'text',
      content: 'Perfeito, Carlos! Nosso pacote de Troca de Óleo 5W30 Sintético + Filtro está em promoção de R$ 289,00 por R$ 249,00. Inclui também a checagem gratuita de 21 itens de segurança (freios, suspensão e fluidos). Deseja reservar para quinta-feira às 09h30?',
      timestamp: '2026-11-04T12:30:00Z',
      status: 'delivered',
      productReferences: ['prod-p1'],
      aiMetadata: { model: 'gemini-3.8-flash', latencyMs: 710 }
    }
  ],
  'conv-p2': [
    {
      id: 'msg-p2-1',
      conversationId: 'conv-p2',
      organizationId: 'org-precision',
      sender: 'customer',
      senderName: 'Patrícia Albuquerque',
      type: 'text',
      content: 'Oi pessoal, tudo bem?',
      timestamp: '2026-11-04T13:08:40Z',
      status: 'read'
    },
    {
      id: 'msg-p2-2',
      conversationId: 'conv-p2',
      organizationId: 'org-precision',
      sender: 'ai',
      senderName: 'Apolo (IA)',
      type: 'text',
      content: 'Olá, Patrícia! Tudo ótimo por aqui. Sou o Apolo da Precision Auto Center. Como posso te ajudar hoje?',
      timestamp: '2026-11-04T13:08:45Z',
      status: 'read'
    },
    {
      id: 'msg-p2-3',
      conversationId: 'conv-p2',
      organizationId: 'org-precision',
      sender: 'customer',
      senderName: 'Patrícia Albuquerque',
      type: 'audio',
      content: '[Mensagem de Áudio: 24s]',
      audioDurationSeconds: 24,
      audioTranscription: 'Oi bom dia, meu Renegade começou a fazer um chiado agudo na roda dianteira direita quando piso no freio devagar. Queria saber se vocês têm a pastilha de cerâmica pronta entrega e quanto fica.',
      timestamp: '2026-11-04T13:10:00Z',
      status: 'delivered'
    }
  ],
  'conv-p3': [
    {
      id: 'msg-p3-1',
      conversationId: 'conv-p3',
      organizationId: 'org-precision',
      sender: 'customer',
      senderName: 'Marcos Vinicius Toledo',
      type: 'text',
      content: 'Bom dia. Sou responsável pela frota de 3 Fiorinos da LogExpress. Gostaria de um orçamento fechado para revisão geral e pastilhas de freio com faturamento mensal.',
      timestamp: '2026-11-04T09:40:00Z',
      status: 'read'
    },
    {
      id: 'msg-p3-2',
      conversationId: 'conv-p3',
      organizationId: 'org-precision',
      sender: 'ai',
      senderName: 'Apolo (IA)',
      type: 'text',
      content: 'Bom dia, Marcos! Entendi perfeitamente. Como se trata de faturamento corporativo para múltiplos veículos com condições personalizadas de boleto, estou transferindo imediatamente para o Rodrigo Medeiros, nosso gerente de frotas.',
      timestamp: '2026-11-04T09:40:10Z',
      status: 'read'
    },
    {
      id: 'msg-p3-3',
      conversationId: 'conv-p3',
      organizationId: 'org-precision',
      sender: 'system',
      type: 'text',
      content: 'Atendimento transferido da IA para o atendente humano: Rodrigo Medeiros.',
      timestamp: '2026-11-04T09:40:12Z',
      status: 'read'
    },
    {
      id: 'msg-p3-4',
      conversationId: 'conv-p3',
      organizationId: 'org-precision',
      sender: 'human_attendant',
      senderName: 'Rodrigo Medeiros (Gerente)',
      type: 'text',
      content: 'Olá Marcos! Já estou com a sua solicitação aqui na minha tela. Qual o ano e quilometragem média atual das Fiorinos?',
      timestamp: '2026-11-04T09:48:00Z',
      status: 'read'
    },
    {
      id: 'msg-p3-5',
      conversationId: 'conv-p3',
      organizationId: 'org-precision',
      sender: 'human_attendant',
      senderName: 'Rodrigo Medeiros (Gerente)',
      type: 'text',
      content: 'Marcos, já elaborei a proposta para os 3 veículos da sua frota com condição faturada em 28 dias conforme conversamos. O PDF com os valores detalhados está anexo. Qualquer dúvida estou à disposição!',
      timestamp: '2026-11-04T10:15:00Z',
      status: 'read'
    }
  ]
};

// CRM Deals per Organization
export const initialDeals: Record<string, Deal[]> = {
  'org-precision': [
    {
      id: 'deal-1',
      organizationId: 'org-precision',
      contactId: 'ct-p1',
      title: 'Revisão Honda Civic (Óleo + Filtros)',
      value: 249.00,
      stage: 'negotiation',
      priority: 'medium',
      createdAt: '2026-11-04',
      expectedCloseDate: '2026-11-06'
    },
    {
      id: 'deal-2',
      organizationId: 'org-precision',
      contactId: 'ct-p2',
      title: 'Pastilhas Dianteiras Cerâmica Jeep Renegade',
      value: 520.00,
      stage: 'in_service',
      priority: 'high',
      createdAt: '2026-11-04'
    },
    {
      id: 'deal-3',
      organizationId: 'org-precision',
      contactId: 'ct-p3',
      title: 'Contrato Revisão Frota 3 Fiorinos',
      value: 1850.00,
      stage: 'proposal_sent',
      priority: 'high',
      createdAt: '2026-11-04',
      expectedCloseDate: '2026-11-10'
    },
    {
      id: 'deal-4',
      organizationId: 'org-precision',
      contactId: 'ct-p4',
      title: 'Oxi-Sanitização e Filtro Cabine Corolla',
      value: 180.00,
      stage: 'won',
      priority: 'medium',
      createdAt: '2026-11-03'
    }
  ]
};

// Automations per Organization
export const initialAutomations: Record<string, AutomationRule[]> = {
  'org-precision': [
    {
      id: 'auto-1',
      organizationId: 'org-precision',
      name: 'Qualificação Instantânea de Contato',
      description: 'Cria automaticamente contato no CRM ao receber primeira mensagem no WhatsApp com tag do canal oficial.',
      trigger: 'first_message',
      action: 'assign_agent',
      actionDetails: 'Atribui ao Apolo IA e define estágio como Novo Lead',
      enabled: true,
      executionCount: 142
    },
    {
      id: 'auto-2',
      organizationId: 'org-precision',
      name: 'Resgate de Orçamento sem Resposta (24h)',
      description: 'Envia follow-up gentil dentro da janela oficial de 24h para clientes que receberam orçamento mas não confirmaram.',
      trigger: 'quote_sent',
      action: 'send_followup',
      actionDetails: 'Pergunta se o cliente deseja tirar dúvidas sobre o orçamento ou agendar horário.',
      enabled: true,
      executionCount: 38
    },
    {
      id: 'auto-3',
      organizationId: 'org-precision',
      name: 'Alerta de Transferência para Atendente Humano',
      description: 'Notifica a equipe via painel e cria card de prioridade quando o cliente solicita atendente humano ou relata insatisfação.',
      trigger: 'first_message',
      action: 'notify_team',
      actionDetails: 'Move conversa para aba "Necessita Humano" e toca som de alerta.',
      enabled: true,
      executionCount: 19
    }
  ]
};

// Usage Ledger per Organization
export const initialUsage: Record<string, UsageLedger> = {
  'org-precision': {
    organizationId: 'org-precision',
    currentPeriod: 'Novembro / 2026',
    planMonthlyFee: 200.00,
    messagesSent: 842,
    messagesQuota: 2000,
    aiTokensUsed: 184500,
    aiTokensQuota: 500000,
    audioTranscriptionsCount: 47,
    estimatedExtraCost: 0.00,
    costBreakdown: {
      platformBase: 200.00,
      whatsappApiCost: 34.50, // Repasse oficial Meta (conversas iniciadas pela empresa/serviço)
      aiUsageCost: 12.80
    }
  },
  'org-marcella': {
    organizationId: 'org-marcella',
    currentPeriod: 'Novembro / 2026',
    planMonthlyFee: 200.00,
    messagesSent: 512,
    messagesQuota: 2000,
    aiTokensUsed: 112000,
    aiTokensQuota: 500000,
    audioTranscriptionsCount: 22,
    estimatedExtraCost: 0.00,
    costBreakdown: {
      platformBase: 200.00,
      whatsappApiCost: 18.20,
      aiUsageCost: 8.40
    }
  },
  'org-graonobre': {
    organizationId: 'org-graonobre',
    currentPeriod: 'Novembro / 2026',
    planMonthlyFee: 200.00,
    messagesSent: 290,
    messagesQuota: 2000,
    aiTokensUsed: 64000,
    aiTokensQuota: 500000,
    audioTranscriptionsCount: 15,
    estimatedExtraCost: 0.00,
    costBreakdown: {
      platformBase: 200.00,
      whatsappApiCost: 9.80,
      aiUsageCost: 4.50
    }
  }
};

// Audit logs
export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    organizationId: 'org-precision',
    timestamp: '2026-11-04T12:30:00Z',
    userEmail: 'rodrigo@precisionauto.com.br',
    action: 'IA_REPLY_SENT',
    details: 'Apolo respondeu cotação de Óleo 5W30 para Carlos Eduardo (+55 11 98112-3344)'
  },
  {
    id: 'log-2',
    organizationId: 'org-precision',
    timestamp: '2026-11-04T10:15:00Z',
    userEmail: 'rodrigo@precisionauto.com.br',
    action: 'HUMAN_TAKEOVER',
    details: 'Rodrigo assumiu atendimento manual de Marcos Vinicius (Frota LogExpress)'
  },
  {
    id: 'log-3',
    organizationId: 'org-precision',
    timestamp: '2026-11-03T18:00:00Z',
    userEmail: 'rodrigo@precisionauto.com.br',
    action: 'CATALOG_UPDATE',
    details: 'Preço promocional atualizado no produto Pastilhas de Freio Cerâmica'
  }
];
