import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { DISCIPLINE_OPTIONS } from "../../../shared/constants"
import { Input } from "../../../../components/ui/input"
import { FilterPill } from "../../../../components/ui/filter-pill"

interface ProviderFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  discipline: string
  setDiscipline: (value: string) => void
  status: string
  setStatus: (value: string) => void
}

export function ProviderFilters({ 
  searchTerm, 
  setSearchTerm, 
  discipline, 
  setDiscipline, 
  status, 
  setStatus 
}: ProviderFiltersProps) {
  const { t } = useTranslation('translation')

  const disciplineOptions = [
    { value: "all", label: t("common.all_disciplines") },
    ...DISCIPLINE_OPTIONS.map((opt: any) => ({
      value: opt.value,
      label: t(opt.labelKey)
    }))
  ]

  const statusOptions = [
    { value: "all", label: t("common.all_statuses") },
    { value: "Active", label: t("common.active"), indicatorColor: "bg-emerald-500" },
    { value: "Inactive", label: t("common.inactive"), indicatorColor: "bg-slate-400" },
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      {/* Search Input */}
      <div className="relative w-full lg:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder={t("portfolio.provider_search_placeholder")} 
          className="pl-10 h-12 rounded-full border-none bg-white shadow-sm ring-1 ring-slate-200 focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 w-full lg:w-auto">
        <FilterPill
          label={t("common.discipline")}
          value={discipline}
          options={disciplineOptions}
          onSelect={setDiscipline}
          className="lg:w-44"
          width="w-56"
        />

        <FilterPill
          label={t("portfolio.status")}
          value={status}
          options={statusOptions}
          onSelect={setStatus}
          className="lg:w-36"
          width="w-40"
        />
      </div>
    </div>
  )
}
