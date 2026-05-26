import { useTranslation } from "react-i18next"
import { Modal } from "../../../components/ui/modal"
import { Button } from "../../../components/ui/button"
import type { Area } from "../types"

interface DeleteAreaModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  area: Area | null
}

export function DeleteAreaModal({ isOpen, onClose, onConfirm, area }: DeleteAreaModalProps) {
  const { t } = useTranslation('translation')

  if (!area) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("common.confirm")}
      description={`Are you sure you want to delete ${area.name}? This action cannot be undone.`}
    >
      <div className="flex gap-3 mt-4">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="flex-1 rounded-full font-bold text-slate-500 hover:bg-slate-100 h-12"
        >
          {t("common.cancel")}
        </Button>
        <Button 
          variant="destructive"
          onClick={onConfirm}
          className="flex-1 rounded-full text-white font-bold h-12"
        >
          {t("common.delete")}
        </Button>
      </div>
    </Modal>
  )
}
