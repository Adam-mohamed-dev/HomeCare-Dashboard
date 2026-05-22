import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { cn } from "../../../../lib/utils"
import type { ProviderFormData } from "../../schemas/providerSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

export function CoverageLogisticsSection() {
  const { t } = useTranslation()
  const { register, formState: { errors }, setValue, watch } = useFormContext<ProviderFormData>()
  
  const currentNetworks = watch("insuranceNetworks") || []
  const networks = ["Aetna PPO", "Blue Cross", "UnitedHealth", "Medicare"]

  const toggleNetwork = (network: string) => {
    const next = currentNetworks.includes(network)
      ? currentNetworks.filter(n => n !== network)
      : [...currentNetworks, network]
    setValue("insuranceNetworks", next)
  }

  return (
    <FormCard className="gap-8">
      <FormField label={t("onboarding.zip_codes_label")} error={errors.zipCodes}>
        <Input 
          {...register("zipCodes")}
          placeholder="e.g. 90210, 90211" 
          className={cn(
            "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
            errors.zipCodes && "ring-2 ring-destructive"
          )}
        />
      </FormField>

      <FormField label={t("onboarding.insurance_networks_label")} error={errors.insuranceNetworks}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {networks.map((network) => (
            <label 
              key={network}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2",
                currentNetworks.includes(network) 
                  ? "bg-primary/5 border-primary/20 shadow-sm shadow-primary/5" 
                  : "bg-slate-50 border-transparent hover:bg-slate-100",
                errors.insuranceNetworks && "border-destructive/20 bg-destructive/5"
              )}
            >
              <input 
                type="checkbox" 
                checked={currentNetworks.includes(network)}
                onChange={() => toggleNetwork(network)}
                className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className={cn(
                "text-sm font-bold",
                currentNetworks.includes(network) ? "text-primary" : "text-slate-600"
              )}>{network}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label={t("onboarding.languages_label")} error={errors.languagesSpoken}>
        <Input 
          {...register("languagesSpoken")}
          placeholder="English, Spanish, etc." 
          className={cn(
            "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
            errors.languagesSpoken && "ring-2 ring-destructive"
          )}
        />
      </FormField>
    </FormCard>
  )
}
