import { useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { ProviderHeader } from "./provider-sections/ProviderHeader"
import { ProviderFilters } from "./provider-sections/ProviderFilters"
import { ProviderCard } from "./provider-sections/ProviderCard"
import { ScheduleModal } from "./provider-sections/ScheduleModal"
import { PageContainer } from "../../../components/layout/PageContainer"
import { PROVIDER_DIRECTORY } from "../data/providers"
import { useProviderDirectoryFilters } from "../hooks/useProviderDirectoryFilters"
import type { ProviderSummary } from "../types"
import { useState } from "react"

export function ProviderManagement() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    searchTerm,
    setSearchTerm,
    discipline,
    setDiscipline,
    status,
    setStatus,
    filtered,
    resetFilters,
  } = useProviderDirectoryFilters(PROVIDER_DIRECTORY)

  const [selectedProvider, setSelectedProvider] = useState<ProviderSummary | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewSchedule = (provider: ProviderSummary) => {
    setSelectedProvider(provider)
    setIsModalOpen(true)
  }

  const handleAddProvider = () => {
    navigate({ to: "/providers/new" })
  }

  return (
    <PageContainer size="wide" className="py-8 flex flex-col gap-8">
      <ProviderHeader onAddClick={handleAddProvider} />
      <ProviderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        discipline={discipline}
        setDiscipline={setDiscipline}
        status={status}
        setStatus={setStatus}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onViewSchedule={handleViewSchedule}
            />
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <p className="text-lg font-medium">{t("portfolio.no_providers_found")}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-primary font-bold hover:underline"
            >
              {t("portfolio.reset_filters")}
            </button>
          </div>
        )}
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        provider={selectedProvider}
        events={[]}
      />
    </PageContainer>
  )
}
