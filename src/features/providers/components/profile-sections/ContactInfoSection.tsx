import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { cn } from "../../../../lib/utils"
import type { ProviderFormData } from "../../schemas/providerSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

export function ContactInfoSection() {
  const { t } = useTranslation('translation')
  const { register, formState: { errors } } = useFormContext<ProviderFormData>()

  return (
    <FormCard className="gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t("common.email")} error={errors.email}>
          <Input 
            {...register("email")}
            placeholder="julianne.m@healthcare.com" 
            className={cn(
              "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
              errors.email && "ring-2 ring-destructive"
            )}
          />
        </FormField>
        
        <FormField label={t("common.phone")} error={errors.phone}>
          <Input 
            {...register("phone")}
            placeholder="(555) 000-0000" 
            className={cn(
              "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
              errors.phone && "ring-2 ring-destructive"
            )}
          />
        </FormField>
      </div>
    </FormCard>
  )
}
