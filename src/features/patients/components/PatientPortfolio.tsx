import { Link, useParams } from "@tanstack/react-router"
import { ChevronRight, Loader2 } from "lucide-react"
import { usePatientStore } from "../store/usePatientStore"
import { PageContainer } from "../../../components/layout/PageContainer"

import { PortfolioHeader } from "./portfolio-sections/PortfolioHeader"
import { PatientInfoCard } from "./portfolio-sections/PatientInfoCard"
import { OutreachCard } from "./portfolio-sections/OutreachCard"
import { InsuranceCard } from "./portfolio-sections/InsuranceCard"
import { CoordinatorNotes } from "./portfolio-sections/CoordinatorNotes"
import { MetricsCard } from "./portfolio-sections/MetricsCard"

export function PatientPortfolio() {
  const { patientId } = useParams({ from: '/app/patients/$patientId' })
  const patient = usePatientStore((s) => s.getProfile(patientId))

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <PageContainer size="wide" className="py-8">
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-400">
          <Link to="/patients" className="hover:text-primary transition-colors">
            Patients
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-600">{patient.fullName}</span>
        </div>

        <PortfolioHeader patient={patient} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <PatientInfoCard patient={patient} />
            <OutreachCard patient={patient} />
            <InsuranceCard patient={patient} />
            <CoordinatorNotes patient={patient} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <MetricsCard patient={patient} />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
