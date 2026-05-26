import type { ActionEventCategory, ActionEventTab } from "./types"

export const TAB_CATEGORY_ORDER: Record<ActionEventTab, ActionEventCategory[]> = {
  assignments: ["assignment_no_response"],
  visits: [
    "visit_arrival_delay",
    "visit_patient_not_found",
    "visit_patient_unavailable",
  ],
  referrals: ["referral_declined", "referral_unassigned_urgent"],
}

/** Warm palette (amber / orange / red) — aligned with Field Visits tab */
export const ISSUE_TYPE_STYLES: Record<
  ActionEventCategory,
  { badge: string; dot: string }
> = {
  assignment_no_response: {
    badge: "bg-yellow-50 text-yellow-900 border-yellow-200",
    dot: "bg-yellow-500",
  },
  visit_arrival_delay: {
    badge: "bg-amber-50 text-amber-800 border-amber-100",
    dot: "bg-amber-500",
  },
  visit_patient_not_found: {
    badge: "bg-red-50 text-red-800 border-red-100",
    dot: "bg-red-500",
  },
  visit_patient_unavailable: {
    badge: "bg-orange-50 text-orange-800 border-orange-100",
    dot: "bg-orange-500",
  },
  referral_declined: {
    badge: "bg-red-50 text-red-900 border-red-200",
    dot: "bg-red-600",
  },
  referral_unassigned_urgent: {
    badge: "bg-amber-50 text-amber-900 border-amber-200",
    dot: "bg-amber-600",
  },
}
