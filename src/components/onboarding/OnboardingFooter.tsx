import { useTranslation } from "react-i18next"
import { Button } from "../ui/button"

interface OnboardingFooterProps {
  onCancel: () => void
  onSave?: (e?: React.BaseSyntheticEvent) => Promise<void> | void
  isSubmitting?: boolean
  submitLabel: string
  draftLabel?: string
}

export function OnboardingFooter({ 
  onCancel, 
  onSave, 
  isSubmitting, 
  submitLabel,
  draftLabel 
}: OnboardingFooterProps) {
  const { t } = useTranslation('translation')
  
  return (
    <div className="flex items-center justify-end gap-6 pt-10">
      <button 
        type="button"
        onClick={onCancel}
        className="text-slate-600 font-bold hover:text-primary transition-colors text-[15px]"
      >
        {draftLabel || t("onboarding.save_draft")}
      </button>
      <Button 
        onClick={onSave}
        disabled={isSubmitting}
        className="h-14 px-12 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-[16px] shadow-lg shadow-primary/20"
      >
        {isSubmitting ? "..." : submitLabel}
      </Button>
    </div>
  )
}
