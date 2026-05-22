import { Search, ArrowUpDown, Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { FilterPill } from "../../../components/ui/filter-pill"

interface PatientFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function PatientFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange
}: PatientFiltersProps) {
  const { t } = useTranslation('translation')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const statusOptions = [
    { value: "All", label: t("common.all_statuses") },
    { value: "Lead", label: t("common.lead"), indicatorColor: "bg-brand-medium" },
    { value: "Active", label: t("common.active"), indicatorColor: "bg-emerald-500" },
    { value: "Inactive", label: t("common.inactive"), indicatorColor: "bg-slate-400" },
  ]

  const sortOptions = [
    { label: t("common.name" as any, { defaultValue: "Name" }), value: "name" },
    { label: "MRN", value: "mrn" }
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      {/* Search Input */}
      <div className="relative w-full lg:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input
          placeholder={t("patients.search_placeholder")}
          className="pl-10 h-12 rounded-full border-none bg-white shadow-sm ring-1 ring-slate-200 focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 w-full lg:w-auto">
        {/* Status Filter */}
        <FilterPill
          label={t("portfolio.status")}
          value={statusFilter}
          options={statusOptions}
          onSelect={onStatusChange}
          className="lg:w-36"
        />

        {/* Sort By */}
        <div className="relative flex-1 lg:w-36" ref={sortRef}>
          <Button
            variant="outline"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full rounded-full h-11 bg-white border-none shadow-sm ring-1 ring-slate-200 gap-2 font-medium text-slate-700"
          >
            <ArrowUpDown size={16} />
            <span className="truncate">
              {sortBy === "name" ? t("patients.sort_name") : t("patients.sort_mrn")}
            </span>
          </Button>

          {isSortOpen && (
            <div className="absolute top-12 right-0 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in slide-in-from-top-1">
              {sortOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value)
                    setIsSortOpen(false)
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                >
                  {opt.label}
                  {sortBy === opt.value && <Check size={14} className="text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
