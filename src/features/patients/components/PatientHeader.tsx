import { UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../components/ui/button"
import { ManagementPageHeader } from "../../../components/layout/ManagementPageHeader"

interface PatientHeaderProps {
  onAddClick: () => void
}

export function PatientHeader({ onAddClick }: PatientHeaderProps) {
  const { t } = useTranslation()

  return (
    <ManagementPageHeader
      title={t("patients.mgmt_title")}
      description={t("patients.mgmt_desc")}
      actions={
        <Button
          onClick={onAddClick}
          className="w-full md:w-auto gap-2 rounded-full px-6 h-12 shadow-lg shadow-primary/20"
        >
          <UserPlus size={18} />
          {t("patients.add_new_patient")}
        </Button>
      }
    />
  )
}
