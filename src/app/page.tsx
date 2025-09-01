"use client"

import { useState } from 'react'
import { User, Shield, MapPin, FileText, BarChart3 } from 'lucide-react'

export default function LoginPage() {
  const [role, setRole] = useState<'interviewer' | 'admin' | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (selectedRole: 'interviewer' | 'admin') => {
    setIsLoading(true)
    setRole(selectedRole)
    
    setTimeout(() => {
      window.location.href = selectedRole === 'admin' ? '/admin/dashboard' : '/interviewer/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-2xl">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">London Pesquisas</h1>
          <p className="text-blue-200">Pesquisas eleitorais e análise política</p>
        </div>

        {/* Main Card */}
        <div className="bg-white backdrop-blur-sm bg-opacity-90 rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Escolha seu perfil</h2>
            <p className="text-gray-600 text-sm">Entre como entrevistador ou administrador</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('interviewer')}
              disabled={isLoading}
              className="w-full flex items-center gap-4 p-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-white shadow-lg"
            >
              <User className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold text-lg">Entrevistador</div>
                <div className="text-blue-100 text-sm">Para pesquisas em campo</div>
              </div>
              <div className="ml-auto">
                <MapPin className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={() => handleLogin('admin')}
              disabled={isLoading}
              className="w-full flex items-center gap-4 p-6 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-500 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-white shadow-lg"
            >
              <Shield className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold text-lg">Administrador</div>
                <div className="text-slate-300 text-sm">Dashboard e relatórios</div>
              </div>
              <div className="ml-auto">
                <FileText className="w-5 h-5" />
              </div>
            </button>
          </div>

          {isLoading && (
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                Redirecionando...
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Para login de demonstração, escolha qualquer perfil acima
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Sistema operando normalmente
          </div>
        </div>
      </div>
    </div>
  )
}