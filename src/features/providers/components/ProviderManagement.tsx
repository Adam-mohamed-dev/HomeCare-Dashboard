import { useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { ProviderHeader } from "./provider-sections/ProviderHeader"
import { ProviderFilters } from "./provider-sections/ProviderFilters"
import { ProviderCard } from "./provider-sections/ProviderCard"
import { ScheduleModal } from "./provider-sections/ScheduleModal"
import { ConfirmDialog } from "../../../components/ui/confirm-dialog"
import { PageContainer } from "../../../components/layout/PageContainer"
import { PROVIDER_DIRECTORY } from "../data/providers"
import { useProviderStore } from "../store/useProviderStore"
import { useProviderDirectoryFilters } from "../hooks/useProviderDirectoryFilters"
import type { ProviderSummary, ProviderDirectoryEntry } from "../types"
import { useState, useMemo } from "react"

function profileToDirectoryEntry(profile: { id: string; fullName: string; primaryDiscipline: string }): ProviderDirectoryEntry {
  return {
    id: profile.id,
    name: profile.fullName,
    discipline: profile.primaryDiscipline,
    location: "",
    rating: 0,
    reviews: 0,
    availability: "",
    image: "",
    status: "Active",
    utilization: 0,
    caseloadCurrent: 0,
    caseloadMax: 0,
    pendingAssignments: 0,
  }
}

export function ProviderManagement() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const profiles = useProviderStore((s) => s.profiles)
  const allProviders = useMemo(() => {
    const dirIds = new Set(PROVIDER_DIRECTORY.map((p) => p.id))
    const extras = Object.values(profiles).filter((p) => !dirIds.has(p.id)).map(profileToDirectoryEntry)
    return [...PROVIDER_DIRECTORY, ...extras]
  }, [profiles])
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())
  const providers = useMemo(() => allProviders.filter((p) => !removedIds.has(p.id)), [allProviders, removedIds])
  const {
    searchTerm,
    setSearchTerm,
    discipline,
    setDiscipline,
    status,
    setStatus,
    filtered,
    resetFilters,
  } = useProviderDirectoryFilters(providers)

  const [selectedProvider, setSelectedProvider] = useState<ProviderSummary | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<ProviderSummary | null>(null)

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
              onDelete={setDeleteTarget}
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

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title="Delete Provider"
        description={`Are you sure you want to delete ${deleteTarget?.name ?? "this provider"}? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (deleteTarget) setRemovedIds(prev => new Set(prev).add(deleteTarget.id))
          setDeleteTarget(null)
        }}
      />
    </PageContainer>
  )
}
