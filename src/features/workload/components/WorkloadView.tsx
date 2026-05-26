import { useTranslation } from "react-i18next"
import { ManagementPageHeader } from "../../../components/layout/ManagementPageHeader"
import { PageContainer } from "../../../components/layout/PageContainer"
import { SegmentedTabs } from "../../../components/ui/segmented-tabs"
import { useActionInbox } from "../hooks/useActionInbox"
import type { ActionEventTab } from "../types"
import { WorkloadTabFilters } from "./WorkloadTabFilters"
import { WorkloadTable } from "./WorkloadTable"

export function WorkloadView() {
  const { t } = useTranslation()
  const inbox = useActionInbox()

  const tabs = [
    {
      id: "assignments" as ActionEventTab,
      label: t("workload.tabs.assignments"),
      count: inbox.tabCounts.assignments,
    },
    {
      id: "visits" as ActionEventTab,
      label: t("workload.tabs.visits"),
      count: inbox.tabCounts.visits,
    },
    {
      id: "referrals" as ActionEventTab,
      label: t("workload.tabs.referrals"),
      count: inbox.tabCounts.referrals,
    },
  ]

  const hasActiveFilters =
    inbox.searchTerm.length > 0 || inbox.issueType !== "all"
  const isEmpty = inbox.filtered.length === 0

  return (
    <PageContainer size="wide" className="py-8 flex flex-col gap-8">
      <ManagementPageHeader
        title={t("workload.mgmt_title")}
        description={t("workload.mgmt_desc")}
      />

      <div className="flex flex-col gap-5">
        <SegmentedTabs
          tabs={tabs}
          activeTab={inbox.activeTab}
          onTabChange={inbox.setActiveTab}
        />

        <p className="text-sm text-slate-500 font-medium px-1">
          {t(`workload.tabs.${inbox.activeTab}_desc`)}
        </p>

        <WorkloadTabFilters
          activeTab={inbox.activeTab}
          searchTerm={inbox.searchTerm}
          setSearchTerm={inbox.setSearchTerm}
          issueType={inbox.issueType}
          setIssueType={inbox.setIssueType}
        />

        {!isEmpty && (
          <p className="text-sm font-medium text-slate-500 px-1">
            {t("common.showing_count", {
              count: inbox.filtered.length,
              total: inbox.tabCounts[inbox.activeTab],
            })}
          </p>
        )}
      </div>

      {isEmpty ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3 rounded-3xl border border-slate-100 bg-white shadow-sm">
          <p className="text-lg font-medium">{t("workload.no_actions_in_tab")}</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={inbox.resetFilters}
              className="text-primary font-bold hover:underline"
            >
              {t("common.reset_filters")}
            </button>
          )}
        </div>
      ) : (
        <WorkloadTable events={inbox.filtered} />
      )}
    </PageContainer>
  )
}
