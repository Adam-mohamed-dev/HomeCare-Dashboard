import { useMemo } from "react"

export function useZipLookup(zipCode: string) {
  return useMemo(() => {
    if (!zipCode) return null
    if (zipCode === "94105") return "SOMA / Financial District"
    if (zipCode === "90210") return "Beverly Hills"
    if (zipCode.length === 5) return "Greater Metro Area"
    return null
  }, [zipCode])
}
