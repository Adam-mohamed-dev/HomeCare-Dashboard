import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { Select } from "../../../../components/ui/select"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormField label={t("onboarding.full_name_label")} error={errors.fullName}>
          <Input 
            {...register("fullName")}
            placeholder="e.g. Eleanor Vance" 
            className={cn("h-12 bg-slate-50 border-none rounded-xl", errors.fullName && "ring-2 ring-destructive")} 
          />
        </FormField>
        
        <FormField label={t("onboarding.gender_label", { defaultValue: "Gender" })} error={errors.gender}>
          <Select 
            {...register("gender")}
            className={cn(errors.gender && "ring-2 ring-destructive")}
            defaultValue=""
          >
            <option value="" disabled>{t("common.select_gender", { defaultValue: "Select gender..." })}</option>
            <option value="male">{t("common.male", { defaultValue: "Male" })}</option>
            <option value="female">{t("common.female", { defaultValue: "Female" })}</option>
          </Select>
        </FormField>
      </div>

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

      <div className="mt-6">
        <FormField label="Insurance Provider" error={errors.insuranceProvider}>
          <Select 
            {...register("insuranceProvider")}
            className={cn(errors.insuranceProvider && "ring-2 ring-destructive")}
          >
            <option value="" disabled>Select insurance...</option>
            <option value="Aetna">Aetna</option>
            <option value="Aetna PPO">Aetna PPO</option>
            <option value="Blue Cross">Blue Cross</option>
            <option value="Blue Shield PPO">Blue Shield PPO</option>
            <option value="Cigna">Cigna</option>
            <option value="Medicare">Medicare</option>
            <option value="Medicare Part A">Medicare Part A</option>
            <option value="Medicare Part B">Medicare Part B</option>
            <option value="UnitedHealthcare">UnitedHealthcare</option>
            <option value="UnitedHealth">UnitedHealth</option>
          </Select>
        </FormField>
      </div>
    </FormCard>
  )
}
