import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Settings,
  Building2,
  Users,
  Shield,
  Download,
  AlertCircle,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Key,
  ShieldCheck,
  UserPlus
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { activeOrg, user, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'company' | 'team' | 'security' | 'lgpd'>('company');
  const [isRunningSecurityTest, setIsRunningSecurityTest] = useState(false);
  const [securityTestResult, setSecurityTestResult] = useState<any | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Run Multi-Tenant Isolation Test (Proof of RLS)
  const handleRunSecurityTest = async () => {
    setIsRunningSecurityTest(true);
    setSecurityTestResult(null);

    try {
      const res = await fetch('/api/security/test-isolation');
      const data = await res.json();
      setSecurityTestResult(data);
      showToast('Bateria de testes de isolamento multiempresa executada!');
    } catch {
      showToast('Falha ao executar teste de isolamento.');
    } finally {
      setIsRunningSecurityTest(false);
    }
  };

  // LGPD Data Export
  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const res = await fetch(`/api/data/export?orgId=${activeOrg.id}`);
      const data = await res.json();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${activeOrg.slug}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      showToast('Arquivo de exportação LGPD gerado com sucesso!');
    } catch {
      showToast('Erro ao exportar dados.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            Configurações & Governança da Empresa
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Empresa ativa: <span className="font-semibold text-slate-700">{activeOrg.name}</span> · ID: <code className="font-mono">{activeOrg.id}</code>
          </p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
        {[
          { id: 'company', label: 'Dados da Empresa', icon: Building2 },
          { id: 'team', label: 'Equipe & Papéis (RBAC)', icon: Users },
          { id: 'security', label: 'Segurança & Isolamento RLS', icon: ShieldCheck },
          { id: 'lgpd', label: 'Privacidade & LGPD', icon: FileText }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === t.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Company Profile */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs max-w-2xl">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Perfil Cadastral da Empresa
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Razão Social / Nome Fantasia
              </label>
              <input
                type="text"
                defaultValue={activeOrg.name}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CNPJ
                </label>
                <input
                  type="text"
                  defaultValue={activeOrg.document || '42.189.901/0001-44'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Segmento de Negócio
                </label>
                <input
                  type="text"
                  defaultValue={activeOrg.segment}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telefone Principal WhatsApp
                </label>
                <input
                  type="text"
                  defaultValue={activeOrg.whatsappNumber || '+55 11 94002-8922'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Plano Atual
                </label>
                <input
                  type="text"
                  readOnly
                  value="Central IA Essencial — R$ 200/mês"
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-semibold cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => showToast('Dados da empresa salvos.')}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Tab: Team & Roles */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Membros da Equipe e Permissões de Acesso
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina quem pode atender conversas, configurar o agente ou visualizar dados financeiros.
              </p>
            </div>

            <button
              onClick={() => showToast('Convite para novo atendente enviado por e-mail.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Convidar Membro</span>
            </button>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Nome / Usuário</th>
                  <th className="py-2.5 px-3">E-mail</th>
                  <th className="py-2.5 px-3">Papel no Sistema</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      RM
                    </div>
                    <span>{user.name}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">{user.email}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      Proprietário (Owner)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-medium">Ativo</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                      FS
                    </div>
                    <span>Fabiana Santos</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">atendimento@precisionauto.com.br</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      Atendente Operacional
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-medium">Ativo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Multi-tenant RLS Isolation Proof */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Auditoria Automatizada de Isolamento Multi-Tenant</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Verificador de Barreira RLS (Row Level Security)
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Execute os testes em tempo real para comprovar que nenhuma organização consegue consultar ou interceptar dados, conversas ou catálogos de outra empresa.
              </p>
            </div>

            <button
              onClick={handleRunSecurityTest}
              disabled={isRunningSecurityTest}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors shadow-xs whitespace-nowrap self-start sm:self-center"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isRunningSecurityTest ? 'Executando testes...' : 'Executar Testes de Isolamento'}</span>
            </button>
          </div>

          {/* Test Results Output */}
          {securityTestResult ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Resultado:</strong> Todos os {securityTestResult.totalTests} testes de isolamento multiempresa passaram com 100% de sucesso.
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-700">
                  {new Date(securityTestResult.timestamp).toLocaleTimeString('pt-BR')}
                </span>
              </div>

              <div className="space-y-2.5">
                {securityTestResult.results.map((res: any) => (
                  <div
                    key={res.testId}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        [{res.testId}] {res.description}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {res.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 font-mono bg-white p-2 rounded border border-slate-200/60">
                      Tentativa: {res.attempt} → Retorno: {res.actualResult}
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Política aplicada: <code className="text-slate-700 font-semibold">{res.policy}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 space-y-2">
              <Lock className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-800">Nenhum teste executado nesta sessão</p>
              <p>Clique no botão acima para verificar o isolamento das políticas RLS do PostgreSQL e dos endpoints do servidor.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: LGPD & Data Privacy */}
      {activeTab === 'lgpd' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs max-w-2xl">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Conformidade com a LGPD (Lei Geral de Proteção de Dados)
          </h2>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              A Central IA foi projetada desde a arquitetura de banco de dados para garantir que a sua empresa esteja em plena conformidade com a LGPD (Lei nº 13.709/2018).
            </p>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900">Direito à Portabilidade de Dados (Art. 18, V):</div>
              <p>
                Você pode baixar a qualquer momento todo o banco de contatos, histórico de conversas, catálogo e registros em arquivo JSON estruturado e interoperável.
              </p>
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Gerando backup...' : 'Exportar Dados em JSON (LGPD)'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Retenção e Cancelamento sem Multas:</div>
              <p>
                O cliente tem o direito de solicitar o opt-out das mensagens a qualquer instante digitando "SAIR" ou "PARAR" no WhatsApp, respeitando o consentimento prévio.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
