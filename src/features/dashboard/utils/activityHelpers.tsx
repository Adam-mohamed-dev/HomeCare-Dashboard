import { ArrowUpRight, FileText, UserPlus, XCircle } from 'lucide-react'

export const getActivityConfig = (type: string) => {
  switch (type) {
    case 'lead': 
      return { 
        icon: <ArrowUpRight size={16} className="text-emerald-600" />, 
        bg: "bg-emerald-50" 
      }
    case 'decline': 
      return { 
        icon: <XCircle size={16} className="text-red-500" />, 
        bg: "bg-red-50" 
      }
    case 'assignment': 
      return { 
        icon: <UserPlus size={16} className="text-primary" />, 
        bg: "bg-primary/5" 
      }
    case 'upload': 
      return { 
        icon: <FileText size={16} className="text-indigo-500" />, 
        bg: "bg-indigo-50" 
      }
    default: 
      return { 
        icon: <ArrowUpRight size={16} />, 
        bg: "bg-slate-50" 
      }
  }
}
