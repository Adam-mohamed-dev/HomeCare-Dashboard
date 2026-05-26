import { useTranslation } from "react-i18next"
import { FilterPill } from "../../../components/ui/filter-pill"
import { SearchInput } from "../../../components/ui/search-input"
import { ISSUE_TYPE_STYLES, TAB_CATEGORY_ORDER } from "../constants"
import type { ActionEventCategory, ActionEventTab } from "../types"

interface WorkloadTabFiltersProps {
  activeTab: ActionEventTab
  searchTerm: string
  setSearchTerm: (value: string) => void
  issueType: "all" | ActionEventCategory
  setIssueType: (value: "all" | ActionEventCategory) => void
}

export function WorkloadTabFilters({
  activeTab,
  searchTerm,
  setSearchTerm,
  issueType,
  setIssueType,
}: WorkloadTabFiltersProps) {
  const { t } = useTranslation()
  const categories = TAB_CATEGORY_ORDER[activeTab]
  const showIssueFilter = categories.length > 1

  const issueOptions = [
    { value: "all", label: t("workload.all_issue_types") },
    ...categories.map((category) => ({
      value: category,
      label: t(`workload.groups.${category}` as "workload.groups.assignment_no_response"),
      indicatorColor: ISSUE_TYPE_STYLES[category].dot,
    })),
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t("workload.search_placeholder")}
      />

      {showIssueFilter && (
        <FilterPill
          label={t("workload.col_issue_type")}
          value={issueType}
          options={issueOptions}
          onSelect={(value) => setIssueType(value as "all" | ActionEventCategory)}
          className="w-full lg:w-56"
          width="w-64"
        />
      )}
    </div>
  )
}
