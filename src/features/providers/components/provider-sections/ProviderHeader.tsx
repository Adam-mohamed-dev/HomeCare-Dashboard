import { UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../../components/ui/button"
import { ManagementPageHeader } from "../../../../components/layout/ManagementPageHeader"

interface ProviderHeaderProps {
  onAddClick: () => void
}

export function ProviderHeader({ onAddClick }: ProviderHeaderProps) {
  const { t } = useTranslation()

  return (
    <ManagementPageHeader
      title={t("portfolio.providers_title")}
      description={t("portfolio.providers_desc")}
      actions={
        <Button onClick={onAddClick} className="w-full md:w-auto gap-2 rounded-full px-6 h-12 shadow-lg shadow-primary/20">
          <UserPlus size={18} />
          {t("portfolio.add_provider")}
        </Button>
      }
    />
  )
}
