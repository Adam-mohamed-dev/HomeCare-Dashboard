import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input } from "../../../../components/ui/input"
import { cn } from "../../../../lib/utils"
import type { ProviderFormData } from "../../schemas/providerSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

import { useState } from "react"
import { SegmentedTabs } from "../../../../components/ui/segmented-tabs"

const MOCK_REGIONS = [
  { id: 'north', name: 'North Region', zips: ['90210', '90211', '90212', '90213', '90214'] },
  { id: 'downtown', name: 'Downtown', zips: ['90012', '90013', '90014', '90015'] },
  { id: 'west', name: 'Westside', zips: ['90024', '90025', '90401', '90402'] }
]

function ZipCodeSelector({ currentZips, onChange }: { currentZips: string[], onChange: (zips: string[]) => void }) {
  const [activeTab, setActiveTab] = useState<"area" | "zip">("area")

  const toggleRegionZips = (regionZips: string[], isAllSelected: boolean) => {
    if (isAllSelected) {
      onChange(currentZips.filter(z => !regionZips.includes(z)))
    } else {
      const newZips = new Set([...currentZips, ...regionZips])
      onChange(Array.from(newZips))
    }
  }

  const toggleZip = (zip: string) => {
    if (currentZips.includes(zip)) {
      onChange(currentZips.filter(z => z !== zip))
    } else {
      onChange([...currentZips, zip])
    }
  }

  const allZips = Array.from(new Set(MOCK_REGIONS.flatMap(r => r.zips))).sort()

  return (
    <div className="flex flex-col gap-4">
      <SegmentedTabs 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab as "area" | "zip")}
        tabs={[
          { id: "area", label: "By Area" },
          { id: "zip", label: "By Zip Code" }
        ]}
      />

      <div className="rounded-xl border-2 border-slate-100 bg-slate-50 overflow-hidden">
        {activeTab === "area" && (
          <div className="flex flex-col">
            {MOCK_REGIONS.map(region => {
              const selectedCount = region.zips.filter(z => currentZips.includes(z)).length
              const isAllSelected = selectedCount === region.zips.length
              const isIndeterminate = selectedCount > 0 && selectedCount < region.zips.length

              return (
                <label key={region.id} className="flex items-center gap-4 p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-100 cursor-pointer transition-colors">
                  <input 
                    type="checkbox"
                    ref={input => { if (input) input.indeterminate = isIndeterminate }}
                    checked={isAllSelected}
                    onChange={() => toggleRegionZips(region.zips, isAllSelected)}
                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{region.name}</span>
                    <span className="text-xs font-medium text-slate-400">
                      {selectedCount} of {region.zips.length} zips selected
                    </span>
                  </div>
                </label>
              )
            })}
          </div>
        )}

        {activeTab === "zip" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
            {allZips.map(zip => (
              <label key={zip} className="flex items-center gap-2 p-2 hover:bg-slate-200 rounded cursor-pointer transition-colors group">
                <input 
                  type="checkbox"
                  checked={currentZips.includes(zip)}
                  onChange={() => toggleZip(zip)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{zip}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function CoverageLogisticsSection() {
  const { t } = useTranslation()
  const { register, formState: { errors }, setValue, watch } = useFormContext<ProviderFormData>()
  
  const currentNetworks = watch("insuranceNetworks") || []
  const currentZips = watch("zipCodes") || []
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
        <div className={cn(errors.zipCodes && "ring-2 ring-destructive rounded-xl")}>
          <ZipCodeSelector 
            currentZips={currentZips} 
            onChange={(zips) => setValue("zipCodes", zips, { shouldValidate: true })} 
          />
        </div>
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
