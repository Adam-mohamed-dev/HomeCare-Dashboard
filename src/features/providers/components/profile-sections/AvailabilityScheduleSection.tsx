import { useFieldArray, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Plus, Calendar, AlertCircle, Lock, Unlock } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { cn } from "../../../../lib/utils"
import type { ProviderFormData } from "../../schemas/providerSchema"
import { SlotPill } from "./SlotPill"
import { DAYS_OF_WEEK } from "../../constants"

export function AvailabilityScheduleSection() {
  const { t } = useTranslation()
  const { control, watch, setValue } = useFormContext<ProviderFormData>()
  
  const { fields } = useFieldArray({
    control,
    name: "availability"
  })

  const isLocked = watch("isScheduleLocked")

  return (
    <div className="flex flex-col gap-6">
      {/* Admin Lock Toggle */}
      <div className={cn(
        "flex items-center justify-between p-6 rounded-[32px] border transition-all duration-500",
        isLocked 
          ? "bg-red-50/50 border-red-100 shadow-sm" 
          : "bg-emerald-50/30 border-emerald-100/50"
      )}>
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
            isLocked ? "bg-red-500 text-white shadow-lg shadow-red-200" : "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
          )}>
            {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-slate-900">{t("onboarding.lock_schedule")}</h4>
            <p className="text-xs text-slate-500">{t("onboarding.lock_schedule_desc")}</p>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => setValue("isScheduleLocked", !isLocked)}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            isLocked ? "bg-red-500" : "bg-slate-200"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              isLocked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>

      <div className={cn(
        "bg-slate-50/50 rounded-[32px] p-2 border border-slate-100/50 transition-opacity duration-500",
        isLocked && "opacity-80 pointer-events-none grayscale-[0.5]"
      )}>
        {isLocked && (
          <div className="flex items-center gap-2 px-4 py-3 mb-2 bg-red-50/50 border border-red-100 rounded-2xl text-red-600 text-[11px] font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={14} />
            {t("onboarding.schedule_locked_warning")}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-2">
          {fields.map((field, dayIndex) => (
            <DayRow 
              key={field.id}
              dayIndex={dayIndex}
              dayId={field.day}
              isLocked={isLocked}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function DayRow({ dayIndex, dayId, isLocked }: { dayIndex: number, dayId: string, isLocked: boolean }) {
  const { t } = useTranslation()
  const { control } = useFormContext<ProviderFormData>()
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: `availability.${dayIndex}.slots`
  })

  const dayConfig = DAYS_OF_WEEK.find(d => d.id === dayId)
  const label = dayConfig ? t(`common.${dayConfig.labelKey}` as any) : dayId
  const hasSlots = fields.length > 0

  return (
    <div className={cn(
      "group flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-3xl transition-all duration-300",
      hasSlots ? "bg-white shadow-sm ring-1 ring-slate-100" : "hover:bg-white/50",
      isLocked && "border-slate-100"
    )}>
      {/* Day Label - Fixed Width */}
      <div className="flex items-center gap-3 md:w-40 shrink-0 md:pt-1">
        <div className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500",
          hasSlots ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-slate-300 border border-slate-100",
          isLocked && hasSlots && "bg-slate-400 shadow-none"
        )}>
          <Calendar size={18} />
        </div>
        <span className={cn(
          "font-bold text-sm",
          hasSlots ? "text-slate-900" : "text-slate-400",
          isLocked && hasSlots && "text-slate-500"
        )}>{label}</span>
      </div>

      {/* Slots Area - Flexible */}
      <div className="flex-1 flex flex-wrap gap-3 items-center">
        {fields.map((field, slotIndex) => (
          <SlotPill 
            key={field.id}
            dayIndex={dayIndex}
            slotIndex={slotIndex}
            onRemove={() => remove(slotIndex)}
            isLocked={isLocked}
          />
        ))}

        {!isLocked && (
          <Button 
            type="button"
            variant="ghost"
            onClick={() => append({ startTime: "09:00", endTime: "17:00", zipCode: "" })}
            className="h-10 px-4 rounded-2xl border-2 border-dashed border-slate-100 hover:border-primary/30 hover:bg-primary/5 text-slate-400 hover:text-primary transition-all gap-2"
          >
            <Plus size={16} />
            <span className="text-xs font-bold">{t("onboarding.add_slot")}</span>
          </Button>
        )}
      </div>

      {!hasSlots && (
        <div className="hidden md:flex items-center gap-2 text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <AlertCircle size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">{t("onboarding.off_day")}</span>
        </div>
      )}
    </div>
  )
}
