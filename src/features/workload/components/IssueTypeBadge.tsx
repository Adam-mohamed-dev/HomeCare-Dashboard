import { useTranslation } from "react-i18next"
import { cn } from "../../../lib/utils"
import { ISSUE_TYPE_STYLES } from "../constants"
import type { ActionEventCategory } from "../types"

interface IssueTypeBadgeProps {
  category: ActionEventCategory
  className?: string
}

export function IssueTypeBadge({ category, className }: IssueTypeBadgeProps) {
  const { t } = useTranslation()
  const styles = ISSUE_TYPE_STYLES[category]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold px-2.5 py-1.5 rounded-lg border shrink-0",
        styles.badge,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", styles.dot)} />
      <span>{t(`workload.groups.${category}`)}</span>
    </span>
  )
}
