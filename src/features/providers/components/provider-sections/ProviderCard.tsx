import { Link } from "@tanstack/react-router"
import { Star, MapPin, Calendar, BarChart3 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../../components/ui/button"
import { UserAvatar } from "../../../../components/ui/user-avatar"
import { UtilizationBar } from "../../../../components/ui/utilization-bar"
import { Card, CardContent } from "../../../../components/ui/card"
import { StatusPill } from "../../../../components/StatusPill"
import { useState } from "react"
import { AssignPatientModal } from "../AssignPatientModal"
import type { ProviderSummary } from "../../types"

interface ProviderCardProps {
  provider: ProviderSummary
  onViewSchedule: (provider: ProviderSummary) => void
}

export function ProviderCard({ provider, onViewSchedule }: ProviderCardProps) {
  const { t } = useTranslation()
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)

  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-100 rounded-[24px] overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <Link 
            to="/providers/$providerId" 
            params={{ providerId: provider.id }} 
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <UserAvatar 
              name={provider.name} 
              image={provider.image} 
              className="h-14 w-14" 
            />
            <div className="flex flex-col">
              <h3 className="font-bold text-slate-900 leading-none">{provider.name}</h3>
              <span className="text-sm font-medium text-primary">{provider.discipline}</span>
            </div>
          </Link>
          <StatusPill status={provider.status} className="min-w-[80px]" />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {/* Utilization Bar */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-400">
              <div className="flex items-center gap-1.5">
                <BarChart3 size={12} />
                {t("portfolio.utilization_label")}
              </div>
            </div>
            <UtilizationBar value={provider.utilization} />
          </div>

          <div className="grid grid-cols-1 gap-2.5 mt-2">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} className="text-slate-400" />
              {provider.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar size={16} className="text-slate-400" />
              {provider.availability}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-700">{provider.rating}</span>
              <span className="text-slate-400">{t("portfolio.reviews_count", { count: provider.reviews })}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => onViewSchedule(provider)}
            className="text-slate-500 font-bold text-xs hover:text-primary hover:bg-transparent p-0 h-auto"
          >
            {t("portfolio.view_schedule")}
          </Button>
          <Button 
            onClick={() => setIsAssignModalOpen(true)}
            className="rounded-full px-5 h-9 text-xs font-bold bg-primary hover:bg-primary/90 text-white border-none"
          >
            {t("portfolio.assign_patient")}
          </Button>
        </div>
      </CardContent>

      <AssignPatientModal 
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        providerName={provider.name}
        providerDiscipline={provider.discipline}
        currentUtilization={provider.utilization}
      />
    </Card>
  )
}
