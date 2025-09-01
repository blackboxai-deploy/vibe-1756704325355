import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Survey {
  id: string
  title: string
  city: string
  neighborhoods: string[]
  target: number
  deadline: string
  status: 'active' | 'completed' | 'paused'
  created_at: string
  updated_at: string
}

export interface Interview {
  id: string
  survey_id: string
  interviewer_id: string
  location: {
    lat: number
    lng: number
    address: string
  }
  responses: Record<string, any>
  status: 'pending' | 'completed' | 'synced'
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  role: 'interviewer' | 'admin'
  name: string
  phone: string
  created_at: string
}