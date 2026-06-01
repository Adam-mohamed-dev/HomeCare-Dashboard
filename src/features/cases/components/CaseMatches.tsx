import { useTranslation } from "react-i18next"
import { useParams, Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { FeatureHeader } from "../../../components/layout/FeatureHeader"
import { useMemo } from "react"
import { mockCases } from "../data/mockCases"
import { mockMatches } from "../data/mockMatches"
import { RecommendedProviderCard } from "./RecommendedProviderCard"
import { MatchSidebar } from "./MatchSidebar"
import { PageContainer } from "../../../components/layout/PageContainer"
import { ProviderMatchFilters } from "./ProviderMatchFilters"
import { useState } from "react"

export function CaseMatches() {
  const { t } = useTranslation('translation')
  const { caseId } = useParams({ from: '/app/cases/$caseId' })

  // Filter States
  const [searchTerm, setSearchTerm] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [insurance, setInsurance] = useState("all")
  const [availability, setAvailability] = useState("all")

  const currentCase = useMemo(() => {
    return mockCases.find(c => c.id === caseId)
  }, [caseId])

  const filteredMatches = useMemo(() => {
    return mockMatches.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesZip = !zipCode || provider.zip.includes(zipCode)
      const matchesInsurance = insurance === "all" || provider.insurance.includes(insurance)
      const matchesAvailability = availability === "all" || provider.availability.includes(availability)
      
      return matchesSearch && matchesZip && matchesInsurance && matchesAvailability
    })
  }, [searchTerm, zipCode, insurance, availability])

  if (!currentCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Case Not Found</h2>
        <Link to="/cases" className="text-primary hover:underline font-medium">
          Return to Queue
        </Link>
      </div>
    )
  }

  return (
    <PageContainer size="standard" className="py-8 flex flex-col gap-8">
      <FeatureHeader
        breadcrumbParent={t("nav.cases")}
        breadcrumbParentLink="/cases"
        breadcrumbCurrent={t("cases.review_matches")}
        title={t("cases.review_matches_title", { id: caseId })}
        description={t("cases.review_matches_subtitle", { zip: currentCase.locationZip })}
      />

      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400 -mt-4">
        <Link
          to="/patients/$patientId"
          params={{ patientId: currentCase.patientId }}
          className="flex items-center gap-2 hover:text-primary transition-colors group"
        >
          <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{currentCase.patientName}</span>
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-600">{currentCase.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recommendations */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <ProviderMatchFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            zipCode={zipCode}
            setZipCode={setZipCode}
            insurance={insurance}
            setInsurance={setInsurance}
            availability={availability}
            setAvailability={setAvailability}
          />

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">
              {t("cases.recommended_matches")} ({filteredMatches.length})
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((provider) => (
                <RecommendedProviderCard 
                  key={provider.id} 
                  provider={provider} 
                  patientName={currentCase.patientName}
                  patientInitials={currentCase.patientInitials}
                  caseId={currentCase.id}
                />
              ))
            ) : (
              <div className="p-12 text-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">{t("portfolio.no_providers_found")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4">
          <MatchSidebar 
            zipCode={currentCase.locationZip} 
            discipline={currentCase.requiredDiscipline} 
          />
        </div>
      </div>
    </PageContainer>
  )
}
