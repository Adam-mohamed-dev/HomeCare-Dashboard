import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from '../../../components/ui/toast-custom'

export function useDashboardEvents() {
  const { t } = useTranslation()
  const { toast } = useToast()

  useEffect(() => {
    // 1. Urgent Delay
    const t1 = setTimeout(() => {
      toast(t("notifications.arrival_delay_msg"), {
        title: t("notifications.arrival_delay_title"),
        type: "urgent"
      })
    }, 1500)

    // 2. Success Assignment
    const t2 = setTimeout(() => {
      toast(t("notifications.assignment_success_msg"), {
        title: t("notifications.assignment_success_title"),
        type: "success"
      })
    }, 3000)

    // 3. New Lead Info
    const t3 = setTimeout(() => {
      toast(t("notifications.new_lead_msg"), {
        title: t("notifications.new_lead_title"),
        type: "info"
      })
    }, 4500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [toast, t])
}
