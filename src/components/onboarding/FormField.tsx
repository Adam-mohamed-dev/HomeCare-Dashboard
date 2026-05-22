import type { ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface FormFieldProps {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
  children: ReactNode
  className?: string
  required?: boolean
  description?: string
}

export function FormField({ 
  label, 
  error, 
  children, 
  className = "", 
  required,
  description 
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-700">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        {description && (
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            {description}
          </span>
        )}
      </div>
      
      {children}

      {error && (
        <span className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
          <AlertCircle size={12} /> {error.message}
        </span>
      )}
    </div>
  )
}
