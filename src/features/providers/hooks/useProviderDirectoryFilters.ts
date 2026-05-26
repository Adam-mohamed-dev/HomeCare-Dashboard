import { useMemo, useState } from "react"
import type { ProviderDirectoryEntry } from "../types"
import {
  filterProviderDirectory,
  type ProviderDirectoryFilters,
} from "../utils/filterProviders"

const DEFAULT_FILTERS: ProviderDirectoryFilters = {
  searchTerm: "",
  discipline: "all",
  status: "all",
}

export function useProviderDirectoryFilters(
  providers: ProviderDirectoryEntry[],
  initialFilters: Partial<ProviderDirectoryFilters> = {}
) {
  const [searchTerm, setSearchTerm] = useState(
    initialFilters.searchTerm ?? DEFAULT_FILTERS.searchTerm
  )
  const [discipline, setDiscipline] = useState(
    initialFilters.discipline ?? DEFAULT_FILTERS.discipline
  )
  const [status, setStatus] = useState(
    initialFilters.status ?? DEFAULT_FILTERS.status
  )

  const filters = useMemo(
    () => ({ searchTerm, discipline, status }),
    [searchTerm, discipline, status]
  )

  const filtered = useMemo(
    () => filterProviderDirectory(providers, filters),
    [providers, filters]
  )

  const resetFilters = () => {
    setSearchTerm(DEFAULT_FILTERS.searchTerm)
    setDiscipline(DEFAULT_FILTERS.discipline)
    setStatus(DEFAULT_FILTERS.status)
  }

  return {
    searchTerm,
    setSearchTerm,
    discipline,
    setDiscipline,
    status,
    setStatus,
    filtered,
    resetFilters,
  }
}
