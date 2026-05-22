import { useState } from "react"
import { useTranslation } from "react-i18next"
import { PageContainer } from "../../../components/layout/PageContainer"
import { AppointmentFilters } from "./AppointmentFilters"
import { AppointmentResults } from "./AppointmentResults"

export function AppointmentsView() {
  const { t } = useTranslation()
  const [zipCode, setZipCode] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
    }, 800)
  }

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  return (
    <PageContainer size="full" className="py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t("appointments.search_title")}</h1>
        <p className="text-slate-500 font-medium">{t("appointments.search_desc")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <AppointmentFilters 
          zipCode={zipCode}
          setZipCode={setZipCode}
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          isSearching={isSearching}
          onSearch={handleSearch}
        />

        <AppointmentResults 
          hasSearched={hasSearched}
        />
      </div>
    </PageContainer>
  )
}
