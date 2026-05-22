import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface FormCardProps {
  children: ReactNode
  className?: string
}

export function FormCard({ children, className = "" }: FormCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col gap-6",
      className
    )}>
      {children}
    </div>
  )
}
