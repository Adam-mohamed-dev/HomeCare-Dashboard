import * as React from "react"
import { Filter, Check } from "lucide-react"
import { Button } from "./button"
import { cn } from "../../lib/utils"

export interface FilterOption {
  label: string
  value: string
  indicatorColor?: string
}

interface FilterPillProps {
  label: string
  value: string
  options: FilterOption[]
  onSelect: (value: string) => void
  icon?: React.ReactNode
  className?: string
  align?: "left" | "right"
  width?: string
}

export function FilterPill({
  label,
  value,
  options,
  onSelect,
  icon = <Filter size={16} />,
  className,
  align = "right",
  width = "w-40"
}: FilterPillProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Find current label
  const currentOption = options.find(opt => opt.value === value)
  const displayLabel = value === "all" || value === "All" ? label : currentOption?.label || value

  // Close on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={cn("relative flex-1 lg:flex-none", className)} ref={containerRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full rounded-full h-11 bg-white border-none shadow-sm ring-1 ring-slate-200 gap-2 font-medium text-slate-700 transition-all",
          value !== "all" && value !== "All" && "ring-primary text-primary"
        )}
      >
        {currentOption?.indicatorColor ? (
          <div className={cn("h-2 w-2 rounded-full", currentOption.indicatorColor)} />
        ) : (
          icon
        )}
        <span className="truncate">{displayLabel}</span>
      </Button>

      {isOpen && (
        <div 
          className={cn(
            "absolute top-12 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in slide-in-from-top-1",
            width,
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSelect(opt.value)
                setIsOpen(false)
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors text-slate-700 font-medium"
            >
              <div className="flex items-center gap-2">
                {opt.indicatorColor && (
                  <div className={cn("h-2 w-2 rounded-full", opt.indicatorColor)} />
                )}
                {opt.label}
              </div>
              {(value === opt.value) && (
                <Check size={14} className="text-primary shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
