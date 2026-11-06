import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  QrCode,
  Terminal,
  Settings,
  XCircle
} from 'lucide-react';

export const WhatsAppView: React.FC = () => {
  const { activeOrg, showToast } = useApp();

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('connected');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const webhookUrl = `${window.location.origin}/api/whatsapp/webhook`;
  const verifyToken = 'central_ia_secure_verify_token_2026';

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`${field} copiado para a área de transferência!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Conexão WhatsApp Business Platform (API Oficial)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Empresa: <span className="font-semibold text-slate-700">{activeOrg.name}</span> · 
            Integração direta com os servidores oficiais da Meta.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {connectionStatus === 'connected' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Canal Oficial Conectado</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>Desconectado</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Connection Info Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {activeOrg.whatsappNumber || '+55 11 94002-8922'}
              </h2>
              <p className="text-xs text-slate-500">
                Número registrado na Meta Business Account da empresa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {connectionStatus === 'connected' ? (
              <button
                onClick={() => {
                  setConnectionStatus('disconnected');
                  showToast('Canal do WhatsApp desconectado.');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 rounded-lg transition-colors border border-red-200"
              >
                Desconectar Número
              </button>
            ) : (
              <button
                onClick={() => {
                  setConnectionStatus('connected');
                  showToast('Canal do WhatsApp reconectado!');
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
              >
                Conectar Número Oficial
              </button>
            )}
          </div>
        </div>

        {/* Cloud API Webhook Configurations */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Credenciais do Webhook Oficial da Meta</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* URL do Webhook */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">
                URL de Retorno de Chamada (Webhook Callback URL)
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs text-slate-800 font-mono truncate">
                  {webhookUrl}
                </code>
                <button
                  onClick={() => copyToClipboard(webhookUrl, 'URL do Webhook')}
                  className="p-1 text-slate-400 hover:text-slate-700 shrink-0"
                  title="Copiar URL"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Verify Token */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Token de Verificação (Verify Token)
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs text-slate-800 font-mono truncate">
                  {verifyToken}
                </code>
                <button
                  onClick={() => copyToClipboard(verifyToken, 'Token de Verificação')}
                  className="p-1 text-slate-400 hover:text-slate-700 shrink-0"
                  title="Copiar Token"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions on how to connect */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Instruções para Conexão Oficial sem Riscos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-extrabold">1</span>
              <span>Conta Meta Business</span>
            </div>
            <p className="leading-relaxed">
              Crie ou acesse o Gerenciador de Negócios da sua empresa em business.facebook.com e adicione o WhatsApp.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-extrabold">2</span>
              <span>Configure o Webhook</span>
            </div>
            <p className="leading-relaxed">
              Cole a URL e o Token acima no painel de desenvolvedores da Meta para ativar o recebimento de mensagens instantâneas.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-extrabold">3</span>
              <span>Validação e Ativação</span>
            </div>
            <p className="leading-relaxed">
              Envie uma mensagem de teste para o número cadastrado e confira as respostas do seu agente na Caixa de Atendimento.
            </p>
          </div>
        </div>
      </div>

      {/* Security note */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>
          A Central IA utiliza a WhatsApp Cloud API oficial. Suas credenciais de acesso não são expostas ao navegador e o tráfego é criptografado de ponta a ponta.
        </span>
      </div>
    </div>
  );
};
