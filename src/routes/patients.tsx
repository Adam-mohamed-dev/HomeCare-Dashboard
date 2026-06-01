import { createRoute } from '@tanstack/react-router'
import { appLayoutRoute } from './_app'
import { PatientManagement } from '../features/patients/components/PatientManagement'

export const patientsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/patients',
  component: () => <PatientManagement />,
})
