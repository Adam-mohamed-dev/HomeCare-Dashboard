import { useState, useRef, useEffect } from "react"
import { MapPin, ChevronDown, Check, X } from "lucide-react"
import { cn } from "../../../../lib/utils"

interface ZipCodeDropdownProps {
  value: string
  selectedZips: string[]
  onChange: (zip: string) => void
  disabled?: boolean
}

export function ZipCodeDropdown({ value, selectedZips, onChange, disabled }: ZipCodeDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const clearValue = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1.5 text-[12px] font-bold focus:outline-none",
          disabled ? "text-slate-400 cursor-not-allowed" : "text-slate-700 cursor-pointer"
        )}
      >
        <MapPin size={12} className={disabled ? "text-slate-300" : "text-primary/60"} />
        <span className="min-w-[3ch]">{value || "ZIP Code"}</span>
        {value ? (
          <button type="button" onClick={clearValue} className="hover:text-red-500 transition-colors">
            <X size={10} />
          </button>
        ) : (
          <ChevronDown size={10} className={open ? "rotate-180" : ""} />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          {selectedZips.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs font-medium text-slate-400">
              No ZIP codes selected
            </div>
          ) : (
            <div className="py-1">
              {selectedZips.map((zip) => {
                const isSelected = value === zip
                return (
                  <button
                    key={zip}
                    type="button"
                    onClick={() => { onChange(zip); setOpen(false) }}
                    className={cn(
                      "flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium transition-colors text-left",
                      isSelected
                        ? "text-primary bg-primary/5"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span className={cn(
                      "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0",
                      isSelected
                        ? "bg-primary border-primary"
                        : "border-slate-300"
                    )}>
                      {isSelected && <Check size={9} className="text-white" />}
                    </span>
                    {zip}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
