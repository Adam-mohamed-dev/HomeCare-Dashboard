import { useTranslation } from "react-i18next"
import { Link } from "@tanstack/react-router"
import { BarChart3, MapPin, ShieldCheck, Calendar, User, Banknote } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { UtilizationBar } from "../../../components/ui/utilization-bar"
import { Card, CardContent } from "../../../components/ui/card"
import { useState } from "react"
import { DirectAssignModal } from "./DirectAssignModal"
import type { MatchProvider } from "../types"
import { cn } from "../../../lib/utils"

interface RecommendedProviderCardProps {
  provider: MatchProvider
  patientName?: string
  patientInitials?: string
  caseId?: string
}

export function RecommendedProviderCard({ 
  provider,
  patientName,
  patientInitials,
  caseId
}: RecommendedProviderCardProps) {
  const { t } = useTranslation('translation')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const matchItems = [
    { key: 'zip', icon: MapPin, label: t("portfolio.zip_match") },
    { key: 'insurance', icon: ShieldCheck, label: t("portfolio.insurance_match") },
    { key: 'availability', icon: Calendar, label: t("portfolio.availability_match") },
    { key: 'gender', icon: User, label: t("portfolio.gender_match") },
  ]

  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-100 rounded-[24px] overflow-hidden hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
          {/* Provider Info */}
          <div className="flex items-start gap-5 flex-1">
            <UserAvatar 
              name={provider.name} 
              image={provider.image} 
              className="h-20 w-20 rounded-[28px] ring-4 ring-slate-50" 
            />
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-xl tracking-tight">{provider.name}, {provider.credentials}</h3>
              </div>
              <span className="text-sm text-slate-500 font-semibold flex items-center gap-1.5">
                <Banknote size={16} className="text-slate-300" />
                ${provider.payRate} / {t("cases.per_visit")}
              </span>
              
              {/* Match Profile Indicators */}
              <div className="flex flex-wrap gap-2 mt-3">
                {matchItems.map(({ key, icon: Icon, label }) => {
                  const isMatch = provider.matchIndicators[key as keyof typeof provider.matchIndicators]
                  return (
                    <div 
                      key={key}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border",
                        isMatch 
                          ? "bg-primary/5 text-primary border-primary/10 shadow-sm shadow-primary/5" 
                          : "bg-slate-50 text-slate-400 border-slate-100 opacity-60 grayscale-[0.5]"
                      )}
                    >
                      <Icon size={12} className={cn(isMatch ? "text-primary" : "text-slate-300")} />
                      {label}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Utilization & Actions */}
          <div className="flex flex-col md:flex-row items-center gap-10 w-full xl:w-auto shrink-0 border-t xl:border-t-0 pt-6 xl:pt-0 border-slate-50">
            {/* Utilization Bar */}
            <div className="flex flex-col gap-2 w-full md:w-[140px]">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-400">
                <div className="flex items-center gap-1.5">
                  <BarChart3 size={12} />
                  UTILIZATION
                </div>
              </div>
              <UtilizationBar value={provider.utilization} />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 w-full md:w-[140px]">
              {patientName && patientInitials && caseId ? (
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-10 border-none"
                >
                  {t("cases.direct_assign")}
                </Button>
              ) : (
                <Button 
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-10 border-none"
                >
                  {t("appointments.book_btn", { defaultValue: "Book" })}
                </Button>
              )}
              <Link to="/providers/$providerId" params={{ providerId: provider.id }}>
                <Button variant="outline" className="w-full rounded-full border-slate-100 bg-slate-50 text-slate-600 font-bold h-10 hover:bg-slate-100">
                  {t("cases.view_profile_btn")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>

      {patientName && patientInitials && caseId && (
        <DirectAssignModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          providerName={provider.name}
          providerImage={provider.image}
          providerUtilization={provider.utilization}
          patientName={patientName}
          patientInitials={patientInitials}
          caseId={caseId}
        />
      )}
    </Card>
  )
}
