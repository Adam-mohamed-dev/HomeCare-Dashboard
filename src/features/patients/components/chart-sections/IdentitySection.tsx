import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { cn } from "../../../../lib/utils"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { PatientFormData } from "../../schemas/patientSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

interface IdentitySectionProps {
  register: UseFormRegister<PatientFormData>
  errors: FieldErrors<PatientFormData>
}

export function IdentitySection({ register, errors }: IdentitySectionProps) {
  const { t } = useTranslation('translation')

  return (
    <FormCard>
      <FormField label={t("onboarding.full_name_label")} error={errors.fullName}>
        <Input 
          {...register("fullName")}
          placeholder="e.g. Eleanor Vance" 
          className={cn("h-12 bg-slate-50 border-none rounded-xl", errors.fullName && "ring-2 ring-destructive")} 
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t("common.phone")} error={errors.phone}>
          <Input 
            {...register("phone")}
            placeholder="(555) 000-0000" 
            className={cn("h-12 bg-slate-50 border-none rounded-xl", errors.phone && "ring-2 ring-destructive")} 
          />
        </FormField>
        
        <FormField label={t("common.email")} error={errors.email}>
          <Input 
            {...register("email")}
            placeholder="eleanor.vance@example.com" 
            className={cn("h-12 bg-slate-50 border-none rounded-xl", errors.email && "ring-2 ring-destructive")} 
          />
        </FormField>
      </div>
    </FormCard>
  )
}
