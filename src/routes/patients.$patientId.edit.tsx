import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { CreatePatientChart } from '../features/patients/components/CreatePatientChart'
import { useParams } from '@tanstack/react-router'

export const editPatientRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/patients/$patientId/edit',
  component: EditPatientPage,
})

function EditPatientPage() {
  const { patientId } = useParams({ from: editPatientRoute.id })
  return <CreatePatientChart patientId={patientId} />
}
