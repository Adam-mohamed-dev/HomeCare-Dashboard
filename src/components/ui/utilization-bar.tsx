import { cn } from "../../lib/utils"
import {
  getUtilizationBarColor,
  getUtilizationTextColor,
} from "../../lib/utilization"

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
  labelClassName,
}: UtilizationBarProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            getUtilizationBarColor(value)
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            "text-[12px] font-bold text-right transition-colors",
            getUtilizationTextColor(value),
            labelClassName
          )}
        >
          {value}% Capacity
        </span>
      )}
    </div>
  )
}
