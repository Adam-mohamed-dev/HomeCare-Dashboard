import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { CaseFilters } from "./CaseFilters"
import { CaseCard } from "./CaseCard"
import { mockCases } from "../data/mockCases"
import { PageContainer } from "../../../components/layout/PageContainer"

export function CaseManagement() {
  const { t } = useTranslation('translation')
  const [searchTerm, setSearchTerm] = useState("")
  const [discipline, setDiscipline] = useState("all")

  const filteredCases = useMemo(() => {
    return mockCases.filter(c => {
      const matchesSearch = c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.locationZip.includes(searchTerm)
      const matchesDiscipline = discipline === "all" || c.requiredDiscipline.includes(discipline)
      
      return matchesSearch && matchesDiscipline
    })
  }, [searchTerm, discipline])

  return (
    <PageContainer size="standard" className="py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {t("cases.mgmt_title")}
          </h1>
          <p className="text-slate-500 max-w-xl font-medium">
            {t("cases.mgmt_desc")}
          </p>
        </div>
      </div>

      <CaseFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        discipline={discipline}
        setDiscipline={setDiscipline}
      />

      <div className="flex flex-col gap-4">
        {filteredCases.length > 0 ? (
          filteredCases.map((caseData) => (
            <CaseCard key={caseData.id} caseData={caseData} />
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <p className="text-lg font-medium">{t("cases.no_cases_found")}</p>
            <button 
              onClick={() => { setSearchTerm(""); setDiscipline("all"); }}
              className="text-primary font-bold hover:underline"
            >
              {t("common.reset_filters")}
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
