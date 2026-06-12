import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { Select } from "../../../../components/ui/select"
import { cn } from "../../../../lib/utils"
import type { ProviderFormData } from "../../schemas/providerSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

export function CapacityFinancialSection() {
  const { t } = useTranslation()
  const { register, formState: { errors }, setValue } = useFormContext<ProviderFormData>()

  const payTypes = [
    { value: "flat_rate", label: "Per-Session Flat Rate" },
    { value: "hourly", label: "Hourly Rate" },
    { value: "monthly", label: "Monthly Salary" },
    { value: "contract_1099", label: "1099 Contractor" },
    { value: "w2_salary", label: "W2 Salaried" }
  ]

  return (
    <FormCard className="gap-8">
      <FormField 
        label={t("onboarding.capacity_label")} 
        error={errors.weeklyCapacity}
      >
        <Input 
          {...register("weeklyCapacity", { valueAsNumber: true })}
          placeholder="25" 
          className={cn(
            "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
            errors.weeklyCapacity && "ring-2 ring-destructive"
          )}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t("onboarding.pay_rate_label")} error={errors.payRate}>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <Input 
              {...register("payRate", { valueAsNumber: true })}
              placeholder="125.00" 
              className={cn(
                "h-12 bg-slate-50 border-none rounded-xl pl-8 pr-4 focus-visible:ring-primary",
                errors.payRate && "ring-2 ring-destructive"
              )}
            />
          </div>
        </FormField>
        
        <FormField label={t("onboarding.pay_type_label")} error={errors.payType}>
          <Select 
            options={payTypes}
            onValueChange={(val) => setValue("payType", val)}
            placeholder="Select type"
            className={cn(
              "h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary",
              errors.payType && "ring-2 ring-destructive"
            )}
          />
        </FormField>
      </div>
    </FormCard>
  )
}
