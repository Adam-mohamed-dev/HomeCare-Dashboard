import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Bell, Clock, ArrowRight, AlertCircle, Trash2, X } from "lucide-react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import { useNotificationStore } from "../store/useNotificationStore"

export function UrgentNotifications() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { notifications, removeNotification, clearAll } = useNotificationStore()
  const hasUrgent = notifications.length > 0

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all relative group cursor-pointer",
          isOpen ? "bg-primary/10 text-primary" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        )}
      >
        <Bell size={20} className={cn(isOpen && "fill-current")} />
        
        {/* Pulsing Urgent Badge */}
        {hasUrgent && (
          <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white ring-4 ring-red-500/10 animate-pulse" />
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">{t("notifications.urgent_alerts")}</h3>
              {hasUrgent && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
            {hasUrgent && (
              <button 
                onClick={clearAll}
                className="text-[11px] font-bold text-red-500 hover:text-red-600 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Trash2 size={12} />
                {t("notifications.clear_all")}
              </button>
            )}
          </div>

          {/* List Content with Custom Scrollbar */}
          <div className="max-h-[420px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {hasUrgent ? (
              <div className="flex flex-col">
                {notifications.map((visit) => (
                  <div 
                    key={visit.id} 
                    className="px-6 py-5 border-b border-slate-50 hover:bg-slate-50/80 transition-colors group relative"
                  >
                    {/* Delete Single Notification */}
                    <button 
                      onClick={() => removeNotification(visit.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all z-20"
                    >
                      <X size={14} />
                    </button>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0 shadow-sm border border-red-100/50">
                        <AlertCircle size={20} />
                      </div>
                      <div className="flex flex-col gap-1 flex-1 pr-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{t("notifications.immediate_action")}</span>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                            <Clock size={12} />
                            <span>{visit.time}</span>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {t("notifications.arrival_delay_dynamic", { provider: visit.provider.name, patient: visit.patient.name })}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {t("notifications.arrival_policy_limit")}
                        </p>
                        <Button 
                          variant="ghost" 
                          className="w-fit p-0 h-auto mt-2 text-primary font-bold text-[11px] uppercase tracking-widest gap-2 hover:bg-transparent group-hover:translate-x-1 transition-transform"
                        >
                          {t("dashboard.take_action")}
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center px-6 gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                  <Bell size={32} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900">{t("notifications.no_urgent_alerts")}</p>
                  <p className="text-xs text-slate-400 font-medium px-8 leading-relaxed">
                    {t("notifications.no_alerts_desc")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
