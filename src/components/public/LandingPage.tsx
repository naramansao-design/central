import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  MessageSquare,
  Bot,
  Zap,
  ShieldCheck,
  Users,
  Package,
  Headphones,
  Check,
  ArrowRight,
  Sparkles,
  Smartphone,
  Sliders,
  DollarSign,
  HelpCircle,
  Building,
  Wrench,
  Stethoscope,
  ShoppingBag,
  Coffee,
  Play,
  RotateCcw
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setDashboardTab, activeOrg, products } = useApp();

  // Interactive Live Demo in Landing Page
  const [demoInput, setDemoInput] = useState('');
  const [demoChat, setDemoChat] = useState<Array<{ sender: 'user' | 'ai'; text: string; hasImage?: boolean; audioNote?: boolean }>>([
    {
      sender: 'user',
      text: 'Olá, bom dia! Gostaria de saber quanto fica a troca de óleo do meu Honda Civic e se vocês têm horário hoje.',
    },
    {
      sender: 'ai',
      text: 'Olá! Sou o assistente virtual da Precision Auto Center. O pacote de Troca de Óleo 5W30 Sintético + Filtro está em promoção de R$ 289,00 por R$ 249,00, incluindo a checagem gratuita de 21 itens de segurança. Temos disponibilidade para hoje às 14h30 ou 16h00. Qual horário prefere?',
    }
  ]);
  const [isDemoReplying, setIsDemoReplying] = useState(false);

  const handleSendDemoMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoInput.trim() || isDemoReplying) return;

    const userText = demoInput.trim();
    setDemoInput('');
    setDemoChat(prev => [...prev, { sender: 'user', text: userText }]);
    setIsDemoReplying(true);

    try {
      const res = await fetch('/api/ai/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          conversationHistory: demoChat.map(m => ({
            sender: m.sender === 'user' ? 'customer' : 'ai',
            content: m.text
          })),
          catalogProducts: products,
          customerName: 'Cliente Visitante'
        })
      });

      const data = await res.json();
      setDemoChat(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'Recebido! Como posso te ajudar com os itens cadastrados no nosso catálogo?',
          hasImage: (data.suggestedProducts || []).length > 0
        }
      ]);
    } catch {
      setDemoChat(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Recebi sua pergunta! No sistema completo, a IA consulta o catálogo em tempo real e pode anexar a foto e ficha técnica do produto.'
        }
      ]);
    } finally {
      setIsDemoReplying(false);
    }
  };

  const resetDemo = () => {
    setDemoChat([
      {
        sender: 'user',
        text: 'Olá, bom dia! Gostaria de saber quanto fica a troca de óleo do meu Honda Civic e se vocês têm horário hoje.',
      },
      {
        sender: 'ai',
        text: 'Olá! Sou o assistente virtual da Precision Auto Center. O pacote de Troca de Óleo 5W30 Sintético + Filtro está em promoção de R$ 289,00 por R$ 249,00, incluindo a checagem gratuita de 21 itens de segurança. Temos disponibilidade para hoje às 14h30 ou 16h00. Qual horário prefere?',
      }
    ]);
  };

  const faqItems = [
    {
      q: 'A Central IA funciona na API oficial do WhatsApp?',
      a: 'Sim. A plataforma é construída para a WhatsApp Business Platform (Cloud API oficial da Meta), garantindo conformidade com os termos da Meta, sem risco de banimento de chips por disparos não autorizados.'
    },
    {
      q: 'A IA pode inventar preços ou informações erradas?',
      a: 'Não. Nosso motor utiliza salvaguardas rígidas e restrições de ancoragem (grounding). O agente responde estritamente com base nos produtos, serviços, preços e políticas cadastrados por você no painel. Quando a informação não existe, ele oferece transferência imediata para um humano.'
    },
    {
      q: 'O que acontece quando o cliente manda áudio no WhatsApp?',
      a: 'O sistema transcreve a mensagem de voz recebida em texto de alta precisão através do Gemini e formula a resposta contextualmente, permitindo que sua equipe e a IA compreendam perfeitamente os áudios dos clientes.'
    },
    {
      q: 'Posso pausar a IA e responder manualmente quando quiser?',
      a: 'Sim, a qualquer momento com apenas 1 clique. O painel possui uma caixa de entrada multicanal profissional onde qualquer atendente humano pode assumir uma conversa, pausando o agente de forma imediata.'
    },
    {
      q: 'Como funcionam os custos da API da Meta?',
      a: 'Os custos das conversas cobrados pela Meta são independentes da assinatura da Central IA. Cada conversa de serviço iniciada pelo cliente no WhatsApp tem tarifas de centavos repassadas diretamente, garantindo total transparência e ausência de surpresas.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Plataforma SaaS Multiempresa para PMEs</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display text-balance">
                Seu atendimento mais inteligente. Suas vendas mais organizadas.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Automatize conversas pelo WhatsApp com inteligência artificial, organize seus clientes e tenha mais controle sobre seu atendimento.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/25"
                >
                  <span>Conhecer a plataforma</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('demo-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-xs"
                >
                  <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                  <span>Ver demonstração</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-xs text-slate-500">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Oficial Meta</div>
                  <div>WhatsApp Cloud API</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Sem Alucinações</div>
                  <div>Ancorado ao Catálogo</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">R$ 200/mês</div>
                  <div>Plano Inicial Essencial</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Mockup Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                <img
                  src="/src/assets/images/central_ia_hero_mockup_1793814568875.jpg"
                  alt="Interface Central IA - Caixa de Entrada WhatsApp com IA"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 bg-slate-900 text-white text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-medium">Motor de Atendimento Central IA Conectado</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Meta API v21.0</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BENEFÍCIOS PRINCIPAIS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Construído para quem vende todos os dias no WhatsApp
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Chega de perder orçamentos por demora no atendimento ou deixar clientes esperando após o horário comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Respostas em Segundos, 24 Horas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seu cliente é respondido no exato instante em que procura, tirando dúvidas sobre estoque, procedimentos e preços autorizados.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Catálogo Fiel e Sem Invenções
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A IA obedece estritamente às regras da sua empresa: preços, fotos reais, estoque e políticas de desconto pré-configuradas.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Transição Humana Imediata
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Negociações complexas, dúvidas especiais ou solicitações de desconto são transferidas automaticamente para sua equipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMO FUNCIONA */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Como funciona o fluxo da Central IA
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Da mensagem do cliente no WhatsApp até a conclusão da venda no CRM.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                Passo 01
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Conexão WhatsApp
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Conecte seu número comercial através da API oficial da Meta em poucos cliques.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                Passo 02
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Ensine seu Agente
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cadastre seus produtos, preços, fotos, horários de funcionamento e regras de negócio.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                Passo 03
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Atendimento com IA
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                O agente entende mensagens de texto e áudio, envia fotos e qualifica cada interesse.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                Passo 04
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Controle no CRM
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Acompanhe orçamentos enviados, intervenha quando necessário e feche mais negócios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEMONSTRAÇÃO VISUAL INTERATIVA (SIMULADOR DO ATENDIMENTO) */}
      <section id="demo-section" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Live Simulator Card */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    WA
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Simulação do Atendimento ao Vivo
                    </h3>
                    <p className="text-xs text-slate-500">
                      Empresa ativa: <span className="font-semibold text-slate-700">{activeOrg.name}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={resetDemo}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  title="Reiniciar conversa de demonstração"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 min-h-[280px] max-h-[380px] overflow-y-auto pr-2 mb-4">
                {demoChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.hasImage && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-blue-600 font-medium">
                          <Package className="w-3.5 h-3.5" />
                          <span>Foto oficial do produto enviada em anexo</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isDemoReplying && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                    <span>Agente IA consultando catálogo oficial...</span>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendDemoMessage} className="flex gap-2">
                <input
                  type="text"
                  value={demoInput}
                  onChange={e => setDemoInput(e.target.value)}
                  placeholder="Pergunte sobre um produto, preço ou serviço..."
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={!demoInput.trim() || isDemoReplying}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Enviar
                </button>
              </form>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>Conectado ao Gemini 3.8 Flash</span>
                <span>Ancorado estritamente aos produtos cadastrados</span>
              </div>
            </div>

            {/* Right: Explanation */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Demonstração Real
              </div>

              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Veja a IA consultar seu catálogo em tempo real
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Você pode testar fazendo perguntas reais como <em>"Quanto custa a troca de óleo?"</em> ou <em>"Tem frete grátis?"</em>. O agente não inventa: ele lê o catálogo da empresa selecionada e responde no tom configurado.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Compreensão de Áudio</h4>
                    <p className="text-xs text-slate-500">
                      O cliente pode mandar mensagem de voz: o sistema transcreve instantaneamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-7 h-7 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Envio de Fotos de Produtos</h4>
                    <p className="text-xs text-slate-500">
                      Mostre fotos profissionais cadastradas no momento certo da conversa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-7 h-7 rounded-md bg-purple-100 flex items-center justify-center text-purple-700 shrink-0 text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Pausa e Retomada Humana</h4>
                    <p className="text-xs text-slate-500">
                      Ao assumir o chat, o atendente tem total controle da conversa com 1 clique.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setDashboardTab('agent');
                  setCurrentView('dashboard');
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>Configurar personalidade do agente no painel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SEGMENTOS ATENDIDOS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Segmentos atendidos pela Central IA
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              O catálogo flexível adapta-se perfeitamente ao vocabulário e às rotinas da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Oficinas e Autopeças
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Agendamento de revisões, cotações de peças por modelo de veículo e orçamentos preventivos.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center text-pink-700 mb-3">
                <Stethoscope className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Clínicas e Estética
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tira-dúvidas sobre procedimentos, venda de dermocosméticos homecare e fila de agendamentos.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-3">
                <Coffee className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Gastronomia e Cafés
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Apresentação de cardápios, pedidos de produtos artesanais e entregas programadas.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 mb-3">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Comércio e Lojas Locais
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Envio de fotos de roupas, calçados, eletrônicos e materiais com preço e estoque em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PLANO E PREÇO */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Preço justo, transparente e previsível
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Sem contratos de fidelidade abusivos e com discriminação detalhada dos custos.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-lg relative">
            <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-md mb-4">
              Plano Recomendado
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-display">
              CENTRAL IA ESSENCIAL
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Para pequenas e médias empresas que desejam automatizar o atendimento comercial.
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-slate-900 font-display tabular-nums">
                R$ 200
              </span>
              <span className="text-xs text-slate-500">/mês</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 Agente de IA personalizado com seu catálogo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Franquia mensal de até 2.000 mensagens com IA</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Compreensão e transcrição de áudios recebidos</span>
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
                <span>Funil de vendas CRM integrado (6 etapas)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Conexão oficial Meta WhatsApp Cloud API</span>
              </li>
            </ul>

            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Começar Agora
            </button>

            <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed text-center">
              * Custos de conversas da Meta WhatsApp Business Platform cobrados à parte conforme consumo real oficial da Meta. Sem pegadinhas.
            </div>
          </div>
        </div>
      </section>

      {/* 7. PERGUNTAS FREQUENTES (FAQ) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Perguntas Frequentes
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Tudo o que você precisa saber para começar com tranquilidade.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.q}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CHAMADA PARA CADASTRO */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Pronto para transformar seu atendimento no WhatsApp?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Cadastre sua empresa, configure seu catálogo e comece a atender de forma inteligente hoje mesmo.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-blue-600 bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-lg"
            >
              <span>Acessar Painel da Plataforma</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
