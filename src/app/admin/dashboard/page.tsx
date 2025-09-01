"use client"

import { useState } from 'react'

interface Survey {
  id: string
  title: string
  city: string
  interviewers: number
  target: number
  completed: number
  status: 'active' | 'completed' | 'overdue'
  lastUpdate: string
}

interface Metric {
  label: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'stable'
}

export default function AdminDashboard() {
  const [surveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Pesquisa Intenção de Voto - São Paulo',
      city: 'São Paulo',
      interviewers: 12,
      target: 1200,
      completed: 856,
      status: 'active',
      lastUpdate: '2 horas atrás'
    },
    {
      id: '2',
      title: 'Avaliação Gestão Municipal - Campinas',
      city: 'Campinas',
      interviewers: 8,
      target: 800,
      completed: 800,
      status: 'completed',
      lastUpdate: '1 dia atrás'
    },
    {
      id: '3',
      title: 'Pesquisa de Opinião - Rio de Janeiro',
      city: 'Rio de Janeiro',
      interviewers: 15,
      target: 1500,
      completed: 324,
      status: 'active',
      lastUpdate: '5 horas atrás'
    }
  ])

  const [metrics] = useState<Metric[]>([
    { label: 'Pesquisas Ativas', value: 12, change: '+2', trend: 'up' },
    { label: 'Entrevistas Hoje', value: 234, change: '+45', trend: 'up' },
    { label: 'Taxa de Conclusão', value: '78%', change: '+5%', trend: 'up' },
    { label: 'Entrevistadores Ativos', value: 35, change: '+3', trend: 'up' }
  ])

  const calculateProgress = (completed: number, target: number) => {
    return Math.round((completed / target) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">LP</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">London Pesquisas</h1>
                <p className="text-sm text-gray-600">Dashboard Administrativo</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Nova Pesquisa
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Surveys List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Pesquisas Ativas</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {surveys.map((survey) => (
                  <div key={survey.id} className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between"
                    >
                      <div className="flex-1"
                      >
                        <h3 className="font-semibold text-gray-900 mb-1"
                        >{survey.title}</h3
                        >
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2"
                        >
                          <span>{survey.city}</span
                          >
                          <span>•</span
                          >
                          <span>{survey.interviewers} entrevistadores</span
                          >
                        </div
                        >
                        <div className="flex items-center justify-between mb-2"
                        >
                          <span className="text-sm text-gray-600"
                          >Progresso:</span
                          >
                          <span className="font-medium text-gray-900"
                          >{survey.completed}/{survey.target}</span
                          >
                        </div
                        >
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2"
                        >
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${calculateProgress(survey.completed, survey.target)}%` }}
                          ></div
                        >
                        </div
                        >
                        <div className="flex items-center gap-4 text-sm"
                        >
                          <span className="text-gray-500"
                          >Atualizado: {survey.lastUpdate}</span
                          >
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            survey.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}
                          >
                            {survey.status === 'completed' ? 'Concluída' : 'Em andamento'}
                          </span
                        >
                        </div
                      >
                      >
                    </div
                    >
                  </div
                >
                ))
              </div
            >
          </div

          {/* Map Section */}
          <div className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="p-4 border-b border-gray-100"
              >
                <h2 className="text-lg font-semibold text-gray-900"
                >Mapa de Atividades</h2
              >
              </div
              >
              <div className="aspect-square bg-gray-100 flex items-center justify-center"
              >
                <div className="text-center text-gray-500"
                >
                  <span className="text-4xl mb-2 block"
                  >🗺️</span
                  <p className="text-sm"
                  >Mapa interativo
                  <br /
                  >com localização
                  <br /
                  >das pesquisas
                  </p
                >
                </div
              >
              </div
            >
          </div
        </div

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4"
          >Ações Rápidas</h2
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2 block"
              >📊</span
              <p className="text-sm font-medium"
              >Gerar Relatório</p
            </button
            >
            <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2 block"
              >👥</span
              <p className="text-sm font-medium"
              >Gerenciar Entrevistadores</p
            </button
            <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mb-2 block"
              >📋</span
              <p className="text-sm font-medium"
              >Nova Pesquisa</p
            </button
          </div
        </div
      </div
    </div
  )
}