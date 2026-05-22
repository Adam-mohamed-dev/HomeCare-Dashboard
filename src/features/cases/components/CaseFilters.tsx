import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { DISCIPLINE_OPTIONS } from "../../shared/constants"
import { Input } from "../../../components/ui/input"
import { FilterPill } from "../../../components/ui/filter-pill"

interface CaseFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  discipline: string
  setDiscipline: (value: string) => void
}

export function CaseFilters({ 
  searchTerm, 
  setSearchTerm, 
  discipline, 
  setDiscipline 
}: CaseFiltersProps) {
  const { t } = useTranslation('translation')

  const disciplineOptions = [
    { value: "all", label: t("common.all_disciplines") },
    ...DISCIPLINE_OPTIONS.map((opt: any) => ({
      value: opt.value,
      label: t(opt.labelKey)
    }))
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      {/* Search Input */}
      <div className="relative w-full lg:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          placeholder={t("cases.search_placeholder")} 
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
          className="lg:w-56"
          width="w-64"
        />
      </div>
    </div>
  )
}
