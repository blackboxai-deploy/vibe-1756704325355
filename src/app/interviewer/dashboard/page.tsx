"use client"

import { useState, useEffect } from 'react'

interface Survey {
  id: string
  title: string
  city: string
  neighborhood?: string
  target: number
  completed: number
  deadline: string
  status: 'active' | 'completed' | 'overdue'
}

interface Interview {
  id: string
  surveyTitle: string
  status: 'in_progress' | 'completed' | 'pending_sync'
  lastUpdate: string
}

export default function InterviewerDashboard() {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Pesquisa de Intenção de Voto - Prefeitura São Paulo',
      city: 'São Paulo',
      neighborhood: 'Centro',
      target: 100,
      completed: 45,
      deadline: '2024-12-15',
      status: 'active'
    },
    {
      id: '2',
      title: 'Avaliação da Gestão Municipal - Cidade Exemplo',
      city: 'Campinas',
      target: 50,
      completed: 50,
      deadline: '2024-12-10',
      status: 'completed'
    }
  ])

  const [onlineStatus, setOnlineStatus] = useState(true)
  const [pendingSync, setPendingSync] = useState(0)
  const [todayGoal, setTodayGoal] = useState({ target: 15, completed: 8 })

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const calculateProgress = (completed: number, target: number) => {
    return Math.round((completed / target) * 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 safe-area-top">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard Entrevistador</h1>
          <div className={`flex items-center gap-2 text-xs px-2 py-1 rounded-full ${onlineStatus ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-green-300' : 'bg-red-300'}`}></div>
            {onlineStatus ? 'Online' : `Offline (${pendingSync})`}
          </div>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">Resumo de Hoje</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Meta diária:</span>
            <span className="font-bold text-blue-600">{todayGoal.completed}/{todayGoal.target}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${calculateProgress(todayGoal.completed, todayGoal.target)}%` }}
            ></div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Lembrete: Pesquisa SP vence em 3 dias</p>
              <p className="text-yellow-700">Meta: 55 restantes</p>
            </div>
          </div>
        </div>

        {/* Surveys List */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Pesquisas Ativas</h2>
          <div className="space-y-3">
            {surveys.map((survey) => (
              <div key={survey.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{survey.title}</h3>
                    <p className="text-xs text-gray-600">{survey.city} {survey.neighborhood && `- ${survey.neighborhood}`}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${survey.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {survey.status === 'completed' ? 'Concluída' : 'Ativa'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progresso:</span>
                    <span className="font-medium">{survey.completed}/{survey.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${calculateProgress(survey.completed, survey.target)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Prazo: {formatDate(survey.deadline)}
                  </div>
                </div>

                {survey.status !== 'completed' && (
                  <button className="w-full mt-3 bg-blue-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Continuar Pesquisa
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Map Section Placeholder */}
        <div className="mt-6">
          <h2 className="font-semibold text-gray-900 mb-3">Área de Atuação</h2>
          <div className="bg-white rounded-lg shadow-sm p-4 h-32 flex items-center justify-center border border-gray-100">
            <div className="text-center text-gray-500">
              <span className="text-2xl mb-1 block">🗺️</span>
              <p className="text-sm text-gray-600">Mapa será carregado<br />quando estiver online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}