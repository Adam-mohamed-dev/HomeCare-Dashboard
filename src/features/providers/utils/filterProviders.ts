import type { ProviderDirectoryEntry } from "../types"

export interface ProviderDirectoryFilters {
  searchTerm: string
  discipline: string
  status: string
}

export function filterProviderDirectory(
  providers: ProviderDirectoryEntry[],
  { searchTerm, discipline, status }: ProviderDirectoryFilters
): ProviderDirectoryEntry[] {
  const query = searchTerm.trim().toLowerCase()

  return providers.filter((provider) => {
    const matchesSearch =
      !query ||
      provider.name.toLowerCase().includes(query) ||
      provider.discipline.toLowerCase().includes(query) ||
      provider.location.toLowerCase().includes(query)

    const matchesDiscipline =
      discipline === "all" || provider.discipline === discipline

    const matchesStatus = status === "all" || provider.status === status

    return matchesSearch && matchesDiscipline && matchesStatus
  })
}
