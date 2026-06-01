import { useTranslation } from "react-i18next"
import { useNavigate } from "@tanstack/react-router"
import { UserAvatar } from "../../../components/ui/user-avatar"
import { Button } from "../../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { StatusPill } from "../../../components/StatusPill"

import type { Patient } from "../types"

interface PatientTableProps {
  patients: Patient[]
}

export function PatientTable({ patients }: PatientTableProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="uppercase text-[11px] font-bold tracking-wider px-8 py-5 text-start">{t("patients.details")}</TableHead>
            <TableHead className="uppercase text-[11px] font-bold tracking-wider py-5 text-center">{t("patients.status")}</TableHead>
            <TableHead className="uppercase text-[11px] font-bold tracking-wider py-5 text-start">{t("patients.assigned_pt")}</TableHead>
            <TableHead className="uppercase text-[11px] font-bold tracking-wider px-8 py-5 text-end">{t("patients.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <TableRow
                key={patient.id}
                className="border-slate-50 hover:bg-slate-50/30 transition-colors cursor-pointer"
                onClick={() => navigate({ to: '/patients/$patientId', params: { patientId: patient.id } })}
              >
                <TableCell className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <UserAvatar 
                      name={patient.name} 
                      initials={patient.initials} 
                      className="h-10 w-10 text-[13px]" 
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{patient.name}</span>
                      <span className="text-[12px] text-muted-foreground font-medium">
                        MRN: {patient.mrn} • DOV: {patient.dov}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <StatusPill status={patient.status} />
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    {patient.assignedPtImg ? (
                      <>
                        <UserAvatar 
                          name={patient.assignedPt} 
                          image={patient.assignedPtImg} 
                          className="h-6 w-6 ring-0" 
                        />
                        <span className="text-sm font-medium text-slate-700">{patient.assignedPt}</span>
                      </>
                    ) : (
                      <span className="text-sm text-slate-400">{patient.assignedPt}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-8 py-4 text-end">
                  <Button variant="link" className="text-primary font-bold p-0 h-auto hover:no-underline hover:cursor-pointer">
                    {t("patients.view_chart")}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-slate-400 font-medium">
                {t("patients.no_patients_found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
