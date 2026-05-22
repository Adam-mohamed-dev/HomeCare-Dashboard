import { useState, useMemo } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { ProviderHeader } from "./provider-sections/ProviderHeader"
import { ProviderFilters } from "./provider-sections/ProviderFilters"
import { ProviderCard } from "./provider-sections/ProviderCard"
import { ScheduleModal } from "./provider-sections/ScheduleModal"
import { PageContainer } from "../../../components/layout/PageContainer"
import type { ProviderSummary } from "../types"

const providers: ProviderSummary[] = [
  {
    id: "dr-julian-vance",
    name: "Dr. Julian Vance",
    discipline: "Physical Therapist",
    location: "Asheville, NC",
    rating: 4.9,
    reviews: 124,
    availability: "Available Today",
    image: "https://i.pravatar.cc/150?u=julian",
    status: "Active",
    utilization: 85
  },
  {
    id: "sarah-thorne",
    name: "Sarah Thorne",
    discipline: "Occupational Therapist",
    location: "Hendersonville, NC",
    rating: 4.8,
    reviews: 89,
    availability: "Next: Mon",
    image: "https://i.pravatar.cc/150?u=sarah",
    status: "Active",
    utilization: 45
  },
  {
    id: "dr-marcus-chen",
    name: "Dr. Marcus Chen",
    discipline: "Physical Therapist",
    location: "Asheville, NC",
    rating: 5.0,
    reviews: 56,
    availability: "Available Today",
    image: "https://i.pravatar.cc/150?u=marcus",
    status: "Active",
    utilization: 62
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    discipline: "Physical Therapist",
    location: "Black Mountain, NC",
    rating: 4.7,
    reviews: 102,
    availability: "Next: Tue",
    image: "https://i.pravatar.cc/150?u=elena",
    status: "Active",
    utilization: 20
  }
]

export function ProviderManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [discipline, setDiscipline] = useState("all")
  const [status, setStatus] = useState("all")
  const [selectedProvider, setSelectedProvider] = useState<ProviderSummary | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.discipline.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDiscipline = discipline === "all" || p.discipline === discipline
      const matchesStatus = status === "all" || p.status === status

      return matchesSearch && matchesDiscipline && matchesStatus
    })
  }, [searchTerm, discipline, status])

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
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.name}
              provider={provider}
              onViewSchedule={handleViewSchedule}
            />
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <p className="text-lg font-medium">{t("portfolio.no_providers_found")}</p>
            <button
              onClick={() => { setSearchTerm(""); setDiscipline("all"); setStatus("all"); }}
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
