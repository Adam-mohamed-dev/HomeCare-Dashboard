import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { Button } from "../../../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { IssueTypeBadge } from "./IssueTypeBadge"
import type { ActionEvent } from "../types"

interface WorkloadTableProps {
  events: ActionEvent[]
}

export function WorkloadTable({ events }: WorkloadTableProps) {
  const { t } = useTranslation()

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="uppercase text-[11px] font-bold tracking-wider px-6 py-4 text-start min-w-[11rem] w-[1%] whitespace-nowrap">
              {t("workload.col_issue_type")}
            </TableHead>
            <TableHead className="uppercase text-[11px] font-bold tracking-wider py-4 text-start">
              {t("workload.col_patient")}
            </TableHead>
            <TableHead className="uppercase text-[11px] font-bold tracking-wider py-4 text-start">
              {t("workload.col_provider")}
            </TableHead>
            <TableHead className="uppercase text-[11px] font-bold tracking-wider py-4 text-start">
              {t("workload.col_reported")}
            </TableHead>
            <TableHead className="uppercase text-[11px] font-bold tracking-wider px-6 py-4 text-end">
              {t("patients.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <TableRow
                key={event.id}
                className="border-slate-50 hover:bg-slate-50/30 transition-colors"
              >
                <TableCell className="px-6 py-4 min-w-[11rem] w-[1%] whitespace-nowrap">
                  <IssueTypeBadge category={event.category} />
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      name={event.patientName}
                      initials={event.patientInitials}
                      className="h-9 w-9 text-[12px]"
                    />
                    <span className="font-semibold text-slate-900">
                      {event.patientName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {event.providerName ? (
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        name={event.providerName}
                        image={event.providerImage}
                        className="h-8 w-8 ring-0"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {event.providerName}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">—</span>
                  )}
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm font-medium text-slate-600">
                    {event.occurredAtLabel}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-end">
                  <div className="flex items-center justify-end gap-4">
                    {event.caseId ? (
                      <Link
                        to="/cases/$caseId"
                        params={{ caseId: event.caseId }}
                      >
                        <Button
                          variant="link"
                          className="text-slate-500 font-semibold p-0 h-auto text-xs hover:text-primary"
                        >
                          {t("workload.view_case")}
                        </Button>
                      </Link>
                    ) : event.providerId ? (
                      <Link
                        to="/providers/$providerId"
                        params={{ providerId: event.providerId }}
                      >
                        <Button
                          variant="link"
                          className="text-slate-500 font-semibold p-0 h-auto text-xs hover:text-primary"
                        >
                          {t("workload.view_provider")}
                        </Button>
                      </Link>
                    ) : null}
                    <Button
                      variant="link"
                      className="text-primary font-bold p-0 h-auto hover:no-underline"
                    >
                      {t(`workload.resolve.${event.category}`)}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-slate-400 font-medium"
              >
                {t("workload.no_actions_in_tab")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
