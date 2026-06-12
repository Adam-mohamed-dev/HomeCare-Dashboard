import { useState } from "react"
import { useTranslation } from "react-i18next"
import { PageContainer } from "../../../components/layout/PageContainer"
import { ManagementPageHeader } from "../../../components/layout/ManagementPageHeader"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Trash2, Plus } from "lucide-react"
import { ConfirmDialog } from "../../../components/ui/confirm-dialog"

const defaultInsurances = [
  "Aetna",
  "Blue Shield PPO",
  "Cigna",
  "Medicare Part A",
  "Medicare Part B",
  "UnitedHealthcare",
]

export function InsurancesView() {
  const { t } = useTranslation()
  const [insurances, setInsurances] = useState(defaultInsurances)
  const [newName, setNewName] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handleAdd = () => {
    const trimmed = newName.trim()
    if (!trimmed) return
    setInsurances((prev) => [...prev, trimmed])
    setNewName("")
  }

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setInsurances((prev) => prev.filter((i) => i !== deleteTarget))
      setDeleteTarget(null)
    }
  }

  return (
    <PageContainer size="wide" className="py-8 flex flex-col gap-8">
      <ManagementPageHeader
        title={t("nav.insurances")}
        description={t("insurances.description")}
      />

      <Card className="border-none shadow-sm ring-1 ring-slate-100 rounded-[24px]">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAdd() }}
              placeholder={t("insurances.add_placeholder")}
              className="flex-1"
            />
            <Button onClick={handleAdd} className="rounded-full shrink-0 gap-2">
              <Plus size={16} />
              {t("insurances.add_btn")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {insurances.length === 0 && (
              <p className="text-sm text-slate-400 w-full text-center py-8">
                {t("insurances.empty")}
              </p>
            )}
            {insurances.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 text-sm text-slate-700"
              >
                <span>{name}</span>
                <button
                  onClick={() => setDeleteTarget(name)}
                  className="text-slate-400 hover:text-destructive transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}
        title={t("insurances.delete_title")}
        description={t("insurances.delete_desc", { name: deleteTarget })}
        confirmLabel={t("insurances.delete_confirm")}
        destructive
        onConfirm={handleConfirmDelete}
      />
    </PageContainer>
  )
}
