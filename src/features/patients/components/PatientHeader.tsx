import { UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../components/ui/button"

interface PatientHeaderProps {
  onAddClick: () => void
}

export function PatientHeader({ onAddClick }: PatientHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t("patients.mgmt_title")}</h1>
        <p className="text-slate-500 max-w-xl">
          {t("patients.mgmt_desc")}
        </p>
      </div>
      <Button 
        onClick={onAddClick}
        className="w-full md:w-auto gap-2 rounded-full px-6 h-12 shadow-lg shadow-primary/20"
      >
        <UserPlus size={18} />
        {t("patients.add_new_patient")}
      </Button>
    </div>
  )
}
