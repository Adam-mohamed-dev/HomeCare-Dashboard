import { Link, useNavigate } from "@tanstack/react-router"
import { Star, MapPin, Calendar, BarChart3, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../../components/ui/button"
import { UserAvatar } from "../../../../components/ui/user-avatar"
import { UtilizationBar } from "../../../../components/ui/utilization-bar"
import { Card, CardContent } from "../../../../components/ui/card"
import { StatusPill } from "../../../../components/StatusPill"
import { useState, useRef, useEffect } from "react"
import { AssignPatientModal } from "../AssignPatientModal"
import type { ProviderSummary } from "../../types"

interface ProviderCardProps {
  provider: ProviderSummary
  onViewSchedule: (provider: ProviderSummary) => void
  onDelete: (provider: ProviderSummary) => void
}

export function ProviderCard({ provider, onViewSchedule, onDelete }: ProviderCardProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <Card className="border-none shadow-sm ring-1 ring-slate-100 rounded-[24px] hover:shadow-md transition-shadow">
      <CardContent className="p-6 pr-3">
        <div className="flex items-start justify-between gap-4">
          <Link 
            to="/providers/$providerId" 
            params={{ providerId: provider.id }} 
            className="flex items-center gap-4 hover:opacity-80 transition-opacity min-w-0"
          >
            <UserAvatar 
              name={provider.name} 
              image={provider.image} 
              className="h-14 w-14 shrink-0" 
            />
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-slate-900 leading-none truncate">{provider.name}</h3>
              <span className="text-sm font-medium text-primary truncate">{provider.discipline}</span>
            </div>
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            <StatusPill status={provider.status} />
            <div className="relative" ref={menuRef}>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MoreVertical size={14} />
              </Button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-border bg-card shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      navigate({ to: '/providers/$providerId/edit', params: { providerId: provider.id } })
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      onDelete(provider)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
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
