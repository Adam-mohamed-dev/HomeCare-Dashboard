export type UtilizationTier = "healthy" | "warning" | "critical"

export function getUtilizationTier(value: number): UtilizationTier {
  if (value >= 90) return "critical"
  if (value >= 70) return "warning"
  return "healthy"
}

export function getUtilizationBarColor(value: number): string {
  const tier = getUtilizationTier(value)
  if (tier === "critical") return "bg-destructive"
  if (tier === "warning") return "bg-amber-500"
  return "bg-emerald-500"
}

export function getUtilizationTextColor(value: number): string {
  const tier = getUtilizationTier(value)
  if (tier === "critical") return "text-destructive"
  if (tier === "warning") return "text-amber-600"
  return "text-emerald-600"
}

export function matchesUtilizationBand(
  value: number,
  band: "all" | UtilizationTier
): boolean {
  if (band === "all") return true
  return getUtilizationTier(value) === band
}
