import { MapPin } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { Button } from "../../../components/ui/button"
import type { Case } from "../types"

interface CaseCardProps {
  caseData: Case
}

export function CaseCard({ caseData }: CaseCardProps) {
  const { t } = useTranslation()

  const getReferredText = () => {
    if (caseData.referredDays === 0) return t("cases.referred_today")
    if (caseData.referredDays === 1) return t("cases.referred_yesterday")
    return t("cases.referred_days_ago", { count: caseData.referredDays })
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm border border-slate-100">
      {/* Top Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <UserAvatar 
            name={caseData.patientName} 
            initials={caseData.patientInitials}
            className="h-12 w-12 sm:h-14 sm:w-14" 
            fallbackClassName="text-lg"
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">{caseData.patientName}</h3>
            {caseData.description ? (
              <span className="text-sm text-slate-500">
                {caseData.description} &bull; {t("cases.id_label")}: {caseData.id}
              </span>
            ) : (
              <span className="text-sm text-slate-500">{t("cases.id_label")}: {caseData.id}</span>
            )}
          </div>
        </div>
        <span className="text-sm font-medium text-slate-400">
          {getReferredText()}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-8 mt-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {caseData.serviceAreaLabel ? t("cases.service_area_label") : t("cases.location_label")}
          </span>
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-900">
            <MapPin size={16} className="text-slate-500" />
            {t("cases.zip_label")}: {caseData.locationZip}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {t("cases.discipline_label")}
          </span>
          <span className="text-sm font-medium text-slate-900">
            {caseData.requiredDiscipline}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <div className="flex -space-x-3">
            {caseData.matchAvatars.map((url, idx) => (
              <UserAvatar 
                key={idx} 
                name="Provider" 
                image={url} 
                className="h-8 w-8 border-2 border-white ring-0" 
              />
            ))}
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600 -ml-3 z-10">
            +{caseData.matchCount}
          </div>
        </div>

        <Link to="/cases/$caseId" params={{ caseId: caseData.id }}>
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6">
            {t("cases.review_matches")}
          </Button>
        </Link>
      </div>
    </div>
  )
}
