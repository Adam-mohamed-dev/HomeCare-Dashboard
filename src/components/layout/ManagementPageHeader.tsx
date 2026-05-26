import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface ManagementPageHeaderProps {
  title: string
  description: string
  actions?: ReactNode
  className?: string
}

export function ManagementPageHeader({
  title,
  description,
  actions,
  className,
}: ManagementPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="text-slate-500 max-w-xl">{description}</p>
      </div>
      {actions}
    </div>
  )
}
