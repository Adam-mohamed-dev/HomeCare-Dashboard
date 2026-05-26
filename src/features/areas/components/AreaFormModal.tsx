import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../../../components/ui/dialog"
import { Loader2, MapPinned, Plus, X } from "lucide-react"
import type { Area } from "../types"

interface AreaFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (area: { name: string, zips: string[] }) => void
  initialArea?: Area | null
}

export function AreaFormModal({ isOpen, onClose, onSave, initialArea }: AreaFormModalProps) {
  const { t } = useTranslation('translation')
  const [name, setName] = useState("")
  const [zips, setZips] = useState<string[]>([""])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (initialArea) {
        setName(initialArea.name)
        setZips(initialArea.zips.length > 0 ? initialArea.zips : [""])
      } else {
        setName("")
        setZips([""])
      }
      setIsSubmitting(false)
    }
  }, [isOpen, initialArea])

  const handleAddZip = () => setZips([...zips, ""])
  
  const handleRemoveZip = (index: number) => {
    setZips(zips.filter((_, i) => i !== index))
  }
  
  const handleZipChange = (index: number, value: string) => {
    // Only allow numbers
    const cleanValue = value.replace(/\D/g, '').slice(0, 5)
    const newZips = [...zips]
    newZips[index] = cleanValue
    setZips(newZips)
  }

  const validZips = zips.filter(z => z.trim().length === 5)
  const isValid = name.trim().length > 0 && validZips.length > 0

  const handleSave = () => {
    setIsSubmitting(true)
    
    // Remove duplicates and sort
    const uniqueZips = Array.from(new Set(validZips)).sort()

    setTimeout(() => {
      onSave({
        name: name.trim(),
        zips: uniqueZips
      })
      setIsSubmitting(false)
      onClose()
    }, 600)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[32px] bg-white">
        <DialogHeader className="p-8 pb-4 bg-slate-50/50">
          <div className="flex items-center gap-4 mb-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <MapPinned size={20} />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">
              {initialArea ? t("areas.edit_area") : t("areas.add_new_area")}
            </DialogTitle>
          </div>
          <p className="text-slate-500 pt-1 text-sm">
            {initialArea ? t("areas.edit_desc") : t("areas.create_desc")}
          </p>
        </DialogHeader>

        <div className="p-8 pt-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">{t("areas.area_name_label")}</label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("areas.area_name_placeholder")}
              className="h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">{t("common.zip_code")}s</label>
            <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
              {zips.map((zip, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={zip}
                    onChange={(e) => handleZipChange(index, e.target.value)}
                    placeholder={t("areas.zip_code_placeholder")}
                    maxLength={5}
                    className="h-12 bg-slate-50 border-none rounded-xl px-4 focus-visible:ring-primary/20 flex-1"
                  />
                  {zips.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveZip(index)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleAddZip}
                className="w-full h-12 rounded-xl border border-dashed border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 gap-2 font-medium shrink-0"
              >
                <Plus size={18} />
                {t("areas.add_zip_code")}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 pt-6 bg-white border-t border-slate-50 flex gap-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 rounded-full font-bold text-slate-500 hover:bg-slate-100 h-12"
          >
            {t("common.cancel")}
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!isValid || isSubmitting}
            className="flex-[2] rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-12 gap-2"
          >
            {isSubmitting && <Loader2 className="animate-spin" size={18} />}
            {t("areas.save_area")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
