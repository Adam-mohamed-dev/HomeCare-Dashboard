import { ArrowUpRight, FileText, UserPlus, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'

type ActivityConfig = { icon: ReactNode, bg: string }

const ACTIVITY_CONFIG_MAP: Record<string, ActivityConfig> = {
  lead: { 
    icon: <ArrowUpRight size={16} className="text-emerald-600" />, 
    bg: "bg-emerald-50" 
  },
  decline: { 
    icon: <XCircle size={16} className="text-red-500" />, 
    bg: "bg-red-50" 
  },
  assignment: { 
    icon: <UserPlus size={16} className="text-primary" />, 
    bg: "bg-primary/5" 
  },
  upload: { 
    icon: <FileText size={16} className="text-indigo-500" />, 
    bg: "bg-indigo-50" 
  }
}

const DEFAULT_CONFIG: ActivityConfig = { 
  icon: <ArrowUpRight size={16} />, 
  bg: "bg-slate-50" 
}

export const getActivityConfig = (type: string): ActivityConfig => {
  return ACTIVITY_CONFIG_MAP[type.toLowerCase()] || DEFAULT_CONFIG
}
