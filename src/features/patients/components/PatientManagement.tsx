import { useState, useMemo } from "react"
import { useNavigate } from "@tanstack/react-router"
import { PatientHeader } from "./PatientHeader"
import { PatientFilters } from "./PatientFilters"
import { PatientTable } from "./PatientTable"
import { PatientPagination } from "./PatientPagination"
import { PageContainer } from "../../../components/layout/PageContainer"

const initialPatients = [
  {
    name: "Eleanor Miller",
    initials: "EM",
    mrn: "882-192",
    dov: "Oct 12",
    status: "Lead",
    statusVariant: "default" as const, 
    assignedPt: "Dr. Julian Vance",
    assignedPtImg: "https://i.pravatar.cc/150?u=julian"
  },
  {
    name: "Robert Jenkins",
    initials: "RJ",
    mrn: "412-990",
    dov: "Oct 15",
    status: "Active",
    statusVariant: "info" as const,
    assignedPt: "Sarah Thorne",
    assignedPtImg: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Alice Khowani",
    initials: "AK",
    mrn: "701-223",
    dov: "Sep 28",
    status: "Inactive",
    statusVariant: "secondary" as const,
    assignedPt: "Unassigned",
    assignedPtImg: null
  },
  {
    name: "Marcus Bennett",
    initials: "MB",
    mrn: "902-115",
    dov: "Oct 18",
    status: "Active",
    statusVariant: "info" as const,
    assignedPt: "Dr. Julian Vance",
    assignedPtImg: "https://i.pravatar.cc/150?u=julian"
  }
]

export function PatientManagement() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  const filteredAndSortedPatients = useMemo(() => {
    let result = initialPatients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.mrn.includes(searchTerm)
      const matchesStatus = statusFilter === "All" || patient.status === statusFilter
      return matchesSearch && matchesStatus
    })

    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else {
        return a.mrn.localeCompare(b.mrn)
      }
    })

    return result
  }, [searchTerm, statusFilter, sortBy])

  return (
    <PageContainer size="standard" className="py-8 flex flex-col gap-8">
      <PatientHeader onAddClick={() => navigate({ to: "/patients/new" })} />
      
      <PatientFilters 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <PatientTable patients={filteredAndSortedPatients} />

      <PatientPagination 
        currentCount={filteredAndSortedPatients.length} 
        totalCount={128} 
      />
    </PageContainer>
  )
}
