import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, description, children, className = "" }: FormSectionProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${className}`}>
      <div className="lg:col-span-4 lg:pt-8">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        {description && (
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="lg:col-span-8">
        {children}
      </div>
    </div>
  )
}
