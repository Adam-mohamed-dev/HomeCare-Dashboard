import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Search, CheckCircle2, Loader2, MapPin, ShieldCheck, UserPlus } from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { UtilizationBar } from "../../../components/ui/utilization-bar"
import { mockCases } from "../../cases/data/mockCases"
import { cn } from "../../../lib/utils"

interface AssignPatientModalProps {
  isOpen: boolean
  onClose: () => void
  providerName: string
  providerDiscipline: string
  currentUtilization: number
}

export function AssignPatientModal({ 
  isOpen, 
  onClose, 
  providerName, 
  currentUtilization 
}: AssignPatientModalProps) {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const filteredPatients = useMemo(() => {
    return mockCases.filter(p => 
      p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const selectedPatient = useMemo(() => {
    return mockCases.find(p => p.id === selectedPatientId)
  }, [selectedPatientId])

  const projectedUtilization = useMemo(() => {
    return currentUtilization + 12 // Assume +12% per assignment for demo
  }, [currentUtilization])

  const handleConfirm = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setTimeout(() => {
          setIsSuccess(false)
          setSelectedPatientId(null)
        }, 500)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 overflow-hidden border-none rounded-[32px] bg-white flex flex-col">
        {!isSuccess ? (
          <>
            <DialogHeader className="p-8 pb-6 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-4 mb-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <UserPlus size={20} />
                </div>
                <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">
                  {t("portfolio.assign_patient_modal_title", { name: providerName })}
                </DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 pt-1">
                {t("portfolio.assign_patient_modal_desc")}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
              <div className="flex flex-col gap-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    placeholder={t("portfolio.patient_search_placeholder")}
                    className="pl-12 rounded-2xl border-slate-100 bg-slate-50/50 h-12 focus:bg-white transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Patient List */}
                <div className="flex flex-col gap-3">
                  {filteredPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group",
                        selectedPatientId === patient.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-slate-50 bg-white hover:border-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-4 text-left">
                        <UserAvatar 
                          name={patient.patientName} 
                          initials={patient.patientInitials}
                          className="h-10 w-10"
                        />
                        <div className="flex flex-col">
                          <span className={cn(
                            "font-bold text-sm transition-colors",
                            selectedPatientId === patient.id ? "text-primary" : "text-slate-900"
                          )}>
                            {patient.patientName}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">{patient.id} • {patient.requiredDiscipline}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {patient.locationZip === "94105" && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                            <MapPin size={10} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{t("portfolio.zip_match")}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-50 text-sky-600 border border-sky-100/50">
                          <ShieldCheck size={10} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">{t("portfolio.insurance_match")}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedPatient && (
              <div className="p-8 py-6 bg-slate-50 border-t border-slate-100 shrink-0">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span>{t("cases.projected_utilization")}</span>
                  </div>
                  <UtilizationBar 
                    value={projectedUtilization} 
                    showLabel={false} 
                  />
                  <p className="text-xs text-slate-400 italic">
                    {t("portfolio.caseload_impact", { name: providerName, count: projectedUtilization })}
                  </p>
                </div>
              </div>
            )}

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
                disabled={!selectedPatientId || isSubmitting}
                className="flex-[2] rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-12 gap-2 shadow-lg shadow-primary/20"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <UserPlus size={20} />
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
                  patient: selectedPatient?.patientName, 
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
