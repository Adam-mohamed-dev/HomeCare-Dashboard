import type { ActionEvent, ActionEventCategory, ActionEventTab } from "../types"

export function getEventsForTab(
  events: ActionEvent[],
  tab: ActionEventTab
): ActionEvent[] {
  return events.filter((event) => event.tab === tab)
}

export function countEventsByTab(
  events: ActionEvent[],
  tab: ActionEventTab
): number {
  return getEventsForTab(events, tab).length
}

export function filterActionEvents(
  events: ActionEvent[],
  {
    searchTerm,
    issueType = "all",
  }: { searchTerm: string; issueType?: "all" | ActionEventCategory }
): ActionEvent[] {
  let result = events

  if (issueType !== "all") {
    result = result.filter((event) => event.category === issueType)
  }

  const query = searchTerm.trim().toLowerCase()
  if (!query) return result

  return result.filter((event) => {
    const haystack = [
      event.patientName,
      event.providerName,
      event.caseId,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return haystack.includes(query)
  })
}

export function sortActionEvents(events: ActionEvent[]): ActionEvent[] {
  const severityOrder = { urgent: 0, high: 1, normal: 2 }

  return [...events].sort((a, b) => {
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity]
    if (severityDiff !== 0) return severityDiff
    return a.occurredHoursAgo - b.occurredHoursAgo
  })
}

export function countUrgentEvents(events: ActionEvent[]): number {
  return events.filter((e) => e.severity === "urgent").length
}
