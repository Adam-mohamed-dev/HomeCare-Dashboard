import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { CheckCircle2, Loader2, UserCheck, ArrowRightLeft } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { UtilizationBar } from "../../../components/ui/utilization-bar"
import { cn } from "../../../lib/utils"
import { useNavigate } from "@tanstack/react-router"

interface DirectAssignModalProps {
  isOpen: boolean
  onClose: () => void
  providerName: string
  providerImage: string
  providerUtilization: number
  patientName: string
  patientInitials: string
  caseId: string
}

export function DirectAssignModal({ 
  isOpen, 
  onClose, 
  providerName, 
  providerImage,
  providerUtilization,
  patientName,
  patientInitials,
  caseId
}: DirectAssignModalProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const projectedUtilization = useMemo(() => {
    return providerUtilization + 12 
  }, [providerUtilization])

  const handleConfirm = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setTimeout(() => {
          navigate({ to: "/cases" })
        }, 300)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] p-0 overflow-hidden border-none rounded-[32px] bg-white flex flex-col">
        {!isSuccess ? (
          <>
            <DialogHeader className="p-8 pb-6 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-4 mb-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <UserCheck size={20} />
                </div>
                <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">
                  {t("cases.direct_assign_modal_title")}
                </DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 pt-1">
                {t("cases.direct_assign_modal_desc")}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
              <div className="flex flex-col gap-8">
                {/* Pairing Visualization */}
                <div className="flex flex-col gap-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    {t("cases.assignment_pairing")}
                  </span>
                  <div className="flex items-center justify-center gap-8 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center z-10">
                      <ArrowRightLeft size={18} className="text-primary" />
                    </div>
                    
                    <div className="flex flex-col items-center gap-3 flex-1 p-6 rounded-[24px] bg-slate-50/80 border border-slate-100">
                      <UserAvatar name={patientName} initials={patientInitials} className="h-16 w-16" />
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-900 text-sm">{patientName}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{caseId}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 flex-1 p-6 rounded-[24px] bg-slate-50/80 border border-slate-100">
                      <UserAvatar name={providerName} image={providerImage} className="h-16 w-16" />
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-900 text-sm">{providerName}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{t("portfolio.provider")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Caseload Impact */}
                <div className="p-6 rounded-[24px] border border-slate-100 bg-white flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-slate-700">{t("cases.projected_utilization")}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Caseload Impact</span>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-sm font-bold",
                        projectedUtilization >= 90 ? "text-destructive" : "text-primary"
                      )}>
                        {projectedUtilization}%
                      </span>
                    </div>
                  </div>
                  <UtilizationBar value={projectedUtilization} showLabel={false} />
                </div>

                {/* Handover Notes */}
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold text-slate-700">{t("cases.handover_notes_label")}</span>
                  <textarea 
                    className="w-full min-h-[100px] p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-sm text-slate-600 placeholder:text-slate-400"
                    placeholder={t("cases.handover_notes_placeholder")}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 pt-6 border-t border-slate-100 flex gap-3 shrink-0">
              <Button 
                variant="ghost" 
                onClick={onClose} 
                className="flex-1 rounded-full font-bold text-slate-500 hover:bg-slate-100 h-12"
              >
                {t("common.cancel")}
              </Button>
              <Button 
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-[2] rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-12 gap-2 shadow-lg shadow-primary/20"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <UserCheck size={20} />
                )}
                {t("cases.confirm_assignment")}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="p-16 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 relative">
              <CheckCircle2 size={64} className="animate-in fade-in zoom-in duration-500" />
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500 animate-ping opacity-20" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{t("notifications.assignment_success_title")}</h2>
              <p className="text-slate-500 max-w-[320px]">
                {t("cases.assignment_success_desc", { 
                  patient: patientName, 
                  provider: providerName 
                })}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
