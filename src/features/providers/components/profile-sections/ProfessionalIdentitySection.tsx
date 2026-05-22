import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { Select } from "../../../../components/ui/select"
import { cn } from "../../../../lib/utils"
import type { ProviderFormData } from "../../schemas/providerSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

export function ProfessionalIdentitySection() {
  const { t } = useTranslation('translation')
  const { register, formState: { errors }, setValue } = useFormContext<ProviderFormData>()
  
  const disciplines = [
    { value: "clinical_psychologist", label: t("common.discipline_np") }, // Placeholder
    { value: "physical_therapist", label: t("common.discipline_pt") },
    { value: "occupational_therapist", label: t("common.discipline_ot") },
    { value: "speech_pathologist", label: t("common.discipline_slp") },
    { value: "registered_nurse", label: t("common.discipline_rn") },
    { value: "nurse_practitioner", label: t("common.discipline_np") },
    { value: "social_worker", label: t("common.discipline_sw") }
  ]

  return (
    <FormCard>
      <FormField label={t("onboarding.full_name_label")} error={errors.fullName}>
        <Input
          {...register("fullName")}
          placeholder="Dr. Julianne Moore"
          className={cn(
            "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
            errors.fullName && "ring-2 ring-destructive"
          )}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t("common.npi_number")} error={errors.npiNumber}>
          <Input
            {...register("npiNumber")}
            placeholder="10-digit NPI"
            className={cn(
              "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
              errors.npiNumber && "ring-2 ring-destructive"
            )}
          />
        </FormField>
        
        <FormField label={t("onboarding.discipline_label")} error={errors.primaryDiscipline}>
          <Select
            options={disciplines}
            onValueChange={(val) => setValue("primaryDiscipline", val)}
            placeholder="Select discipline"
            className={cn(
              "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
              errors.primaryDiscipline && "ring-2 ring-destructive"
            )}
          />
        </FormField>
      </div>

      <FormField label={t("onboarding.specialized_services_label")}>
        <Input
          {...register("specializedServices")}
          placeholder="e.g. EMDR, CBT, Child Adolescent"
          className="h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary"
        />
      </FormField>
    </FormCard>
  )
}
