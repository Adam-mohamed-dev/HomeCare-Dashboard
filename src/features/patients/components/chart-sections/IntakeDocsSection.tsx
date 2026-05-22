import { useTranslation } from "react-i18next"
import { FileText, Plus } from "lucide-react"
import { Select } from "../../../../components/ui/select"
import { Button } from "../../../../components/ui/button"
import type { UseFormRegister } from "react-hook-form"
import type { PatientFormData } from "../../schemas/patientSchema"
import { FormCard } from "../../../../components/onboarding/FormCard"
import { FormField } from "../../../../components/onboarding/FormField"

interface IntakeDocsSectionProps {
  register: UseFormRegister<PatientFormData>
}

export function IntakeDocsSection({ register }: IntakeDocsSectionProps) {
  const { t } = useTranslation('translation')

  return (
    <FormCard>
      <div className="flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-1 w-full">
          <FormField label={t("onboarding.doc_type")}>
            <Select {...register("documentType")}>
              <option value="insurance">Insurance Card (Front/Back)</option>
              <option value="id">Government ID</option>
            </Select>
          </FormField>
        </div>
        <Button type="button" className="h-12 px-8 bg-primary text-white hover:bg-primary/90 border-none rounded-xl gap-2 font-bold shrink-0">
          <Plus size={20} />
          {t("onboarding.browse_files")}
        </Button>
      </div>

      <div className="border-2 border-dashed border-slate-100 rounded-[24px] p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/30">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <FileText size={24} />
        </div>
        <div className="text-center">
          <p className="text-[15px] font-bold text-slate-800">{t("onboarding.no_docs_uploaded")}</p>
          <p className="text-sm text-slate-400 mt-1">{t("onboarding.drag_drop_desc")}</p>
        </div>
      </div>
    </FormCard>
  )
}
