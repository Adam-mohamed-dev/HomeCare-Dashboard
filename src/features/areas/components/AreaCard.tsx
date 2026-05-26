import { MapPin, Users, Activity, Edit2, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { Area } from "../types"


interface AreaCardProps {
  area: Area
  onEdit: (area: Area) => void
  onDelete: (area: Area) => void
}

export function AreaCard({ area, onEdit, onDelete }: AreaCardProps) {
  const { t } = useTranslation('translation')

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
      <div className="p-6 pb-4 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors bg-primary/10 text-primary">
              <MapPin size={24} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{area.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-slate-500">{area.zips.length} {t("common.zip_code")}s</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onEdit(area)}
              className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" 
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => onDelete(area)}
              className="p-2 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors" 
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Users size={14} />
              <span className="text-xs font-medium uppercase tracking-wider">{t("nav.providers", { defaultValue: "Providers" })}</span>
            </div>
            <span className="text-lg font-bold text-slate-900">{area.providersCount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Activity size={14} />
              <span className="text-xs font-medium uppercase tracking-wider">{t("nav.patients", { defaultValue: "Patients" })}</span>
            </div>
            <span className="text-lg font-bold text-slate-900">{area.patientsCount}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {area.zips.slice(0, 3).map(zip => (
            <span key={zip} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
              {zip}
            </span>
          ))}
          {area.zips.length > 3 && (
            <span className="px-2 py-1 bg-slate-200 border border-transparent rounded-lg text-xs font-medium text-slate-600">
              +{area.zips.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
