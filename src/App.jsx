import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx'
import { InteractiveDashboard } from './components/InteractiveDashboard.jsx'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { 
  Home, 
  BarChart3, 
  Users, 
  FileText, 
  Award, 
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Shield,
  Target,
  Zap,
  Database
} from 'lucide-react'
import './App.css'

// Dados mockados para os gráficos
const progressData = [
  { name: 'CGE', progress: 85 },
  { name: 'SEMAGRO', progress: 72 },
  { name: 'SEAD', progress: 90 },
  { name: 'SES', progress: 68 },
  { name: 'SEDUC', progress: 78 },
  { name: 'SEJUSP', progress: 82 }
]

const statusData = [
  { name: 'Concluídas', value: 45, color: '#22c55e' },
  { name: 'Em Andamento', value: 30, color: '#3b82f6' },
  { name: 'Atrasadas', value: 15, color: '#ef4444' },
  { name: 'Pendentes', value: 10, color: '#f59e0b' }
]

const evolutionData = [
  { month: 'Jan', completed: 20 },
  { month: 'Fev', completed: 35 },
  { month: 'Mar', completed: 45 },
  { month: 'Abr', completed: 52 },
  { month: 'Mai', completed: 68 },
  { month: 'Jun', completed: 75 }
]

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const phases = [
    {
      id: 0,
      title: 'Transformação em Plano de Ação',
      description: 'Converter o conteúdo macro dos Programa de Compliance em um plano de ação estruturado.',
      objectives: [
        'Designação de responsáveis (execução e validação)',
        'Estabelecimento de prazos realistas e cronograma escalonado',
        'Previsão de evidência esperada',
        'Identificação de Eixos'
      ]
    },
    {
      id: 1,
      title: 'Execução e Acompanhamento',
      description: 'Iniciar o ciclo de execução do plano de ação no SIGP-Compliance.',
      objectives: [
        'Acompanhamento da Execução',
        'Validação técnica da execução',
        'Atualização do Painel de Monitoramento'
      ]
    },
    {
      id: 2,
      title: 'Validação Técnica Detalhada',
      description: 'Verificar, qualificar e registrar tecnicamente a conformidade das atividades.',
      objectives: [
        'Recebimento da Evidência',
        'Análise Técnica',
        'Classificação da Validação',
        'Comunicação Automática'
      ]
    },
    {
      id: 3,
      title: 'Detecção de Falhas e Ações Corretivas',
      description: 'Detectar falhas de execução, ausência de evidência, atrasos ou inconsistências.',
      objectives: [
        'E-mail automático + alerta no painel',
        'Contato direto com o responsável',
        'Agendamento de reunião técnica',
        'Ação formal de cobrança'
      ]
    },
    {
      id: 4,
      title: 'Reprogramação e Realinhamento',
      description: 'Procedimento para ajustar prazos, reformular atividades ou realinhar metas.',
      objectives: [
        'Solicitação de Reprogramação',
        'Análise técnica da UMPCP',
        'Aprovação/Devolução/Submissão',
        'Atualização do plano'
      ]
    },
    {
      id: 5,
      title: 'Avaliação Estratégica Periódica',
      description: 'Avaliar o desempenho global das unidades na execução dos Planos de Integridade.',
      objectives: [
        'Geração automática de dados',
        'Análise crítica da UMPCP',
        'Elaboração do Relatório',
        'Apresentação institucional'
      ]
    }
  ]

  const roles = [
    {
      title: 'Responsável pela Ação',
      responsibilities: [
        'Executar, atualizar status, enviar evidência',
        'Justificar ou atualizar imediatamente quando necessário'
      ],
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Unidade de Monitoramento (UMPCP)',
      responsibilities: [
        'Validar evidências, devolver quando necessário',
        'Registrar comentários técnicos'
      ],
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Comitê ou Alta Gestão',
      responsibilities: [
        'Visualizar painel consolidado e alertas críticos',
        'Avaliação institucional ou realinhamento'
      ],
      icon: <Target className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SIGP-Compliance</h1>
                <p className="text-sm text-gray-600">Sistema Integrado de Gestão da Política de Compliance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Sistema Ativo
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-gray-50">
              <TabsTrigger value="home" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </TabsTrigger>
              <TabsTrigger value="fases" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Fases</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="papeis" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Papéis</span>
              </TabsTrigger>
              <TabsTrigger value="estrategias" className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Estratégias</span>
              </TabsTrigger>
              <TabsTrigger value="relatorios" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Relatórios</span>
              </TabsTrigger>
            </TabsList>

            {/* Home Tab */}
            <TabsContent value="home" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {/* Hero Section */}
                <div className="text-center py-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Sistema Integrado de Gestão da Política de Compliance
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Desenvolvido para gestão, acompanhamento, validação e monitoramento estruturado dos 
                    Programas de Integridade Pública no Estado de Mato Grosso do Sul.
                  </p>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Acessar Sistema
                  </Button>
                </div>

                {/* Principais Objetivos */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                        <Target className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle>Formalizar Planejamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Transformar o planejamento institucional em estruturas operacionais monitoráveis
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <CardTitle>Acompanhar Implementação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Garantir que cada ação prevista seja acompanhada até sua implementação e validação
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-4">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle>Gerar Dados Estratégicos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Promover realinhamentos em tempo hábil e gerar dados estratégicos confiáveis
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Plataforma Tecnológica */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-blue-600" />
                      <span>Plataforma Tecnológica</span>
                    </CardTitle>
                    <CardDescription>
                      Construído sobre ambiente Microsoft 365
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <div className="bg-blue-600 p-2 rounded">
                          <Database className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-semibold">SharePoint</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <div className="bg-green-600 p-2 rounded">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-semibold">Power Automate</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                        <div className="bg-purple-600 p-2 rounded">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-semibold">Power BI</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fases Tab */}
            <TabsContent value="fases" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Fases do Sistema</h2>
                  <p className="text-gray-600">
                    O SIGP-Compliance opera através de 6 fases estruturadas para garantir o monitoramento completo.
                  </p>
                </div>

                <div className="grid gap-6">
                  {phases.map((phase) => (
                    <Card key={phase.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                            {phase.id}
                          </div>
                          <div>
                            <CardTitle className="text-xl">Fase {phase.id}: {phase.title}</CardTitle>
                            <CardDescription className="mt-2">{phase.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phase.objectives.map((objective, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard de Monitoramento</h2>
                  <p className="text-gray-600">
                    Acompanhe em tempo real o progresso das atividades de compliance.
                  </p>
                </div>

                <InteractiveDashboard />
              </div>
            </TabsContent>

            {/* Papéis Tab */}
            <TabsContent value="papeis" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Papéis e Responsabilidades</h2>
                  <p className="text-gray-600">
                    Definição clara dos papéis e responsabilidades de cada ator no sistema.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {roles.map((role, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            {role.icon}
                          </div>
                          <CardTitle className="text-lg">{role.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {role.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Critérios de Conformidade */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Critérios de Conformidade</CardTitle>
                    <CardDescription>
                      Uma atividade será considerada concluída quando:
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Tiver status "Concluída" atualizado pela unidade</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Estiver acompanhada de evidência válida</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Tiver sido validada tecnicamente no sistema</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Periodicidade */}
                <Card>
                  <CardHeader>
                    <CardTitle>Periodicidade de Acompanhamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span>O sistema opera com acompanhamento contínuo</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span>A UMPCP realiza revisões quinzenais das atividades</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                        <span>Relatórios mensais e trimestrais são consolidados automaticamente</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Estratégias Tab */}
            <TabsContent value="estrategias" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Estratégias de Persuasão</h2>
                  <p className="text-gray-600">
                    Utilização dos dados do SIGP-Compliance para estratégias de reconhecimento e incentivo.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-6 w-6 text-yellow-600" />
                        <span>Rankings de Integridade</span>
                      </CardTitle>
                      <CardDescription>Publicação bimestral baseada no painel Power BI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="font-semibold">1º SEAD</span>
                          <Badge className="bg-yellow-600">90% execução</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-semibold">2º CGE</span>
                          <Badge variant="secondary">85% execução</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-semibold">3º SEJUSP</span>
                          <Badge variant="secondary">82% execução</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-6 w-6 text-blue-600" />
                        <span>Boletins de Resultados</span>
                      </CardTitle>
                      <CardDescription>Divulgação periódica de desempenho por órgão</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold text-green-700">Destaque do Mês</h4>
                          <p className="text-sm text-gray-600">SEAD alcançou 100% de validação sem devoluções</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-blue-700">Melhoria Contínua</h4>
                          <p className="text-sm text-gray-600">SES reduziu em 50% as atividades atrasadas</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Selo Estadual */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-green-600" />
                      <span>Selo Estadual de Integridade</span>
                    </CardTitle>
                    <CardDescription>
                      Reconhecimento anual para órgãos com 90% ou mais de execução
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h4 className="font-semibold text-green-700">Selo Ouro</h4>
                        <p className="text-sm text-gray-600">95-100% execução</p>
                      </div>
                      <div className="text-center p-6 bg-yellow-50 rounded-lg">
                        <Shield className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                        <h4 className="font-semibold text-yellow-700">Selo Prata</h4>
                        <p className="text-sm text-gray-600">90-94% execução</p>
                      </div>
                      <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                        <h4 className="font-semibold text-orange-700">Selo Bronze</h4>
                        <p className="text-sm text-gray-600">85-89% execução</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados Estratégicos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Estratégicos Extraídos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span>Taxa de execução por unidade</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Validação sem devoluções</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          <span>Volume de reprogramações</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <BarChart3 className="h-5 w-5 text-purple-600" />
                          <span>Indicadores por eixo temático</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Relatórios Tab */}
            <TabsContent value="relatorios" className="mt-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Relatórios</h2>
                  <p className="text-gray-600">
                    Geração automática de relatórios consolidados para análise institucional.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-6 w-6 text-blue-600" />
                        <span>Relatório Mensal</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Consolidação mensal das atividades por unidade e eixo
                      </p>
                      <Button className="w-full">Gerar Relatório</Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-6 w-6 text-green-600" />
                        <span>Relatório Trimestral</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Análise trimestral de desempenho e tendências
                      </p>
                      <Button className="w-full" variant="outline">Gerar Relatório</Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-6 w-6 text-purple-600" />
                        <span>Relatório Anual</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        Relatório completo anual para alta gestão
                      </p>
                      <Button className="w-full" variant="outline">Gerar Relatório</Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Histórico de Relatórios */}
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Relatórios</CardTitle>
                    <CardDescription>
                      Relatórios gerados anteriormente disponíveis para download
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Relatório Mensal - Junho 2024</h4>
                          <p className="text-sm text-gray-600">Gerado em 01/07/2024</p>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Relatório Trimestral - Q2 2024</h4>
                          <p className="text-sm text-gray-600">Gerado em 05/07/2024</p>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Relatório Mensal - Maio 2024</h4>
                          <p className="text-sm text-gray-600">Gerado em 01/06/2024</p>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </nav>
    </div>
  )
}

export default App

