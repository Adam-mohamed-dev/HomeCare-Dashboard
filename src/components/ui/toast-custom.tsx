import { useState, createContext, useContext, useCallback } from 'react'
import { AlertCircle, X, CheckCircle2, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

type ToastType = 'urgent' | 'success' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
  title?: string
}

interface ToastContextType {
  toast: (message: string, options?: { title?: string; type?: ToastType }) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, options?: { title?: string; type?: ToastType }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, title: options?.title, type: options?.type || 'info' }])
    
    // Auto remove
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
        {toasts.map((t) => (
          <div 
            key={t.id}
            className={cn(
              "pointer-events-auto w-full bg-white rounded-2xl shadow-2xl border p-4 flex items-start gap-4 animate-in slide-in-from-right-10 fade-in duration-300",
              t.type === 'urgent' ? "border-red-100" : t.type === 'success' ? "border-emerald-100" : "border-slate-100"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              t.type === 'urgent' ? "bg-red-50 text-red-500" : t.type === 'success' ? "bg-emerald-50 text-emerald-500" : "bg-primary/5 text-primary"
            )}>
              {t.type === 'urgent' ? <AlertCircle size={20} /> : t.type === 'success' ? <CheckCircle2 size={20} /> : <Info size={20} />}
            </div>
            
            <div className="flex-1 pt-0.5">
              {t.title && <h5 className="text-sm font-bold text-slate-900 mb-0.5">{t.title}</h5>}
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.message}</p>
            </div>

            <button 
              onClick={() => removeToast(t.id)}
              className="text-slate-300 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
