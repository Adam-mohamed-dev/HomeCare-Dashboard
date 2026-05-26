import { useTranslation } from "react-i18next"
import { Search } from "lucide-react"
import { RecommendedProviderCard } from "../../cases/components/RecommendedProviderCard"
import { mockMatches } from "../../cases/data/mockMatches"

interface AppointmentResultsProps {
  hasSearched: boolean
}

export function AppointmentResults({ hasSearched }: AppointmentResultsProps) {
  const { t } = useTranslation()

  if (!hasSearched) {
    return (
      <div className="lg:col-span-7 flex flex-col items-center justify-center py-32 text-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
          <Search size={64} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-slate-900">{t("appointments.ready_to_discover_title")}</h3>
          <p className="text-slate-500 max-w-[320px]">{t("appointments.ready_to_discover_desc")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-slate-800">{t("appointments.results_count", { count: mockMatches.length })}</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("common.sort")}</span>
          <select className="bg-transparent border-none text-xs font-bold text-primary focus:ring-0 cursor-pointer outline-none">
            <option>{t("appointments.sort_availability")}</option>
            <option>{t("appointments.sort_distance")}</option>
            <option>{t("appointments.sort_rating")}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {mockMatches.map((match) => (
          <RecommendedProviderCard 
            key={match.id} 
            provider={match} 
          />
        ))}
      </div>
    </div>
  )
}
