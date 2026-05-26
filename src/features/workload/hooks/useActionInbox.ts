import { useEffect, useMemo, useState } from "react"
import { ACTION_EVENTS } from "../data/mockActionEvents"
import type { ActionEventCategory, ActionEventTab } from "../types"
import {
  countEventsByTab,
  filterActionEvents,
  getEventsForTab,
  sortActionEvents,
} from "../utils/actionInbox"

export function useActionInbox() {
  const [activeTab, setActiveTab] = useState<ActionEventTab>("assignments")
  const [searchTerm, setSearchTerm] = useState("")
  const [issueType, setIssueType] = useState<"all" | ActionEventCategory>("all")

  useEffect(() => {
    setIssueType("all")
    setSearchTerm("")
  }, [activeTab])

  const tabCounts = useMemo(
    () => ({
      assignments: countEventsByTab(ACTION_EVENTS, "assignments"),
      visits: countEventsByTab(ACTION_EVENTS, "visits"),
      referrals: countEventsByTab(ACTION_EVENTS, "referrals"),
    }),
    []
  )

  const filtered = useMemo(() => {
    const tabEvents = getEventsForTab(ACTION_EVENTS, activeTab)
    const matched = filterActionEvents(tabEvents, { searchTerm, issueType })
    return sortActionEvents(matched)
  }, [activeTab, searchTerm, issueType])

  const resetFilters = () => {
    setSearchTerm("")
    setIssueType("all")
  }

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    issueType,
    setIssueType,
    filtered,
    tabCounts,
    resetFilters,
  }
}
