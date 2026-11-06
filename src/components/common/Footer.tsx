import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Bot, Shield, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 font-display">
                CENTRAL IA
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Plataforma SaaS multiempresa de atendimento inteligente e gestão comercial via WhatsApp com inteligência artificial para PMEs brasileiras.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <Shield className="w-4 h-4" />
              <span>Conformidade com LGPD & Meta Cloud API</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => setCurrentView('landing')} className="hover:text-blue-600 transition-colors">
                  Visão Geral do Produto
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('agent-showcase')} className="hover:text-blue-600 transition-colors">
                  Atendente IA & Áudios
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('pricing')} className="hover:text-blue-600 transition-colors">
                  Plano Central IA Essencial
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('websites')} className="hover:text-blue-600 transition-colors">
                  Criação de Sites e Catálogos
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Recursos Técnicos
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>WhatsApp Cloud API Oficial</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Transcrição de Áudio com Gemini</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Isolamento Multiempresa RLS</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Transferência Humana Imediata</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Compromisso Comercial
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Desenvolvido para pequenos e médios empresários terem total controle sobre suas vendas, sem taxas ocultas e com transparência de custos.
            </p>
            <div className="text-xs text-slate-400">
              Brasil · Suporte em Português
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Central IA Software S.A. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-700 cursor-pointer">Termos de Uso</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-700 cursor-pointer">Política de Privacidade</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-700 cursor-pointer">Segurança dos Dados</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
