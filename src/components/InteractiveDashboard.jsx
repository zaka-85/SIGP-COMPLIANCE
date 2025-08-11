import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
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
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

// Dados mockados expandidos
const allProgressData = [
  { name: 'CGE', progress: 85, unit: 'CGE', axis: 'Integridade', status: 'Ativo' },
  { name: 'SEMAGRO', progress: 72, unit: 'SEMAGRO', axis: 'Gestão de Riscos', status: 'Ativo' },
  { name: 'SEAD', progress: 90, unit: 'SEAD', axis: 'Integridade', status: 'Ativo' },
  { name: 'SES', progress: 68, unit: 'SES', axis: 'Gestão de Riscos', status: 'Pendente' },
  { name: 'SEDUC', progress: 78, unit: 'SEDUC', axis: 'Integridade', status: 'Ativo' },
  { name: 'SEJUSP', progress: 82, unit: 'SEJUSP', axis: 'Gestão de Riscos', status: 'Ativo' },
  { name: 'SEMAC', progress: 65, unit: 'SEMAC', axis: 'Integridade', status: 'Atrasado' },
  { name: 'SEINFRA', progress: 88, unit: 'SEINFRA', axis: 'Gestão de Riscos', status: 'Ativo' }
]

const statusData = [
  { name: 'Concluídas', value: 45, color: '#22c55e' },
  { name: 'Em Andamento', value: 30, color: '#3b82f6' },
  { name: 'Atrasadas', value: 15, color: '#ef4444' },
  { name: 'Pendentes', value: 10, color: '#f59e0b' }
]

const evolutionData = [
  { month: 'Jan', completed: 20, validated: 18, pending: 5 },
  { month: 'Fev', completed: 35, validated: 32, pending: 8 },
  { month: 'Mar', completed: 45, validated: 41, pending: 6 },
  { month: 'Abr', completed: 52, validated: 48, pending: 9 },
  { month: 'Mai', completed: 68, validated: 62, pending: 12 },
  { month: 'Jun', completed: 75, validated: 70, pending: 8 }
]

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Atividade Vencida',
    description: 'SEMAGRO - Política de Integridade vencida há 5 dias',
    unit: 'SEMAGRO',
    days: 5
  },
  {
    id: 2,
    type: 'warning',
    title: 'Validação Pendente',
    description: 'SES - Evidência aguardando validação há 3 dias',
    unit: 'SES',
    days: 3
  },
  {
    id: 3,
    type: 'critical',
    title: 'Inatividade Prolongada',
    description: 'SEMAC - Sem interação há 15 dias',
    unit: 'SEMAC',
    days: 15
  },
  {
    id: 4,
    type: 'warning',
    title: 'Prazo Próximo',
    description: 'SEDUC - Atividade vence em 2 dias',
    unit: 'SEDUC',
    days: 2
  }
]

export function InteractiveDashboard() {
  const [filters, setFilters] = useState({
    unit: 'all',
    axis: 'all',
    status: 'all',
    period: 'current'
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filtrar dados baseado nos filtros selecionados
  const filteredProgressData = allProgressData.filter(item => {
    if (filters.unit !== 'all' && item.unit !== filters.unit) return false
    if (filters.axis !== 'all' && item.axis !== filters.axis) return false
    if (filters.status !== 'all' && item.status !== filters.status) return false
    return true
  })

  const filteredAlerts = alerts.filter(alert => {
    if (filters.unit !== 'all' && alert.unit !== filters.unit) return false
    return true
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleExport = () => {
    // Simular exportação
    const data = {
      filters,
      progressData: filteredProgressData,
      alerts: filteredAlerts,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </CardTitle>
              <CardDescription>
                Personalize a visualização dos dados
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Atualizando...' : 'Atualizar'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Unidade</label>
              <Select value={filters.unit} onValueChange={(value) => setFilters({...filters, unit: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as unidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as unidades</SelectItem>
                  <SelectItem value="CGE">CGE</SelectItem>
                  <SelectItem value="SEMAGRO">SEMAGRO</SelectItem>
                  <SelectItem value="SEAD">SEAD</SelectItem>
                  <SelectItem value="SES">SES</SelectItem>
                  <SelectItem value="SEDUC">SEDUC</SelectItem>
                  <SelectItem value="SEJUSP">SEJUSP</SelectItem>
                  <SelectItem value="SEMAC">SEMAC</SelectItem>
                  <SelectItem value="SEINFRA">SEINFRA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Eixo</label>
              <Select value={filters.axis} onValueChange={(value) => setFilters({...filters, axis: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os eixos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os eixos</SelectItem>
                  <SelectItem value="Integridade">Política de Integridade</SelectItem>
                  <SelectItem value="Gestão de Riscos">Gestão de Riscos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Período</label>
              <Select value={filters.period} onValueChange={(value) => setFilters({...filters, period: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Período atual" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Período atual</SelectItem>
                  <SelectItem value="last_month">Último mês</SelectItem>
                  <SelectItem value="last_quarter">Último trimestre</SelectItem>
                  <SelectItem value="last_year">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards com animação */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Atividades Concluídas</p>
                <p className="text-3xl font-bold text-green-600 animate-pulse">142</p>
                <p className="text-xs text-green-600 mt-1">↑ +12% este mês</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Validações Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">28</p>
                <p className="text-xs text-yellow-600 mt-1">↓ -5% este mês</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ações Atrasadas</p>
                <p className="text-3xl font-bold text-red-600">15</p>
                <p className="text-xs text-red-600 mt-1">↑ +3% este mês</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unidades Ativas</p>
                <p className="text-3xl font-bold text-blue-600">{filteredProgressData.length}</p>
                <p className="text-xs text-blue-600 mt-1">Filtradas de {allProgressData.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos com dados filtrados */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Progresso por Unidade</CardTitle>
            <CardDescription>
              {filteredProgressData.length} unidade(s) selecionada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, 'Progresso']}
                  labelFormatter={(label) => `Unidade: ${label}`}
                />
                <Bar 
                  dataKey="progress" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Distribuição de Status</CardTitle>
            <CardDescription>
              Visão geral do status das atividades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas filtrados */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Alertas Críticos</span>
              <Badge variant="destructive">{filteredAlerts.filter(a => a.type === 'critical').length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 transition-all hover:shadow-md ${
                  alert.type === 'critical' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-yellow-500 bg-yellow-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{alert.title}</h4>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                  <Badge variant={alert.type === 'critical' ? 'destructive' : 'secondary'}>
                    {alert.days}d
                  </Badge>
                </div>
              </div>
            ))}
            {filteredAlerts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p>Nenhum alerta para os filtros selecionados</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>
              Tendência de atividades concluídas e validadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  name="Concluídas"
                />
                <Line 
                  type="monotone" 
                  dataKey="validated" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Validadas"
                />
                <Line 
                  type="monotone" 
                  dataKey="pending" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Pendentes"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

