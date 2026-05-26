export type ActionEventTab = "assignments" | "visits" | "referrals"

export type ActionEventCategory =
  | "assignment_no_response"
  | "visit_arrival_delay"
  | "visit_patient_not_found"
  | "visit_patient_unavailable"
  | "referral_declined"
  | "referral_unassigned_urgent"

export type ActionEventSeverity = "urgent" | "high" | "normal"

export interface ActionEvent {
  id: string
  tab: ActionEventTab
  category: ActionEventCategory
  severity: ActionEventSeverity
  occurredAtLabel: string
  occurredHoursAgo: number
  patientName: string
  patientInitials: string
  providerName?: string
  providerImage?: string
  providerId?: string
  caseId?: string
  /** i18n params for workload.events.{category}.* keys */
  meta?: Record<string, string>
}
