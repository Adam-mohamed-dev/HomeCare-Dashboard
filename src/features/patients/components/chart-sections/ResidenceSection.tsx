import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { Select } from "../../../../components/ui/select"
import { cn } from "../../../../lib/utils"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { PatientFormData } from "../../schemas/patientSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

interface ResidenceSectionProps {
  register: UseFormRegister<PatientFormData>
  errors: FieldErrors<PatientFormData>
}

export function ResidenceSection({ register, errors }: ResidenceSectionProps) {
  const { t } = useTranslation('translation')

  return (
    <FormCard>
      <FormField label={t("common.address")} error={errors.address}>
        <Input 
          {...register("address")}
          placeholder="123 Serenity Lane" 
          className={cn("h-12 bg-slate-50 border-none rounded-xl", errors.address && "ring-2 ring-destructive")} 
        />
      </FormField>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField label={t("onboarding.city")} error={errors.city}>
          <Input 
            {...register("city")}
            placeholder="Asheville" 
            className={cn("h-12 bg-slate-50 border-none rounded-xl", errors.city && "ring-2 ring-destructive")} 
          />
        </FormField>
        
        <FormField label={t("onboarding.state")} error={errors.state}>
          <Select {...register("state")} className={cn(errors.state && "ring-2 ring-destructive")}>
            <option value="">Select State</option>
            <option value="NC">North Carolina</option>
          </Select>
        </FormField>
        
        <FormField label={t("common.zip_code")} error={errors.zipCode}>
          <Input 
            {...register("zipCode")}
            placeholder="28801" 
            className={cn("h-12 bg-slate-50 border-none rounded-xl", errors.zipCode && "ring-2 ring-destructive")} 
          />
        </FormField>
      </div>
    </FormCard>
  )
}
