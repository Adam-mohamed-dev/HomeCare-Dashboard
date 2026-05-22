import { useTranslation } from "react-i18next"
import { 
  MapPin, 
  ShieldCheck, 
  Stethoscope, 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles,
  Search
} from "lucide-react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent } from "../../../components/ui/card"
import { Select } from "../../../components/ui/select"
import { useZipLookup } from "../hooks/useZipLookup"

interface AppointmentFiltersProps {
  zipCode: string
  setZipCode: (val: string) => void
  selectedDays: string[]
  toggleDay: (day: string) => void
  isSearching: boolean
  onSearch: () => void
}

export function AppointmentFilters({
  zipCode,
  setZipCode,
  selectedDays,
  toggleDay,
  isSearching,
  onSearch
}: AppointmentFiltersProps) {
  const { t } = useTranslation('translation')
  const areaDetected = useZipLookup(zipCode)

  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      <Card className="border-none shadow-sm ring-1 ring-slate-100 rounded-[32px] overflow-hidden bg-white">
        <CardContent className="p-8 flex flex-col gap-6">
          {/* ZIP Code */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              {t("appointments.zip_label")}
            </label>
            <div className="relative">
              <Input 
                placeholder="e.g. 94105"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="rounded-2xl border-slate-100 bg-slate-50/50 h-12 focus:bg-white transition-all pl-4"
              />
              {areaDetected && (
                <div className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/5 text-primary border border-primary/10 animate-in slide-in-from-top-2 duration-300">
                  <Sparkles size={12} />
                  <span className="text-[11px] font-bold">{t("appointments.area_detected", { area: areaDetected })}</span>
                </div>
              )}
            </div>
          </div>

          {/* Insurance */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className="text-primary" />
              {t("appointments.insurance_label")}
            </label>
            <Select 
              options={[
                { label: t("appointments.insurance_blue_shield"), value: "blue-shield" },
                { label: t("appointments.insurance_medicare"), value: "medicare" },
                { label: t("appointments.insurance_aetna"), value: "aetna" },
                { label: t("appointments.insurance_cigna"), value: "cigna" }
              ]}
              defaultValue="blue-shield"
              className="rounded-2xl"
            />
          </div>

          {/* Visit Type */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Stethoscope size={14} className="text-primary" />
              {t("appointments.visit_type_label")}
            </label>
            <Select 
              options={[
                { label: t("appointments.visit_type_eval"), value: "eval" },
                { label: t("appointments.visit_type_routine"), value: "routine" },
                { label: t("appointments.visit_type_followup"), value: "followup" }
              ]}
              defaultValue="eval"
              className="rounded-2xl"
            />
          </div>

          {/* Preferred Days */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <CalendarIcon size={14} className="text-primary" />
              {t("appointments.preferred_days_label")}
            </label>
            <div className="flex flex-wrap gap-2">
              {["mon", "tue", "wed", "thu", "fri"].map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-bold transition-all border",
                    selectedDays.includes(day)
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-slate-50 text-slate-500 border-slate-100 hover:border-primary/30"
                  )}
                >
                  {t(`common.${day}` as any)}
                </button>
              ))}
            </div>
          </div>

          {/* Time & Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                {t("appointments.preferred_time_label")}
              </label>
              <input 
                type="time" 
                className="w-full h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-3 text-[13px] font-medium focus:bg-white transition-all outline-none border"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <CalendarIcon size={14} className="text-primary" />
                {t("appointments.next_availability_label")}
              </label>
              <input 
                type="date" 
                className="w-full h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-3 text-[13px] font-medium focus:bg-white transition-all outline-none border"
              />
            </div>
          </div>

          <Button 
            onClick={onSearch}
            disabled={isSearching}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 gap-2 mt-4 transition-all active:scale-95"
          >
            {isSearching ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("common.searching")}
              </div>
            ) : (
              <>
                <Search size={20} />
                {t("appointments.search_btn")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
