import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Globe,
  Layout,
  ShoppingBag,
  Smartphone,
  CheckCircle2,
  Send,
  MessageCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const WebsitesServicePage: React.FC = () => {
  const { showToast } = useApp();

  // Quote Request Form State
  const [siteType, setSiteType] = useState<'institutional' | 'landing' | 'catalog' | 'ecommerce'>('institutional');
  const [hasWhatsAppIntegration, setHasWhatsAppIntegration] = useState(true);
  const [hasCustomDomain, setHasCustomDomain] = useState(true);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Approximate baseline estimate for budget planning
  const baseEstimates = {
    landing: 1200,
    institutional: 1900,
    catalog: 2400,
    ecommerce: 3200
  };

  const calculatedBase = baseEstimates[siteType] + (hasWhatsAppIntegration ? 250 : 0) + (hasCustomDomain ? 150 : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp) {
      showToast('Por favor, preencha seu nome e WhatsApp.');
      return;
    }

    setSubmitted(true);
    showToast('Proposta solicitada com sucesso! Entraremos em contato via WhatsApp.');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Serviço Independente Especializado</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Criação de Sites, Catálogos e Lojas Virtuais
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Desenvolvemos a presença digital da sua empresa integrada diretamente com seu WhatsApp e com o motor de inteligência artificial da Central IA.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 mb-4">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Sites Institucionais e Comerciais
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Apresente sua empresa, histórico, equipe, localização e diferenciais com design moderno, rápido e responsivo.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Otimizado para celulares e Google (SEO)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Botões de contato direto para WhatsApp</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Catálogos Digitais Interativos
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Seus produtos e serviços organizados por categoria, com fotos em alta definição, preços e botão de orçamento no WhatsApp.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sincronizável com o catálogo da IA</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fácil atualização de preços e fotos</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 mb-4">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Lojas Virtuais Simples & Landing Pages
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Páginas de alta conversão focadas em campanhas de tráfego pago ou lojas com checkout simplificado e chave Pix.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Foco em geração rápida de leads</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Integração com Meta Pixel e Google Analytics</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Proposal Request Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Form */}
            <div className="lg:col-span-7">
              <h2 className="text-xl font-bold text-slate-900 font-display mb-2">
                Solicite uma Proposta Personalizada
              </h2>
              <p className="text-xs text-slate-600 mb-6">
                Preencha os dados do seu projeto. Retornamos com o escopo técnico e a estimativa detalhada em até 24 horas úteis.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-900">
                    Solicitação enviada com sucesso!
                  </h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Obrigado, {name}! Nosso time de arquitetura web recebeu os detalhes para <strong>{company || 'sua empresa'}</strong> e entrará em contato pelo WhatsApp <strong>{whatsapp}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-emerald-800 underline font-medium pt-2"
                  >
                    Fazer outra simulação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Type Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Tipo de Projeto Desejado
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'institutional', label: 'Site Institucional' },
                        { id: 'landing', label: 'Landing Page' },
                        { id: 'catalog', label: 'Catálogo Digital' },
                        { id: 'ecommerce', label: 'Loja Virtual' }
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSiteType(item.id as any)}
                          className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-colors ${
                            siteType === item.id
                              ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={hasWhatsAppIntegration}
                        onChange={e => setHasWhatsAppIntegration(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Incluir Integração Oficial com WhatsApp & Central IA</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={hasCustomDomain}
                        onChange={e => setHasCustomDomain(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Configuração de Domínio Próprio (.com.br) e Certificado SSL</span>
                    </label>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ex: Carlos Silva"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder="Ex: Auto Mecânica Silva"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp para Contato *
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      placeholder="(11) 98765-4321"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Detalhes ou Referências do Projeto (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Conte um pouco sobre o que sua empresa vende e como gostaria que fosse o site..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Solicitação de Orçamento</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Budget Estimator Card */}
            <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Estimativa Referencial
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Orçamento Estimado do Projeto
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Valores estimados com base no escopo selecionado ao lado. O valor final é confirmado após validação de requisitos.
              </p>

              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Estrutura base ({siteType})</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    R$ {baseEstimates[siteType].toLocaleString('pt-BR')},00
                  </span>
                </div>
                {hasWhatsAppIntegration && (
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Integração WhatsApp & IA</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      R$ 250,00
                    </span>
                  </div>
                )}
                {hasCustomDomain && (
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Setup de Domínio & SSL</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      R$ 150,00
                    </span>
                  </div>
                )}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Estimativa Total:</span>
                  <span className="text-lg font-bold text-blue-600 font-display tabular-nums">
                    a partir de R$ {calculatedBase.toLocaleString('pt-BR')},00
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                Condições de pagamento: Entrada de 50% + 50% na entrega e publicação, ou parcelado em até 6x no cartão de crédito da empresa.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
