import { useTranslation } from "react-i18next"
import { Link, useParams } from "@tanstack/react-router"
import { ChevronRight, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

import type { ProviderProfileData } from "../types"
import { mockProviderProfile } from "../data/mockProviderProfile"
import { PortfolioHeader } from "./portfolio-sections/PortfolioHeader"
import { DisciplinesCard } from "./portfolio-sections/DisciplinesCard"
import { MetricsCard } from "./portfolio-sections/MetricsCard"
import { CoverageCard } from "./portfolio-sections/CoverageCard"
import { InsuranceCard } from "./portfolio-sections/InsuranceCard"
import { AvailabilityCard } from "./portfolio-sections/AvailabilityCard"
import { CoordinatorNotes } from "./portfolio-sections/CoordinatorNotes"
import { PageContainer } from "../../../components/layout/PageContainer"

export function ProviderPortfolio() {
  const { t } = useTranslation()
  const { providerId } = useParams({ from: '/providers/$providerId' })
  const [provider, setProvider] = useState<ProviderProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true)
    setTimeout(() => {
      // Fallback to mock profile for any ID for now
      setProvider(mockProviderProfile)
      setError(null)
      setIsLoading(false)
    }, 500)
  }, [providerId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !provider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-bold text-slate-800">{t("portfolio.provider_not_found")}</h2>
        <p className="text-slate-500">{t("portfolio.provider_not_found_desc")}</p>
        <Link to="/providers" className="text-primary hover:underline font-medium">
          {t("portfolio.return_to_list")}
        </Link>
      </div>
    )
  }

  return (
    <PageContainer size="wide" className="py-8">
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
        <Link to="/providers" className="hover:text-primary transition-colors">
          {t("nav.providers")}
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-600">{t("portfolio.breadcrumb")}</span>
      </div>

      <PortfolioHeader provider={provider} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Column (Left) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <DisciplinesCard provider={provider} />
          <CoverageCard provider={provider} />
          <InsuranceCard provider={provider} />
          <CoordinatorNotes provider={provider} />
        </div>

        {/* Sidebar Column (Right) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <MetricsCard provider={provider} />
          <AvailabilityCard provider={provider} />
        </div>
        </div>
      </div>
    </PageContainer>
  )
}
