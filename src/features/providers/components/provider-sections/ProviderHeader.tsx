import { UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../../components/ui/button"

interface ProviderHeaderProps {
  onAddClick: () => void
}

export function ProviderHeader({ onAddClick }: ProviderHeaderProps) {
  const { t } = useTranslation()
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("portfolio.providers_title")}</h1>
        <p className="text-muted-foreground max-w-xl">
          {t("portfolio.providers_desc")}
        </p>
      </div>
      <Button 
        onClick={onAddClick}
        className="w-full md:w-auto rounded-full px-6 gap-2"
      >
        <UserPlus size={18} />
        {t("portfolio.add_provider")}
      </Button>
    </div>
  )
}
