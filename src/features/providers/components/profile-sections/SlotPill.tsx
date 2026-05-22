import { useFormContext } from "react-hook-form"
import { Clock, MapPin, X, Lock } from "lucide-react"
import type { ProviderFormData } from "../../schemas/providerSchema"
import { cn } from "../../../../lib/utils"

interface SlotPillProps {
  dayIndex: number
  slotIndex: number
  onRemove: () => void
  isLocked?: boolean
}

export function SlotPill({ dayIndex, slotIndex, onRemove, isLocked }: SlotPillProps) {
  const { register } = useFormContext<ProviderFormData>()

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-2 sm:px-4 rounded-2xl transition-all duration-300 group/slot w-full sm:w-auto",
      isLocked 
        ? "bg-slate-50 border border-slate-200" 
        : "bg-primary/5 border border-primary/10 hover:bg-primary/10 shadow-sm shadow-primary/5"
    )}>
      <div className={cn(
        "flex items-center gap-2 text-[12px] font-bold w-full sm:w-auto justify-between sm:justify-start",
        isLocked ? "text-slate-400" : "text-primary"
      )}>
        <div className="flex items-center gap-2">
          {isLocked ? <Lock size={12} className="opacity-50" /> : <Clock size={12} />}
          <input 
            type="time" 
            disabled={isLocked}
            {...register(`availability.${dayIndex}.slots.${slotIndex}.startTime` as const)}
            className="bg-transparent border-none p-0 w-24 sm:w-28 focus:ring-0 text-start sm:text-center cursor-pointer disabled:cursor-not-allowed"
          />
        </div>
        <span className="opacity-50">→</span>
        <input 
          type="time" 
          disabled={isLocked}
          {...register(`availability.${dayIndex}.slots.${slotIndex}.endTime` as const)}
          className="bg-transparent border-none p-0 w-24 sm:w-28 focus:ring-0 text-start sm:text-center cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
      
      <div className={cn(
        "hidden sm:block h-4 w-[1px] mx-2",
        isLocked ? "bg-slate-200" : "bg-primary/20"
      )} />
      <div className={cn(
        "block sm:hidden w-full h-[1px] my-1",
        isLocked ? "bg-slate-200" : "bg-primary/10"
      )} />

      <div className="flex items-center justify-between w-full sm:w-auto gap-1.5">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className={isLocked ? "text-slate-300" : "text-primary/60"} />
          <input 
            placeholder="ZIP Code"
            disabled={isLocked}
            {...register(`availability.${dayIndex}.slots.${slotIndex}.zipCode` as const)}
            className={cn(
              "bg-transparent border-none p-0 w-full sm:w-20 text-[12px] font-bold focus:ring-0",
              isLocked ? "text-slate-400" : "text-slate-700 placeholder:text-primary/30"
            )}
          />
        </div>
        
        {!isLocked && (
          <button 
            type="button"
            onClick={onRemove}
            className="sm:ml-1 w-8 h-8 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center text-primary/40 hover:text-red-500 hover:bg-red-50 transition-all bg-white sm:bg-transparent shadow-sm sm:shadow-none"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
