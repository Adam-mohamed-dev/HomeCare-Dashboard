import { useTranslation } from "react-i18next"
import { DISCIPLINE_OPTIONS } from "../../../shared/constants"
import { FilterPill } from "../../../../components/ui/filter-pill"
import { SearchInput } from "../../../../components/ui/search-input"

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
  setStatus,
}: ProviderFiltersProps) {
  const { t } = useTranslation()

  const disciplineOptions = [
    { value: "all", label: t("common.all_disciplines") },
    ...DISCIPLINE_OPTIONS.map((opt) => ({
      value: opt.value,
      label: t(`common.${opt.labelKey}` as "common.discipline_pt"),
    })),
  ]

  const statusOptions = [
    { value: "all", label: t("common.all_statuses") },
    { value: "Active", label: t("common.active"), indicatorColor: "bg-emerald-500" },
    { value: "Inactive", label: t("common.inactive"), indicatorColor: "bg-slate-400" },
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t("portfolio.provider_search_placeholder")}
      />

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
