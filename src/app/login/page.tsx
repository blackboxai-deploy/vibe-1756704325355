'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, TrendingUp, Users } from 'lucide-react'

declare global {
  interface Window {
    supabase: any
  }
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (role: 'interviewer' | 'admin') => {
    setLoading(true)
    
    // Mock login based on role
    if (role === 'interviewer') {
      localStorage.setItem('user_role', 'interviewer')
      localStorage.setItem('user_name', 'Entrevistador Demo')
      router.push('/interviewer/dashboard')
    } else {
      localStorage.setItem('user_role', 'admin')
      localStorage.setItem('user_name', 'Administrador Demo')
      router.push('/admin/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="mt-6 text-4xl font-bold text-white">London Pesquisas</h1>
          <p className="mt-2 text-blue-200 text-lg">Pesquisas Eleitorais Profissionais</p>
          <p className="mt-1 text-blue-300 text-sm">Coleta e Análise de Dados de Campo</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Bem-vindo</CardTitle>
            <CardDescription className="text-gray-600">
              Selecione seu perfil para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleLogin('interviewer')}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-14 text-lg font-medium"
            >
              {loading ? 'Carregando...' : '📊 Entrar como Entrevistador'}
            </Button>
            
            <Button
              onClick={() => handleLogin('admin')}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-14 text-lg font-medium"
            >
              {loading ? 'Carregando...' : '⚙️ Entrar como Administrador'}
            </Button>

            <div className="text-center space-y-2 mt-6">
              <p className="text-sm text-gray-500">Versão Demo</p>
              <p className="text-xs text-gray-400">
                Aplicativo PWA - Adicione à tela inicial do seu celular para experiência como app nativo
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/10 rounded-lg">
            <Users className="h-6 w-6 text-blue-200 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Campo</p>
            <p className="text-blue-200 text-xs">Entrevistadores</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-200 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Análise</p>
            <p className="text-blue-200 text-xs">em tempo real</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg">
            <MapPin className="h-6 w-6 text-purple-200 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">GPS</p>
            <p className="text-blue-200 text-xs">Validação automática</p>
          </div>
        </div>
      </div>
    </div>
  )
}