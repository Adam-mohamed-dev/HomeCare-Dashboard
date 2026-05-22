import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "../../../components/ui/dialog"
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react"

interface BiddingPoolModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  zipCode: string
  discipline: string
}

export function BiddingPoolModal({ isOpen, onClose, onConfirm, zipCode, discipline }: BiddingPoolModalProps) {
  const { t } = useTranslation('translation')
  const [urgency, setUrgency] = useState("standard")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleConfirm = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        onConfirm()
        onClose()
        // Reset for next time
        setTimeout(() => setIsSuccess(false), 500)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0 overflow-hidden border-none rounded-[32px] bg-white flex flex-col">
        {!isSuccess ? (
          <>
            <DialogHeader className="p-8 pb-4 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-4 mb-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Send size={20} />
                </div>
                <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">
                  {t("cases.broadcast_modal_title")}
                </DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 pt-1">
                {t("cases.broadcast_modal_desc")}
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 pt-4 flex flex-col gap-8 overflow-y-auto flex-1 custom-scrollbar">
              {/* Review Summary */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("common.zip_code")}</span>
                  <span className="text-sm font-bold text-slate-700">{zipCode}</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("common.discipline")}</span>
                  <span className="text-sm font-bold text-slate-700">{discipline}</span>
                </div>
              </div>

              {/* Urgency Selection */}
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold text-slate-700">{t("cases.urgency_label")}</span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setUrgency("standard")}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 text-left ${
                      urgency === "standard" 
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <span className={`text-sm font-bold ${urgency === "standard" ? "text-primary" : "text-slate-700"}`}>
                      {t("cases.standard_urgency")}
                    </span>
                    <span className="text-xs text-slate-500 italic">{t("cases.standard_response_desc")}</span>
                  </button>
                  <button 
                    onClick={() => setUrgency("high")}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 text-left ${
                      urgency === "high" 
                        ? "border-amber-500 bg-amber-50 ring-1 ring-amber-200" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${urgency === "high" ? "text-amber-700" : "text-slate-700"}`}>
                        {t("cases.high_priority")}
                      </span>
                      <AlertCircle size={14} className={urgency === "high" ? "text-amber-500" : "text-slate-300"} />
                    </div>
                    <span className="text-xs text-slate-500 italic">{t("cases.high_priority_desc")}</span>
                  </button>
                </div>
              </div>

              {/* Coordinator's Note */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-slate-700">{t("cases.coordinator_note_label")}</span>
                <textarea 
                  className="w-full min-h-[100px] p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-sm text-slate-600 placeholder:text-slate-400"
                  placeholder={t("cases.coordinator_note_placeholder")}
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                <CheckCircle2 size={14} className="text-emerald-500" />
                {t("cases.providers_notified_est", { count: 42 })}
              </div>
            </div>

            <DialogFooter className="p-8 pt-6 bg-white border-t border-slate-50 flex gap-3 shrink-0">
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
                className="flex-[2] rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-12 gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
                {t("cases.confirm_broadcast")}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="p-12 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 relative">
              <CheckCircle2 size={64} className="animate-in fade-in zoom-in duration-500" />
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500 animate-ping opacity-20" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{t("cases.broadcast_success_title")}</h2>
              <p className="text-slate-500 max-w-[300px]">
                {t("cases.broadcast_success_desc", { count: 42 })}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
