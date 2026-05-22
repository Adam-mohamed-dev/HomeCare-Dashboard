import { Search, MapPin, ShieldCheck, Calendar } from "lucide-react"
import { useTranslation } from "react-i18next"
import { INSURANCE_OPTIONS, AVAILABILITY_OPTIONS } from "../../shared/constants"
import { Input } from "../../../components/ui/input"
import { FilterPill } from "../../../components/ui/filter-pill"

interface ProviderMatchFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  zipCode: string
  setZipCode: (value: string) => void
  insurance: string
  setInsurance: (value: string) => void
  availability: string
  setAvailability: (value: string) => void
}

export function ProviderMatchFilters({ 
  searchTerm, 
  setSearchTerm,
  zipCode,
  setZipCode,
  insurance, 
  setInsurance,
  availability,
  setAvailability
}: ProviderMatchFiltersProps) {
  const { t } = useTranslation('translation')

  const insuranceOptions = [
    { value: "all", label: t("common.all_insurance") },
    ...INSURANCE_OPTIONS.map(opt => ({
      value: opt.value,
      label: opt.label as string
    }))
  ]

  const availabilityOptions = [
    { value: "all", label: t("common.all_availability") },
    ...AVAILABILITY_OPTIONS.map(opt => ({
      value: opt.value,
      label: t(`common.${opt.labelKey}` as any)
    }))
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      {/* Search Input */}
      <div className="relative w-full lg:flex-[2.5]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          placeholder={t("cases.search_provider_placeholder")} 
          className="pl-10 h-12 rounded-full border-none bg-white shadow-sm ring-1 ring-slate-200 focus-visible:ring-primary transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Zip Code Search */}
      <div className="relative w-full lg:w-32">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          placeholder={t("common.zip_code")} 
          className="pl-10 h-12 rounded-full border-none bg-white shadow-sm ring-1 ring-slate-200 focus-visible:ring-primary transition-all"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
        <FilterPill
          label={t("portfolio.insurance")}
          value={insurance}
          options={insuranceOptions}
          onSelect={setInsurance}
          icon={<ShieldCheck size={16} />}
          className="lg:w-40"
          width="w-64"
          align="right"
        />

        <FilterPill
          label={t("portfolio.availability")}
          value={availability}
          options={availabilityOptions}
          onSelect={setAvailability}
          icon={<Calendar size={16} />}
          className="lg:w-40"
          width="w-56"
          align="right"
        />

      </div>
    </div>
  )
}
