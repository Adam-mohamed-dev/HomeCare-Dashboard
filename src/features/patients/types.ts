export interface Patient {
  name: string
  initials: string
  mrn: string
  dov: string
  status: string
  statusVariant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"
  assignedPt: string
  assignedPtImg: string | null
}
