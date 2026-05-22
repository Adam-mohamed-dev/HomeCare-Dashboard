import { useTranslation } from "react-i18next"
import { Award, Users, Monitor, MapPin } from "lucide-react"
import type { ProviderProfileData } from "../../types"
import { FormCard } from "../../../../components/onboarding/FormCard"

interface DisciplinesCardProps {
  provider: ProviderProfileData
}

export function DisciplinesCard({ provider }: DisciplinesCardProps) {
  const { t } = useTranslation()

  return (
    <FormCard className="gap-8">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <Award className="text-primary" size={20} />
        <h2 className="text-lg font-bold text-slate-800">{t("portfolio.disciplines_services")}</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {provider.disciplines.map((discipline, idx) => (
          <span 
            key={idx}
            className="px-4 py-2 rounded-full text-xs font-bold bg-primary/10 text-primary"
          >
            {discipline}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-slate-50">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {t("portfolio.patient_focus")}
          </span>
          <div className="flex flex-col gap-3">
            {provider.patientFocus.map((focus, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Users size={14} className="text-slate-400" />
                {focus}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {t("portfolio.service_formats")}
          </span>
          <div className="flex flex-col gap-3">
            {provider.serviceFormats.map((format, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                {format.includes("Telehealth") ? (
                  <Monitor size={14} className="text-slate-400" />
                ) : (
                  <MapPin size={14} className="text-slate-400" />
                )}
                {format}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormCard>
  )
}
