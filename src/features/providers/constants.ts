export const DAYS_OF_WEEK = [
  { id: "mon", labelKey: "mon" },
  { id: "tue", labelKey: "tue" },
  { id: "wed", labelKey: "wed" },
  { id: "thu", labelKey: "thu" },
  { id: "fri", labelKey: "fri" },
  { id: "sat", labelKey: "sat" },
  { id: "sun", labelKey: "sun" }
] as const

export type DayId = typeof DAYS_OF_WEEK[number]["id"]

export const getEmptyWeeklyAvailability = () => 
  DAYS_OF_WEEK.map(day => ({
    day: day.id,
    slots: []
  }))
