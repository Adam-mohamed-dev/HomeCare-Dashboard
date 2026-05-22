import { cn } from "../../lib/utils"

interface UtilizationBarProps {
  value: number
  showLabel?: boolean
  className?: string
  labelClassName?: string
}

export function UtilizationBar({ 
  value, 
  showLabel = true, 
  className, 
  labelClassName 
}: UtilizationBarProps) {
  
  const getUtilizationColor = (v: number) => {
    if (v >= 90) return "bg-destructive"
    if (v >= 70) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getUtilizationTextColor = (v: number) => {
    if (v >= 90) return "text-destructive"
    if (v >= 70) return "text-amber-600"
    return "text-emerald-600"
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", getUtilizationColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn(
          "text-[12px] font-bold text-right transition-colors", 
          getUtilizationTextColor(value),
          labelClassName
        )}>
          {value}% Capacity
        </span>
      )}
    </div>
  )
}
