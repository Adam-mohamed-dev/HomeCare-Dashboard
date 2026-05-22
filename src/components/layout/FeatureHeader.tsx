import React from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { cn } from "../../lib/utils"

interface FeatureHeaderProps {
  breadcrumbParent?: string
  breadcrumbParentLink?: string
  breadcrumbCurrent: string
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function FeatureHeader({
  breadcrumbParent,
  breadcrumbParentLink,
  breadcrumbCurrent,
  title,
  description,
  actions,
  className
}: FeatureHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-6", className)}>
      <div className="flex flex-col gap-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
          {breadcrumbParent && breadcrumbParentLink ? (
            <>
              <Link to={breadcrumbParentLink} className="hover:text-primary transition-colors">
                {breadcrumbParent}
              </Link>
              <ChevronRight size={14} />
            </>
          ) : null}
          <span className="text-slate-600">{breadcrumbCurrent}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
          {description && (
            <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
