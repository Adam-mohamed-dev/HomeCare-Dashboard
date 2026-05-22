import { useTranslation } from "react-i18next"
import { MessageSquare, Phone, Mail } from "lucide-react"
import { cn } from "../../../../lib/utils"
import type { FieldErrors, UseFormSetValue } from "react-hook-form"
import type { PatientFormData } from "../../schemas/patientSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

interface OutreachSectionProps {
  currentCommMode: "text" | "phone" | "email"
  currentSlots: string[]
  errors: FieldErrors<PatientFormData>
  setValue: UseFormSetValue<PatientFormData>
}

export function OutreachSection({ currentCommMode, currentSlots, errors, setValue }: OutreachSectionProps) {
  const { t } = useTranslation('translation')
  const timingSlots = ["8AM - 10AM", "10AM - 12PM", "1PM - 3PM", "3PM - 5PM"]

  const toggleSlot = (slot: string) => {
    const newSlots = currentSlots.includes(slot)
      ? currentSlots.filter(s => s !== slot)
      : [...currentSlots, slot]
    setValue("timingSlots", newSlots, { shouldValidate: true })
  }

  return (
    <FormCard className="gap-8">
      <FormField label={t("onboarding.pref_comm_mode")} error={errors.communicationMode}>
        <div className="grid grid-cols-3 gap-4">
          <button 
            type="button"
            onClick={() => setValue("communicationMode", "text", { shouldValidate: true })}
            className={cn(
              "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all",
              currentCommMode === "text" ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-slate-50 text-slate-400"
            )}
          >
            <MessageSquare size={24} />
            <span className="text-[13px] font-bold">{t("onboarding.text_message")}</span>
          </button>
          <button 
            type="button"
            onClick={() => setValue("communicationMode", "phone", { shouldValidate: true })}
            className={cn(
              "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all",
              currentCommMode === "phone" ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-slate-50 text-slate-400"
            )}
          >
            <Phone size={24} />
            <span className="text-[13px] font-bold">{t("onboarding.phone_call")}</span>
          </button>
          <button 
            type="button"
            onClick={() => setValue("communicationMode", "email", { shouldValidate: true })}
            className={cn(
              "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all",
              currentCommMode === "email" ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-slate-50 text-slate-400"
            )}
          >
            <Mail size={24} />
            <span className="text-[13px] font-bold">{t("common.email")}</span>
          </button>
        </div>
      </FormField>

      <FormField label={t("onboarding.pref_timing_slots")} error={errors.timingSlots}>
        <div className="flex flex-wrap gap-3">
          {timingSlots.map(slot => (
            <button
              key={slot}
              type="button"
              onClick={() => toggleSlot(slot)}
              className={cn(
                "px-6 py-3 rounded-full text-[13px] font-bold transition-all",
                currentSlots.includes(slot) ? "bg-primary text-white" : "bg-slate-50 text-slate-400"
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </FormField>
    </FormCard>
  )
}
